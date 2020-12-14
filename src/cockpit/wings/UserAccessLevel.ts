// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_access_level.wings)
// and run the following command:
// plz build //src/wings/...

import { IWingsStruct } from 'wings-ts-util';
import AccessLevel from './AccessLevel';

// UserAccessLevel - User access level of a specific object.
export default class UserAccessLevel implements IWingsStruct {
  [key: string]: any;
  public objID: Number = 0;
  public userID: Number = 0;
  public access: AccessLevel = AccessLevel.None;

  public constructor(obj?: any) {
    if (obj) {
      this.objID = obj.obj_id !== undefined && obj.obj_id !== null ? obj.obj_id : 0;
      this.userID = obj.user_id !== undefined && obj.user_id !== null ? obj.user_id : 0;
      this.access = obj.access !== undefined && obj.access !== null ? obj.access : AccessLevel.None;
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'objID': {
        return 'obj_id';
      }
      case 'userID': {
        return 'user_id';
      }
      case 'access': {
        return 'access';
      }
      default: {
        return key;
      }
    }
  }
}
