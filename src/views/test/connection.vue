<template>
    <div class="content-page">
        <div class="content" id="clusters_list">
            <button type="button" class="btn btn-primary btn-custom waves-effect w-md waves-light m-b-5 addColony">添加集群</button>
            <div class="container" v-for="value in arr">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="page-title-box clearfix pt-0">
                            <h4 class="page-title name fl">{{value.name}}</h4>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12 text-center text-white">
                        <Row type="flex" justify="space-around" class="code-row-bg">
                            <!-- 左半部分 -->
                            <Col span="8">
                                <div style="text-align:center" class="widget-simple-chart card-box">
                                    <div class="clearfix">
                                       <h4 style="text-align:left" class="mb-3 fl">节点：<span>{{value.hdfs_metrics.num_dead_datanodes+value.hdfs_metrics.num_live_datanodes}}</span></h4>
                                       <span style="font-size: 17px;color:hsla(0,0%,100%,.8);">文件数：{{value.hdfs_metrics.num_total_files!=null?value.hdfs_metrics.num_total_files:'N/A'}}</span>
                                       <h4 style="text-align:left" class="mb-3 fr">HA：<span>{{value.hdfs_metrics.ha_state!=null?value.hdfs_metrics.ha_state:'N/A'}}</span></h4>
                                    </div>
                                    
                                    <Row type="flex" justify="space-around" class="code-row-bg">
                                        <Col span="23" class="mb-3">
                                            <div style="text-align:center" class="widget-simple-chart card-box bg-success text-white p-6">
                                                <h4 class="mt-3">Dead DataNodes</h4>
                                                <h3 class="CpuNum mt-5">{{value.hdfs_metrics.num_dead_datanodes!=null?value.hdfs_metrics.num_dead_datanodes:'N/A'}}</h3>
                                            </div>
                                        </Col>
                                        <Col span="23">
                                            <div style="text-align:center" class="widget-simple-chart card-box bg-warning text-white p-6">
                                                <h4 class="mt-3">Volume Failures</h4>
                                                <h3 class="CpuNum mt-5">{{value.hdfs_metrics.num_live_datanodes!=null?value.hdfs_metrics.num_live_datanodes:'N/A'}}</h3>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <!-- 右半部分 -->
                            <Col span="15">
                                <div class="widget-simple-chart card-box text-white">
                                    <h4 style="text-align:left">hdfs</h4>
                                    <Row type="flex" justify="space-around" class="code-row-bg">
                                        <Col span="10">
                                            <i-circle v-bind:percent="value.hdfs_metrics.capacity_total!=null?parseFloat((Math.round(value.hdfs_metrics.capacity_used)/Math.round(value.hdfs_metrics.capacity_total)*100).toFixed(2)):parseInt(0)" :size="190" stroke-color="#3bafda">
                                                <span class="demo-Circle-inner" style="font-size:24px">{{value.hdfs_metrics.capacity_total!=null?(Math.round(value.hdfs_metrics.capacity_used)/Math.round(value.hdfs_metrics.capacity_total)*100).toFixed(2):'N/A'}}%</span>
                                            </i-circle>
                                            <h5 style="text-align:center" class="MemoryCapacity mt-5">容量：<span>{{value.hdfs_metrics.capacity_used!=null?value.hdfs_metrics.capacity_used:'N/A'}}T</span>/<span>{{value.hdfs_metrics.capacity_total!=null?value.hdfs_metrics.capacity_total:'N/A'}}T</span></h5>
                                        </Col>
                                        <Col span="10">
                                            <i-circle v-bind:percent="value.hdfs_metrics.blocks_used?parseFloat((Math.round(value.hdfs_metrics.blocks_used)/Math.round(value.hdfs_metrics.blocks_total)*100).toFixed(2)):parseInt(0)" :size="190" stroke-color="#3bafda">
                                                <span class="demo-Circle-inner" style="font-size:24px">{{value.hdfs_metrics.blocks_used?(Math.round(value.hdfs_metrics.blocks_used)/Math.round(value.hdfs_metrics.blocks_total)*100).toFixed(2):'N/A'}}%</span>
                                            </i-circle>
                                            <h5 style="text-align:center" class="MemoryCapacity mt-5">block：<span>{{value.hdfs_metrics.blocks_used!=null?value.hdfs_metrics.blocks_used/1000:'N/A'}}m</span>/<span>{{value.hdfs_metrics.blocks_total!=null?value.hdfs_metrics.blocks_total/1000:'N/A'}}m</span></h5>
                                        </Col>
                                    </Row>
                                    <h4 style="text-align:left" class="mt-3">yarn</h4>
                                    <Row type="flex" justify="space-around" class="code-row-bg">
                                        <Col span="10">
                                            <i-circle v-bind:percent="value.yarn_metrics.num_used_mem!=null?parseFloat((Math.round(value.yarn_metrics.num_used_mem)/Math.round(value.yarn_metrics.num_total_mem)*100).toFixed(2)):parseInt(0)" :size="190" stroke-color="#3bafda">
                                                <span class="demo-Circle-inner" style="font-size:24px">{{value.yarn_metrics.num_used_mem!=null?(Math.round(value.yarn_metrics.num_used_mem)/Math.round(value.yarn_metrics.num_total_mem)*100).toFixed(2):'N/A'}}%</span>
                                            </i-circle>
                                            <h5 style="text-align:center" class="MemoryCapacity mt-5">内存：<span>{{value.yarn_metrics.num_used_mem!=null?value.yarn_metrics.num_used_mem:'N/A'}}T</span>/<span>{{value.yarn_metrics.num_total_mem!=null?value.yarn_metrics.num_total_mem:'N/A'}}T</span></h5>
                                        </Col>
                                        <Col span="10">
                                            <i-circle v-bind:percent="value.yarn_metrics.num_used_cores!=null?parseFloat((Math.round(value.yarn_metrics.num_used_cores)/Math.round(value.yarn_metrics.num_total_cores)*100).toFixed(2)):parseInt(0)" :size="190" stroke-color="#3bafda">
                                                <span class="demo-Circle-inner" style="font-size:24px">{{value.yarn_metrics.num_used_cores!=null?(Math.round(value.yarn_metrics.num_used_cores)/Math.round(value.yarn_metrics.num_total_cores)*100).toFixed(2):'N/A'}}%</span>
                                            </i-circle>
                                            <h5 style="text-align:center" class="MemoryCapacity mt-5">CUP：<span>{{value.yarn_metrics.num_used_cores!=null?value.yarn_metrics.num_used_cores:'N/A'}}K</span>/<span>{{value.yarn_metrics.num_total_cores!=null?value.yarn_metrics.num_total_cores:'N/A'}}K</span></h5>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
    
            </div>

        </div>
    </div>
