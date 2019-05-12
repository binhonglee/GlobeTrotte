import { Component, Prop, Vue } from 'vue-property-decorator';
import { WingsStructUtil } from 'wings-ts-util';
import CEditTrip from './CEditTrip.vue';
import CViewTrip from './CViewTrip.vue';
import HTTPReq from '../shared/HTTPReq';
import Trip from '../structs/Trip';

@Component({
    data() {
        return {
            editMode: false,
        };
    },
    components: {
        CViewTrip,
        CEditTrip,
    },
})

export default class CTripInfo extends Vue {
    @Prop() private trip!: Trip;
    @Prop() private editable!: boolean;

    private enableEditMode(trip: Trip): void {
        this.$data.editMode = true;
    }

    private disableEditMode(): void {
        this.$data.editMode = false;
    }

    private save(trip: Trip): void {
        HTTPReq.post(
            'trip/' + trip.id,
            WingsStructUtil.stringify(trip),
            (success: any) => {
                if (success) {
                    this.disableEditMode();
                } else {
                    this.$alert(
                        'Save was unsuccessful. Please try again later.',
                        'Fail', { confirmButtonText: 'OK' },
                    );
                }
            },
        );
    }

    private cancel(): void {
        this.disableEditMode();
    }
}
