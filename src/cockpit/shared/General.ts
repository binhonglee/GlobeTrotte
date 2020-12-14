import { WingsStructUtil } from "wings-ts-util";
import Axios, { AxiosResponse } from "axios";
import HTTPReq from "./HTTPReq";
import User from "@/wings/User";

export default class General {
  public static async genCurrentUser(): Promise<User> {
    if (!(await this.authSession)) {
      return new User();
    }

    const user = await HTTPReq.genGET(
      "user/" + this.getCurrentUser().ID,
    );
    localStorage.setItem(
      "user",
      WingsStructUtil.stringify(new User(user)),
    );

    return this.getCurrentUser();
  }

  public static getCurrentUser(): User {
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
