<template lang="pug">
  .new_user
    h1.title Create Account
    .newUser
      span.editLabel Email:
      el-input.editInput#username(
        type='text'
        v-on:keyup.enter='save'
        v-model='email'
      )
      br
      span.editLabel Password:
      el-input.editInput#password(
        type='text'
        v-on:keyup.enter='save'
        v-model='password'
        show-password
      )
      br
      span.editLabel Confirm Password:
      el-input.editInput#confPassword(
        type='text'
        v-on:keyup.enter='save'
        v-model='confPassword'
        show-password
      )
      br
      br
      el-button#save(type='primary' v-on:click='confirm') Confirm
      el-button#cancel(type='default' v-on:click='cancel') Cancel
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { WingsStructUtil } from 'wings-ts-util';
import HTTPReq from '../shared/HTTPReq';
import NewUser from '../structs/NewUser';
import User from '../structs/User';

@Component({
  data() {
    return {
      email: '',
      password: '',
      confPassword: '',
    };
  },
})
export default class VRegsiter extends Vue {
  private confirm(): void {
    if (
      this.$data.password.localeCompare(
        this.$data.confPassword,
      )
    ) {
      alert('Password does not match.');
      return;
    }

    const newUser = new NewUser();
    let user = new User();
    newUser.register({
      email: this.$data.email,
      password: this.$data.password,
    });

    HTTPReq.post(
      'user',
      WingsStructUtil.stringify(newUser),
      (returnedUser: string) => {
        user = new User(JSON.parse(returnedUser));
        console.log(user);
        // console.log(JSON.parse(returnedUser));
      },
    );
  }

  private cancel(): void {
    this.$router.back();
  }
}
</script>

<style lang="scss">
@import '../shared/lib';

.newUser {
  @include trip_display();
}

#cancel {
  @include right_col($p-height);
}

#save {
  @include left_col($p-height);
}
</style>
