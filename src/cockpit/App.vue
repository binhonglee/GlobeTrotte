<template lang="pug">
#app
  n-loading-bar-provider
    el-menu.main_menu(
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#333"
      text-color="white"
      active-text-color="#42b983"
    )
      el-menu-item.main_menu_item(index="") Home
      el-submenu.main_menu_item(index="/trip")
        template.main_menu_item(#title) Trips
        el-menu-item.main_menu_item(index="/trip/search") Search
        el-menu-item.main_menu_item(
          v-if="confirmed" index="/trip/new"
        ) New
      el-menu-item.main_menu_item.login_button(
        v-if="!authed" index="/login"
      ) Login
      el-menu-item.main_menu_item.register_button(
        v-if="!authed" index="/register"
      ) Register
      el-menu-item.main_menu_item.myaccount_button(
        v-if="authed" index="/myaccount"
      ) My Account
    router-view#content.content
    #footerMargin
      #footer
</template>

<script lang="ts">
import General from "./shared/General";
import Routing from "./shared/Routing";
import { defineComponent } from "vue";
import { NLoadingBarProvider } from "naive-ui";

interface Data {
  activeIndex: string;
  authed: boolean;
  confirmed: boolean;
}

export default defineComponent({
  components: {
    NLoadingBarProvider,
  },
  data(): Data {
    return {
      activeIndex: "",
      authed: false,
      confirmed: false,
    };
  },
  watch: {
    $route: {
      handler: function (): void {
        this.setAuthed();
        this.setActiveIndex();
      },
      immediate: true,
      deep: true,
    },
  },
  beforeMount(): void {
    this.setAuthed();
    this.setActiveIndex();
  },
  methods: {
    beforeMount(): void {
      this.setAuthed();
      this.setActiveIndex();
    },
    setAuthed(): void {
      this.$data.authed = General.authSession();
      this.$data.confirmed = General.confirmed();
    },
    setActiveIndex(): void {
      let path = window.location.pathname;
      if (path.length < 2) {
        this.$data.activeIndex = "";
        return;
      }

      if (path.substring(path.length - 1).localeCompare("/") === 0) {
        path = path.slice(0, -1);
      }
      const paths = path.split("/");
      if (!isNaN(Number(paths[paths.length - 1]))) {
        path = path.slice(0, -1 * paths[paths.length - 1].length - 1);
      }
      this.$data.activeIndex = path;
    },
    handleSelect(key: string): void {
      let path = key;
      if (path === this.$data.activeIndex || path === null) {
        return;
      }
      Routing.genRedirectTo(`${path}`);
    },
  },
});
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

#footerMargin {
  height: 120px;
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
