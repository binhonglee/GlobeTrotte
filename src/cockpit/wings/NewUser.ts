// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/new_user.wings)
// and run the following command:
// plz build //src/wings/...

import { IWingsStruct } from 'wings-ts-util';

// Basic information for user registeration.
export default class NewUser implements IWingsStruct {
  [key: string]: any;
  public ID: number = 0;
  public name: string = '';
  public email: string = '';
  public password: string = '';

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : 0;
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.email = obj.email !== undefined && obj.email !== null ? obj.email : '';
      this.password = obj.password !== undefined && obj.password !== null ? obj.password : '';
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
      case 'password': {
        return 'password';
      }
      default: {
        return key;
      }
    }
  }

  public register(data: any): void {
    this.email = data.email;
    this.password = data.password;
  }
}
