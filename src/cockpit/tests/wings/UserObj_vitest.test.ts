import UserObj from "@/wings/UserObj";

import { WingsStructUtil } from "wings-ts-util";
import { expect, test } from "vitest";

const user = new UserObj({
  id: 10000,
  details: {
    id: 10000,
    name: "Test User Name",
    email: "testemail@email.com",
    bio: "some words",
  },
  time_created: new Date(),
  trips: null,
});
const reversedObj = new UserObj(JSON.parse(WingsStructUtil.stringify(user)));

for (const key in user.details) {
  if (typeof key === "string") {
    test(key, () => {
      if (user[key] instanceof Date) {
        expect(reversedObj[key].getTime()).toEqual(user[key].getTime());
      } else if (user[key] instanceof Array) {
        expect(reversedObj[key] instanceof Array).toBeTruthy();
        expect(
          user[key].filter((item: number) => reversedObj[key].indexOf(item) < 0)
            .length,
        ).toEqual(0);
      } else {
        expect(reversedObj[key]).toEqual(user[key]);
      }
    });
  }
}
