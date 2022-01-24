import Day from "@/wings/Day";
import Place from "@/wings/Place";

import { WingsStructUtil } from "wings-ts-util";
import { expect, test } from "vitest";

const day = new Day({
  id: 1,
  trip_id: 1010101001,
  day_of: 4,
  places: [],
});
let reversedObj = new Day();

test("proper init()", () => {
  reversedObj = new Day(JSON.parse(WingsStructUtil.stringify(day)));
});

for (const key in day) {
  if (typeof key === "string") {
    test(key, () => {
      if (day[key] instanceof Array) {
        expect(reversedObj[key] instanceof Array).toBeTruthy();
        expect(
          day[key].filter((item: Place) => reversedObj[key].indexOf(item) < 0)
            .length,
        ).toEqual(0);
      } else {
        expect(reversedObj[key]).toEqual(day[key]);
      }
    });
  }
}
