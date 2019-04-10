import reqwest from 'reqwest';
import _ from 'underscore';
import {VerfyAC, privateKey} from '../utils';
import CONFIG from '../../config';
import {GetEzeiHistoryEvent} from '../api/ezei';

export default{
  state: {
    tabIndex: 1,
    hostName: [],
    clusterName: 'command',
    clusterFullName: '',

    isModalShow: false,
    isAllClusterShow: false,
    isSpinShow: false,

    allCluTabIndex: 1,


    //路由表数据对象
    routeTable: {
      pageNo: 1,
      pageSize: 10,
      tableDate: {},
      choosedHostName: '',

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false
    },

    //连接表数据对象
    connectTable: {
      pubPageNo: 1,
      pubPageSize: 10,
      pubTableData: {},

      subPageNo: 1,
      subPageSize: 10,
      subTableDate: {},

      choosedConSide: '',
      choosedHostName: '',
      choosedPlatName: '',

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false,
    },

    //主题发布表数据对象
    pubInfo: {
      pageNo: 1,
      pageSize: 10,
      tableDate: {},
      choosedHostName: '',
      choosedPlatName: '',
      choosedPubTopic: '',
      choosedSetId: '',

      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false,
    },

    //集群主机状态检查表数据对象
    hostState: {
      tableDate: {},
      choosedHostName: '',

      detailTableDate: {},
      isDetailShow: false,

      dataTableDate: {},
      commandTableDate: {},
      ocgTableDate: {},

      choosedClusterName: ''
    },

    //主题订阅表数据对象
    subInfo: {
      pageNo: 1,
      pageSize: 10,
      tableDate: {},
      choosedUserName: '',
      choosedHostName: '',

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false,
    },

    //港股通数据对象
    OCG: {
      linePageNo: 1,
      linePageSize: 10,
      lineTableDate: {},

      choosedHostName: '',

      systemPageNo: 1,
      systemPageSize: 10,
      systemTableDate: {},

      memoryPageNo: 1,
      memoryPageSize: 10,
      memoryTableDate: {},

      isLineDetailShow: false,
      isSystemDetailShow: false,
      isMemoryDetailShow: false,

      lineInfoHostNo: 1,
      lineInfoHostSize: 10,
      lineInfoHost: {}
    },

    //指令服务数据对象
    cmdList: {
      pageNo: 1,
      pageSize: 10,
      tableData: {},

      choosedUserName: '',
      choosedStruct: '',

      structData: {},

      detailPageNo: 1,
      detailPageSize: 10,
      structDetailData: {},

      choosedSetId: '',
      choosedTxncod: '',

      isTableShow: true,
      isDetailShow: false,

      statisticData: {},
      statisticDetailData: {},

      isStatisticShow: true,
      isStatisticDetailShow: false,
    },

    statistic: {
      pageNo: 1,
      pageSize: 10,
      tableData: {},

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false,

      detailPageNo: 1,
      detailPageSize: 10,
      choosedUserName: '',
      choosedStruct: ''
    },

    history: {
      pageNo: 1,
      pageSize: 10,
      historyTableData: {},

      startTime: '',
      endTime: ''
    },

    progress: {
      pageNo: 1,
      pageSize: 10,
      tableData: {},

      choosedHostName: '',

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: {},

      isTableShow: true,
      isDetailShow: false,
    }

  },
  mutations: {
    //查询集群主机名
    requestHostName(state) {
      state.hostName = [];
      let params = {
        "Action": "GetEzeiHost",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "ProjectId": "1",
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //debugger
          //console.log(JSON.stringify(data) + "==hostName");
          for (let name of data.Sets) {
            state.hostName.push(name.host_name);
          }
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '集群主机请求不成功', '')
        }
      });
    },

    //查询路由表
    requestRouteTable(state) {
      state.routeTable.tableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiRouteTableAgg",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "Page": state.routeTable.pageNo,
        "Size": state.routeTable.pageSize,
        "ProjectId": "1",
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==routeTableDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '路由表请求不成功', '');
            return;
          }
          state.routeTable.tableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '路由表请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询路由表详情
    requestRouteTableDetail(state) {
      state.routeTable.detailTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiRouteTable",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "HostName": state.routeTable.choosedHostName,
        "Page": state.routeTable.detailPageNo,
        "Size": state.routeTable.detailPageSize,
        "ProjectId": "1",
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==data");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '路由表详情请求不成功', '');
            return;
          }
          state.routeTable.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '路由表详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询连接表发布方
    requestConnectPubTable(state) {
      state.connectTable.pubTableData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiConnListUplink",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.connectTable.pubPageNo,
        "Size": state.connectTable.pubPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '连接表发布方请求不成功', '');
            return;
          }
          state.connectTable.pubTableData = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '连接表发布方请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询连接表订阅方
    requestConnectSubTable(state) {
      state.connectTable.subTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiConnListDownlink",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.connectTable.subPageNo,
        "Size": state.connectTable.subPageSize,
      };
      reqwest({
            url: CONFIG.GATEWAY_BASE_URL,
            method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '连接表订阅方请求不成功', '');
            return;
          }
          state.connectTable.subTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '连接表订阅方请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询连接表详情
    requestConnectTableDetail(state) {
      state.connectTable.detailTableDate = {};
      state.isSpinShow = true;

      let action = '';
      if (state.connectTable.choosedConSide == 'pub') {
        action = 'GetEzeiConnHostUplink';
      } else if (state.connectTable.choosedConSide == 'sub') {
        action = 'GetEzeiConnHostDownlink';
      }

      let params = {
        "Action": action,
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "HostName": state.connectTable.choosedHostName,
        "PlatName": state.connectTable.choosedPlatName,
        "Page": state.connectTable.detailPageNo,
        "Size": state.connectTable.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==ConnectTableDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '连接表详情请求不成功', '');
            return;
          }
          state.connectTable.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '连接表详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询主题发布
    requestPubInfoTable(state) {
      state.pubInfo.tableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiPubTopicList",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "ProjectId": "s",
        "Page": state.pubInfo.pageNo,
        "Size": state.pubInfo.pageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==data");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主题发布请求不成功', '');
            return;
          }
          state.pubInfo.tableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主题发布请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询主题发布详情
    requestPubInfoTableDetail(state) {

      state.pubInfo.detailTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiPubHistory",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "s",
        "ClusterName": state.clusterName,
        "HostName": state.pubInfo.choosedHostName,
        "PlatName": state.pubInfo.choosedPlatName,
        "PubTopic": state.pubInfo.choosedPubTopic,
        "SetId": state.pubInfo.choosedSetId,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==PubInfoTableDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主题发布详情请求不成功', '');
            return;
          }
          state.pubInfo.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主题发布详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询集群主机状态
    checkHostState(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.tableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        //async: false,
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主机状态请求不成功', '');
            return;
          }
          state.hostState.tableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主机状态请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询数据集群主机状态
    checkDataHostState(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.dataTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": 'data',
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        //async: false,
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '数据集群主机状态请求不成功', '');
            return;
          }
          state.hostState.dataTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '数据集群主机状态请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询指令集群主机状态
    checkCommandHostState(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.commandTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": 'command',
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        //async: false,
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '指令集群主机状态请求不成功', '');
            return;
          }
          state.hostState.commandTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '指令集群主机状态请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询沪港通集群主机状态
    checkOcgHostState(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.ocgTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": 'command',
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '请求不成功', '');
            return;
          }
          state.hostState.ocgTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询集群主机状态详情
    checkHostStateDetail(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.detailTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostFinal",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "HostName": state.hostState.choosedHostName,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDateDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主机状态详情请求不成功', '');
            return;
          }
          state.hostState.detailTableDate = data.Sets[0];
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主机状态详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询全部集群主机状态详情
    checkAllHostStateDetail(state) { //继续点击finial 饭餐借口1：预警；-1：未检查 0 ：正常
      state.hostState.detailTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCheckHostFinal",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.hostState.choosedClusterName,
        "HostName": state.hostState.choosedHostName,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==hostStateDateDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '全部主机状态详情请求不成功', '');
            return;
          }
          state.hostState.detailTableDate = data.Sets[0];
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '全部主机状态详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询主题订阅
    getEzeiSubInfo(state) {
      state.subInfo.tableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiSubInfoAgg",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.subInfo.pageNo,
        "Size": state.subInfo.pageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==subInfoTable");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主题订阅请求不成功', '');
            return;
          }
          state.subInfo.tableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主题订阅请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询主题订阅详情
    getEzeiSubInfoDetail(state) {
      state.subInfo.detailTableDate = {};
      state.isSpinShow = true;

      //console.log(state.subInfo)

      let params = {
        "Action": "GetEzeiSubInfo",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "UserName": state.subInfo.choosedUserName,
        "HostName":state.subInfo.choosedHostName,
        "Page": state.subInfo.detailPageNo,
        "Size": state.subInfo.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==subInfoTableDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '主题订阅详情请求不成功', '');
            return;
          }
          state.subInfo.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '主题订阅详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询港股通链路表
    getEzeiOcgLineInfo(state) {
      state.OCG.lineTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiOcgLineInfoList",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.OCG.linePageNo,
        "Size": state.OCG.linePageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //debugger
          //console.log(JSON.stringify(data) + "==OCGLineTableDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '港股通链路表请求不成功', '');
            return;
          }
          state.OCG.lineTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '港股通链路表请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询港股通内存表使用情况
    getEzeiOcgMemoryInfo(state) {
      state.OCG.memoryTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiOcgShmTableList",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "ProjectId": "1",
        "Page": state.OCG.memoryPageNo,
        "Size": state.OCG.memoryPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==OCGMemoryTableDate");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '港股通内存表使用情况请求不成功', '');
            return;
          }
          state.OCG.memoryTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '港股通内存表使用情况请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询港股通系统运行状态
    getEzeiOcgSystemState(state) {
      state.OCG.systemTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiOcgSystemState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": state.clusterName,
        "ProjectId": "1",
        "Page": state.OCG.systemPageNo,
        "Size": state.OCG.systemPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==OCGSystemState");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '港股通系统运行状态请求不成功', '');
            return;
          }
          state.OCG.systemTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '港股通系统运行状态请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询港股通系统运行状态详情
    getEzeiOcgLineInfoHost(state) {
      state.OCG.systemTableDateDetail = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiOcgLineInfoHost",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ClusterName": 'command',
        "ProjectId": "1",
        "Page": state.OCG.lineInfoHostNo,
        "Size": state.OCG.lineInfoHostSize,
        "HostName": state.OCG.choosedUserName
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==OCGSystemState");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            //$.Notification.autoHideNotify('error', 'top right', '港股通系统运行状态请求不成功','');
            return;
          }
          state.OCG.lineInfoHost = data;
        },
        error: (data) => {
          //$.Notification.autoHideNotify('error', 'top right', '港股通系统运行状态请求不成功','');
          state.isSpinShow = false;
        }
      });
    },

    //查询指令集群-指令发送列表
    getEzeiCmdList(state) {
      state.cmdList.tableData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCmdList",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.cmdList.pageNo,
        "Size": state.cmdList.pageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //debugger
          //console.log(JSON.stringify(data) + "==cmdList");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '指令发送列表请求不成功', '');
            return;
          }
          state.cmdList.tableData = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '指令发送列表请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },
    //查询指令集群-指令发送列表详情
    GetEzeiCmdStructList(state) {
      state.cmdList.structData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCmdStructList",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "UserName": state.cmdList.choosedUserName,
        "Struct": state.cmdList.choosedStruct,
        "Page": state.cmdList.detailPageNo,
        "Size": state.cmdList.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==StructList");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '指令发送列表详情请求不成功', '');
            return;
          }
          state.cmdList.structData = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '指令发送列表详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询指令集群-用户收发统计
    getSRStatistic(state) {
      state.statistic.tableData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCmdStateAgg",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "Page": state.statistic.pageNo,
        "Size": state.statistic.pageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==SRStatistic");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '用户收发统计请求不成功', '');
            return;
          }
          state.statistic.tableData = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '用户收发统计请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },
    //查询指令集群-用户收发统计详情
    getSRStatisticDetail(state) {
      state.cmdList.structData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiCmdState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "UserName": state.statistic.choosedUserName,
        "Type": state.statistic.choosedStruct,
        "Page": state.statistic.detailPageNo,
        "Size": state.statistic.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==SRStatisticDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '用户收发统计详情请求不成功', '');
            return;
          }
          state.statistic.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '用户收发统计详情请求不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询集群主机进程状态
    getHostProgressStatus(state) {
      state.progress.tableData = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiProcessListRealtime",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==getHostProgressStatus");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '查询主机进程状态不成功', '');
            return;
          }
          state.progress.tableData = data;

          let tableInfo = state.progress.tableData.Sets;
          let obj = {};
          obj.put = (key, value) => {
            obj[key] = value
          }

          for (let i in tableInfo) {
            let hostNameArr = tableInfo[i].home_name.split(',');
            let stateArr = tableInfo[i].state.split(',');

            for (let j in hostNameArr) {
              obj.put(hostNameArr[j], stateArr[j]);
            }
            _.extend(tableInfo[i], obj);
          }

          state.progress.tableData.Sets = tableInfo;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '查询主机进程状态不成功', '');
          state.isSpinShow = false;
        }
      });
    },
    //查询集群主机进程状态详情
    getHostProgressStatusDetail(state) {
      state.progress.detailTableDate = {};
      state.isSpinShow = true;

      let params = {
        "Action": "GetEzeiProcessHostRealtime",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "ClusterName": state.clusterName,
        "HostName": state.progress.choosedHostName,
        "Page": state.progress.detailPageNo,
        "Size": state.progress.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
        success: function (data) {
          //console.log(JSON.stringify(data) + "==SRStatisticDetail");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '查询主机进程状态详情不成功', '');
            return;
          }
          state.progress.detailTableDate = data;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '查询主机进程状态详情不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询历史预警事件
    getEzeiHistoryEvent(state) {
      state.history.historyTableData = {};
      state.isSpinShow = true;
      //console.log(state.history.startTime);
      
      GetEzeiHistoryEvent (state.history.startTime,state.history.endTime,state.history.pageNo,state.history.pageSize).then(data => {
        state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '查询历史报警事件不成功', '');
            return;
          }
          state.history.historyTableData = data;

      },error => {

      });


      // let params = {
      //   "Action": "GetEzeiHistoryEvent",
      //   "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
      //   "ProjectId": "1",
      //   "StartTime": state.history.startTime,
      //   "EndTime": state.history.endTime,
      //   "Page": state.history.pageNo,
      //   "Size": state.history.pageSize
      // };
      // reqwest({
      //   url: CONFIG.GATEWAY_BASE_URL,
      //   method: 'post',
      //   data: _.extend(params, {"Signature": VerfyAC(params, privateKey)}),
      //   success: function (data) {
      //     //console.log(JSON.stringify(data) + "==History");
      //     state.isSpinShow = false;
      //     if (data.RetCode != 0) {
      //       $.Notification.autoHideNotify('error', 'top right', '查询历史报警事件不成功', '');
      //       return;
      //     }
      //     state.history.historyTableData = data;
      //   },
      // });
    },
  },
  actions: {
    // agree(context,newsid){
    //     // 进行请求,获取点赞后的agree字段属性值
    //     Vue.http.post("http://localhost/agree.php",{newsid:newsid},{emulateJSON:true}).then(function (res) {
    //         // 处理业务
    //         // 调用上面setAgree方法更新点赞数
    //         context.commit("setAgree",res.body.agree);
    //     },function(){})
    // },
    handleTabActive(state) {
      //alert(state.state.tabIndex + "==this.$store.state.ezei.tabIndex");
      //state.state.tabIndex = 3;
    }
  },
  getters: {
    // getNews(state){
    //     return state.newslist.filter(function (news) {
    //         return !news.isdeleted;
    //     })
    // },
  }
}
