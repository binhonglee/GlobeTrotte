/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/trip.struct.wings
 */

import City from '../enums/City';
import Day from './Day';
import { IWingsStruct } from 'wings-ts-util';

// Trip - All information of a single trip.
export default class Trip implements IWingsStruct {
    [key: string]: any;
    public ID: number = -1;
    public userID: number = -1;
    public name: string = '';
    public cities: City[] = [];
    public days: Day[] = [];
    public description: string = '';
    public timeCreated: Date = new Date();
    public lastUpdated: Date = new Date();

    public init(data: any): boolean {
        try {
            this.ID = data.id;
            this.userID = data.user_id;
            this.name = data.name;

            if (data.cities !== null) {
                this.cities = data.cities;
            }

            if (data.days !== null) {
                this.days = data.days;
            }
            this.description = data.description;
            this.timeCreated = new Date(data.time_created);
            this.lastUpdated = new Date(data.last_updated);
        } catch (e) {
            return false;
        }
        return true;
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
            default: {
                return key;
            }
        }
    }

    public parse(data: any): void {
        this.userID = data.user_id;
        this.cities = data.cities;
    }
}
