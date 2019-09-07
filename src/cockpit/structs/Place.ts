/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/place.struct
 */

import { IWingsStruct } from 'wings-ts-util';

// Place - One of many location for a Trip.
export default class Place implements IWingsStruct {
    [key: string]: any;
    public label: string = '';
    public url: string = '';

    public init(data: any): boolean {
        try {
            this.label = data.label;
            this.url = data.url;
        } catch (e) {
            return false;
        }
        return true;
    }

    public toJsonKey(key: string): string {
        switch (key) {
            case 'label': {
                return 'label';
            }
            case 'url': {
                return 'url';
            }
            default: {
                return key;
            }
        }
    }
}
