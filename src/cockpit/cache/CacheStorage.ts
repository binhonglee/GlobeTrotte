import PWAUtils from "@/shared/PWAUtils";

export abstract class CacheStorage<T> {
  private order: number;
  private key: string;
  protected obj: string;

  public constructor(obj: Record<string, unknown>) {
    this.order = obj.order as number;
    this.key = obj.key as string;
    this.obj = obj.obj as string;
  }

  public static paramsToRecord(
    order: number,
    key: string,
    obj: string,
  ): Record<string, unknown> {
    return {
      order: order,
      key: key,
      obj: obj,
    };
  }

  public getOrder(): number {
    return this.order;
  }

  public getKey(): string {
    return this.key;
  }

  public incrementOrder(): number {
    this.order++;
    return this.order;
  }

  public abstract getObj(): T;
}

export function fromStorage<T, CS extends CacheStorage<T>>(
  cacheStorage: CacheStorageStatic<T, CS>,
  storage: unknown,
): CS[] | null {
  if (storage === null) {
    return null;
  }

  try {
    const objs = JSON.parse(storage as string);
    const toReturn: CS[] = [];
    for (const obj of objs) {
      toReturn.push(new cacheStorage(obj));
    }
    return toReturn;
  } catch (_) {
    return null;
  }
}

interface CacheStorageStatic<T, CS extends CacheStorage<T>> {
  new (obj: Record<string, unknown>): CS;
}

export class FetchedObj<T> {
  public fromStorage = false;
  public completed: T | null = null;
  public promise: Promise<T | null> | null = null;
}

interface FetchedObjStatic<T, FO extends FetchedObj<T>> {
  new (): FO;
}

export abstract class Cache<
  T,
  FO extends FetchedObj<T>,
  CS extends CacheStorage<T>,
> {
  protected abstract storage: CacheStorageName;
  protected abstract genFetch(key: string): Promise<T | null>;

  protected getStorage(): string | null {
    return localStorage.getItem(this.storage);
  }
  protected setStorage(value: unknown[]) {
    localStorage.setItem(this.storage, JSON.stringify(value));
  }

  protected async genObjImpl(
    fetchedObj: FetchedObjStatic<T, FO>,
    cacheStorage: CacheStorageStatic<T, CS>,
    key: string,
  ): Promise<FO> {
    const toReturn = new fetchedObj();
    if (PWAUtils.isPWA()) {
      const objs = fromStorage<T, CS>(cacheStorage, this.getStorage());

      if (objs !== null) {
        for (const username of objs) {
          if (username.getKey() === key) {
            toReturn.completed = username.getObj();
            toReturn.promise = this.genFetch(key);
            toReturn.fromStorage = true;
            return toReturn;
          }
        }
      }
    }

    toReturn.completed = await this.genFetch(key);
    toReturn.promise = null;
    return toReturn;
  }

  protected storeObj(
    fetchedObj: FetchedObjStatic<T, FO>,
    cacheStorage: CacheStorageStatic<T, CS>,
    key: string,
    value: string,
  ): void {
    let objs: CS[] | null;
    try {
      objs = fromStorage<T, CS>(cacheStorage, this.getStorage());
    } catch (_) {
      objs = null;
    }

    let highest = 0;
    if (objs !== null) {
      let toRemove = 0;
      let removeSelf = false;

      for (const [index, obj] of objs.entries()) {
        if (obj.getKey() === key) {
          toRemove = index;
          removeSelf = true;
          break;
        }

        if (obj.getOrder() > highest) {
          highest = obj.getOrder();
          toRemove = index;
        }

        obj.incrementOrder();
      }

      if (objs.length > 10 || removeSelf) {
        objs.splice(toRemove, 1);
      }
    } else {
      objs = [];
    }

    objs.push(
      new cacheStorage(CacheStorage.paramsToRecord(highest, value, key)),
    );
    this.setStorage(objs);
  }
}

export enum CacheStorageName {
  USER = "user",
  USERNAME = "username",
}
