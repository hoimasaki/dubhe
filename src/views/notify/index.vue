<template>
    <div class="bigData-detail">
        <div class="row">
            <div class="col-lg-12 m-b-10 pull-right">
                <!-- <button type="button" class="btn btn-default waves-effect w-md waves-light m-r-20" v-on:click="display_subscribe">
                     <font-awesome-icon class="fa m-r-5" icon="plus" />订阅监控数据流
                </button> -->
                  <button type="button" class="btn btn-warning waves-effect w-md waves-light m-r-20"  v-on:click="eraser">
                     <font-awesome-icon class="fa m-r-5" icon="eraser" />清理当前屏幕
                </button>
                <span class="pull-right m-r-5">
                    实时数据流开关
                    <i-switch v-model="formItem.switch" @on-change="sub"></i-switch>
                </span>
            </div>
        </div>
        <div class="row">
        <div class="col-lg-12">
                            <div class="pull-right">在线开发者:&nbsp;<span ><span style="margin-right:5px" v-for="user in vistor" class="badge badge-purple">{{user}}</span></span></div><br/><br/>
                            <canvas id="danmu-canvas"  :height="windowHeight" :width="windowWidth" style="position:absolute;z-index:9999;"></canvas>
                            <div class="inbox-widget" tabindex="5000"  :style="{'min-height':windowHeight+'px'}"  >
                                    <div class="inbox-item" v-for="row in stream_data">
                                        <p class="inbox-item-author">{{row.content.subject}}&nbsp;&nbsp;&nbsp;&nbsp;{{row.content.body}}</p>
                                         <p class="inbox-item-text" ><span class="badge badge-dark m-r-5 m-l-5" v-for="label in row.content.label">{{label}}</span><p>
                                        <p class="inbox-item-date">{{row.create_time}}</p>
                                    </div>
                            </div>
        </div>
         <div class="row">
                            <div class="col-sm-10 chat-inputbar">
                                <input type="text" v-model="comments"  class="form-control chat-input" placeholder="输入你的评论" @keyup.enter="send_comment">
                            </div>
                            <div class="col-sm-2 chat-send">
                                 <button type="submit" class="btn btn-md btn-primary btn-block waves-effect waves-light" v-on:click="send_comment" ><font-awesome-icon  class="fa m-r-5" icon="comments" />评论</button>
                            </div>
        </div>
        </div>
           <!-- <Modal
              v-model="subscribe_modal"
              title="订阅数据流"
              :closable="true"
              width="80%"
              :height="windowHeight">
                     <div class="row ">
                  <div class="col-lg-3 col-md-6">
                        <div class="widget-simple text-center card-box">
                            <h3 class="text-success counter font-bold mt-0">2562</h3>
                            <p class="text-muted mb-0">全部</p>
                        </div>
                    </div>
              <div class="col-lg-3 col-md-6">
                        <div class="widget-simple text-center card-box">
                            <h3 class="text-success counter font-bold mt-0">2562</h3>
                            <p class="text-muted mb-0">基础监控</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="widget-simple text-center card-box">
                            <h3 class="text-success counter font-bold mt-0">2562</h3>
                            <p class="text-muted mb-0">网络监控</p>
                        </div>
                    </div>
                        <div class="col-lg-3 col-md-6">
                        <div class="widget-simple text-center card-box">
                            <h3 class="text-success counter font-bold mt-0">2562</h3>
                            <p class="text-muted mb-0">数据库</p>
                        </div>
                    </div>
                    </div>
        </Modal> -->
  </div>
</template>
<style lang="less">
.inbox-widget{
  overflow: hidden;
  outline:none
}
.cir {
  list-style: decimal;
}
</style> 
<script>
import _ from "underscore";
import moment from "moment";
//加载弹幕组件
import Manager from '../../components/danmu-dom/manager';
import CanvasManager from '../../components/danmu-canvas/manager.js';

const manager = new Manager();


function remove(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
}

