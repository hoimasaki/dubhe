/**
 * Created by paul on 2017/7/3.
 */
import generateReqwestPromise from '../../utils/interceptor';

export function EzcsAlertAgg(appId) {
  return generateReqwestPromise({
    Action: "EzcsAlertAgg",
    ProjectId: 1,
    AppId: appId
  })
}
export function EzcsNodeStateAgg(appId) {
  return generateReqwestPromise({
    Action: "EzcsNodeStateAgg",
    ProjectId: 1,
    AppId: appId
  })
}
export function EzcsTotalCountLine(appId) {
  return generateReqwestPromise({
    Action: "EzcsTotalCountLine",
    ProjectId: 1,
    AppId: appId
  })
}
export function EzcsAppIdList() {
  return generateReqwestPromise({
    Action: "EzcsAppIdList",
    ProjectId: 1
  })
}
export function GetEzcsNodeAlarmList(appId,node, page, size ) {
  return generateReqwestPromise({
    Action: "GetEzcsNodeAlarmList",
    Node: node,
    AppId: appId,
    Page: page,
    Size: size
  })
}

export function EzcsNodeOverview(appId, page, size) {
  return generateReqwestPromise({
    Action: "EzcsNodeOverview",
    ProjectId: 1,
    AppId: appId,
    Page: page,
    Size: size
  })
}

export function EzcsPbuList(appId, nodeNum, page, size,orderDesc,tabType) {
  return generateReqwestPromise({
    Action: "EzcsPbuList",
    ProjectId: 1,
    NodeNum: nodeNum,
    AppId: appId,
    Page: page,
    Size: size,
    OrderDesc: orderDesc,
    TabType: tabType
  })
}

export function EzcsSlotList(appId, nodeNum) {
  return generateReqwestPromise({
    Action: "EzcsSlotList",
    ProjectId: 1,
    NodeNum: nodeNum,
    AppId: appId
  })
}

export function EzcsNodeDetailsBot(appId, nodeNum, page, size) {
  return generateReqwestPromise({
    Action: "EzcsNodeDetailsBot",
    ProjectId: 1,
    NodeNum: nodeNum,
    AppId: appId,
    Page: page,
    Size: size
  })
}

export function EzcsGlobalStatistics(appId) {
  return generateReqwestPromise({
    Action: "EzcsGlobalStatistics",
    ProjectId: 1,
    AppId: appId
  })
}

export function EzcsGlobalPerformance(appId) {
  return generateReqwestPromise({
    Action: "EzcsGlobalPerformance",
    ProjectId: 1,
    AppId: appId
  })
}

export function EzcsPerformanceIndex(appId) {
  return generateReqwestPromise({
    Action: "EzcsPerformanceIndex",
    ProjectId: 1,
    AppId: appId
  })
}

export function EzcsWarningInfomation(appId, checkType) {
  return generateReqwestPromise({
    Action: "EzcsWarningInfomation",
    ProjectId: 1,
    AppId: appId,
    CheckType: checkType,
  })
}

export function EzcsZonalStatistic(appId) {
  return generateReqwestPromise({
    Action: "EzcsZonalStatistic",
    ProjectId: 1,
    AppId: appId
  })
}

export function EzcsSystemCheckByNode(appId, nodeNum, checkType) {
  return generateReqwestPromise({
    Action: "EzcsSystemCheckByNode",
    ProjectId: 1,
    AppId: appId,
    NodeNum: nodeNum,
    CheckType: checkType
  })
}

export function EzcsHostDetails(appId, nodeNum) {
  return generateReqwestPromise({
    Action: "EzcsHostDetails",
    ProjectId: 1,
    AppId: appId,
    NodeNum: nodeNum
  })
}

export function EzcsNodeDetailsTop(appId, nodeNum) {
  return generateReqwestPromise({
    Action: "EzcsNodeDetailsTop",
    ProjectId: 1,
    AppId: appId,
    NodeNum: nodeNum
  })
}

export function EzcsXlxs() {
  return generateReqwestPromise({
    Action: "EzcsXlxs",
    ProjectId: 1
  })
}
