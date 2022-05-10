import HTTPReq from "@/shared/HTTPReq";
import PWAUtils from "@/shared/PWAUtils";
import {
  Cache,
  CacheStorage,
  CacheStorageName,
  FetchedObj,
} from "./CacheStorage";

class UsernameStorage extends CacheStorage<string> {
  public static fromJSON(obj: Record<string, unknown>): UsernameStorage {
    return new UsernameStorage(obj);
  }

  public getObj(): string {
    return this.obj;
  }
}

export class FetchedUsername extends FetchedObj<string> {}

export class UsernameCache extends Cache<
  string,
  FetchedUsername,
  UsernameStorage
> {
  protected storage = CacheStorageName.USERNAME;
  protected storeCount = 20;

  protected async genFetch(id: string): Promise<string | null> {
    const username = (await HTTPReq.genGET("v2/username/" + id)) as string;

    if (!PWAUtils.isPWA()) {
      return username;
    }

    if (username !== "") {
      this.storeObj(FetchedUsername, UsernameStorage, username, id);
      return username;
    }

    return null;
  }

  public static genObj(id: string): Promise<FetchedUsername> {
    return new UsernameCache().genObjImpl(FetchedUsername, UsernameStorage, id);
  }
}
