// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/trip_basic.wings)
// and run the following command:
// plz build //src/wings/...

import Day from './Day';
import { parseArray } from 'wings-ts-util';
import UserAccessLevel from './UserAccessLevel';
import { IWingsStruct } from 'wings-ts-util';
import City from './City';

// Only core information of a trip.
export default class TripBasic implements IWingsStruct {
  [key: string]: any;
  public ID: Number = -1;
  public name: String = '';
  public cities: City[] = [];
  public days: Day[] = [];
  public description: String = '';
  public private: Boolean = true;
  public sharedWith: UserAccessLevel[] = [];

  public constructor(obj?: any) {
    if (obj) {
      this.ID = obj.id !== undefined && obj.id !== null ? obj.id : -1;
      this.name = obj.name !== undefined && obj.name !== null ? obj.name : '';
      this.cities = obj.cities !== undefined && obj.cities !== null ? parseArray<City>(City, obj.cities) : [];
      this.days = obj.days !== undefined && obj.days !== null ? parseArray<Day>(Day, obj.days) : [];
      this.description = obj.description !== undefined && obj.description !== null ? obj.description : '';
      this.private = obj.private !== undefined && obj.private !== null ? obj.private : true;
      this.sharedWith = obj.shared_with !== undefined && obj.shared_with !== null ? parseArray<UserAccessLevel>(UserAccessLevel, obj.shared_with) : [];
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
      case 'cities': {
        return 'cities';
      }
      case 'days': {
        return 'days';
      }
      case 'description': {
        return 'description';
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
