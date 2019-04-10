<template>
    <div class="content-page">
        <div class="content">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box">
                            <ol class="breadcrumb pull-right">
                                <li>
                                    <router-link to="index">BECAUSE</router-link>
                                </li>
                                <li class="active">
                                    <router-link to="/app/dashboard">仪表盘</router-link>
                                </li>
                            </ol>
                            <h4 class="page-title">概况</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 text-center">
                        <div class="home-wrapper">
                            <div class="text-center">
                                <a href="/" class="logo">
                                    <span>BECAUSE</span>
                                </a>
                            </div>
                            <h2 class="home-text text-uppercase">使用说明</h2>
                            <br>
                            <p>请点击左上角<span style="color:#f76397;"> <font-awesome-icon class="fa m-r-5" icon="level-up-alt" /></span>前往具体监测应用</p><br/>
                                   <button type="button" class="btn btn-success waves-effect w-md waves-light m-r-20"  v-on:click="test">
                     <font-awesome-icon class="fa m-r-5" icon="vial" />使用动画过渡效果
                    </button>
                    <transition name="fade">
                        <p v-if="show" style="animation-duration: 1s">Hello Anamite</p>
                    </transition>
                    <p>读取cookie</p>
                    <p v-for="row in cookies">{{row}}</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
.cir {
  list-style: decimal;
}
</style> 
<script>
export default {
  data() {
    return {
        cookies:[],
        show: false
    };
  },
  computed: {},
  components: {},
  methods: {
    get_cookie:function(){
        let that = this
        let result = this.$cookies.get('_AJSESSIONID')
        let result2 = this.$cookies.get("username")
        this.cookies.push(result)
        this.cookies.push(result2)
    },
    test: function() {
      this.show = true;
    }
  },
  mounted() {
      this.get_cookie()
  },

  filters: {}
};
</script>
