<template>
    <div class="bigData-detail">
         <div class="row dashboard_loading">
                    <div class="col-sm-12 text-center">
                        <div class="home-wrapper">
                            <div class="text-center">
                                <a href="/" class="logo">
                                    <span><img src="../../assets/images/loading_gear.gif" /></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        <div class="row dashboard_control">
            <div class="col-lg-12 m-b-10 pull-right">
                <button type="button" class="btn btn-default waves-effect w-md waves-light m-r-20" >
                    <i class="fa fa-plus"></i>&nbsp;添加监控指标
                </button>
                <!-- <button type="button" class="btn btn-success waves-effect w-md waves-light m-r-20">
                    <i class="fa fa-save"></i>&nbsp;保存仪表盘
                </button> -->
                <span class="pull-right">
                    监视功能:
                    <i-switch v-model="formItem.switch" @on-change="switchUpdate"></i-switch>
                </span>
            </div>
        </div>


        <div class="row dashboard_card" style="height:120px" >
            <div class="col-sm-6 col-lg-2">
                        <div class="widget-simple-chart text-center card-box">
                          <h3 id="uptime" class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_uptime"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    />天</h3>
                            <p class="text-muted text-nowrap m-b-10">启动时间</p>
                        </div>
                    </div>
                        <div class="col-sm-6 col-lg-2">
                         <div class="widget-simple-chart text-center card-box"><h3 class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_cpu_num"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    /></h3>
                            <p class="text-muted text-nowrap m-b-10">CPU核数</p>
                        </div>
                    </div>

                        <div class="col-sm-6 col-lg-2">
                             <div class="widget-simple-chart text-center card-box">
                                 <h3 class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_mem_available"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    />%</h3>
                            <p class="text-muted text-nowrap m-b-10">可用内存</p>
                        </div>
                    </div>

                        <div class="col-sm-6 col-lg-2">
                        <div class="widget-simple-chart text-center card-box">
                                           <h3 class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_tcp_repeat"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    />%</h3>
                            <p class="text-muted text-nowrap m-b-10">TCP重传率</p>
                        </div>
                    </div>

                          <div class="col-sm-6 col-lg-2">
                            <div class="widget-simple-chart text-center card-box">
                                <h3 class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_network_in"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    />MBps</h3>
                            <p class="text-muted text-nowrap m-b-10">网卡入带宽</p>
                        </div>
                    </div>
                          <div class="col-sm-6 col-lg-2">
                             <div class="widget-simple-chart text-center card-box"><h3 class="text-primary counter m-t-10"><ICountUp
      :startVal="counter_startVal"
      :endVal="counter_network_out"
      :decimals="counter_decimals"
      :duration="counter_duration"
      :options="counter_options"
    />MBps</h3>
                            <p class="text-muted text-nowrap m-b-10">网卡出带宽</p>
                        </div>
                    </div>
            </div>
        <div class="row">              
<grid-layout :layout="dataLayout" :col-num="12" :row-height="60" :is-draggable="true" :is-resizable="true" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="false">
                <grid-item class="portlet dashboard_layout" v-for="item in dataLayout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :metirc="item.metric" @resize="resizeEvent" @move="moveEvent" @resized="resizedEvent" @moved="movedEvent">
                    <div class="portlet-heading">
                        <h3 class="portlet-title text-dark">
                            {{item.title}}&nbsp;{{item.unit}}
                        </h3>
                        <div class="portlet-widgets">
                                  <a  @click="handleQueryView(item.metric)">
                                <i class="fa fa-code"></i>
                            </a>
                               <span class="divider"></span>
                           <a href="" data-toggle="view" @click="handleChartView()">
                                <i class="fa fa-tv"></i>
                            </a>
                            <span class="divider"></span>
                            <a  @click="handleChartEdit()">
                                <i class="fa fa-wrench"></i>
                            </a>
                            <span class="divider"></span>
                            <a  @click="handleChartDelete()">
                                <i class="fa fa-remove"></i>
                            </a>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div :ref="item.i" style="width:100%;height:200px"></div>
                </grid-item>
            </grid-layout>
        </div>


         <Modal
        v-model="code_modal"
        title="PromQL查询语句"
        :closable="false"
        width="1320">
              <pre>{{promql_code}}</pre>
        </Modal>

    </div>
