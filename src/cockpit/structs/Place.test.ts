import Place from './Place';

import { equal } from 'assert';
import { WingsStructUtil } from 'wings-ts-util';
import { expect } from 'chai';

describe('WingsStructUtil.stringify(Place) from init() should include all values in Place.', () => {
    const place = new Place();
    const reversedObj = new Place();
    it('proper init()', () => {
        expect(
            place.init({
                id: 1,
                label: 'Test Place Label',
                url: 'https://globetrotte.com',
                description: 'Test Place Description',
            }),
        ).equal(true);
        reversedObj.init(JSON.parse(WingsStructUtil.stringify(place)));
    });


    for (const key in place) {
        if (typeof key === 'string') {
            it(key, () => {
                expect(reversedObj[key]).equal(place[key]);
            });
        }
    }
});
