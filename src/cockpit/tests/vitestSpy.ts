import { VueWrapper } from "@vue/test-utils";
import { MockContext, SpyInstance, vi } from "vitest";
import { routerFunctions, Vue } from "./helper";
import router from "@/router";

abstract class spyInterface {
  protected abstract item: SpyInstance;

  public called(call = 0): boolean {
    if (call === 0) {
      return this.item.mock.calls.length > 0;
    }
    return this.item.mock.calls.length === call;
  }

  public calledOnce(): boolean {
    return this.item.mock.calls.length === 1;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getMock(): MockContext<any[]> {
    return this.item.mock;
  }

  public getItem(): SpyInstance {
    return this.item;
  }

  public args(): unknown[][] {
    return this.item.mock.calls;
  }

  public async restore(): Promise<void> {
    return this.item.mockRestore();
  }
}

export class routerSpy extends spyInterface {
  protected item: SpyInstance;
  public constructor(wrapper: VueWrapper<Vue>, name: routerFunctions) {
    super();
    this.item = vi.spyOn(router, name);
  }

  public getArg(call = 0): unknown {
    return this.item.mock.calls[call][0];
  }
}

export function stub(item: SpyInstance) {
  return new SpyInstanceWrapper(item);
}

export class SpyInstanceWrapper extends spyInterface {
  protected item: SpyInstance;
  public constructor(item: SpyInstance) {
    super();
    this.item = item;
  }

  public callsFake<TArgs, TReturns>(
    fn: ((...args: TArgs[]) => TReturns) | (() => Promise<TReturns>),
  ): SpyInstanceWrapper {
    this.item.mockImplementation(fn);
    return this;
  }

  public resolves(resolution: unknown): SpyInstanceWrapper {
    this.item.mockResolvedValue(resolution);
    return this;
  }

  public returns(result: unknown): SpyInstanceWrapper {
    this.item.mockReturnValue(result);
    return this;
  }
}
