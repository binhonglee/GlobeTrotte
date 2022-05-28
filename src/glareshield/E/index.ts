/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

type RefType = HTMLElement & any;

export default class E {
  public static getVal(v: any, name: string): string {
    return (v.$refs[name] as HTMLInputElement).value;
  }

  public static getEl(v: any, name: string, index: number): RefType {
    return (v.$refs[name] as RefType[])[index];
  }

  public static get(v: any, name: string): RefType {
    return v.$refs[name] as RefType;
  }
}
