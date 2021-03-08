/*
 * E is short for Element so functions included here are loosely related to
 * vue / HTML elements.
 */

type RefType = HTMLElement & Vue;

export default class E {
  public static getVal(v: Vue, name: string): string {
    return (v.$refs[name] as HTMLInputElement).value;
  }

  public static get(v: Vue, name: string): RefType {
    return v.$refs[name] as RefType;
  }
}
