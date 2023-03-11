import HTTPReq from "@/shared/HTTPReq";
import PWAUtils from "@/shared/PWAUtils";
import TripObj from "@/wings/TripObj";
import { WingsStructUtil } from "wings-ts-util";
import {
  Cache,
  CacheStorage,
  CacheStorageName,
  FetchedObj,
} from "./CacheStorage";

class TripStorage extends CacheStorage<TripObj> {
  public static fromJSON(obj: Record<string, unknown>): TripStorage {
    return new TripStorage(obj);
  }

  protected getObjImpl(obj: string): TripObj {
    return new TripObj(JSON.parse(obj));
  }
}

export class FetchedTripObj extends FetchedObj<TripObj> {}

export class TripCache extends Cache<TripObj, FetchedTripObj, TripStorage> {
  protected storage: CacheStorageName = "trip";
  protected storeCount = 10;

  protected async genFetch(id: string): Promise<TripObj | null> {
    const tripObj = await genFetchServerTrip(id);

    if (!PWAUtils.isPWA()) {
      return tripObj;
    }

    if (tripObj.ID !== -1) {
      this.storeObj(
        FetchedTripObj,
        TripStorage,
        tripObj.ID.toString(),
        WingsStructUtil.stringify(tripObj, true),
      );
      return tripObj;
    }

    return null;
  }

  public static genObj(id: string): Promise<FetchedTripObj> {
    return new TripCache().genObjImpl(FetchedTripObj, TripStorage, id);
  }
}

export async function genFetchServerTrip(id: string): Promise<TripObj> {
  const trip = await HTTPReq.genGET("v2/trip/" + id);
  return new TripObj(trip);
}
