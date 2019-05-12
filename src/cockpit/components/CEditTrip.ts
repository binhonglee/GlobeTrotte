import { Component, Prop, Vue } from 'vue-property-decorator';
import CEditItem from './CEditItem.vue';
import CEditPlaces from './CEditPlaces.vue';
import City from '../enums/City';
import CityUtil from '../enums/CityUtil';
import Trip from '../structs/Trip';
import TripEditable from '../shared/TripEditable';

@Component({
    data() {
        return {
            cities: [],
            editables: [],
            items: [],
            places: [],
            value: '',
        };
    },
    components: {
        CEditItem,
        CEditPlaces,
    },
})

export default class CEditTrip extends Vue {
    @Prop() private trip!: Trip;

    private tripToItem(itemType: string): TripEditable {
        return new TripEditable(itemType, this.trip[itemType]);
    }

    private beforeMount(): void {
        this.$data.cities = CityUtil.allActiveCities();
        this.$data.editables = TripEditable.getAllTypes();
        this.$data.places = this.trip.places;
        this.$data.value = this.trip.location;
        for (const field in this.$data.editables) {
            if (typeof field === 'string') {
                this.$data.items.push(this.tripToItem(this.$data.editables[field]));
            }
        }
    }

    private save(): void {
        if (typeof this.$data.value === 'number') {
            this.trip.location = this.$data.value;
        } else {
            this.trip.location = parseInt(City[this.$data.value], 10);
        }

        for (const item of this.$data.items) {
            if (item instanceof TripEditable) {
                if (typeof this.trip[item.type] !== 'string') {
                    this.trip[item.type] = +item.value;
                } else {
                    this.trip[item.type] = item.value;
                }
            }
        }

        this.trip.userId = 213;
        this.trip.places = this.$data.places;
        this.$emit('save', this.trip);
    }

    private cancel(): void {
        this.$emit('cancel');
    }
}
