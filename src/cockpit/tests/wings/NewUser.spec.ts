import NewUser from '../../structs/NewUser';

import { WingsStructUtil } from 'wings-ts-util';
import { expect } from 'chai';

describe('<NewUser> WingsStructUtil.stringify(NewUser) from init() should include all values in NewUser.', () => {
  const newUser = new NewUser({
    id: 10000,
    name: 'Test NewUser Name',
    email: 'newtestemail@email.com',
    password: 'S0methingSom3th1ngSecr3tW0rd5',
  });
  let reversedObj = new NewUser();
  it('proper init()', () => {
    reversedObj = new NewUser(
      JSON.parse(WingsStructUtil.stringify(newUser)),
    );
  });

  for (const key in newUser) {
    if (typeof key === 'string') {
      it(key, () => {
        expect(reversedObj[key]).equal(newUser[key]);
      });
    }
  }
});

describe('<NewUser> WingsStructUtil.stringify(NewUser) from register() should include all values in NewUser.', () => {
  const newUser = new NewUser();
  newUser.register({
    email: 'newtestemail@email.com',
    password: 'S0methingSom3th1ngSecr3tW0rd5',
  });
  const reversedObj = new NewUser(
    JSON.parse(WingsStructUtil.stringify(newUser)),
  );

  for (const key in newUser) {
    if (typeof key === 'string') {
      it(key, () => {
        expect(reversedObj[key]).equal(newUser[key]);
      });
    }
  }
});
