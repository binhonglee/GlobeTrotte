import City from '../enums/City';

export class CityObj {
  [key: string]: any;
  public key: City = City.UNKNOWN;
  public label: string = CityUtil.toString(this.key);

  public constructor(key: City, label: string) {
    this.key = key;
    this.label = label;
  }
}

export class CityUtil {
  public static allActiveCities(): CityObj[] {
    const toReturn = [] as CityObj[];
    for (const cityString in City) {
      if (
        Object.prototype.hasOwnProperty.call(
          City,
          cityString,
        )
      ) {
        const city = Number(cityString);
        if (!isNaN(city) && city !== City.UNKNOWN) {
          toReturn.push(
            new CityObj(city, this.toString(city)),
          );
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
