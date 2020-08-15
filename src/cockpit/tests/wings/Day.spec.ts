import Day from "../../structs/Day";
import Place from "../../structs/Place";

import { WingsStructUtil } from "wings-ts-util";
import { expect } from "chai";

describe("<Day> WingsStructUtil.stringify(Day) from init() should include all values in Day.", () => {
  const day = new Day({
    id: 1,
    trip_id: 1010101001,
    day_of: 4,
    places: [],
  });
  let reversedObj = new Day();

  it("proper init()", () => {
    reversedObj = new Day(
      JSON.parse(WingsStructUtil.stringify(day)),
    );
  });

  for (const key in day) {
    if (typeof key === "string") {
      it(key, () => {
        if (day[key] instanceof Array) {
          expect(reversedObj[key] instanceof Array).equal(
            true,
          );
          expect(
            day[key].filter(
              (item: Place) =>
                reversedObj[key].indexOf(item) < 0,
            ).length,
          ).equal(0);
        } else {
          expect(reversedObj[key]).equal(day[key]);
        }
      });
    }
  }
});
