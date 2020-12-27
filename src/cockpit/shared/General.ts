import {
  ElNotificationOptions,
  MessageType,
} from "element-ui";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "./HTTPReq";
import User from "@/wings/User";
import Trip from "@/wings/Trip";

export default class General {
  public static notifConfig(
    title: string,
    message: string,
    type: MessageType,
  ): ElNotificationOptions {
    return {
      message: message,
      title: title,
      type: type,
      duration: 2000,
      offset: 50,
    };
  }

  public static async genUser(id: number): Promise<User> {
    const user = await HTTPReq.genGET("user/" + id);
    return new User(user);
  }

  public static async genTrip(id: number): Promise<Trip> {
    const trip = await HTTPReq.genGET("trip/" + id);
    return new Trip(trip);
  }

  public static getIsCurrentUser(id: number): boolean {
    return this.getCurrentUser().ID === id;
  }

  public static async genCurrentUser(): Promise<User> {
    const id = JSON.parse(await HTTPReq.genGET("whoami"))
      .id;
    if (id === -1) {
      localStorage.clear();
    } else {
      localStorage.setItem(
        "user",
        WingsStructUtil.stringify(await this.genUser(id)),
      );
    }

    return this.getCurrentUser();
  }

  private static getCurrentUser(): User {
    const user = localStorage.getItem("user");
    if (user !== null) {
      return new User(JSON.parse(user));
    }

    return new User();
  }

  public static async authSession(): Promise<boolean> {
    return (await this.genCurrentUser()).ID !== -1;
  }
}
