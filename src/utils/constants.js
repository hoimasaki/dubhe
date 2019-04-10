//所传状态解释转换

export const alarmStyle = {
    '0': '#009886',
    '1': '#e69900',
    '2': '#ef5350',
    '-1': '#dae6ec',
    'undefined': '#dae6ec',
};

export const alarmClass = {
    '0': 'text-success',
    '1': 'text-warning',
    '2': 'text-danger',
    '-1': 'text-default',
    'undefined': 'text-default'
};

export const ALARM_LABEL_CLASS_MAP = {
    '0': '',
    '1': 'label label-warning',
    '2': 'label label-danger',
    '-1': '',
    'undefined': ''
};

export const alarmIcon = {
    '0': '',
    '1': 'fa fa-exclamation-triangle',
    '2': 'fa fa-exclamation-triangle',
    '-1': '',
    'undefined': '',
};

export const alarmLevel = {
    '0': '正常',
    '1': '警告',
    '2': '严重',
    '-1': '无数据',
    'undefined': '数据异常',
};

export const ezcsProcAlarmLevel = {
    '0': '启动',
    '1': '停止',
    '2': '缺失',
    '-1': '无数据',
};

export const ezcsPbuListAlarmLevel = {
    '0': '在线',
    '2': '离线'
};

export const ezcsPbuListAlarmStyle = {
    '0': '#009886',
    '2': '#ef5350'
};

export const ezcsSystemRunningAlarmStyle = {
    '0': '#009886',
    '1': '#ef5350',
    '2': '#ef5350',
};

export const alarmStatusMap = {
    '0': '未登录',
    '1': '登录',
    // '2': '严重',
    // '-1': '无数据',
    'undefined': '数据异常',

};

export const PROCESS_STATE_MAP = {
    '1': '初始化',
    '2': '正在运行',
    '3': '停止'
};

export const PROCESS_FLAG_MAP = {
    '0': '可选启动',
    '1': '必须启动'
};


export const QUICK_MENU_MAP = [
    {
        name: 'Prometheus管理',
        icon: 'fire',
        module: "prom",
        url: '/app/prom/index',
        type: 'admin'
    },
    {
        name: '简单网络探测',
        icon: 'network-wired',
        module: "net",
        url: '/app/net/index',
        type: 'net'
    },
    {
        name: '简单主机监控',
        icon: 'server',
        module: 'monitor',
        url: '/app/simplemonitor/index',
        type: 'basic'
    },
    {
        name: '事件中心',
        icon: 'envelope',
        module: 'event',
        url: '/app/event/index',
        type: 'general'
    },
    {
        name: '日志中心',
        icon: 'blog',
        module: 'notify',
        url: '/app/notify/index',
        type: 'general'
    },
    {
        name: '流程管理',
        icon: 'stream',
        module: 'test',
        url: '/app/flow/index',
        type: 'test'
    },
    {
        name: '测试项目',
        icon: 'charging-station',
        module: 'test',
        url: '/app/test/index',
        type: 'test'
    },
    {
        name: '资源池管理',
        icon: 'vial',
        module: 'connection',
        url: '/app/test/connection',
        type: 'test'
    }
];

export const QUICK_MENU_TYPE_MAP = {
    general: "全局系统",
    net: "网络",
    basic: "基础设施",
    admin: "系统管理",
    test: "测试系统",
    bigdata:"大数据系统"
}


export const CLUSTER_NAME_MAP = {
    "MTP": "竞价撮合系统",
    "DTP": "期权交易系统",
    "ITP": "港股通",
    "OCG": "港交所",
    "LEVEL2": "行情发布系统",
    "3GSS": "实时监察系统",
    "SDC": "中登公司",
    "DRC": "期权风控系统",
    "EzIR": "消息总线接收系统",
    "IdxCMP": "指数比对系统",
    "ATP":"综合业务系统",
};


