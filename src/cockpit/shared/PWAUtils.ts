export default class PWAUtils {
  public static isPWA(): boolean {
    switch (process.env.NODE_ENV) {
      case "production":
        return window.matchMedia("(display-mode: standalone)").matches;
      case "development":
        return true; // Change this to toggle PWA features on / off
    }
    return true;
  }
}
