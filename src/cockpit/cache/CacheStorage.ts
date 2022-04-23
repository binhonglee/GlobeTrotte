export enum CacheKeyType {
  NumberOnly,
  StringOnly,
  Both,
}

export class CacheStorage {
  private order: number;
  private numberKey: number;
  private stringKey: string;
  protected obj: string;
  private keyType: CacheKeyType;

  protected constructor(
    obj: Record<string, unknown>,
    keyType: CacheKeyType = CacheKeyType.NumberOnly,
  ) {
    this.order = obj.order as number;
    this.numberKey = obj.numberKey as number;
    this.stringKey = obj.stringKey as string;
    this.obj = obj.obj as string;
    this.keyType = keyType;
  }

  public static paramsToRecord(
    order: number,
    numberKey: number,
    stringKey: string,
    obj: string,
  ): Record<string, unknown> {
    return {
      order: order,
      numberKey: numberKey,
      stringKey: stringKey,
      obj: obj,
    };
  }

  public getOrder(): number {
    return this.order;
  }

  public getNumberKey(): number {
    return this.numberKey;
  }

  public getStringKey(): string {
    return this.stringKey;
  }

  public incrementOrder(): number {
    this.order++;
    return this.order;
  }

  // Please implement a proper function to get the object
  // public getObj(): ObjName;
}
