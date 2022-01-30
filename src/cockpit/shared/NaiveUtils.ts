import { useDialog, useMessage, DialogOptions } from "naive-ui";
import { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider";
import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
export default class NaiveUtils {
  private static dialog: DialogApiInjection;
  private static message: MessageApiInjection;

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

  public static getMessage(): MessageApiInjection {
    return this.message;
  }
}
