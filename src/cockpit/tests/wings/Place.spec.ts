import Place from "@/wings/Place";

import { WingsStructUtil } from "wings-ts-util";
import test from "ava";

const place = new Place({
  id: 1,
  label: "Test Place Label",
  url: "https://globetrotte.com",
  description: "Test Place Description",
});
let reversedObj = new Place();

test("proper init()", (t) => {
  t.notThrows(() => {
    reversedObj = new Place(
      JSON.parse(WingsStructUtil.stringify(place)),
    );
  });
});

for (const key in place) {
  if (typeof key === "string") {
    test(key, (t) => {
      t.is(reversedObj[key], place[key]);
    });
  }
}
