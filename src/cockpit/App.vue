<template lang="pug">
#app(:class="darkMode ? 'dark_mode' : ''")
  n-config-provider(:theme="darkTheme")
    .main_menu.dark_mode()
      n-menu.navBarLeftMenu(
        mode="horizontal"
        v-model:value="activeIndex"
        :options="leftMenuOptions"
      )
      n-menu.navBarRightMenu(
        mode="horizontal"
        v-model:value="activeIndex"
        :options="rightMenuOptions"
      )
  n-config-provider(:theme="darkMode ? darkTheme : lightTheme")
    n-divider(class="navBarBorder")
    n-loading-bar-provider
      n-dialog-provider
        n-message-provider
          router-view#content.content
          #footerMargin
            #footer
</template>

<script lang="ts">
import General from "./shared/General";
import Routing from "./shared/Routing";
import { defineComponent, h } from "vue";
import {
  lightTheme,
  darkTheme,
  MenuInst,
  MenuOption,
  NConfigProvider,
  NDialogProvider,
  NDivider,
  NLoadingBarProvider,
  NMenu,
  NMessageProvider,
} from "naive-ui";
import { BuiltInGlobalTheme } from "naive-ui/lib/themes/interface";

interface Data {
  activeIndex: string;
  authed: boolean;
  confirmed: boolean;
  darkTheme: BuiltInGlobalTheme;
  lightTheme: BuiltInGlobalTheme;
  darkMode: boolean;
  menuRef: MenuInst | null;
  leftMenuOptions: MenuOption[];
  rightMenuOptions: MenuOption[];
}

const options: MenuOption[] = [
  menuItem("Home", "/"),
  {
    label: "Trip",
    children: [
      menuItem("Search", "/trip/search"),
      menuItem("New", "/trip/new"),
    ],
  },
];

const loggedOutOptions: MenuOption[] = [
  menuItem("Login", "/login"),
  menuItem("Register", "/register"),
];

const loggedInOptions: MenuOption[] = [menuItem("My Account", "/myaccount")];

function menuItem(label: string, url: string): MenuOption {
  return {
    label: () => h("a", { href: url }, label),
    key: url,
    props: { class: "some_class" },
  };
}

export default defineComponent({
  components: {
    NConfigProvider,
    NDialogProvider,
    NDivider,
    NLoadingBarProvider,
    NMenu,
    NMessageProvider,
  },
  data(): Data {
    return {
      activeIndex: "/",
      authed: false,
      confirmed: false,
      darkTheme: darkTheme,
      lightTheme: lightTheme,
      darkMode: false,
      menuRef: null,
      leftMenuOptions: options,
      rightMenuOptions: [],
    };
  },
  watch: {
    $route: {
      handler: function (): void {
        this.onLoad();
      },
      immediate: true,
      deep: false,
    },
  },
  beforeMount(): void {
    this.onLoad();
  },
  methods: {
    onLoad(): void {
      this.setAuthed();
      this.setActiveIndex();
      this.$data.rightMenuOptions = this.$data.authed
        ? loggedInOptions
        : loggedOutOptions;
    },
    setAuthed(): void {
      this.$data.authed = General.authSession();
      this.$data.confirmed = General.confirmed();
    },
    setActiveIndex(): void {
      let path = window.location.pathname;
      if (path.length < 2) {
        this.$data.activeIndex = "/";
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

<style>
@import "./shared/general.css";

#app {
  position: relative;
  min-height: 100vh;
  text-align: center;
}

.main_menu {
  width: 100%;
  text-align: left;
}

#app .navBarBorder {
  margin: 0;
}

.navBarRightMenu {
  float: right;
}

#app .login_button,
#app .myaccount_button,
#app .register_button {
  float: right;
}

#footer {
  display: inline-block;
  position: absolute;
  left: 0px;
  bottom: 0px;
  height: 40px;
  width: 100%;
  background-color: #333;
  /* color: white; */
}

#footerMargin {
  height: 120px;
}

#footerMessage {
  margin: 0px;
  margin-top: 10px;
}

#footerMessage a {
  color: #42b983;
  text-decoration: none;
}

#footerMessage a:hover {
  text-decoration: underline;
}
</style>
