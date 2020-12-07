import Trip from "../../wings/Trip";
import Day from "../../wings/Day";
import City from "../../wings/City";

import { WingsStructUtil } from "wings-ts-util";
import test from "ava";

const trip = new Trip({
  id: 1,
  user_id: -1,
  name: "Test Trip Name",
  cities: [City.KualaLumpurMY, City.SanJoseCAUS],
  days: [],
  description: "Test Trip Description",
  time_created: new Date(),
  last_updated: new Date(),
});

const reversedObj = new Trip(
  JSON.parse(WingsStructUtil.stringify(trip)),
);

for (const key in trip) {
  if (typeof key === "string") {
    test(key, (t) => {
      if (trip[key] instanceof Date) {
        t.is(
          reversedObj[key].getTime(),
          trip[key].getTime(),
        );
      } else if (trip[key] instanceof Array) {
        t.true(reversedObj[key] instanceof Array);
        t.is(
          trip[key].filter(
            (item: City | Day) =>
              reversedObj[key].indexOf(item) < 0,
          ).length,
          0,
        );
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
        t.is(
          WingsStructUtil.stringify(reversedObj[key]),
          WingsStructUtil.stringify(trip[key]),
        );
      } else {
        t.is(reversedObj[key], trip[key]);
      }
    });
  }
}
