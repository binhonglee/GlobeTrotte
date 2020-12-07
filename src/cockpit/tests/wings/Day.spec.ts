import Day from "../../wings/Day";
import Place from "../../wings/Place";

import { WingsStructUtil } from "wings-ts-util";
import test from "ava";

const day = new Day({
  id: 1,
  trip_id: 1010101001,
  day_of: 4,
  places: [],
});
let reversedObj = new Day();

test("proper init()", (t) => {
  t.notThrows(() => {
    reversedObj = new Day(
      JSON.parse(WingsStructUtil.stringify(day)),
    );
  });
});

for (const key in day) {
  if (typeof key === "string") {
    test(key, (t) => {
      if (day[key] instanceof Array) {
        t.true(reversedObj[key] instanceof Array);
        t.is(
          day[key].filter(
            (item: Place) =>
              reversedObj[key].indexOf(item) < 0,
          ).length,
          0,
        );
      } else {
        t.is(reversedObj[key], day[key]);
      }
    });
  }
}
