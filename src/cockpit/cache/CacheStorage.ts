import PWAUtils from "@/shared/PWAUtils";
import { stringEscape, stringUnescape } from "wings-ts-util";

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

  public getObj(): T {
    const str = stringUnescape(this.obj).replaceAll("\\'", "'");
    return this.getObjImpl(str);
  }

  protected abstract getObjImpl(obj: string): T;
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
  protected abstract storeCount: number;
  protected abstract genFetch(key: string): Promise<T | null>;

  protected getStorage(): string | null {
    // localStorage.setItem(this.storage, null);
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
      console.log(objs);

      if (objs !== null) {
        for (const username of objs) {
          console.log(username);
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
      const toRemove: number[] = [];

      for (const [index, obj] of objs.entries()) {
        if (obj.getKey() === key) {
          toRemove.push(index);
        } else if (obj.getOrder() > highest) {
          highest = obj.getOrder();
          toRemove.push(index);
        }

        obj.incrementOrder();
      }

      for (const index of toRemove) {
        if (objs.length === 1) {
          objs = [];
        }
        objs.splice(index, 1);
      }
    } else {
      objs = [];
    }

    objs.push(
      new cacheStorage(
        CacheStorage.paramsToRecord(highest, key, stringEscape(value)),
      ),
    );
    this.setStorage(objs);
  }
}

export enum CacheStorageName {
  TRIP = "trip",
  USER = "user",
  USERNAME = "username",
}
