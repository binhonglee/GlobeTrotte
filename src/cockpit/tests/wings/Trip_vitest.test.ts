import Trip from "@/wings/Trip";
import Day from "@/wings/Day";
import City from "@/wings/City";

import { WingsStructUtil } from "wings-ts-util";
import { expect, test } from "vitest";

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

const reversedObj = new Trip(JSON.parse(WingsStructUtil.stringify(trip)));

for (const key in trip) {
  if (typeof key === "string") {
    test(key, () => {
      if (trip[key] instanceof Date) {
        expect(reversedObj[key].getTime()).toEqual(trip[key].getTime());
      } else if (trip[key] instanceof Array) {
        expect(reversedObj[key] instanceof Array).toBeTruthy();
        expect(
          trip[key].filter(
            (item: City | Day) => reversedObj[key].indexOf(item) < 0,
          ).length,
        ).toEqual(0);
      } else if (WingsStructUtil.isIWingsStruct(reversedObj[key])) {
        /* TODO: Fix this test. This isn't working and I don't
         *   understand why.
         *
         *   Log shows that `WingsStructUtil.isIWingsStruct(reversedObj[key])`
         *   always returns `false`.
         *
         *   Uncommented since this is an unreachable path. Might
         *   cause errors in the future if struct fields are added.
         */
        expect(WingsStructUtil.stringify(reversedObj[key])).toEqual(
          WingsStructUtil.stringify(trip[key]),
        );
      } else {
        expect(reversedObj[key]).toEqual(trip[key]);
      }
    });
  }
}