</template>


<style lang="less">
pre {
    white-space: pre-wrap;
    word-wrap: break-word;
}
.counter {
  font-weight: bold;
}
.dashboard_control{
    display:none;
}
.dashboard_card{
    display: none;
}
.dashboard_layout{
    display: none;
}

</style>

<script>
import moment from "moment";
import { GetPromDataRange } from "../../api/simplemonitor";
import echarts from "echarts";
import VueGridLayout from "vue-grid-layout";
import ICountUp from "vue-countup-v2";
import _ from "underscore";


var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;


//定义图形
function linechart(ref, legend) {
  let mychart = echarts.init(ref);
  if (legend.length <= 1) {
    var boolean_show = false;
  } else {
    var boolean_show = true;
  }

  mychart.setOption({
    title: {
      show: false
    },
    tooltip: {
      trigger: "axis"
    },
    grid: {
      bottom: "10%"
    },
    legend: {
      show: boolean_show,
      right: 10,
      textStyle: {
        color: "#FFF"
      },
      data: legend
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [],
      axisLine: {
        lineStyle: {
          color: "#363f49"
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#363f49"
        }
      },
      axisLabel: {
        textStyle: {
          color: "#0dc7d0"
        }
      }
    },
    yAxis: {
      type: "value",
      axisLabel: {
        // formatter: '{value}KB',
        inside: true,
        //margin: -10,
        textStyle: {
          color: "#8f9fa8"
        }
      },
      axisLine: {
        lineStyle: {
          color: "#363f49"
        }
      },
      splitLine: {
        lineStyle: {
          color: "#363f49"
        }
      }
    },
    series: []
  });
  return mychart;
}

