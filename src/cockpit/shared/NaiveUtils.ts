import {
  useDialog,
  useMessage,
  DialogOptions,
  MessageReactive,
  useNotification,
} from "naive-ui";
import { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
import {
  NotificationApiInjection,
  NotificationReactive,
} from "naive-ui/lib/notification/src/NotificationProvider";

export default class NaiveUtils {
  private static dialog: DialogApiInjection;
  private static message: MessageApiInjection;
  private static notify: NotificationApiInjection;

  private static shouldRun(): boolean {
    return (
      process.env.NODE_ENV === "production" ||
      process.env.NODE_ENV === "development"
    );
  }

  public static init(): void {
    if (this.shouldRun()) {
      this.dialog = useDialog();
      this.message = useMessage();
      this.notify = useNotification();
    }
  }

  public static dialogError(options: DialogOptions) {
    if (this.shouldRun()) {
      this.dialog.error(options);
    } else {
      // If we aren't showing the error dialog, we should just trigger the
      // positive click action directly.
      if (options.onPositiveClick !== undefined) {
        options.onPositiveClick(new MouseEvent("click"));
      }
    }
  }

  public static dialogWarning(options: DialogOptions) {
    if (this.shouldRun()) {
      this.dialog.warning(options);
    } else {
      // If we aren't showing the warning dialog, we should just trigger the
      // positive click action directly.
      if (options.onPositiveClick !== undefined) {
        options.onPositiveClick(new MouseEvent("click"));
      }
    }
  }

  public static messageError(message: string): MessageReactive | undefined {
    if (this.shouldRun()) {
      return this.message.error(message);
    }
  }

  public static messageInfo(message: string): MessageReactive | undefined {
    if (this.shouldRun()) {
      return this.message.info(message);
    }
  }

  public static messageLoading(message: string): MessageReactive | undefined {
    if (this.shouldRun()) {
      return this.message.loading(message);
    }
  }

  public static messageSuccess(message: string): MessageReactive | undefined {
    if (this.shouldRun()) {
      return this.message.success(message);
    }
  }

  public static notifyTrigger(
    title: string,
    message: string,
    type: NotifyType,
  ): NotificationReactive | undefined {
    console.log(this.shouldRun());
    console.log(this.notify);
    if (this.shouldRun()) {
      return this.notify[type]({
        content: title,
        meta: message,
        // duration: 2000,
      });
    }
  }
}

export enum NotifyType {
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
  SUCCESS = "success",
}
