import { equal } from 'assert';
import { expect } from 'chai';
import City from './City';
import CityUtil from './CityUtil';

describe('Every city should have conversion in CityUtil.toString().', () => {
    for (const cityString in City) {
        if (City.hasOwnProperty(cityString)) {
            const city = Number(cityString);
            if ((!isNaN(city)) && city !== City.UNKNOWN) {
                it(cityString, () => {
                    expect(
                        CityUtil.toString(city) !== 'unrecognized city',
                    ).equal(true);
                });
            }
        }
    }
});

describe('Non existent city (including UNKNOWN) should return \'unrecognized city\'', () => {
    const unsupported: number = 999999;
    it(unsupported.toString(), () => {
        expect(CityUtil.toString(unsupported)).equal('unrecognized city');
    });
});

describe('allActiveCities() should include all but UNKNOWN city.', () => {
    const allCities: any[] = CityUtil.allActiveCities();
    const cities: Set<number> = new Set<number>();

    for (const cityString in City) {
        if (City.hasOwnProperty(cityString)) {
            const city = Number(cityString);
            if ((!isNaN(city)) && city !== City.UNKNOWN) {
                cities.add(city);
            }
        }
    }

    it('There should be the same amount of cities.', () => {
        expect(allCities.length).equal(cities.size);
    });
});
