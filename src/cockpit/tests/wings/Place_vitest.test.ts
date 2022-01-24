import Place from "@/wings/Place";

import { WingsStructUtil } from "wings-ts-util";
import { expect, test } from "vitest";

const place = new Place({
  id: 1,
  label: "Test Place Label",
  url: "https://globetrotte.com",
  description: "Test Place Description",
});
let reversedObj = new Place();

test("proper init()", () => {
  reversedObj = new Place(JSON.parse(WingsStructUtil.stringify(place)));
});

for (const key in place) {
  if (typeof key === "string") {
    test(key, () => {
      expect(reversedObj[key]).toEqual(place[key]);
    });
  }
}
