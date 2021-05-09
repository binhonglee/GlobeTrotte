declare module "element-plus-details" {
  type MessageType = "success" | "warning" | "info" | "error";
  interface ElNotificationOptions {
    message: string;
    title: string;
    type: MessageType;
    duration: number;
    offset: number;
  }
}
