<template>
    <div class="topbar">
        <!-- LOGO -->

        <div class="topbar-left">
            <div class="text-center">
                <a href="/app/dashboard" class="logo">
                    <img class="media-middle" src="../assets/images/logo.svg" alt="">
                    <span>TRACEHUB</span>
                </a>
            </div>
        </div>

        <div class="navbar navbar-default" role="navigation">
            <div class="container">
                <ul class="nav navbar-nav hidden-xs">
                    <li class="menu-subscribe-btn">
                          <Poptip trigger="hover" title="提示" content="点击显示所有监测服务和产品" placement="bottom" >
                        <a @click="isExpand=!isExpand" class="waves-effect topbar-menu" >
                            <i class="fa fa-th-large media-middle" aria-hidden="true"></i>
                            <span class="m-l-5 media-middle">产品与服务</span>
                        </a>
                        </Poptip>
                    </li>

                </ul>

                <ul class="nav navbar-nav navbar-right pull-right">
                    <!-- Switch Theme
                    <li>
                        <span class="theme-select" style="background:#495060" @click="changeTheme('default')"></span>
                        <span class="theme-select" style="background:#fff" @click="changeTheme('white')"></span>
                    </li> -->

                    <li class="dropdown hidden-xs">
                        <Poptip trigger="hover" title="通知" content="通知" placement="bottom">
                            <a class="dropdown-toggle waves-effect waves-light topbar-a" >
                                <i class="fa fa-envelope"></i>
                            </a>
                        </Poptip>

                    </li>

                    <li class="dropdown hidden-xs">
                         <Poptip trigger="hover" title="提示" content="更新日志" placement="bottom">
                        <router-link to="/app/changeLog" data-target="#" class="dropdown-toggle waves-effect waves-light topbar-a" >
                            <i class="fa fa-file-text"></i>
                        </router-link>
                          </Poptip>

                    </li>
                    <li class="dropdown hidden-xs">
                        <Poptip trigger="hover" title="提示" content="切换全屏" placement="bottom">
                            <a class="dropdown-toggle waves-effect waves-light topbar-a" >
                                <i class="fa fa-arrows-alt" @click="toggle"></i>
                            </a>
                        </Poptip>

                    </li>

                    <li class="dropdown">
                        <a class="dropdown-toggle waves-effect" data-toggle="dropdown"
                           role="button" aria-haspopup="true" aria-expanded="false">
                             <img src="/static/images/users/redhatLogo.png" alt="user" class="rounded-circle m-r-5 m-l-5" style="width:30px;height:30px;">
                           {{username}}<span
                                class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a @click="logout()">登出</a></li>
                        </ul>
                    </li>


                </ul>
            </div>
        </div>

        <transition name="fade">
        <div class="menu-subscribe card-box" v-show="isExpand"  style="animation-duration: 0.3s">
            <div class="row">
                <div class="col-md-2" v-for="(name,type) in quickMenuType">
                    <h4 class="m-t-0 header-title">
                        <b>{{name}}</b>
                        <hr class="m-t-10 m-b-10">
                    </h4>
                    <!--<p class="text-muted m-b-15 font-13">-->
                    <!--A list of items in which the order does not explicitly matter.-->
                    <!--</p>-->
                    <ul>
                        <li v-for="item in getQuickMenuCore(type)">
                            <div class="checkbox checkbox-info">
                                 <Poptip trigger="hover" title="提示" content="勾选增加到快捷菜单" placement="right" >
                                <input :id="item.module" type="checkbox" :checked="isChecked(item,quickMenu)"
                                       @click="toggleQuickMenu(item)">
                                <label :for="item.module" >
                                    <template v-if="item.url" >
                                        <router-link :to="item.url" class="top-menu-link">
                                            <span @click="isExpand=!isExpand">
                                              <font-awesome-icon class="fa m-r-5" :icon="item.icon"  aria-hidden="true" />
                                      
                                            {{item.name}}
                                            </span>
                                        </router-link>
                                    </template>
                                    <template v-else >
                                        <a :href="item.externalUrl" class="top-menu-link">
                                         <font-awesome-icon class="fa m-r-5" :icon="item.icon"  aria-hidden="true" />
                                            {{item.name}}</a>
                                    </template>

                                </label>
                                  </Poptip>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        </transition>

    </div>
