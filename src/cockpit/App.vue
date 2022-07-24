<template lang="pug">
#app(:class="darkMode ? 'dark_mode' : ''")
  n-config-provider(:theme="darkTheme")
    .main_menu.dark_mode()
      n-menu.navBarLeftMenu(
        mode="horizontal"
        v-model:value="activeIndex"
        :options="leftMenuOptions"
      )
      br.navBarNewLine
      n-menu.navBarRightMenu(
        mode="horizontal"
        v-model:value="activeIndex"
        :options="rightMenuOptions"
      )
  n-config-provider(:theme="darkMode ? darkTheme : lightTheme")
    CPWA
    n-divider(class="navBarBorder")
    n-loading-bar-provider
      n-dialog-provider
        n-message-provider
          n-notification-provider
            router-view#content.content
            #footerMargin
              #footer
</template>

<script lang="ts">
import General from "./shared/General";
import Routing from "./shared/Routing";
import CPWA from "./components/CPWA.vue";
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
  NNotificationProvider,
  NSwitch,
  NIcon,
} from "naive-ui";
import { MoonOutline, SunnyOutline } from "@vicons/ionicons5";
import { BuiltInGlobalTheme } from "naive-ui/lib/themes/interface";
import Routes from "./routes";
import router from "./router";

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
    label: "Trip \u25BE",
    key: "trip",
    children: [
      menuItem("Search", Routes.trip_Search),
      menuItem("New", Routes.trip_New),
    ],
  },
];

const loggedOutOptions: MenuOption[] = [
  menuItem("Login", Routes.Login),
  menuItem("Register", Routes.Register),
];

function menuItem(label: string, url: string): MenuOption {
  return {
    label: () => h("a", { href: url }, label),
    key: url,
    props: { class: "some_class" },
  };
}

export default defineComponent({
  components: {
    CPWA,
    NConfigProvider,
    NDialogProvider,
    NDivider,
    NLoadingBarProvider,
    NMenu,
    NMessageProvider,
    NNotificationProvider,
    NSwitch,
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
      this.setTheme();
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
    async setTheme(): Promise<void> {
      this.$data.darkMode = localStorage.getItem("theme") === "dark";
      const themeSwtich: MenuOption[] = [
        {
          label: () =>
            h(
              NSwitch,
              {
                "onUpdate:value": (value: boolean) => {
                  localStorage.setItem("theme", value ? "dark" : "light");
                  // Text in CTripPreviewCard color is broken if update in place.
                  // this.$data.darkMode = value;
                  router.go(0);
                },
                defaultValue: this.$data.darkMode,
              },
              {
                "checked-icon": () =>
                  h(NIcon, null, {
                    default: () => h(MoonOutline),
                  }),
                checked: () => "Dark mode",
                "unchecked-icon": () =>
                  h(NIcon, null, {
                    default: () => h(SunnyOutline),
                  }),
                unchecked: () => "Light mode",
              },
            ),
          key: "theme_toggle",
        },
      ];
      let options: MenuOption[];
      if (this.$data.authed) {
        options = [
          menuItem(
            "My Account",
            Routes.User + "/" + General.getCurrentUsername(),
          ),
        ];
      } else {
        options = loggedOutOptions;
      }
      this.$data.rightMenuOptions = themeSwtich.concat(options);
    },
    handleSelect(key: string): void {
      const path = key;
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

.navBarNewLine {
  display: none;
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

@media screen and (max-width: 450px) {
  .main_menu {
    height: 85px;
    text-align: center;
  }

  .navBarNewLine {
    display: unset;
  }

  .navBarRightMenu {
    float: unset;
    width: unset;
  }
}

@media screen and (max-width: 350px) {
  .navBarRightMenu .n-switch__unchecked,
  .navBarRightMenu .n-switch__checked,
  .navBarRightMenu .n-switch__rail-placeholder {
    display: none;
  }
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
  height: 50px;
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
