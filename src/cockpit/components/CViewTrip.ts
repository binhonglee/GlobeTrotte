import { Component, Prop, Vue } from 'vue-property-decorator';
import CityUtil from '../enums/CityUtil';
import CPlaces from './CPlaces.vue';
import Trip from '../structs/Trip';

@Component({
    data() {
        return {
            city: '',
        };
    },
    components: {
        CPlaces,
    },
})

export default class CViewTrip extends Vue {
    @Prop() private trip!: Trip;
    @Prop() private editable!: boolean;

    private mounted(): void {
        this.$data.city = CityUtil.toString(this.trip.location);
    }

    private enableEditMode(): void {
        this.$emit('edit-trip', this.trip);
    }
}
