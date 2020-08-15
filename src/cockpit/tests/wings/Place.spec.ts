import Place from "../../structs/Place";

import { WingsStructUtil } from "wings-ts-util";
import { expect } from "chai";

describe("<Place> WingsStructUtil.stringify(Place) from init() should include all values in Place.", () => {
  const place = new Place({
    id: 1,
    label: "Test Place Label",
    url: "https://globetrotte.com",
    description: "Test Place Description",
  });
  let reversedObj = new Place();
  it("proper init()", () => {
    reversedObj = new Place(
      JSON.parse(WingsStructUtil.stringify(place)),
    );
  });

  for (const key in place) {
    if (typeof key === "string") {
      it(key, () => {
        expect(reversedObj[key]).equal(place[key]);
      });
    }
  }
});
