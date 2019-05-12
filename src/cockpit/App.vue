<template lang="pug">
#app
    el-menu.main_menu(
        :default-active='activeIndex'
        mode='horizontal'
        @select='handleSelect'
        background-color="#333"
        text-color="white"
        active-text-color="#42b983"
    )
        el-menu-item.main_menu_item(index='/') Home
        el-menu-item.main_menu_item(index='/about') About
        el-submenu.main_menu_item(index='/trip')
            template.main_menu_item(slot='title') Trips
            el-menu-item.main_menu_item(index='/trip/view') View
            el-menu-item.main_menu_item(index='/trip/new') New
    #content
        router-view
    #footer
        h4#footerMessage
            | Made with 
            span(style='color: #e25555;') &hearts; 
            | by 
            a(href='https://binhong.me/') BinHong Lee
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
    data() {
        return {
            activeIndex: '/',
        };
    },
})

export default class App extends Vue {
    private beforeMount() {
        let path = window.location.pathname;
        if (path.length < 2) {
            return;
        }

        if (path.substr(path.length - 1).localeCompare('/') === 0) {
            path = path.slice(0, -1);
        }
        const paths = path.split('/');
        if (!isNaN(Number(paths[paths.length - 1]))) {
            path = path.slice(0, (-1 * paths[paths.length - 1].length) - 1);
        }

        this.$data.activeIndex = path;
    }

    private handleSelect(key: any, keyPath: any) {
        this.$router.push({ path: `${key}` });
    }
}
</script>

<style lang="scss" src="./App.scss"/>
