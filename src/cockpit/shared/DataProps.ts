import Day from "@/wings/Day";
import Place from "@/wings/Place";
import TravelTime from "@/wings/TravelTime";

export class PropPlace {
  public place: DataPlace;
  public travelTime: DataTravelTime | undefined;

  public constructor(place?: Place, travelTime?: TravelTime) {
    this.place = new DataPlace(place);
    this.travelTime =
      travelTime === undefined ? undefined : new DataTravelTime(travelTime);
  }
}

export class DataPlace {
  public ID: number;
  public label: string;
  public URL: string;
  public description: string;

  public constructor(place?: Place) {
    this.ID = place?.ID.valueOf() ?? -1;
    this.label = place?.label.valueOf() ?? "";
    this.URL = place?.URL.valueOf() ?? "";
    this.description = place?.description.valueOf() ?? "";
  }
}

export class DataTravelTime {
  public ID: number;
  public fromPlaceID: number;
  public toPlaceID: number;
  public toPlaceIndex: number;
  public timeInMinutes: number;

  public constructor(travelTime?: TravelTime) {
    this.ID = travelTime?.ID.valueOf() ?? -1;
    this.fromPlaceID = travelTime?.fromPlaceID.valueOf() ?? -1;
    this.toPlaceID = travelTime?.toPlaceID.valueOf() ?? -1;
    this.toPlaceIndex = travelTime?.toPlaceIndex.valueOf() ?? -1;
    this.timeInMinutes = travelTime?.timeInMinutes.valueOf() ?? 0;
  }
}

export class DataDay {
  public ID: number;
  public tripID: number;
  public dayOf: number;
  public propPlaces: PropPlace[] = [];

  public constructor(day: Day) {
    this.ID = day.ID.valueOf();
    this.tripID = day.tripID.valueOf();
    this.dayOf = day.dayOf.valueOf();
    this.propPlaces = day.places.map((place, index) => {
      let travelTime: TravelTime | undefined = undefined;
      if (index > 0) {
        for (const tt of day.travelTime) {
          if (
            place.ID === tt.toPlaceID &&
            day.places[index - 1].ID === tt.fromPlaceID
          ) {
            travelTime = tt;
          }
        }
      }
      return new PropPlace(place, travelTime);
    });
  }

  public toDay(): Day {
    const ret = new Day();
    ret.ID = this.ID;
    ret.tripID = this.tripID;
    ret.dayOf = this.dayOf;
    ret.places = this.propPlaces.map((propPlace): Place => {
      const ret = new Place();
      ret.ID = propPlace.place.ID;
      ret.URL = propPlace.place.URL;
      ret.description = propPlace.place.description;
      ret.label = propPlace.place.label;
      return ret;
    });
    ret.travelTime = this.propPlaces
      .map((propPlace): TravelTime | undefined => {
        const travelTime = propPlace.travelTime;
        if (travelTime === undefined) {
          return undefined;
        }
        const ret = new TravelTime();
        ret.ID = travelTime.ID;
        ret.fromPlaceID = travelTime.fromPlaceID;
        ret.timeInMinutes = travelTime.timeInMinutes;
        ret.toPlaceID = travelTime.toPlaceID;
        ret.toPlaceIndex = travelTime.toPlaceIndex;
        return ret;
      })
      .filter((travelTime): travelTime is TravelTime => !!travelTime);
    return ret;
  }
}
