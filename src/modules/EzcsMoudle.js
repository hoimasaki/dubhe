import reqwest from 'reqwest';
import _ from 'underscore';
import {
    VerfyAC,
    privateKey
} from '../utils';
import CONFIG from '../../config';

export default {
    state: {
        isSpinShow: false,
        nodeAlarm: {
            alarmTableData: {}
        },
        appId: 0,
        nodeNum: "0",
        headerTitle: "",
        nodeDetail: {
            detailTabIndex: 1,
            configTabIndex: 1,
            isDetailShow: true,
            nodeNum: 0,

            flowVelocity: {
                chartData: {},
            },
            memoryChart: {
                chartData: {},
            },
            nodeConfig: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            clusterConfig: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            progress: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            PBU: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            order: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            router: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },
            memory: {
                pageNo: 1,
                pageSize: 10,
                tableData: {}
            },

        },
    },
    mutations: {

        //查询对应节点的流速
        // getFlowVelocityChart(state, query) {
        //     state.nodeDetail.flowVelocity.chartData = {};
        //     state.isSpinShow = true;
        //     let params = {
        //         "Action": "EzcsNodeDetailsTop" ,
        //         "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        //         "ProjectId": "1",
        //         "AppId": query.appId,
        //         "NodeNum": query.id,
        //     };
        //     reqwest({
        //         url: CONFIG.GATEWAY_BASE_URL,
        //         method: 'post',
        //         data: _.extend(params, {
        //             "Signature": VerfyAC(params, privateKey)
        //         }),
        //         success: function (data) {
        //             //debugger
        //             //console.log(JSON.stringify(data) + "==FlowVelocityChart");
        //             state.isSpinShow = false;
        //             if (data.RetCode != 0) {
        //                 $.Notification.autoHideNotify('error', 'top right', '查询对应节点的流速不成功', '');
        //                 return;
        //             }
        //             state.nodeDetail.flowVelocity.chartData = data;
        //         },
        //         error: (data) => {
        //             $.Notification.autoHideNotify('error', 'top right', '查询对应节点的流速不成功', '');
        //             state.isSpinShow = false;
        //         }
        //     });
        // },

        // //查询对应节点的内存槽
        // getMemoryChart(state, query) {
        //     state.nodeDetail.memoryChart.chartData = {};
        //     state.isSpinShow = true;
        //     let params = {
        //         "Action": "EzcsNodeDetailsBot",
        //         "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
        //         "ProjectId": "1",
        //         "AppId": query.appId,
        //         "NodeNum": query.id,
        //     };
        //     reqwest({
        //         url: CONFIG.GATEWAY_BASE_URL,
        //         method: 'post',
        //         data: _.extend(params, {
        //             "Signature": VerfyAC(params, privateKey)
        //         }),
        //         success: function (data) {
        //             //debugger
        //             //console.log(JSON.stringify(data) + "==MemoryChart");
        //             state.isSpinShow = false;
        //             if (data.RetCode != 0) {
        //                 $.Notification.autoHideNotify('error', 'top right', '查询对应节点的内存槽不成功', '');
        //                 return;
        //             }
        //             state.nodeDetail.memoryChart.chartData = data;
        //         },
        //         error: (data) => {
        //             $.Notification.autoHideNotify('error', 'top right', '查询对应节点的内存槽不成功', '');
        //             state.isSpinShow = false;
        //         }
        //     });
        // },

        //查询节点配置
        getNodeConfig(state, query) {
            state.nodeDetail.nodeConfig.tableData = {};
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsProcArchList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==NodeConfig");
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询节点配置不成功', '');
                        return;
                    }
                    state.nodeDetail.nodeConfig.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询节点配置不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询集群配置
        getClusterConfig(state, query) {
            state.nodeDetail.clusterConfig.tableData = {};
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsConfNodeList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                "Page": state.nodeDetail.clusterConfig.pageNo,
                "Size": state.nodeDetail.clusterConfig.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==clusterConfig");
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询集群配置不成功', '');
                        return;
                    }
                    state.nodeDetail.clusterConfig.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询集群配置不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询进程状态表
        getProgessStatus(state, query) {
            state.nodeDetail.progress.tableData = {};
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsProcList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                "Page": state.nodeDetail.progress.pageNo,
                "Size": state.nodeDetail.progress.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==ProgessStatus");
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询进程状态表不成功', '');
                        return;
                    }
                    state.nodeDetail.progress.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询进程状态表不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询PBU登录表
        getPBULogin(state, query) {
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsPbuList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                "Page": state.nodeDetail.PBU.pageNo,
                "Size": state.nodeDetail.PBU.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    state.nodeDetail.PBU.tableData = {};
                    //debugger
                    //console.log(JSON.stringify(data) + "==PBULogin");
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询PBU登录表不成功', '');
                        return;
                    }
                    state.nodeDetail.PBU.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询PBU登录表不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询订单状态表
        getOrderStatus(state, query) {
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsPbuList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                "Page": state.nodeDetail.order.pageNo,
                "Size": state.nodeDetail.order.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==PBULogin");
                    state.nodeDetail.order.tableData = {};
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询订单状态不成功', '');
                        return;
                    }
                    state.nodeDetail.order.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询订单状态不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询路由表
        getEzcsRouter(state, query) {
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsRouteList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                "Page": state.nodeDetail.router.pageNo,
                "Size": state.nodeDetail.router.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==EzcsRouter");
                    state.nodeDetail.router.tableData = {};
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询路由表不成功', '');
                        return;
                    }
                    state.nodeDetail.router.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询路由表不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询内存槽
        getEzcsMemorySlot(state, query) {
            state.nodeDetail.memory.tableData = {};
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsSlotList",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                "NodeNum": query.id,
                //"Page": state.nodeDetail.memory.pageNo,
                //"Size": state.nodeDetail.memory.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    //console.log(JSON.stringify(data) + "==MemorySlot");
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询内存槽不成功', '');
                        return;
                    }
                    state.nodeDetail.memory.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询内存槽不成功', '');
                    state.isSpinShow = false;
                }
            });
        },

        //查询节点数
        getEzcsNodeStateAgg(state, query) {
            state.nodeDetail.memory.tableData = {};
            state.isSpinShow = true;
            let params = {
                "Action": "EzcsNodeStateAgg",
                "PublicKey": "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
                "ProjectId": "1",
                "AppId": query.appId,
                // "NodeNum": state.nodeNum,
                //"Page": state.nodeDetail.memory.pageNo,
                //"Size": state.nodeDetail.memory.pageSize
            };
            reqwest({
                url: CONFIG.GATEWAY_BASE_URL,
                method: 'post',
                data: _.extend(params, {
                    "Signature": VerfyAC(params, privateKey)
                }),
                success: function (data) {
                    //debugger
                    console.log(JSON.stringify(data));
                    state.isSpinShow = false;
                    if (data.RetCode != 0) {
                        $.Notification.autoHideNotify('error', 'top right', '查询内存槽不成功', '');
                        return;
                    }
                    state.nodeDetail.memory.tableData = data;
                },
                error: (data) => {
                    $.Notification.autoHideNotify('error', 'top right', '查询内存槽不成功', '');
                    state.isSpinShow = false;
                }
            });
        },
    },
    actions: {},
    getters: {}
}