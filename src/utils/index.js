/**
 * Created by paul on 2017/6/26.
 */
import _ from 'underscore';
const crypto = require("crypto");

// 登陆用户信息
export const user = {
    profile: {},
    entryUrl: "/app/dashboard"
};

export function extractFromObj(array, ...keys) {

    let res = [];

    keys.map(function (key, index) {
        return res[key] = []
    });

    if (array && array instanceof Array) {
        array.forEach(function (item, index) {

            keys.map(function (key, index) {

                res[key].push(item[key])
            });

        });
    }
    return res;

}

export function HostNameStateMap(tableInfo) {
    let obj = {};
    obj.put = (key, value) => {
        obj[key] = value
    };

    for (let i in tableInfo) {
        let hostNameArr = tableInfo[i].host_name.split(',');
        let stateArr = tableInfo[i].state.split(',');

        for (let j in hostNameArr) {
            obj.put(hostNameArr[j], stateArr[j]);
        }
        _.extend(tableInfo[i], obj);
    }
    return tableInfo;
}

export function hostNameHostNumMap(tableInfo) {
    let obj = {};
    obj.put = (key, value) => {
        obj[key] = value
    }

    for (let i in tableInfo) {
        let hostNameArr = tableInfo[i].host_name.split(',');
        let hostNumArr = tableInfo[i].host_num.split(',');

        for (let j in hostNameArr) {
            obj.put(hostNameArr[j], hostNumArr[j]);
        }
        _.extend(tableInfo[i], obj);
    }
    return tableInfo;
}

const keySort = (params) => {
    let keys = _.keys(params), params_sort = {};
    keys.sort();
    _.each(keys, function (key) {
        params_sort[key] = params[key];
    });
    return params_sort;
};

const sha1 = (str) => {
    let crypto = require("crypto").createHash("sha1");
    return crypto.update(str, 'utf8').digest('hex');
};

export const VerfyAC = (params, private_key) => {
    let signature = params['Signature'],
        params_data = "";
    delete params['Signature'];
    params = keySort(params);
    for (let key in params) {
        params_data += key;
        params_data += params[key];
    }

    signature = sha1(params_data + private_key);
    return signature;
};

export function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}


export function moneyFormat(pay_amount,n) {

    if(String(pay_amount).includes('.')){
        var res = String(pay_amount).split('.');
        return res[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + '.'+ (n===undefined?res[1] :Number(res[1]).toFixed(n));
    }else{
        return String(pay_amount).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
}

export function switchSystemCheck(){
 
    var x = 0;
    var h = new Date().getHours();

    if (h >= 0 && h < 6) {
        // x = "启动前检查";
        x = 0;
    } else if (h >= 6 && h < 9) {
        // x = "盘前检查";
        x = 1;
    } else if (h >= 9 && h < 15) {
        // x = "盘中检查";
        x = 2;
    } else if (h >= 15 && h<22) {
      //  x = "盘后检查";
        x = 3;
    } else if (h >=22) {
        //x = "下一个交易日检查"
        x = 4;
    }
     return x;
}

export function switchEzcsDownloadCheck(){
 
    var y = 0;
    var h = new Date().getHours();

    if (h >= 16) {
        // y = "文件下载";
        y = 1;
    } else {
        // y = "未到文件下载时间";
        y = 0;
    } 
     return y;
}

