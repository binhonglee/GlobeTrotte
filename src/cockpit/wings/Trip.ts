// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip.wings)
// and run the following command:
// plz build //src/wings/...

import UserAccessLevel from './UserAccessLevel';
import Day from './Day';
import { IWingsStruct } from 'wings-ts-util';
import City from './City';

// Trip - All information of a single trip.
export default class Trip implements IWingsStruct {
  [key: string]: any;
  public ID: number = 0;
  public userID: number = 0;
  public name: string = '';
  public cities: City[] = [];
  public days: Day[] = [];
  public description: string = '';
  public timeCreated: Date = new Date();
  public lastUpdated: Date = new Date();
  public private: boolean = false;
  public sharedWith: UserAccessLevel[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : 0;
      this.userID = obj.user_id !== undefined && obj.user_id !== null ? obj.user_id : 0;
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.cities = obj.cities !== undefined && obj.cities !== null ? obj.cities : [];
      this.days = obj.days !== undefined && obj.days !== null ? obj.days : [];
      this.description = obj.description !== undefined && obj.description !== null ? obj.description : '';
      this.timeCreated = obj.time_created !== undefined && obj.time_created !== null ? new Date(obj.time_created) : new Date();
      this.lastUpdated = obj.last_updated !== undefined && obj.last_updated !== null ? new Date(obj.last_updated) : new Date();
      this.private = obj.private !== undefined && obj.private !== null ? obj.private : false;
      this.sharedWith = obj.shared_with !== undefined && obj.shared_with !== null ? obj.shared_with : [];
    }
  }

  public toJsonKey(key: string): string {
    switch (key) {
      case 'ID': {
        return 'id';
      }
      case 'userID': {
        return 'user_id';
      }
      case 'name': {
        return 'name';
      }
      case 'cities': {
        return 'cities';
      }
      case 'days': {
        return 'days';
      }
      case 'description': {
        return 'description';
      }
      case 'timeCreated': {
        return 'time_created';
      }
      case 'lastUpdated': {
        return 'last_updated';
      }
      case 'private': {
        return 'private';
      }
      case 'sharedWith': {
        return 'shared_with';
      }
      default: {
        return key;
      }
    }
  }
}