</template>
<style>
.cir {
    list-style: decimal;
}
.mt-5{
   margin-top: 5%;
}
.mb-3{
    margin-bottom: 3%
}
.mt-3{
    margin-top: 3%
}
.pt-0{
    padding-top: 0;
}
.fl{
    float: left;
}
.fr{
    float:right;
}
.p-6{
    padding: 6%
}
.bg-success{
    background-color: #00b19d !important;
}
.bg-warning{
    background-color: #ffaa00;
}
.clearfix:after {content:"."; display:block; height:0; visibility:hidden; clear:both; }
.clearfix { *zoom:1; }
.addColony{
    position: absolute;
    right: 1.8%;
    top: 0%;
}
</style> 
<script>
import $ from 'jquery';
import bytes from 'bytes';
import Vue from 'vue/dist/vue.js';

export default {
    data() {
        return {
           json:[],
           arr:[]
        }
    },
    computed: {

    },
    components: {

    },
    methods: {
        
        //获取所有集群
        Clusterslist(){
           let selt=this
           $.ajax({
               url:'http://172.16.38.83:5000/v1/clusters/list',
               type:'get',
               //data:item,
               success:function(data){
                console.log(data);
                var cd=data.data;
                selt.json = cd;
                for(var i=0;i<cd.length;i++){
                    selt.ClustersDetail(cd[i].id)
                }
               },
               error:function(data){
                console.log(data)
               }
           })
        },
        //获取集群详细信息
        ClustersDetail(ClustersID){
           let selt=this
           $.ajax({
               url:'http://172.16.38.83:5000/v1/clusters/list_moni/'+ClustersID,
               type:'get',
               //data:item,
               success:function(data){
                console.log(data);
                selt.arr.unshift(data.data);
                console.log(selt.arr)
               },
               error:function(data){
                console.log(data)
               }
           })
        },
    },
    mounted() {
    //    let Clusters_list=new Vue({
    //         el:'#clusters_list',
    //         data:{
    //             json:[]
    //         }
    //     });
        this.Clusterslist();
    },

    filters: {

    },

}
</script>
