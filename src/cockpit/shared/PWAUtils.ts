import UserObj from "@/wings/UserObj";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "./HTTPReq";

class UserStorage {
  public order: number;
  public key: number;
  public username: string;
  public obj: string;

  public static create(order: number, obj: UserObj): UserStorage {
    const toReturn = new UserStorage();
    toReturn.order = order;
    toReturn.key = obj.ID;
    toReturn.username = obj.details.username;
    toReturn.obj = WingsStructUtil.stringify(obj);
    return toReturn;
  }

  public static fromStorage(storage: unknown): UserStorage[] | null {
    if (storage === null) {
      return null;
    }

    const objs = JSON.parse(storage);
    const toReturn: UserStorage[] = [];
    for (const obj of objs) {
      toReturn.push(this.fromJSON(obj));
    }
    return toReturn;
  }

  public static fromJSON(obj: Record<string, unknown>): UserStorage {
    const toReturn = new UserStorage();
    toReturn.order = obj.order;
    toReturn.key = obj.key;
    toReturn.username = obj.username;
    toReturn.obj = obj.obj;
    return toReturn;
  }

  public getObj(): UserObj {
    return new UserObj(JSON.parse(this.obj));
  }
}

export class FetchedUserObj {
  public fromStorage = false;
  public completed: UserObj;
  public promise: Promise<UserObj> | null;
}

export default class PWAUtils {
  public static isPWA(): boolean {
    return (
      (process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "development") &&
      window.matchMedia("(display-mode: standalone)").matches
    );
  }

  public static async genUser(id: number): Promise<FetchedUserObj> {
    const toReturn = new FetchedUserObj();
    if (this.isPWA()) {
      const users: UserStorage[] = UserStorage.fromStorage(
        localStorage.getItem("users"),
      );
      for (const userStored of users) {
        if (userStored.key === id) {
          toReturn.completed = userStored.getObj();
          toReturn.promise = this.genFetchUser(id);
          toReturn.fromStorage = true;
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

    if (!this.isPWA()) {
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
    if (this.isPWA()) {
      let users: UserStorage[] | null;
      try {
        users = UserStorage.fromStorage(localStorage.getItem("users"));
      } catch (e) {
        users = null;
      }

      if (users !== null) {
        for (const userStored of users) {
          if (userStored.username === username) {
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

    if (!this.isPWA()) {
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
        if (userStored.key === user.ID) {
          toRemove = index;
          removeSelf = true;
          break;
        }

        if (userStored.order > highest) {
          highest = userStored.order;
          toRemove = index;
        }

        userStored.order++;
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
