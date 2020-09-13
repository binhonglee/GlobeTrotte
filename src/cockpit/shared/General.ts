import Axios, { AxiosResponse } from "axios";
import HTTPReq from "./HTTPReq";
import User from "../wings/User";

export default class General {
  public static async genCurrentUser(): Promise<User> {
    return (await this.authSession())
      ? this.getCurrentUser()
      : new User();
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
