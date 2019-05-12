import NewUser from './NewUser';

import { equal } from 'assert';
import { WingsStructUtil } from 'wings-ts-util';
import * as chai from 'chai';

const expect = chai.expect;

describe('WingsStructUtil.stringify(NewUser) from init() should include all values in NewUser.', () => {
    const newUser = new NewUser();
    it('proper init()', () => {
        expect(
            newUser.init({
                id: 10000,
                name: 'Test NewUser Name',
                email: 'newtestemail@email.com',
                password: 'S0methingSom3th1ngSecr3tW0rd5',
            }),
        ).equal(true);
    });
    newUser.init({
        id: 10000,
        name: 'Test NewUser Name',
        email: 'newtestemail@email.com',
        password: 'S0methingSom3th1ngSecr3tW0rd5',
    });
    const reversedObj = new NewUser();
    reversedObj.init(JSON.parse(WingsStructUtil.stringify(newUser)));

    for (const key in newUser) {
        if (typeof key === 'string') {
            it(key, () => {
                expect(reversedObj[key]).equal(newUser[key]);
            });
        }
    }
});

describe('WingsStructUtil.stringify(NewUser) from register() should include all values in NewUser.', () => {
    const newUser = new NewUser();
    newUser.register({
        email: 'newtestemail@email.com',
        password: 'S0methingSom3th1ngSecr3tW0rd5',
    });
    const reversedObj = new NewUser();
    reversedObj.init(JSON.parse(WingsStructUtil.stringify(newUser)));

    for (const key in newUser) {
        if (typeof key === 'string') {
            it(key, () => {
                expect(reversedObj[key]).equal(newUser[key]);
            });
        }
    }
});
