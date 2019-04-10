import reqwest from 'reqwest';
import CONFIG from '../../config';
import {
  VerfyAC
} from './index';

export default function generateReqwestPromise(params) {

  const commonParams = {
    ...params,
    PublicKey: CONFIG.PUBLIC_KEY
  };

  return reqwest({
    //crossOrigin: true,
    //withCredentials: true,
    url: `${CONFIG.GATEWAY_BASE_URL}`,
    method: 'post',
    data: {
      ...commonParams,
      Signature: VerfyAC(commonParams, CONFIG.PRIVATE_KEY),
    }
  })
}

// 请求request拦截
// axios.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// 请求response拦截
reqwest.ajaxSetup({
  dataFilter: function(response, type) {
    //console.log('1212');
    return response;
  }
})


