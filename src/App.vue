<template>
    <router-view></router-view>
</template>

<script>
    import Vue from 'vue'
    import Vuex from 'vuex';
    import {QUICK_MENU_MAP} from './utils/constants';
  

    Vue.use(Vuex);

    const store = new Vuex.Store({
        state: {
            count: 0,
            isLargeSidebar: false,
            isSpinShow: false,
            quickMenu: JSON.parse(window.localStorage.getItem('quickMenu')) || QUICK_MENU_MAP,
            themeActive: localStorage.getItem('themeActive') || 'default'
        },
        mutations: {
            toggleSidebar: (state) => {
                state.isLargeSidebar = !state.isLargeSidebar;
            },
        },
        actions: {}
    });

    export default {
        name: 'app',
        store,
    }

    //对store对象做持久化处理,防止刷新问题后状态丢失
    store.subscribe(() => {
        localStorage.setItem('vuexState', JSON.stringify(store.state))
    })

</script>
