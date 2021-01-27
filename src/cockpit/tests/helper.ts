import sinon from "sinon";
import { createLocalVue, MountOptions, Wrapper } from "@vue/test-utils";
import VueRouter from "vue-router";
import router from "@/router";

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

export async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export class notifySpy {
  public item: sinon.SinonSpy = sinon.spy();
  public constructor(wrapper: Wrapper<Vue>) {
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
  public constructor(wrapper: Wrapper<Vue>) {
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
  public constructor(wrapper: Wrapper<Vue>) {
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
  public constructor(wrapper: Wrapper<Vue>, name: routerFunctions) {
    this.item = sinon.spy(wrapper.vm.$router, name);
  }

  public getArg(call = 0): unknown {
    return this.item.args[call][0];
  }

  public async restore(): Promise<void> {
    await this.item.restore();
  }
}

export function newLocalVueAndRouter(): MountOptions<Vue> {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  return {
    localVue,
    router,
  };
}
