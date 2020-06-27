// This is a generated file
//
// If you would like to make any changes, please edit the source file instead.
// run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
//
// Source: src/wings/struct/user.wings

import { IWingsStruct } from 'wings-ts-util';

// User - An individual registered user.
export default class User implements IWingsStruct {
  [key: string]: any;
  public ID: number = 0;
  public name: string = '';
  public email: string = '';
  public bio: string = '';
  public timeCreated: Date = new Date();
  public trips: number[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : 0;
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.email = obj.email !== undefined && obj.email !== null ? obj.email : '';
      this.bio = obj.bio !== undefined && obj.bio !== null ? obj.bio : '';
      this.timeCreated = obj.time_created !== undefined && obj.time_created !== null ? new Date(obj.time_created) : new Date();
      this.trips = obj.trips !== undefined && obj.trips !== null ? obj.trips : [];
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'name': {
        return 'name';
      }
      case 'email': {
        return 'email';
      }
      case 'bio': {
        return 'bio';
      }
      case 'timeCreated': {
        return 'time_created';
      }
      case 'trips': {
        return 'trips';
      }
      default: {
        return key;
      }
    }
  }
}
