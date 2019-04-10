import generateReqwestPromise from '../../utils/interceptor';

//获取Prometheus范围内监控数据
export function GetPromDataRange(datasource,query,start,end,step) {
    return generateReqwestPromise({
        "Action": "GetPromDataRange",
        "DataSource": datasource,
        "Start": start,
        "End": end,
        "Query": query,
        "Step": step
    })
}
