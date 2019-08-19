import { equal } from 'assert';
import { expect } from 'chai';
import City from './City';
import CityUtil from './CityUtil';

describe('Every city should have conversion in CityUtil.toString().', () => {
    for (const city in City) {
        if (typeof city === 'number' && city !== City.UNKNOWN) {
            it(city, () => {
                const cityEnum = parseInt(city, 10);
                expect(
                    CityUtil.toString(cityEnum) !== 'unrecognized city',
                ).equal(true);
            });
        }
    }
});

describe('Non existent city (including UNKNOWN) should return \'unrecognized city\'', () => {
    const unsupported: number = 999999;
    it(unsupported.toString(), () => {
        expect(CityUtil.toString(unsupported)).equal('unrecognized city');
    });
});
