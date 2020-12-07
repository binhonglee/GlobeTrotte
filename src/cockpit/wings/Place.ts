// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/place.wings)
// and run the following command:
// plz build //src/wings/...

import { IWingsStruct } from 'wings-ts-util';

// One of many location for a Day (in a Trip).
export default class Place implements IWingsStruct {
  [key: string]: any;
  public ID: number = 0;
  public label: string = '';
  public URL: string = '';
  public description: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : 0;
      this.label = obj.label !== undefined && obj.label !== null ? obj.label : '';
      this.URL = obj.url !== undefined && obj.url !== null ? obj.url : '';
      this.description = obj.description !== undefined && obj.description !== null ? obj.description : '';
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'label': {
        return 'label';
      }
      case 'URL': {
        return 'url';
      }
      case 'description': {
        return 'description';
      }
      default: {
        return key;
      }
    }
  }
}
