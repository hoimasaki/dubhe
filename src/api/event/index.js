import generateReqwestPromise from '../../utils/interceptor';

//获得告警信息列表
export function GetAlarmList(startTime,endTime,page, pageSize) {
    return generateReqwestPromise({
        "Action": "GetAlarmList",
        "page": parseInt(page),
        "pageSize": parseInt(pageSize),
        "EndTime": parseInt(endTime),
        "StartTime": parseInt(startTime)
    })
}
