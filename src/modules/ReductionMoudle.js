import reqwest from 'reqwest';
import _ from 'underscore';
import moment from 'moment';
import {
  VerfyAC,
  privateKey,
  user
} from '../utils';
import {
  GetFileCheckReductProfile,
  GetFileCheckReductWaster,
} from '../api/reduction/index.js';

export default {
  state: {
    tradeDate: moment().format('YYYY-MM-DD'),
    tradeDateYesterday: moment(new Date().getTime() - 86400000).format('YYYY-MM-DD'),
    tradeDate2DaysAgo: moment(new Date().getTime() - 172800000).format('YYYY-MM-DD'),
    tradeDate3DaysAgo: moment(new Date().getTime() - 259200000).format('YYYY-MM-DD'),
    tradeDate4DaysAgo: moment(new Date().getTime() - 345600000).format('YYYY-MM-DD'),
    tradeDate5DaysAgo: moment(new Date().getTime() - 432000000).format('YYYY-MM-DD'),
    reductionText: '请选择日期查看减持情况',

    wasteListDate: moment().format('YYYY-MM-DD'),
    member: '',
    wasteListTableData: [],
    pageNo: 1,
    pageSize: 10,
    itemAmount: 0

  },
  mutations: {
    searchReductionInfo(state) {
      GetFileCheckReductProfile(state.tradeDate).then(res => {
        //console.log(JSON.stringify(res) + "==searchReductionInfo");
        if(res.Sets.length < 1) {
          state.reductionText = "此日期无减持情况"
        }else if(res.Sets[0].record == "null"){
          state.reductionText = '无内容';
        }else{
          state.reductionText = res.Sets[0].record;
        }
      })
    },
    searchWasteList(state) {
      GetFileCheckReductWaster(state.wasteListDate, state.pageNo, state.pageSize, state.member).then(res=> {
        //console.log(JSON.stringify(res) + "==searchWasteList");
        state.wasteListTableData = res.Sets;
        state.itemAmount = res.TotalCount;
      });
      
    }
  },
  actions: {},
  getters: {}
}