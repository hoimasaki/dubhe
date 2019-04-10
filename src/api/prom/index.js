import generateReqwestPromise from '../../utils/interceptor';

//获取所有的Prometheus列表
export function GetPromNode(Search) {
    return generateReqwestPromise({
        "Action": "GetPromNode",
        "Search":Search
    })
}


//根据Host获取Prometheus监控的目标
export function GetPromTargets(host) {
    return generateReqwestPromise({
        "Action": "GetPromTargets",
        "Host":host
    })
}