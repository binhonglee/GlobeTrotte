import sinon from "sinon";
import { mount, VueWrapper } from "@vue/test-utils";
// import { createLocalVue, MountOptions, Wrapper } from "@vue/test-utils";
import App from "@/App.vue";
import router from "@/router";
import ElementPlus from "element-plus";
import { ElNotification, ElAlert, ElMessage } from "element-plus";

type routerFunctions =
  | "replace"
  | "push"
  | "forward"
  | "options"
  | "app"
  | "mode"
  | "currentRoute"
  | "beforeEach"
  | "beforeResolve"
  | "afterEach"
  | "go"
  | "back"
  | "getMatchedComponents"
  | "onReady"
  | "onError"
  | "addRoutes"
  | "resolve";

interface ElPlus {
  $notify(args: unknown): typeof ElNotification;
  $alert(args: unknown): typeof ElAlert;
  $message(args: unknown): typeof ElMessage;
  $router(args: unknown): typeof router;
}

export type Vue = any & ElPlus;

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export class notifySpy {
  public item: sinon.SinonSpy = sinon.spy();
  public constructor(wrapper: VueWrapper<Vue>) {
    this.item = sinon.spy(wrapper.vm, "$notify");
  }

  public getTitle(call = 0): string | undefined {
    return this.item.args[call][0]["title"];
  }
  public getMessage(call = 0): string | undefined {
    return this.item.args[call][0]["message"];
  }
  public getType(call = 0): string | undefined {
    return this.item.args[call][0]["type"];
  }
  public async restore(): Promise<void> {
    await this.item.restore();
  }
}

export class alertSpy {
  public item: sinon.SinonSpy = sinon.spy();
  public constructor(wrapper: VueWrapper<Vue>) {
    this.item = sinon.spy(wrapper.vm, "$alert");
  }

  public getTitle(call = 0): string | undefined {
    return this.item.args[call][1];
  }
  public getMessage(call = 0): string | undefined {
    return this.item.args[call][0];
  }
  public getOptions(key: string, call = 0): string | undefined {
    return this.item.args[call][2][key];
  }
  public async restore(): Promise<void> {
    await this.item.restore();
  }
}

export class messageSpy {
  public item: sinon.SinonSpy = sinon.spy();
  public constructor(wrapper: VueWrapper<Vue>) {
    this.item = sinon.spy(wrapper.vm, "$message");
  }

  public getMessage(call = 0): string | undefined {
    return this.item.args[call][0]["message"];
  }
  public getType(call = 0): string | undefined {
    return this.item.args[call][0]["type"];
  }
  public async restore(): Promise<void> {
    await this.item.restore();
  }
}

export class routerSpy {
  public item: sinon.SinonSpy = sinon.spy();
  public constructor(wrapper: VueWrapper<Vue>, name: routerFunctions) {
    this.item = sinon.spy(wrapper.vm.$router, name);
  }

  public getArg(call = 0): unknown {
    return this.item.args[call][0];
  }

  public async restore(): Promise<void> {
    await this.item.restore();
  }
}

export function newLocalVueAndRouter(): VueWrapper<Vue> {
  return mount(App, {
    global: {
      plugins: [ElementPlus],
      mocks: {
        $router: router,
      },
    },
  });
}
