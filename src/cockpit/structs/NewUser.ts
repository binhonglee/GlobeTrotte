/*
 * This is a generated file
 *
 * If you would like to make any changes, please edit the source file instead.
 * run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
 *
 * Source: src/wings/struct/new_user.struct
 */

import { IWingsStruct } from 'wings-ts-util';

// NewUser - Basic information for user registeration.
export default class NewUser implements IWingsStruct {
    [key: string]: any;
    public ID: number = -1;
    public name: string = '';
    public email: string = '';
    public password: string = '';

    public init(data: any): boolean {
        try {
            this.ID = data.id;
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
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
