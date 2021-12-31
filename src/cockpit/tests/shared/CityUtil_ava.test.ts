import test from "ava";
import City from "@/wings/City";
import { CityObj, CityUtil } from "@/shared/CityUtil";

for (const cityString in City) {
  if (Object.prototype.hasOwnProperty.call(City, cityString)) {
    const city = Number(cityString);
    if (!isNaN(city) && city !== City.UNKNOWN) {
      test(
        cityString +
          " - Every city should have conversion in CityUtil.toString().",
        (t) => {
          t.true(CityUtil.toString(city) !== "unrecognized city");
        },
      );
    }
  }
}

test("Non existent city (including UNKNOWN) should return 'unrecognized city", (t) => {
  const unsupported = 999999;
  t.is(CityUtil.toString(unsupported), "unrecognized city");
});

test("There should be the same amount of cities.", (t) => {
  const allCities: CityObj[] = CityUtil.sortedCityList();
  const cities: Set<number> = new Set<number>();

  for (const cityString in City) {
    if (Object.prototype.hasOwnProperty.call(City, cityString)) {
      const city = Number(cityString);
      if (!isNaN(city) && city !== City.UNKNOWN) {
        cities.add(city);
      }
    }
  }
  t.is(allCities.length, cities.size);
});
