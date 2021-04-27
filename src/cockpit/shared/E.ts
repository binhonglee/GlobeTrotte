type RefType = HTMLElement & Vue;

/*
 * E is short for Element so functions included here are loosely related to
 * vue / HTML elements.
 */
export default class E {
  public static getVal(v: Vue, name: string): string {
    return (v.$refs[name] as HTMLInputElement).value;
  }

  public static getEl(v: Vue, name: string, index: number): RefType {
    return (v.$refs[name] as RefType[])[index];
  }

  public static get(v: Vue, name: string): RefType {
    return v.$refs[name] as RefType;
  }
}
