/**
 * Created by paul on 2017/6/5.
 */
// 配置信息

const path = require("path");

module.exports = {
    APP_PATH: path.resolve(__dirname, '../src/main.js'),
    OUTPUT_PATH: path.resolve(__dirname, '../dist'),
    HTML_TEMPLATE_PATH: path.resolve(__dirname, '../src/html'),
    PUBLIC_KEY: "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubtuhui@bilibili.com",
    PRIVATE_KEY: "32e9a1b4827fc4e3c614a5abbdd162a9ac780264",
    INTERVAL_TIME: 10000,
    GATEWAY_BASE_URL:getGatewayBaseUrlByEnv(process.env.DEPLOYMENT_ENV),
};

function getGatewayBaseUrlByEnv(env){

     switch (env) {
            case "production":
                return "http://106.2.11.171:6200";
            default:
                return "http://106.2.11.171:6200";
        }
}
