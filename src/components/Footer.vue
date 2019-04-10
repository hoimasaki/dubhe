<template>
    <div>
        <footer  class="footer text-right" style="font-size:14px">
            <b>
                <font class="text-primary footer_time">北京时间：{{tday}} </font>
                <font class="text-success footer_remark">(在线时段)</font>
            </b>
            <!-- &nbsp;&nbsp;|&nbsp;&nbsp;上交所运营检测中心 <i class="fa fa-copyright"></i> 版权所有-->
        </footer>
        <button @click="showFooter=!showFooter" class="footer-btn btn btn-inverse waves-effect waves-light ">   <font-awesome-icon icon="clock" /></button>

    </div>
</template>

<style>
.footer_time {
  font-size: 16px;
}
.footer_remark {
  font-size: 16px;
}
.footer-btn {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 200;
}
</style>
<script>
import moment from "moment";
import reqwest from "reqwest";
import { VerfyAC, privateKey } from "../utils";
import CONFIG from "../../config";
import _ from "underscore";

export default {
  data() {
    return {
      tday: "",
      NoMarket: "",
      inTimeRange: "",
      showFooter: true
    };
  },
  computed: {},
  methods: {
    clock() {
      let t = moment().format("YYYY-MM-DD HH:mm:ss");

      let d = moment().format("YYYY-MM-DD");

      this.inTimeRange = moment().isBetween(
        moment(`${d} 09:15:00`),
        moment(`${d} 15:00:00`)
      );

      this.tday = t;
    }
  },
  mounted() {
    let tradeDay = setInterval(this.clock, 1000);
    let that = this;

    let NoMarketParams = {
      Action: "GetNoMarket",
      PublicKey:
        "9c178e51a7d4dc8aa1dbef0c790b06e7574c4d0etracehubhtu@sse.com.cn",
      ProjectId: "1"
    };

    reqwest({
      url: CONFIG.GATEWAY_BASE_URL,
      method: "post",
      data: _.extend(NoMarketParams, {
        Signature: VerfyAC(NoMarketParams, privateKey)
      }),
      success: function(data) {
        that.NoMarket = data;
      }
    });
  }
};
</script>

