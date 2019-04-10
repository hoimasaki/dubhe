<template>
    <!-- ========== Left Sidebar Start ========== -->
    <div class="left side-menu">
        <div class="sidebar-inner slimscrollleft">
            <div id="sidebar-menu">
                <ul>
                    <li>
                        <template>
                            <router-link to="/app/dashboard" class="waves-effect waves-primary">
                                  <font-awesome-icon class="fa m-r-5" icon="tv"  />
                                <span>概况</span>
                            </router-link>
                        </template>
                    </li>
                    <li v-for="item in quickMenu">
                        <template v-if="item.url">
                            <router-link :to="item.url" class="waves-effect waves-primary">
                               <font-awesome-icon class="fa m-r-5"  :icon="item.icon" />
                                <span>{{item.name}}</span>
                            </router-link>
                        </template>
                        <template v-else>
                            <a :href="item.externalUrl" class="waves-effect waves-primary">
                               <font-awesome-icon class="fa m-r-5" :icon="item.icon" />
                                <span>{{item.name}}</span>
                            </a>
                        </template>
                    </li>
    
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="clearfix"></div>
        </div>
    
    </div>
    <!-- Left Sidebar End -->
</template>
<style scoped lang="less">
.fa{
    font-size:20px
}
</style>
<script>
export default {
    data() {
        return {
            theme: 'dark',
        }
    },
    computed: {
        quickMenu() {
            return this.$store.state.quickMenu;
        }
    }
}
</script>

