import Vue from 'vue'

import App from './App.vue'
import router from './router'

//加载font-awsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)




// 页面样式
import './assets/styles';

// 引入组件
import './assets/plugins';

//Socket.io
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';

//Cookie
import VueCookies from 'vue-cookies'

// set default config
Vue.use(VueCookies)
Vue.use(VueSocketio, io('http://merak.bilibili.co'));



// Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
