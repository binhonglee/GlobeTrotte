import City from './City';

export default class CityUtil {
    public static allActiveCities(): any[] {
        const toReturn = [] as any[];
        for (const cityString in City) {
            if (City.hasOwnProperty(cityString)) {
                const city = Number(cityString);
                if ((!isNaN(city)) && city !== City.UNKNOWN) {
                    toReturn.push({
                        key: city,
                        label: this.toString(city),
                    });
                }
            }
        }
        return toReturn;
    }

    public static toString(city: City): string {
        switch (city) {
            case City.SanFranciscoCAUS:
                return 'San Francisco, CA, US';
            case City.SanJoseCAUS:
                return 'San Jose, CA, US';
            case City.NewYorkNYUS:
                return 'New York, NY, US';
            case City.AnchorageAKUS:
                return 'Anchorage, AK, US';
            case City.ParisFR:
                return 'Paris, FR';
            case City.KualaLumpurMY:
                return 'Kuala Lumpur, MY';
            default:
                return 'unrecognized city';
        }
    }
}
