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
                                    <router-link to="index">TRACEHUB</router-link>
                                </li>
                                <li class="active">
                                    <router-link to="/app/event/index">全局系统</router-link>
                                </li>
                            </ol>
                            <h4 class="page-title">事件中心</h4>
                        </div>
                    </div>
                </div>
    
                <div class="bigData-index">
    
                    <div class="row">
    
                        <!-- Left sidebar -->
                        <div class="col-lg-2 col-md-3">
    
                            <div class="m-t-20">
                                <router-link class='btn btn-danger btn-custom btn-block waves-effect waves-light' :to="linkHref" >{{buttontext}}</router-link>
    
                                <div class="list-group mail-list  m-t-20">
                                    <a href="mail-inbox.html#" class="list-group-item b-0 active">
                                        <i class="fa fa-download m-r-10"></i>收件箱
                                        <b>(8)</b>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <i class="fa fa-star-o m-r-10"></i>归档</a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <i class="fa fa-file-text-o m-r-10"></i>草稿
                                        <b>(20)</b>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <i class="fa fa-trash-o m-r-10"></i>回收站
                                        <b>(354)</b>
                                    </a>
                                </div>
    
                                <h3 class="panel-title m-t-40">标签</h3>
    
                                <div class="list-group b-0 mail-list">
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="label label-info text-info m-r-10">Ezei</span>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="label label-warning text-warning m-r-10">Ezcs</span>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="label label-primary text-purple m-r-10">交易参与人</span>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="label label-default text-pink m-r-10">容器云</span>
                                    </a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="label label-purple text-success m-r-10">网下IPO</span>
                                    </a>
                                </div>
    
                                <h3 class="panel-title m-t-40">事件级别</h3>
    
                                <div class="list-group b-0 mail-list">
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="fa fa-circle text-danger m-r-10"></span>3级事件</a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="fa fa-circle text-warning m-r-10"></span>2级事件</a>
                                    <a href="mail-inbox.html#" class="list-group-item b-0">
                                        <span class="fa fa-circle text-info m-r-10"></span>1级事件</a>
                                </div>
    
                            </div>
    
                        </div>
                        <!-- End Left sidebar -->
    
                        <!-- Right Sidebar -->
                        <div class="col-lg-10 col-md-9">
    
                            <router-view></router-view>
    
                        </div>
                        <!-- end Col-9 -->
                    </div>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">

</style>
<script>

export default {
    data(){
        return{
            linkHref:"/app/event/compose",
            buttontext:'新建事件'
        }
    },
    mounted() {
        
    },
    watch:{
        $route(){
            let path = this.$route.path
            if(path === '/app/event/compose'){
                    this.buttontext = '返回事件列表'
                    this.linkHref = '/app/event/index'
            }else{
                this.buttontext = '新建事件'
                    this.linkHref = '/app/event/compose'
            }
    }
  },
    methods: {
    }


}
</script>