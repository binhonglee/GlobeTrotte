// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_basic.wings)
// and run the following command:
// plz build //src/wings/...

import { IWingsStruct } from 'wings-ts-util';

// Basic info of a user.
export default class UserBasic implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public username: String = '';
  public name: String = '';
  public bio: String = '';
  public link: String = '';
  public confirmed: Boolean = false;

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.username = obj.username !== undefined && obj.username !== null ? obj.username : '';
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.bio = obj.bio !== undefined && obj.bio !== null ? obj.bio : '';
      this.link = obj.link !== undefined && obj.link !== null ? obj.link : '';
      this.confirmed = obj.confirmed !== undefined && obj.confirmed !== null ? obj.confirmed : false;
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'username': {
        return 'username';
      }
      case 'name': {
        return 'name';
      }
      case 'bio': {
        return 'bio';
      }
      case 'link': {
        return 'link';
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
