import TripObj from "@/wings/TripObj";

export default class TripUtil {
  public static sortTripsMostRecentlyUpdated(trips: TripObj[]): TripObj[] {
    return trips.sort((a: TripObj, b: TripObj) => {
      return b.lastUpdated.getTime() - a.lastUpdated.getTime();
    });
  }
}
