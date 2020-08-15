<template lang="pug">
  .login
    h1.title Login
    .loginbox
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
      br
      el-button#save(type='primary' v-on:click='confirm') Confirm
      el-button#cancel(type='default' v-on:click='cancel') Cancel
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { WingsStructUtil } from "wings-ts-util";
import HTTPReq from "../shared/HTTPReq";
import NewUser from "../structs/NewUser";
import User from "../structs/User";

@Component({
  data() {
    return {
      email: "",
      password: "",
    };
  },
})
export default class VLogin extends Vue {
  private confirm(): void {
    const newUser = new NewUser();
    const user = new User();
    newUser.register({
      email: this.$data.email,
      password: this.$data.password,
    });

    HTTPReq.post(
      "login",
      WingsStructUtil.stringify(newUser),
      (returnedUser: string) => {
        user.init(JSON.parse(returnedUser));
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
@import "../shared/lib";

.loginbox {
  @include trip_display();
}

#cancel {
  @include right_col($p-height);
}

#save {
  @include left_col($p-height);
}
</style>
