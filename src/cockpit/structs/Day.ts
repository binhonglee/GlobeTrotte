/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/day.struct.wings
 */

import Place from './Place';
import { IWingsStruct } from 'wings-ts-util';

// Day - A day of a trip.
export default class Day implements IWingsStruct {
    [key: string]: any;
    public ID: number = -1;
    public tripID: number = -1;
    public dayOf: number = -1;
    public places: Place[] = [];

    public init(data: any): boolean {
        try {
            this.ID = data.id;
            this.tripID = data.trip_id;
            this.dayOf = data.day_of;

            if (data.places !== null) {
                this.places = data.places;
            }
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
            case 'tripID': {
                return 'trip_id';
            }
            case 'dayOf': {
                return 'day_of';
            }
            case 'places': {
                return 'places';
            }
            default: {
                return key;
            }
        }
    }
}
