import reqwest from 'reqwest';
import _ from 'underscore';
import moment from 'moment';
import {
  VerfyAC,
  privateKey,
  user
} from '../utils';
import CONFIG from '../../config';
import {
  DocFlowOverAll,
  DocFlowWarnningTask,
  DocFlowTaskDocSerial
} from '../api/docFlow/index.js';

export default {
  state: {
    beginDate: moment(new Date().getTime() - 86400000).format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    dateRange: [moment(new Date().getTime() - 86400000).format('YYYY-MM-DD'),moment().format('YYYY-MM-DD')],

    orgId: -1,
    transferType: 0, //0:发送，1：接收
    taskLevel: -1, //-1:全部，9：紧急，1：普通
    searchStage: 9, //9:全部，3:已执行，2：未执行
    pageNo: 1,
    pageSize: 10,
    pageItemCount: 0,
    taskId: "",

    choosedDepartment: "全部部门",
    choosedType: "全部状态",
    tabIndex: 1, //1:全部，2：紧急，3：普通
    taskHistoryList: [],

    receivedTaskCount: 0,
    receivedEmergencyTaskCount: 0,
    receivedCompleteTaskCount: 0,
    receivedUncompleteTaskCount: 0,

    sendTaskCount: 0,
    sendEmergencyTaskCount: 0,
    sendSignedTaskCount: 0,
    sendUnsignedTaskCount: 0,

    sendDepartmentInfo: [],
    receivedDepartmentInfo: [],
    mailProcessDetailInfo: [],
    mailOperationLog: [],

    logUnfoldShowList: [],
    choosedTaskId: "",
    choosedIndex: -1,

    searchTaskId: null,
    searchTaskName: null,

    isDirectionShow: true,

  },
  mutations: {

    //查询所有信息
    searchDocFlowInfo(state) {
      state.tabIndex = 1;
      state.orgId = -1;
      state.taskLevel = -1;
      state.searchStage = 9;
      state.pageNo = 1;
      state.choosedDepartment = "全部部门";
      state.choosedType = "全部状态";

      DocFlowOverAll(state.orgId, state.beginDate, state.endDate, 0, user.profile.username).then(res => {
        //console.log(JSON.stringify(res) + "==DocFlowOverAllSend");
        if(res.Sets.code != 200) {
          //$.Notification.autoHideNotify('error', 'top right', res.Sets.message, '');
          return;
        }

        state.sendDepartmentInfo = res.Sets.value.result.slice(1);
        state.sendTaskCount = res.Sets.value.result[0].totalCount;
        state.sendSignedTaskCount = res.Sets.value.result[0].count1;
        state.sendUnsignedTaskCount = res.Sets.value.result[0].count2;
        state.sendEmergencyTaskCount = res.Sets.value.result[0].count3;

        if(res.Sets.value.level == 2) {
          state.isDirectionShow = true;
        }else{
          state.isDirectionShow = false;
        }

      });
      DocFlowOverAll(state.orgId, state.beginDate, state.endDate, 1, user.profile.username).then(res => {
        //console.log(JSON.stringify(res) + "==DocFlowOverAllReceived");
        if(res.Sets.code != 200) {
          //$.Notification.autoHideNotify('error', 'top right', res.Sets.message, '');
          return;
        }

        state.receivedDepartmentInfo = res.Sets.value.result.slice(1);
        state.receivedTaskCount = res.Sets.value.result[0].totalCount;
        state.receivedCompleteTaskCount = res.Sets.value.result[0].count1;
        state.receivedUncompleteTaskCount = res.Sets.value.result[0].count2;
        state.receivedEmergencyTaskCount = res.Sets.value.result[0].count3;

      });
      DocFlowWarnningTask(state.orgId, state.searchTaskId, state.searchTaskName, state.taskLevel, state.beginDate, state.endDate,
        state.searchStage, state.transferType, state.pageNo, state.pageSize, user.profile.username).then(res => {
        //console.log(JSON.stringify(res) + "==DocFlowWarnningTask");
        if(res.Sets.code != 200) {
          $.Notification.autoHideNotify('error', 'top right', res.Sets.message, '');
          return;
        }

        state.logUnfoldShowList = [];
        if(res.Sets.value.result == null) {
          state.mailProcessDetailInfo = [];
        }else{
          state.mailProcessDetailInfo = res.Sets.value.result;
        }
        state.mailProcessDetailInfo = res.Sets.value.result;
        state.pageItemCount = res.Sets.value.count;

      });
    },

    //查询通知单历时详情
    searchMailProcessDetail(state) {
      DocFlowWarnningTask(state.orgId, state.searchTaskId, state.searchTaskName, state.taskLevel, state.beginDate, state.endDate,
        state.searchStage, state.transferType, state.pageNo, state.pageSize, user.profile.username).then(res => {
        //console.log(JSON.stringify(res) + "==DocFlowWarnningTask");
        if(res.Sets.code != 200) {
          $.Notification.autoHideNotify('error', 'top right', res.Sets.message, '');
          return;
        }

        state.logUnfoldShowList = [];
        if(res.Sets.value.result == null) {
          state.mailProcessDetailInfo = [];
        }else{
          state.mailProcessDetailInfo = res.Sets.value.result;
        }
        state.pageItemCount = res.Sets.value.count;
      });
    },

    //查询对应通知单的操作记录
    searchOperationLog(state) {
      let swapArr = [];
      if(state.logUnfoldShowList[state.choosedIndex] != true) {
        swapArr[state.choosedIndex] = true;

        DocFlowTaskDocSerial(state.choosedTaskId, user.profile.username).then(res => {
          if(res.Sets.code != 200) {
            $.Notification.autoHideNotify('error', 'top right', res.Sets.message, '');
            return;
          }
          state.mailOperationLog = res.Sets.value;
        });
      }else{
        swapArr[state.choosedIndex] = false;
      }

      state.logUnfoldShowList = swapArr;
    }

  },
  actions: {},
  getters: {}
}