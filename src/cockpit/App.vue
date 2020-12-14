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
    el-menu-item.main_menu_item#home(index="/") Home
    el-menu-item.main_menu_item#about(index="/about") About
    el-submenu.main_menu_item#trip(index="/trip")
      template.main_menu_item#trip_title(slot="title") Trips
      el-menu-item.main_menu_item#view_trip(index="/trip/view") View
      el-menu-item.main_menu_item#new_trip(v-if="authed" index="/trip/new") New
    el-menu-item.main_menu_item#login(v-if="!authed" index="/login") Login
    el-menu-item.main_menu_item#register(v-if="!authed" index="/register") Register
    el-menu-item.main_menu_item#myaccount(v-if="authed" index="/myaccount") My Account
  router-view#content
  #footer
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from "vue-property-decorator";
import General from "./shared/General";

@Component({
  data() {
    return {
      activeIndex: "/",
      authed: false,
    };
  },
})
export default class App extends Vue {
  private async beforeMount() {
    await this.setAuthed();
    this.setActiveIndex();
  }

  private async setAuthed() {
    this.$data.authed = await General.authSession();
  }

  private setActiveIndex() {
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
  }

  private handleSelect(key: string) {
    let path = key;
    if (path === this.$data.activeIndex || path === null) {
      return;
    }
    this.$router.push({ path: `${path}` });
  }

  @Watch("$route", { immediate: true, deep: true })
  private async onUrlChange() {
    await this.setAuthed();
    this.setActiveIndex();
  }
}
</script>

<style lang="scss">
@import "./shared/lib";
@font-face {
  font-family: SourceSansPro;
  src: url("../assets/SourceSansPro/SourceSansPro-Regular.ttf");
}

#login,
#myaccount,
#register {
  float: right;
}

#app {
  position: relative;
  min-height: 100vh;
  text-align: center;
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
