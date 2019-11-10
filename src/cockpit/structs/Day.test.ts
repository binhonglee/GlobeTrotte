import Day from './Day';

import { equal } from 'assert';
import { WingsStructUtil } from 'wings-ts-util';
import { expect } from 'chai';

describe('WingsStructUtil.stringify(Day) from init() should include all values in Day.', () => {
    const day = new Day();
    const reversedObj = new Day();
    it('proper init()', () => {
        expect(
            day.init({
                id: 1,
                trip_id: 1010101001,
                day_of: 4,
                places: [],
            }),
        ).equal(true);
        reversedObj.init(JSON.parse(WingsStructUtil.stringify(day)));
    });


    for (const key in day) {
        if (typeof key === 'string') {
            it(key, () => {
                if (day[key] instanceof Array) {
                    expect(reversedObj[key] instanceof Array).equal(true);
                    expect(day[key].filter(
                        (item: any) => reversedObj[key].indexOf(item) < 0).length,
                    ).equal(0);
                } else {
                    expect(reversedObj[key]).equal(day[key]);
                }
            });
        }
    }
});
