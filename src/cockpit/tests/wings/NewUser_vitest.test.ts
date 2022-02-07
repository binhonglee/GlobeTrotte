import NewUser from "@/wings/NewUser";

import { WingsStructUtil } from "wings-ts-util";
import { expect, test } from "vitest";

const newUser = new NewUser({
  id: 10000,
  username: "someusername",
  name: "Test NewUser Name",
  email: "newtestemail@email.com",
  password: "S0methingSom3th1ngSecr3tW0rd5",
});
let reversedObj = new NewUser();
test("proper init()", () => {
  reversedObj = new NewUser(JSON.parse(WingsStructUtil.stringify(newUser)));
});

for (const key in newUser) {
  if (typeof key === "string") {
    test(key + " from init", () => {
      expect(reversedObj[key]).toEqual(newUser[key]);
    });
  }
}

const newRegistration = new NewUser({
  name: "New name",
  username: "someusername",
  email: "newtestemail@email.com",
  password: "S0methingSom3th1ngSecr3tW0rd5",
});
const reversedReg = new NewUser(
  JSON.parse(WingsStructUtil.stringify(newRegistration)),
);

for (const key in newRegistration) {
  if (typeof key === "string") {
    test(key + " from register()", () => {
      expect(reversedReg[key]).toEqual(newRegistration[key]);
    });
  }
}
