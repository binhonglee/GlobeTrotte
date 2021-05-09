type RefType = HTMLElement & any;

/*
 * E is short for Element so functions included here are loosely related to
 * vue / HTML elements.
 */

/*
 * Currently using any as replacement for Vue because
 * CreateComponentPublicInstance isn't exported.
 *
 * See: https://github.com/vuejs/vue-next/issues/2020
 */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
