import generateReqwestPromise from '../../utils/interceptor';

export function GetEzeipubTopicSummary() {
    return generateReqwestPromise({
        Action: "GetEzeipubTopicSummary",

    })
}

export function GetEzeiDataCluster() {
    return generateReqwestPromise({
        Action: "GetEzeiDataCluster"
    })
}

export function GetEzeiSubTop() {
    return generateReqwestPromise({
        Action: "GetEzeiSubTop",
    })
}

export function GetEzeiPbuTopic() {
    return generateReqwestPromise({
        Action: "GetEzeiPbuTopic",
    })
}

export function GetEzeiCommandCluster() {
    return generateReqwestPromise({
        Action: "GetEzeiCommandCluster",
    })
}
export function GetEzeiSystemStatusCheck() {
    return generateReqwestPromise({
        Action: "GetEzeiSystemStatusCheck"
    });
}

export function GetEzeiHistoryEvent(StartTime, EndTime, Page, Size) {
    return generateReqwestPromise({
        "Action": "GetEzeiHistoryEvent",
        StartTime,
        EndTime,
        Page,
        Size
    });
}

export function GetEzeiLastUpdate() {
    return generateReqwestPromise({
        Action: "GetEzeiLastUpdate",
        DataType: "index"
    });
}
