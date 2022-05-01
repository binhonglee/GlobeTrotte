import HTTPReq from "@/shared/HTTPReq";
import PWAUtils from "@/shared/PWAUtils";
import UserObj from "@/wings/UserObj";
import { WingsStructUtil } from "wings-ts-util";
import {
  Cache,
  CacheStorage,
  CacheStorageName,
  FetchedObj,
} from "./CacheStorage";

class UserStorage extends CacheStorage<UserObj> {
  public static fromJSON(obj: Record<string, unknown>): UserStorage {
    return new UserStorage(obj);
  }

  public getObj(): UserObj {
    return new UserObj(JSON.parse(this.obj));
  }
}

export class FetchedUserObj extends FetchedObj<UserObj> {}

export class UserCache extends Cache<UserObj, FetchedUserObj, UserStorage> {
  protected storage = CacheStorageName.USER;

  protected async genFetch(username: string): Promise<UserObj | null> {
    const user = await HTTPReq.genGET("username/" + username);
    const userObj = new UserObj(user);

    if (!PWAUtils.isPWA()) {
      return userObj;
    }

    if (user !== "") {
      this.storeObj(
        FetchedUserObj,
        UserStorage,
        WingsStructUtil.stringify(userObj),
        userObj.details.username.valueOf(),
      );
      return userObj;
    }

    return null;
  }

  public static genObj(username: string): Promise<FetchedUserObj> {
    return new UserCache().genObjImpl(FetchedUserObj, UserStorage, username);
  }
}