export default {
  components: {
    GridLayout,
    GridItem,
    ICountUp
  },
  data() {
    return {
      code_modal:false,
      promql_code:"",
      counter_startVal: 0,
      counter_uptime: 0,
      counter_cpu_num: 0,
      counter_mem_available: 0,
      counter_tcp_repeat: 0,
      counter_network_in: 0,
      counter_network_out: 0,
      counter_decimals: 2,
      counter_duration: 2.5,
      counter_options: {
        useEasing: true,
        useGrouping: true,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: ""
      },
      cardData: [
        //uptime
        "avg(node_time_seconds{instance='" +
          this.$route.query.host +
          "'} - node_boot_time_seconds{instance'" +
          this.$route.query.host +
          "'})",
        //cpu unm
        "job:cpu_core_num{instance='" + this.$route.query.host + "'}",
        //mem_available
        "100 * job:mem_available{instance='" +
          this.$route.query.host +
          "'} / job:mem_total{instance='" +
          this.$route.query.host +
          "'}",
        //tcp 重传
        "irate(node_netstat_Tcp_RetransSegs{instance='" +
          this.$route.query.host +
          "'}[5m]) / irate(node_netstat_Tcp_OutSegs{instance='" +
          this.$route.query.host +
          "'}[5m]) or irate(node_netstat_Tcp_RetransSegs{instance='" +
          this.$route.query.host +
          "'}[5m]) / irate(node_netstat_Tcp_OutSegs{instance='" +
          this.$route.query.host +
          "'}[5m])",
        //network_in
        "sum(rate(node_network_receive_bytes_total{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m]) or irate(node_network_receive_bytes{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m]) or irate(node_network_receive_bytes_total{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m])) * 8",
        //network_out
        "sum(rate(node_network_transmit_bytes_total{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m]) or irate(node_network_receive_bytes{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m]) or irate(node_network_receive_bytes_total{instance='" +
          this.$route.query.host +
          "',device!~'^(lo|bond).*'}[5m])) * 8"
      ],
      lineStyle: ["#3bafda", "#3ddcf7", "#00b19b ", "#F76497","#FFAA00","#7266BA","#797979","#DCDCDC","#6DC7D2","#C14E4E"],
      dataLayout: [
        {
          x: 0,
          y: 0,
          w: 4,
          h: 4,
          i: "cpuChart",
          metric: [
            "job:cpu_load_per_mode{instance='" +
              this.$route.query.host +
              "'}"
          ],
          title: "CPU使用率",
          unit: "%",
          legend: [
            "idle",
            "iowait",
            "irq",
            "nice",
            "softirq",
            "steal",
            "system",
            "user"
          ],
          max: 100
        },
        {
          x: 4,
          y: 0,
          w: 4,
          h: 4,
          i: "systemLoad",
          metric: [
            "job:cpu_load_1{instance='" + this.$route.query.host + "'}",
            "job:cpu_load_5{instance='" + this.$route.query.host + "'}",
            "job:cpu_load_15{instance='" + this.$route.query.host + "'}"
          ],
          title: "系统负载",
          unit: "",
          legend: ["load.1min", "load.5min", "load.15min"],
          max: null
        },
        {
          x: 8,
          y: 0,
          w: 4,
          h: 4,
          i: "mem",
          metric: [
            "job:mem_total{instance='" + this.$route.query.host + "'}",
            "job:mem_available{instance='" + this.$route.query.host + "'}"
          ],
          title: "内存使用率",
          unit: "%",
          legend: ["总内存", "可用内存"],
          max: 100
        },
        {
          x: 0,
          y: 16,
          w: 4,
          h: 4,
          i: "diskChart",
          metric: [
            "1 - node_filesystem_free{instance='" +
              this.$route.query.host +
              "' , fstype!~'rootfs|selinuxfs|autofs|rpc_pipefs'} / node_filesystem_size{instance='" +
              this.$route.query.host +
              "', fstype!~'rootfs|selinuxfs|autofs|rpc_pipefs'}"
          ],
          title: "磁盘空间使用率",
          unit: "%",
          legend: [],
          max: null
        },
        {
          x: 4,
          y: 16,
          w: 4,
          h: 4,
          i: "networkChart",
          metric: [
            "irate(node_network_receive_bytes{instance='" +
              this.$route.query.host +
              "', device!~'^(lo|bond).*'}[5m]) * 8 or irate(node_network_receive_bytes_total{instance='" +
              this.$route.query.host +
              "', device!~'^(lo|bond).*'}[5m]) * 8",
            "irate(node_network_transmit_bytes{instance='" +
              this.$route.query.host +
              "', device!~'^(lo|bond).*'}[5m]) * 8 or irate(node_network_transmit_bytes{instance='" +
              this.$route.query.host +
              "', device!~'^(lo|bond).*'}[5m]) * 8"
          ],
          title: "网卡出/入带宽",
          unit: "KB/s",
          legend: [],
          max: null
        },
        {
          x: 8,
          y: 16,
          w: 4,
          h: 4,
          i: "swapChart",
          metric: [
            "node_memory_SwapTotal{instance='" +
              this.$route.query.host +
              "'} - node_memory_SwapFree{instance='" +
              this.$route.query.host +
              "'}"
          ],
          title: "SWAP 使用率",
          unit: "%",
          legend: ["SWAP使用率"],
          max: 100
        },
        {
          x: 0,
          y: 32,
          w: 4,
          h: 4,
          i: "processChart",
          metric: [
            "node_procs_running{instance='" + this.$route.query.host + "'}"
          ],
          title: "进程 ",
          unit: "",
          legend: ["进程数"],
          max: 100
        },
        {
          x: 4,
          y: 32,
          w: 4,
          h: 4,
          i: "forkChart",
          metric: [
            "irate(node_forks{instance='" +
              this.$route.query.host +
              "'}[5m])"
          ],
          title: "Fork",
          unit: "",
          legend: ["Fork数"],
          max: 100
        },
        {
          x: 8,
          y: 32,
          w: 4,
          h: 4,
          i: "tcpStatChart",
          metric: [
            "max(node_tcp_stat{instance='" +
              this.$route.query.host +
              "'}) by (stat)"
          ],
          title: "TCP Stat Chart",
          unit: "%",
          legend: ["使用率"],
          max: 100
        }
      ],
      formItem: {
        select: "",
        switch: false
      },
      gridList: [
        {
          value: "0",
          label: "默认布局"
        }
      ],
      timeList: [
        {
          value: "1",
          label: "最近1小时"
        },
        {
          value: "3",
          label: "最近3小时"
        },
        {
          value: "12",
          label: "最近12小时"
        },
        {
          value: "24",
          label: "最近1天"
        },
        {
          value: "168",
          label: "最近7天"
        }
      ],
      gridSelect: "0",
      timeRange: "1",
      liveStatus: false
    };
  },
  computed: {},
  methods: {
    //显示Prometheus查询语句
    handleQueryView:function(item){
        this.code_modal = true
        this.promql_code = item
    },
    //单个视图刷新
    handleReFresh:function(metric,chart_id){
        this.fetch_prom_data(metric)
    },
    //放大图像
    handleChartView: function() {
      alert("投射详细视图");
    },
    //移动中操作
    moveEvent: function(i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    //移动后
    movedEvent: function(i, newX, newY) {
      console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
    },
    //重新定义尺寸中
    resizeEvent: function(i, newH, newW) {
      console.log("MOVE i=" + i + ", X=" + newH + ", Y=" + newW);
      if (newW <= 2 || newH < 4) {
        $.Notification.notify(
          "warning",
          "top right",
          "警告",
          "图形尺寸过小，可能造成显示效果不佳，请调整"
        );
        return false;
      }

      let that = this;
      let data = _.findWhere(this.dataLayout, { i: i });
      let chart = linechart(this.$refs[i][0], data.legend);

      //根据比例定义高度
      switch (newH) {
        case 2:
          this.$refs[i][0].style.height = "120px";
          break;
        case 3:
          this.$refs[i][0].style.height = "170px";
          break;
        case 4:
          this.$refs[i][0].style.height = "200px";
          break;
        case 5:
          this.$refs[i][0].style.height = "270px";
          break;
        case 6:
          this.$refs[i][0].style.height = "320px";
          break;
        case 7:
          this.$refs[i][0].style.height = "370px";
          break;
        case 8:
          this.$refs[i][0].style.height = "420px";
          break;
      }
      chart.resize();
    },
    //重新定义尺寸后
    resizedEvent: function(i, newH, newW) {
      console.log("MOVE i=" + i + ", X=" + newH + ", Y=" + newW);
      let that = this;
      let data = _.findWhere(this.dataLayout, { i: i });
      let chart = linechart(this.$refs[i][0], data.legend);
      chart.resize();
    },
    //实时刷新开关
    switchUpdate: function(status) {
      let that = this;
      if (status === true) {
        that.liveStatus = true;
        $.Notification.notify("success", "top right", "通知", "监视功能已开启");
      } else {
        that.liveStatus = false;
        $.Notification.notify("error", "top right", "通知", "监视功能已关闭");
      }

      let interval = window.setInterval(function() {
        
        that.fetch_card_data();
        that.fetch_prom_data();
        if (that.liveStatus === false) {
          window.clearInterval(interval);
        }
      }, 5000);
    },
    //获取卡片数据
    fetch_card_data: function() {
      //定义metric请求xhr
      let metric_xhr = [];
      let datasource = "shd";
      let start = moment()
        .subtract("hours", 2)
        .format("YYYY-MM-DD HH:mm:ss");
      let end = moment().format("YYYY-MM-DD HH:mm:ss");
      let step = 300;
      //组合批量metric请求数组
      _.each(this.cardData, function(row) {
        let metric_row = GetPromDataRange(datasource, row, start, end, step);
        metric_xhr.push(metric_row);
      });

      //开始批量同步请求
      Promise.all(metric_xhr).then(res => {
        if(res){
            $('.dashboard_loading').remove();
            $('.dashboard_control').show();
            $('.dashboard_card').show();
        }
        _.each(res, (row, key) => {
          let value = row.Data[0].values.pop()[1];
          switch (key) {
            case 0:
              this.counter_uptime = parseFloat(value / 86400);
              break;
            case 1:
              this.counter_cpu_num = parseFloat(value);
              break;
            case 2:
              this.counter_mem_available = parseFloat(value);
            case 3:
              this.counter_tcp_repeat = parseFloat(value);
              break;
            case 4:
              this.counter_network_in = parseFloat(value / 1024 / 1024);
              break;
            case 5:
              this.counter_network_out = parseFloat(value / 1024 / 1024);
              break;
          }
        });
      });
    },
    //整体拉取数据
    fetch_prom_data: function() {
      //循环获取datalayout数据
      _.each(this.dataLayout, row => {
        /*定义请求体*/
        let datasource = "shd";

        let query = row.metric;
        //console.log(query);
        let start = moment()
          .subtract("hours", 2)
          .format("YYYY-MM-DD HH:mm:ss");
        let end = moment().format("YYYY-MM-DD HH:mm:ss");
        let step = 300;
        let legend = row.legend;

        //图表类型
        let div_i = row.i;

        //定义metric请求xhr
        let metric_xhr = [];

        //组合批量metric请求数组
        _.each(query, function(row) {
          let metric_row = GetPromDataRange(datasource, row, start, end, step);
          metric_xhr.push(metric_row);
        });

        //开始批量同步请求
        Promise.all(metric_xhr).then(res => {
          if(res){
            $('.dashboard_layout').show();
          }
          let series_data = [];
          let x_series = [];

          _.each(res, (series, key) => {
            /* 动态获取Metric */
            _.each(series.Data, row => {
              //组合内置Legend的数据
              switch (div_i) {
                case "diskChart":
                    legend.push(row.metric.mountpoint);
                    break;
                case "cpuChart":
                    legend.push(row.metric.mode);
                    break;
                case "networkChart":
                    legend.push(row.metric.device);
                    break;
              }

              let y_series = [];
              _.each(row.values, jow => {
                //x轴参数
                x_series.push(moment(jow[0] * 1000).format("MM-DD HH:mm"));
                //y轴参数
                let value = parseFloat(jow[1]);
                y_series.push(value.toFixed(4));
              });

              /*数据实体*/
              series_data.push({
                data: y_series,
                type: "line",
                itemStyle: {
                  normal: {
                    color: this.lineStyle[key]
                  }
                }
              });
            });
          });

          //X轴去重
          x_series = _.uniq(x_series);
          // console.log(series_data);
          // console.log(legend);

          //重写Legend和定义配色
          _.each(series_data, (row, key) => {
            row.name = legend[key];
            row.itemStyle = {
              normal: {
                color: this.lineStyle[key]
              }
            };
          });

          //绘图
          //初始化图像
          let chart = linechart(this.$refs[div_i][0], legend);
          //填入数据
          chart.setOption({
            xAxis: {
              type: "category",
              data: x_series
            },
            yAxis: {
              type: "value"
            },
            series: series_data
          });
        });
      });
    }
  },
  mounted() {
    this.fetch_prom_data();
    this.fetch_card_data();
  },
  watch: {}
};
</script>