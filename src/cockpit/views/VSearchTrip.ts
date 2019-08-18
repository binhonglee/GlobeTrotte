import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import CTripInfo from '../components/CTripInfo.vue';
import HTTPReq from '../shared/HTTPReq';
import Place from '../structs/Place';
import Trip from '../structs/Trip';

@Component({
    data() {
        return {
            inputID: '',
            trip: new Trip(),
            owner: false,
        };
    },
    props: ['id'],
    components: {
        CTripInfo,
    },
})

export default class VSearchTrip extends Vue {
    @Watch('$route.path') private onRouteChange(): void {
        this.init();
    }

    private mounted() {
        this.init();
    }

    private init(): void {
        if (this.$route.params.id === undefined) {
            this.$data.trip.name = '';
            return;
        }

        const uri: string = 'trip/' + this.$route.params.id;
        HTTPReq.get(uri, (data: string) => {
            try {
                this.$data.trip = new Trip();
                const parsedData = JSON.parse(data);
                if (parsedData.places === null) {
                    parsedData.places = [];
                } else {
                    for (let i = 0; i < parsedData.places.length; i++) {
                        const temp = new Place();
                        temp.init(parsedData.places[i]);
                        parsedData.places[i] = temp;
                    }
                }
                this.$data.trip.init(parsedData);
            } catch (e) {
                alert('Error. Trip not found.');
            }
        });

        this.$data.owner = this.ifUserIsOwner(0);
    }

    private gotoTrip(): void {
        const id: number = parseInt(this.$data.inputID, 10);
        if (String(id) !== this.$data.inputID) {
            alert('Invalid number');
        } else {
            this.$router.push({ path: `/trip/view/${id}` });
        }
    }

    private ifUserIsOwner(userID: number): boolean {
        // TODO: Check if the current user is owner of the Trip
        return true;
    }
}
