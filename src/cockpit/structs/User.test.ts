import User from './User';

import { equal } from 'assert';
import { WingsStructUtil } from 'wings-ts-util';
import * as chai from 'chai';

const expect = chai.expect;

describe('WingsStructUtil.stringify(User) should include all values in User.', () => {
    const user = new User();
    user.init({
        id: 10000,
        name: 'Test User Name',
        email: 'testemail@email.com',
        bio: 'some words',
        time_created: new Date(),
        trips: null,
    });
    const reversedObj = new User();
    reversedObj.init(JSON.parse(WingsStructUtil.stringify(user)));

    for (const key in user) {
        if (typeof key === 'string') {
            it(key, () => {
                if (user[key] instanceof Date) {
                    expect(reversedObj[key].getTime()).equal(user[key].getTime());
                } else if (user[key] instanceof Array) {
                    // expect(JSON.parse(WingsStructUtil.stringify(user)).trips).equal(true);
                    expect(reversedObj[key] instanceof Array).equal(true);
                    expect(user[key].filter(
                        (item: any) => reversedObj[key].indexOf(item) < 0).length,
                    ).equal(0);
                } else {
                    expect(reversedObj[key]).equal(user[key]);
                }
            });
        }
    }
});
