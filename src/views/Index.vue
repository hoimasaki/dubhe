<template>
  <div id="wrapper" :class="['forced', 'enlarged', {'white': this.$store.state.themeActive === 'white'}]">
    <div class="fullscreen-view">
    <Topbar></Topbar>
    <Sidebar></Sidebar>
    <router-view
      :style="{paddingLeft:!this.$store.state.isLargeSidebar?85+'px':240+'px'}">
    </router-view>
    <!-- <div class="plus" @click="plus">plus</div>
        <div class="minus" @click="minus">minus</div> -->
    <AppFooter></AppFooter>

            <!-- loading -->
            <spin v-if="this.$store.state.isSpinShow"></spin>
        </div>
    </div>
</template>

<style lang="less">
.plus {
  position: fixed;
  z-index: 9999;
  top: 0;
  color: #000;
  cursor: pointer;
}

.minus {
  position: fixed;
  z-index: 9999;
  top: 30px;
  color: #000;
  cursor: pointer;
}

.fullscreen {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background: #2d353d;
}

#wrapper.white {
  .fullscreen {
    background: #fff;
  }
}
</style>
<script>
import Topbar from "../components/Topbar.vue";
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "index",
  components: {
    Topbar,
    Sidebar,
    AppFooter: Footer,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
