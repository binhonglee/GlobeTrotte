import TripObj from "@/wings/TripObj";
import { WingsStructUtil } from "wings-ts-util";

export function sortTripsMostRecentlyUpdated(trips: TripObj[]): TripObj[] {
  return trips.sort((a: TripObj, b: TripObj) => {
    return b.lastUpdated.getTime() - a.lastUpdated.getTime();
  });
}

export function sameTrip(trip1: TripObj, trip2: TripObj): boolean {
  // User bio causes issue going in and out of localStorage. Setting it to
  // empty since we don't care about it for the trip.
  trip1.user.bio = "";
  trip2.user.bio = "";
  return WingsStructUtil.stringify(trip1) === WingsStructUtil.stringify(trip2);
}
