<template>
    <div class="content-page bigData">
        <!-- Start content -->
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box" style="box-shadow:none">
                            <ol class="breadcrumb pull-right">
                                <li>
                                    <router-link to="index">BECAUSE 首页</router-link>
                                </li>
                                <li class="active">
                                    <router-link to="/app/prom/index">系统管理</router-link>
                                </li>
                            </ol>
                            <router-link to="/app/prom/index" v-if="isBack">
                                <div class="backIcon">
                                    <Icon type="arrow-left-a"></Icon>
                                </div>
                            </router-link>
                            <h4 class="page-title inlineBlock">{{pageTitle}}</h4>
                        </div>
                    </div>
                </div>
                <router-view ></router-view>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.backIcon {
  display: inline-block;
  margin-right: 10px;
  border-radius: 2px;
  padding: 3px;
  width: 20px;
  font-size: 20px;
  color: #3bafda;
}

.inlineBlock {
  display: inline-block;
}
</style>
<script>
export default {
  data() {
    return {
      isBack: false,
      isAddHost: false,
      isEditHost: false,
      hostname: "",
      pageTitle: "Prometheus管理"
    };
  },
  mounted() {},
  updated() {},
  methods: {}
};
</script>