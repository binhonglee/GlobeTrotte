import { WingsStructUtil } from "wings-ts-util";
import Axios, { AxiosResponse } from "axios";
import HTTPReq from "./HTTPReq";
import User from "@/wings/User";
import Trip from "@/wings/Trip";

export default class General {
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
    if (!(await this.authSession)) {
      return new User();
    }

    const id = JSON.parse(
      await HTTPReq.genGET("whoami"),
    ).id;

    const user = await this.genUser(id);
    localStorage.setItem(
      "user",
      WingsStructUtil.stringify(user),
    );

    return user;
  }

  private static getCurrentUser(): User {
    const user = localStorage.getItem("user");
    if (user !== null) {
      return new User(JSON.parse(user));
    }

    return new User();
  }

  public static async authSession(): Promise<boolean> {
    let success = false;

    try {
      await Axios.get(HTTPReq.getURI("auth")).then(
        (loggedIn: AxiosResponse) => {
          success = loggedIn.status === 200;
        },
      );
    } catch (e) {
      success = false;
    }

    return success;
  }
}
