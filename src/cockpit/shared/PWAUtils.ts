export default class PWAUtils {
  public static isPWA(): boolean {
    return (
      (process.env.NODE_ENV === "production" ||
        process.env.NODE_ENV === "development") &&
      window.matchMedia("(display-mode: standalone)").matches
    );
  }
}
