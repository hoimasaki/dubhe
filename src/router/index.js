import Vue from 'vue'
import Router from 'vue-router'
import App from '../../src/App.vue';
import Login from '../views/Login.vue';
import Index from '../views/Index.vue';
import {
    Verified,
} from '../api/common';
import {
    user,
    getUrlKey
} from '../utils'
import reqwest from 'reqwest';
import moment from 'moment';
Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [{
        path: '',
        name: 'App',
        component: App,
        redirect: '/app/dashboard',
        children: [{
            path: 'login',
            name: 'Login',
            component: Login,
        }, {
            path: 'app',
            name: 'Index',
            component: Index,
            children: [
                //仪表盘
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: require('../views/dashboard/index.vue'),
                },
                //通知分发
                {
                    path: 'notify',
                    component: require('../views/notify/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'notify',
                        component: require('../views/notify/index.vue')
                    }]
                },
                //测试项目
                {
                    path: 'bigdata',
                    component: require('../views/bigdata/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'bigdata',
                        component: require('../views/bigdata/index.vue')
                    }]
                },
                //流程管理项目
                {
                    path: 'flow',
                    component: require('../views/flow/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'flow',
                        component: require('../views/flow/index.vue')
                    }]
                },
                //测试项目
                {
                    path: 'test',
                    component: require('../views/test/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'Test',
                        component: require('../views/test/index.vue')
                    }, {
                        path: 'connection',
                        name: 'bdmgrConnection',
                        component: require('../views/test/connection.vue')
                    }]
                },
                //简单网络探测 
                {
                    path: 'net',
                    component: require('../views/net/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'netIndex',
                        component: require('../views/net/index.vue')
                    }]
                },
                //简单主机监控
                {
                    path: 'simplemonitor',
                    component: require('../views/simplemonitor/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'simplemonitorIndex',
                        component: require('../views/simplemonitor/index.vue')
                    }, {
                        path: 'dashboard',
                        name: 'simplemonitorDashboard',
                        component: require('../views/simplemonitor/dashboard.vue')
                    }]
                },
                //Prometheus管理
                {
                    path: 'prom',
                    component: require('../views/prom/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'promIndex',
                        component: require('../views/prom/index.vue')
                    }, {
                        path: 'target',
                        name: 'promTarget',
                        component: require('../views/prom/target.vue')
                    }]
                },
                //事件中心
                {
                    path: 'event',
                    component: require('../views/event/base.vue'),
                    children: [{
                        path: 'index',
                        name: 'eventIndex',
                        component: require('../views/event/index.vue')
                    }, {
                        path: 'compose',
                        name: 'eventCompose',
                        component: require('../views/event/compose.vue')
                    }, {
                        path: 'detail',
                        name: 'eventDetail',
                        component: require('../views/event/detail.vue')
                    }]
                },
                //更新日志
                {
                    path: 'changelog',
                    name: 'changelog',
                    component: require('../views/changelog/index.vue')
                }
            ]
        }]
    }],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }

    }

});


// //简易登录Dashboard-mng
// router.beforeEach((to, from, next) => {
//     if (to.name === 'Login') {
//         next()
//     } else {
//         let username = Vue.cookies.get("username");
//         if (username == null) {
//             window.location.href = "https://dashboard-mng.bilibili.co/login.html"
//         } else {
//             next()
//         }
//     }

// });

// //登陆钩子
// router.beforeEach((to, from, next) => {
//     if (to.name === 'Login') {
//         next();
//     } else {
//         console.log(from);
//         let erpToken = getUrlKey("erptoken");
//         // 判断首次带erp进入页面
//         if (erpToken && from.name === null) {
//             VerifiedUums(erpToken).then((data) => {
//                 if (data.Sets && data.Sets.value === 1) {
//                     user.profile = data.Sets;
//                     window.localStorage.setItem('token', data.Sets.Token);
//                     next();
//                 } else {
//                     user.entryUrl = to.path;
//                     next({
//                         path: '/login'
//                     })
//                 }
//             })
//         } else {
//             Verified(window.localStorage.getItem('token')).then((data) => {
//                 if (data.Sets && data.Sets.value === 1) {
//                     user.profile = data.Sets;
//                     next();
//                 } else {
//                     user.entryUrl = to.path;
//                     next({
//                         path: '/login'
//                     })
//                 }
//             });
//         }
//     }
// });


export default router;