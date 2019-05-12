/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/user.struct
 */

import { IWingsStruct } from 'wings-ts-util';

export default class User implements IWingsStruct {
    [key: string]: any;
    public id: number = -1;
    public name: string = '';
    public email: string = '';
    public bio: string = '';
    public timeCreated: Date = new Date();
    public trips: number[] = [];

    public init(data: any): boolean {
        try {
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.bio = data.bio;
            this.timeCreated = new Date(data.time_created);

            if (data.trips !== null) {
                this.trips = data.trips;
            }
        } catch (e) {
            return false;
        }
        return true;
    }

    public toJsonKey(key: string): string {
        switch (key) {
            case 'id': {
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
