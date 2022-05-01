export default class PWAUtils {
  public static isPWA(): boolean {
    return true;
    // return (
    //   (process.env.NODE_ENV === "production" ||
    //     process.env.NODE_ENV === "development") &&
    //   window.matchMedia("(display-mode: standalone)").matches
    // );
  }
}
