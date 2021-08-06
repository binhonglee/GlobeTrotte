import { ElNotification, ElAlert, ElMessage } from "element-plus";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $notify: ElNotification;
    $alert: ElAlert;
    $message: ElMessage;
  }
}
