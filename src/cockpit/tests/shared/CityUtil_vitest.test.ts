import { expect, test } from "vitest";
import City from "@/wings/City";
import { CityObj, CityUtil } from "@/shared/CityUtil";

for (const cityString in City) {
  if (Object.prototype.hasOwnProperty.call(City, cityString)) {
    const city = Number(cityString);
    if (!isNaN(city) && city !== City.UNKNOWN) {
      test(
        cityString +
          " - Every city should have conversion in CityUtil.toString().",
        () => {
          expect(CityUtil.toString(city) !== "Others").toBeTruthy();
        },
      );
    }
  }
}

test("Non existent city (including UNKNOWN) should return 'Others", () => {
  const unsupported = 999999;
  expect(CityUtil.toString(unsupported)).toEqual("Others");
});

test("There should be the same amount of cities.", () => {
  const allCities: CityObj[] = CityUtil.sortedCityList();
  const cities: Set<number> = new Set<number>();

  for (const cityString in City) {
    if (Object.prototype.hasOwnProperty.call(City, cityString)) {
      const city = Number(cityString);
      if (!isNaN(city)) {
        cities.add(city);
      }
    }
  }
  expect(allCities.length).toEqual(cities.size);
});
