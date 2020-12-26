<template lang="pug">
#app
  el-menu.main_menu(
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
    background-color="#333"
    text-color="white"
    active-text-color="#42b983"
  )
    el-menu-item.main_menu_item(index="/") Home
    el-submenu.main_menu_item(index="/trip")
      template.main_menu_item(slot="title") Trips
      el-menu-item.main_menu_item(index="/trip/view") View
      el-menu-item.main_menu_item(v-if="authed" index="/trip/new") New
    el-menu-item.main_menu_item.login_button(v-if="!authed" index="/login") Login
    el-menu-item.main_menu_item.register_button(v-if="!authed" index="/register") Register
    el-menu-item.main_menu_item.myaccount_button(v-if="authed" index="/myaccount") My Account
  router-view#content
  #footer
</template>

<script lang="ts">
import General from "./shared/General";

interface Data {
  activeIndex: string;
  authed: boolean;
}

export default {
  data(): Data {
    return {
      activeIndex: "/",
      authed: false,
    };
  },
  methods: {
    async beforeMount(): Promise<void> {
      await this.setAuthed();
      this.setActiveIndex();
    },
    async setAuthed(): Promise<void> {
      this.$data.authed = await General.authSession();
    },
    setActiveIndex(): void {
      let path = window.location.pathname;
      if (path.length < 2) {
        this.$data.activeIndex = "/";
        return;
      }

      if (
        path.substr(path.length - 1).localeCompare("/") === 0
      ) {
        path = path.slice(0, -1);
      }
      const paths = path.split("/");
      if (!isNaN(Number(paths[paths.length - 1]))) {
        path = path.slice(
          0,
          -1 * paths[paths.length - 1].length - 1,
        );
      }
      this.$data.activeIndex = path;
    },
    handleSelect(key: string): void {
      let path = key;
      if (
        path === this.$data.activeIndex ||
        path === null
      ) {
        return;
      }
      this.$router.push({ path: `${path}` });
    },
  },
  watch: {
    $route: {
      handler: async function (): Promise<void> {
        await this.setAuthed();
        this.setActiveIndex();
      },
      immediate: true,
      deep: true,
    }
  }
};
</script>

<style lang="scss">
@import "./shared/general";

#app {
  position: relative;
  min-height: 100vh;
  text-align: center;

  .login_button,
  .myaccount_button,
  .register_button {
    float: right;
  }
}

#footer {
  display: inline-block;
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 40px;
  width: 100%;
  background-color: #333;
  // color: white;
}

#footerMessage {
  margin: 0px;
  margin-top: 10px;

  a {
    color: #42b983;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
}
</style>
