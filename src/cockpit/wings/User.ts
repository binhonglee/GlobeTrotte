// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user.wings)
// and run the following command:
// plz build //src/wings/...

import { parseArray } from 'wings-ts-util';
import { IWingsStruct } from 'wings-ts-util';

// User - An individual registered user.
export default class User implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public name: String = '';
  public email: String = '';
  public bio: String = '';
  public timeCreated: Date = new Date();
  public trips: Number[] = [];
  public confirmed: Boolean = false;

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.email = obj.email !== undefined && obj.email !== null ? obj.email : '';
      this.bio = obj.bio !== undefined && obj.bio !== null ? obj.bio : '';
      this.timeCreated = obj.time_created !== undefined && obj.time_created !== null ? new Date(obj.time_created) : new Date();
      this.trips = obj.trips !== undefined && obj.trips !== null ? parseArray<Number>(Number, obj.trips) : [];
      this.confirmed = obj.confirmed !== undefined && obj.confirmed !== null ? obj.confirmed : false;
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
      case 'confirmed': {
        return 'confirmed';
      }
      default: {
        return key;
      }
    }
  }
}
