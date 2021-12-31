import UserObj from "@/wings/UserObj";

import { WingsStructUtil } from "wings-ts-util";
import test from "ava";

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
    test(key, (t) => {
      if (user[key] instanceof Date) {
        t.is(reversedObj[key].getTime(), user[key].getTime());
      } else if (user[key] instanceof Array) {
        t.true(reversedObj[key] instanceof Array);
        t.is(
          user[key].filter((item: number) => reversedObj[key].indexOf(item) < 0)
            .length,
          0,
        );
      } else {
        t.is(reversedObj[key], user[key]);
      }
    });
  }
}