export default {
  data() {
    return {
      comments:"",
      windowWidth: 2000,
      windowHeight:"",
      randomDanmu: [
        '噢',
        '你好',
      ],
      danmuData: [],
      context:null,
      canvasManager: null,
      subscribe_modal: false,
      stream_data: [],
      formItem: {
        select: "",
        switch: false
      },
      vistor: _.uniq([])
    };
  },
  computed: {},
  components: {},
  sockets: {
    connect() {
      $.Notification.notify("success", "top right", "通知", "数据流连接成功");
      this.vistor.push(this.get_username())
    },
    disconnect() {
      $.Notification.notify(
        "error",
        "top right",
        "通知",
        "数据流连接失败,请联系基础组件组"
      );
      this.formItem.switch = false
    }
  },
  methods: {
    //显示订阅的Modal
    display_subscribe: function() {
      this.subscribe_modal = true;
    },
    get_username: function() {
      let username = this.$cookies.get("username");
      return username;
    },
    socket_init: function() {
      this.$socket.emit("join", { username: this.get_username() });
    },
    socket_broadcast: function() {
      let that = this;
      this.$socket.on("hi", function(data) {
        that.vistor.push(data.username);
        $.Notification.notify(
          "info",
          "top right",
          "通知",
          data.username + "加入了TroubuleShooting"
        );
      });
      this.$socket.on("bye", function(data) {
        that.vistor.remove(data.username);
        $.Notification.notify(
          "warning",
          "top right",
          "通知",
          emit_data.username + "离开了TroubuleShooting"
        );
      });
      this.$socket.on("chat",function(data){
        console.log(data)
        that.addMessage(data) 
      })
    },
    sub: function() {
      let that = this;
      if (that.formItem.switch) {
        $.Notification.notify(
          "success",
          "top right",
          "通知",
          "开始订阅实时数据流"
        );
        this.$socket.emit("sub", {
          username: this.get_username(),
          action: "sub"
        });
        this.$socket.on("stream", function(data) {
          if (that.stream_data.length > 20) {
            that.stream_data.shift();
          } else {
            that.stream_data.push(data);
          }
        });
      } else {
        $.Notification.notify(
          "error",
          "top right",
          "通知",
          "停止订阅实时数据流"
        );
        this.$socket.removeAllListeners("stream");
      }
    },
    eraser: function() {
      $.Notification.notify("success", "top right", "通知", "屏幕已清理");
      let that = this;
      that.stream_data = [];
    },
    send_comment:function(){
      this.addMessage(this.comments)
      this.$socket.emit("chat", this.comments);
    },
    init_danmu:function(data){
      manager.on('update', this.updateDanmu);
      const canvas = document.getElementById('danmu-canvas');
      this.context = canvas.getContext('2d');
      this.canvasManager = new CanvasManager({
        context: this.context,
        ratio: devicePixelRatio
      });
    },
    addMessage:function(data) {
      //const { length } = this.randomDanmu;
      //const content = this.randomDanmu[Math.floor(Math.random() * length + 0)];
      console.log('push-->');
      manager.add(data);
      this.canvasManager.add(data); 
    },
    // addMessageMultiple(count) {
    //   //console.log(this.comments)
    //   for (let i = 0; i < count; ++i) {
    //     this.addMessage();
    //   }
    // },
    cleanDanmu() {
      manager.cleanAll();
      this.canvasManager.cleanAll();
    },
    updateDanmu() {
      this.danmuData = manager.getData();
    },
    //自适应屏幕分辨率
    auto_fix_screen:function(){
        switch (window.screen.height){
          case 1080:
            this.windowHeight = 750;
            break;
          case 1440:
            this.windowHeight = 900;
            break;
        }
    }
  },
  mounted() {
    //初始化连接
    this.socket_init();
    //接收广播通知
    this.socket_broadcast();
    //初始化弹幕
    this.init_danmu();
    this.auto_fix_screen();
  },
  filters: {}
};
</script>