</template>
<style scoped lang="less">
ul {
  list-style-type: none;
}
.topbar-menu {
  color: #fff;
  line-height: 50px;
  font-size: 14px;
  width: 100px;
  margin: 10px;
}
.topbar-a {
  color: #fff;
  line-height: 70px;
  font-size: 20px;
  padding-left: 20px;
}

.top-menu-link {
  color: #98a6ab;
}

.top-menu-link:hover {
  color: #3ddcf7;
}

.menu-subscribe-btn {
  background: rgb(90, 199, 239);
}

.menu-subscribe {
  position: absolute;
  padding: 38px 98px 14px 58px;
  /*background-color: #323b44;*/
  width: 100%;
  height: 3000px;
  top: 71px;
  left: 70px;
  z-index: 100;
  .checkbox {
    padding-left: 0;
    margin-top: 12px;
    margin-bottom: 12px;
    font-size: 13px;
    label {
      width: 100%;
    }
    label:after,
    label:before {
      right: 0;
      left: initial;
    }
  }
}

.tooltip {
  display: block !important;
  padding: 4px;
  z-index: 200;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    display: none;
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  .menu-subscribe {
    position: absolute;
    padding: 38px 98px 14px 58px;
    /*background-color: #323b44;*/
    width: 100%;
    height: 800px;
    top: 71px;
    left: 70px;
    z-index: 100;
    .checkbox {
      padding-left: 0;
      margin-top: 12px;
      margin-bottom: 12px;
      font-size: 13px;
      label {
        width: 100%;
      }
      label:after,
      label:before {
        right: 0;
        left: initial;
      }
      input[type="checkbox"] {
        right: 0;
      }
    }
  }
}

.ivu-switch {
  &:after {
    background-color: #3bafda;
  }
}

.ivu-switch-checked {
  border-color: #323b44;
  background: #323b44;
}

.theme-select {
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-left: 10px;
  margin-top: 27px;
  border: 1px solid #efefef;
  cursor: pointer;
}

#wrapper.white {
  .topbar {
    .nav > li > a {
      color: #fff !important;
    }
  }
}

.top-bar-select {
  background: #fff;
  color: #2094bf;

  .ivu-select-arrow {
    color: #fff;
  }
}
</style>

<script>
import { user } from "../utils";
import { QUICK_MENU_MAP, QUICK_MENU_TYPE_MAP } from "../utils/constants";
import fullscreen from "vue-fullscreen";
import Vue from "vue";

Vue.use(fullscreen);

export default {
  data() {
    return {
      fullscreen: false,
      username: "",
      isExpand: false,
      quickMenuType: QUICK_MENU_TYPE_MAP,
      themeActive: localStorage.getItem("themeActive") || "default"
    };
  },
  computed: {
    quickMenu: {
      get: function() {
        return this.$store.state.quickMenu;
      },
      set: function(x) {
        this.$store.state.quickMenu = x;
      }
    }
  },
  methods: {
    toggle() {
      this.$fullscreen.toggle(
        this.$parent.$el.querySelector(".fullscreen-view"),
        {
          wrap: false,
          callback: this.fullscreenChange
        }
      );
    },
    getQuickMenuCore: function(type) {
      return QUICK_MENU_MAP.filter(x => {
        return x.type === type;
      });
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    isChecked(a, b) {
      return b.some(x => {
        return x.module === a.module;
      });
    },
    toggleQuickMenu(item) {
      let list = this.quickMenu;

      if (
        list.some(x => {
          return x.module === item.module;
        })
      ) {
        this.quickMenu = list.filter(x => {
          return x.module !== item.module;
        });
      } else {
        this.quickMenu.push(item);
      }

      window.localStorage.setItem("quickMenu", JSON.stringify(this.quickMenu));
    },
    logout() {
      window.localStorage.removeItem("token");
      this.$router.push("/login");
    },
    changeTheme(status) {
      this.themeActive = status;
      this.$store.state.themeActive = status;
      localStorage.setItem("themeActive", status);
    },
    get_username: function() {
      let result = this.$cookies.get("username");
      this.username = result;
    }
  },
  mounted() {
    this.get_username();
  }
};
</script>
