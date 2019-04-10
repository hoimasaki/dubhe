import generateReqwestPromise from '../../utils/interceptor';
//过滤查找获取CMDB中的服务器表单信息
export function GetCmdbServerList(Page, Size, Filter) {
    return generateReqwestPromise({
        "Action": "GetCmdbServerList",
        "Page": Page,
        "Size": Size,
        "Filter": Filter,
        "UseCache": 0
    })
}
//获取所有项目列表
export function GetCmdbProjectList(ProjectId = "1") {
    return generateReqwestPromise({
        "Action": "GetCmdbProjectList",
        "ProjectId": ProjectId
    })
}
//根据ID获取CMDB中的单台服务器信息
export function GetCmdbServerInfo(ServerId, UseCache) {
    return generateReqwestPromise({
        "Action": "GetCmdbServerInfo",
        "ProjectId": "1",
        "ServerId": ServerId,
        "UseCache": UseCache
    })
}
//手工添加服务器记录到Cmdb中
export function CreateCmdbServer(Data) {
    return generateReqwestPromise({
        "Action": "CreateCmdbServer",
        "ProjectId": "1",
        "Data": Data
    })
}
//修改CMDB记录
export function ModifyCmdbRecord(Data) {
    return generateReqwestPromise({
        "Action": "ModifyCmdbRecord",
        "ProjectId": "1",
        "Data": Data
    })
}

//删除CMDB记录
export function RemoveCmdbRecord(ServerId) {
    return generateReqwestPromise({
        "Action": "RemoveCmdbRecord",
        "ProjectId": "1",
        "ServerId": ServerId
    })
}
//获取CMDB所有主机名
export function GetCmdbServerHostnames() {
    return generateReqwestPromise({
        "Action": "GetCmdbServerHostnames",
        "UseCache": 0
    })
}
//获取CMDB所有集群
export function GetCmdbCluster() {
    return generateReqwestPromise({
        "Action": "GetCmdbCluster",
        "UseCache": 0
    })
}