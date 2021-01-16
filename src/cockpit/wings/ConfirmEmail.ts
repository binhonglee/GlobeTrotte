// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/confirm_email.wings)
// and run the following command:
// plz build //src/wings/...

import { IWingsStruct } from 'wings-ts-util';

// Email confirmation object.
export default class ConfirmEmail implements IWingsStruct {
  [key: string]: any;
  public uuid: String = '';
  public email: String = '';
  public userid: Number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.uuid = obj.uuid !== undefined && obj.uuid !== null ? obj.uuid : '';
      this.email = obj.email !== undefined && obj.email !== null ? obj.email : '';
      this.userid = obj.userid !== undefined && obj.userid !== null ? obj.userid : 0;
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'uuid': {
        return 'uuid';
      }
      case 'email': {
        return 'email';
      }
      case 'userid': {
        return 'userid';
      }
      default: {
        return key;
      }
    }
  }
}
