import { ElNotification, ElMessageBox, ElMessage } from "element-plus";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $notify: ElNotification;
    $alert: ElMessageBox.alert;
    $message: ElMessage;
  }
}
