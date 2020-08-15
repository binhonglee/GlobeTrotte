import { expect } from "chai";
import City from "../../enums/City";
import { CityObj, CityUtil } from "../../shared/CityUtil";

describe("<CityUtil> Every city should have conversion in CityUtil.toString().", () => {
  for (const cityString in City) {
    if (
      Object.prototype.hasOwnProperty.call(City, cityString)
    ) {
      const city = Number(cityString);
      if (!isNaN(city) && city !== City.UNKNOWN) {
        it(cityString, () => {
          expect(
            CityUtil.toString(city) !== "unrecognized city",
          ).equal(true);
        });
      }
    }
  }
});

describe("<CityUtil> Non existent city (including UNKNOWN) should return 'unrecognized city'", () => {
  const unsupported = 999999;
  it(unsupported.toString(), () => {
    expect(CityUtil.toString(unsupported)).equal(
      "unrecognized city",
    );
  });
});

describe("<CityUtil> allActiveCities() should include all but UNKNOWN city.", () => {
  const allCities: CityObj[] = CityUtil.allActiveCities();
  const cities: Set<number> = new Set<number>();

  for (const cityString in City) {
    if (
      Object.prototype.hasOwnProperty.call(City, cityString)
    ) {
      const city = Number(cityString);
      if (!isNaN(city) && city !== City.UNKNOWN) {
        cities.add(city);
      }
    }
  }

  it("There should be the same amount of cities.", () => {
    expect(allCities.length).equal(cities.size);
  });
});
