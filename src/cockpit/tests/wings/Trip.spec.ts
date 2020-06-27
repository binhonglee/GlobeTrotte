import Trip from '../../structs/Trip';
import Day from '../../structs/Day';
import City from '../../enums/City';

import { WingsStructUtil } from 'wings-ts-util';
import * as chai from 'chai';

const expect = chai.expect;

describe('<Trip> WingsStructUtil.stringify(Trip) should include all values in Trip.', () => {
  const trip = new Trip({
    id: 1,
    user_id: -1,
    name: 'Test Trip Name',
    cities: [City.KualaLumpurMY, City.SanJoseCAUS],
    days: [],
    description: 'Test Trip Description',
    time_created: new Date(),
    last_updated: new Date(),
  });

  const reversedObj = new Trip(
    JSON.parse(WingsStructUtil.stringify(trip)),
  );

  for (const key in trip) {
    if (typeof key === 'string') {
      it(key, () => {
        if (trip[key] instanceof Date) {
          expect(reversedObj[key].getTime()).equal(
            trip[key].getTime(),
          );
        } else if (trip[key] instanceof Array) {
          expect(reversedObj[key] instanceof Array).equal(
            true,
          );
          expect(
            trip[key].filter(
              (item: City | Day) =>
                reversedObj[key].indexOf(item) < 0,
            ).length,
          ).equal(0);
        } else if (
          WingsStructUtil.isIWingsStruct(reversedObj[key])
        ) {
          /* TODO: Fix this test. This isn't working and I don't
           *   understand why.
           *
           *   Log shows that `WingsStructUtil.isIWingsStruct(reversedObj[key])`
           *   always returns `false`.
           *
           *   Uncommented since this is an unreachable path. Might
           *   cause errors in the future if struct fields are added.
           */
          expect(
            WingsStructUtil.stringify(reversedObj[key]),
          ).equal(WingsStructUtil.stringify(trip[key]));
        } else {
          expect(reversedObj[key]).equal(trip[key]);
        }
      });
    }
  }
});
