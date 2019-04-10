import reqwest from 'reqwest';
import _ from 'underscore';
import moment from 'moment';
import {
  VerfyAC,
  privateKey
} from '../utils';
import CONFIG from '../../config';

export default {
  state: {
    headerTitle: "",
    updateTime: "",
    isSpinShow: false,
    newFund: {
      pageNo: 1,
      pageSize: 10,
      EzManTableData: [],
      EzParTableData: [],

      choosedTaskId: "",

      detailPageNo: 1,
      detailPageSize: 10,
      detailTableDate: [],
      detailTablePageCount: 0,
    }
  },
  mutations: {

    //查询新基金业务系统电子文件检查
    getNewFundMonitor(state) {
      state.isSpinShow = true;
      let params = {
        "Action": "GetFileCheckTaskState",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "TaskIdArr": ["FUND_JJTP", "FUND_JJWT", "FUND_JJZT", "FUND_JJGD"],
        "DataDate": moment().format('YYYY-MM-DD'),
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {
          "Signature": VerfyAC(params, privateKey)
        }),
        success: function(data) {
          //debugger
          //console.log(JSON.stringify(data) + "==NewFundMonitor");
          state.newFund.EzManTableData = [];
          state.newFund.EzParTableData = [];

          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件检查不成功', '');
            return;
          }

          state.newFund.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');

          for (let i = 0; i < data.Sets.length; i++) {
            if (data.Sets[i].task_id == "FUND_JJGD") {
              state.newFund.EzParTableData.push(data.Sets[i]);
            } else {
              state.newFund.EzManTableData.push(data.Sets[i]);
            }
          }

          //console.log(JSON.stringify(state.newFund.EzParTableData) + "==EzParTableData");
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件检查不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //查询新基金业务系统电子文件详情检查
    getNewFundMonitorDetail(state) {
      state.newFund.detailTableDate = [];
      state.isSpinShow = true;
      let params = {
        "Action": "GetFileCheckTaskDetails",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "TaskId": state.newFund.choosedTaskId,
        "DataDate": moment().format('YYYY-MM-DD'),
        "Page": state.newFund.detailPageNo,
        "Size": state.newFund.detailPageSize,
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {
          "Signature": VerfyAC(params, privateKey)
        }),
        success: function(data) {
          //debugger
          //console.log(JSON.stringify(data) + "==NewFundMonitor");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件详情检查不成功', '');
            return;
          }
          state.newFund.detailTablePageCount = data.Count
          state.newFund.detailTableDate = data.Sets[0].result[0].record;
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件详情检查不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //下载新基金业务系统电子文件
    downloadFundMon(state) {
      let params = {
        "Action": "GetFileCheckTaskDownload",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "TaskId": state.newFund.choosedTaskId,
        "DataDate": moment().format('YYYY-MM-DD'),
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {
          "Signature": VerfyAC(params, privateKey)
        }),
        success: function(data) {
          //debugger
          //console.log(JSON.stringify(data) + "==NewFundMonitor");
          state.isSpinShow = false;
          if (data.RetCode != 0) {
            $.Notification.autoHideNotify('error', 'top right', '下载新基金业务系统电子文件不成功', '');
            return;
          }

          document.getElementById("downloadA").setAttribute("href", data.Sets[0].path);
          document.getElementById("downloadA").setAttribute("download", data.Sets[0].file_name);
          document.getElementById("downloadA").click();
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '下载新基金业务系统电子文件详情检查不成功', '');
          state.isSpinShow = false;
        }
      });
    },

    //更新新基金业务系统电子文件
    updateFundMon(state) {
      //let _this = this;
      let params = {
        "Action": "GetFileCheckTaskUpdate",
        "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        "ProjectId": "1",
        "TaskId": state.newFund.choosedTaskId,
        "DataDate": moment().format('YYYY-MM-DD'),
      };
      reqwest({
        url: CONFIG.GATEWAY_BASE_URL,
        method: 'post',
        data: _.extend(params, {
          "Signature": VerfyAC(params, privateKey)
        }),
        success: function(data) {
          //debugger
          if (data.Sets[0].state == 0) {

            let audio = document.querySelector('#hintVoice');
            audio.pause();

            state.isSpinShow = true;
            let params = {
              "Action": "GetFileCheckTaskState",
              "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
              "ProjectId": "1",
              "TaskIdArr": ["FUND_JJTP", "FUND_JJWT", "FUND_JJZT", "FUND_JJGD"],
              "DataDate": moment().format('YYYY-MM-DD'),
            };
            reqwest({
              url: CONFIG.GATEWAY_BASE_URL,
              method: 'post',
              data: _.extend(params, {
                "Signature": VerfyAC(params, privateKey)
              }),
              success: function(data) {
                //debugger
                //console.log(JSON.stringify(data) + "==NewFundMonitor");
                state.newFund.EzManTableData = [];
                state.newFund.EzParTableData = [];

                state.isSpinShow = false;
                if (data.RetCode != 0) {
                  //$.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件检查不成功', '');
                  return;
                }

                for (let i = 0; i < data.Sets.length; i++) {
                  if (data.Sets[i].task_id == "FUND_JJGD") {
                    state.newFund.EzParTableData.push(data.Sets[i]);
                  } else {
                    state.newFund.EzManTableData.push(data.Sets[i]);
                  }
                }
              },
              error: (data) => {
                $.Notification.autoHideNotify('error', 'top right', '查询新基金业务系统电子文件检查不成功', '');
                state.isSpinShow = false;
              }
            });

            //$.Notification.autoHideNotify('success', 'top right', '已确认收到基金业务文件', '');
          } else {

            $.Notification.autoHideNotify('error', 'top right', '确认收到基金业务文件失败', '');
          }
        },
        error: (data) => {
          $.Notification.autoHideNotify('error', 'top right', '确认收到基金业务文件失败', '');
        }
      });
    }

  },
  actions: {},
  getters: {}
}