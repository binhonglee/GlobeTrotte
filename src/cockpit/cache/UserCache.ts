import HTTPReq from "@/shared/HTTPReq";
import PWAUtils from "@/shared/PWAUtils";
import UserObj from "@/wings/UserObj";
import { WingsStructUtil } from "wings-ts-util";
import { CacheKeyType, CacheStorage } from "./CacheStorage";

class UserStorage extends CacheStorage {
  public static create(order: number, obj: UserObj): UserStorage {
    return new UserStorage(
      CacheStorage.paramsToRecord(
        order,
        obj.ID.valueOf(),
        obj.details.username.valueOf(),
        WingsStructUtil.stringify(obj),
      ),
      CacheKeyType.Both,
    );
  }

  public static fromStorage(storage: unknown): UserStorage[] | null {
    if (storage === null) {
      return null;
    }

    try {
      const objs = JSON.parse(storage as string);
      const toReturn: UserStorage[] = [];
      for (const obj of objs) {
        toReturn.push(new UserStorage(obj, CacheKeyType.Both));
      }
      return toReturn;
    } catch (_) {
      return null;
    }
  }

  public static fromJSON(obj: Record<string, unknown>): UserStorage {
    return new UserStorage(obj, CacheKeyType.Both);
  }

  public getObj(): UserObj {
    return new UserObj(JSON.parse(this.obj));
  }
}

export class FetchedUserObj {
  public fromStorage = false;
  public completed: UserObj | undefined = undefined;
  public promise: Promise<UserObj> | null = null;
}

export class UserCache {
  public static async genUser(id: number): Promise<FetchedUserObj> {
    const toReturn = new FetchedUserObj();
    if (PWAUtils.isPWA()) {
      const users = UserStorage.fromStorage(localStorage.getItem("users"));

      if (users !== null) {
        for (const userStored of users) {
          if (userStored.getNumberKey() === id) {
            toReturn.completed = userStored.getObj();
            toReturn.promise = this.genFetchUser(id);
            toReturn.fromStorage = true;
          }
        }
      }
    } else {
      toReturn.completed = await this.genFetchUser(id);
      toReturn.promise = null;
    }

    return toReturn;
  }

  private static async genFetchUser(id: number): Promise<UserObj> {
    const user = await HTTPReq.genGET("v2/user/" + id);
    const userObj = new UserObj(user);

    if (!PWAUtils.isPWA()) {
      return userObj;
    }

    if (user !== "") {
      this.storeUser(userObj);
    }

    return userObj;
  }

  public static async genUserFromUsername(
    username: string,
  ): Promise<FetchedUserObj> {
    const toReturn = new FetchedUserObj();
    if (PWAUtils.isPWA()) {
      let users: UserStorage[] | null;
      try {
        users = UserStorage.fromStorage(localStorage.getItem("users"));
      } catch (e) {
        users = null;
      }

      if (users !== null) {
        for (const userStored of users) {
          if (userStored.getStringKey() === username) {
            toReturn.completed = userStored.getObj();
            toReturn.promise = this.genFetchUsername(username);
            toReturn.fromStorage = true;
            return toReturn;
          }
        }
      }
    }

    toReturn.completed = await this.genFetchUsername(username);
    toReturn.promise = null;
    return toReturn;
  }

  private static async genFetchUsername(username: string): Promise<UserObj> {
    const user = await HTTPReq.genGET("username/" + username);
    const userObj = new UserObj(user);

    if (!PWAUtils.isPWA()) {
      return userObj;
    }

    if (user !== "") {
      this.storeUser(userObj);
    }

    return userObj;
  }

  private static storeUser(user: UserObj): void {
    let users: UserStorage[] | null;
    try {
      users = UserStorage.fromStorage(localStorage.getItem("users"));
    } catch (_) {
      users = null;
    }

    let highest = 0;
    if (users !== null) {
      let toRemove = 0;
      let removeSelf = false;

      for (const [index, userStored] of users.entries()) {
        if (userStored.getNumberKey() === user.ID) {
          toRemove = index;
          removeSelf = true;
          break;
        }

        if (userStored.getOrder() > highest) {
          highest = userStored.getOrder();
          toRemove = index;
        }

        userStored.incrementOrder();
      }

      if (users.length > 10 || removeSelf) {
        users.splice(toRemove, 1);
      }
    } else {
      users = [];
    }

    users.push(UserStorage.create(highest, user));
    localStorage.setItem("users", JSON.stringify(users));
  }
}
