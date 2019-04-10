<template>
       <div class="row">
            <div class="card-box">
                <div class="input-group col-md-4">
                    <span class="input-group-addon">
                        <i class="fa fa-search"></i>
                    </span>
                    <input v-model="searchKeyword" type="text" name="example-input1-group2" class="form-control" placeholder="搜索" v-on:keyup="search()">
                </div>
                <div class="row">
                    <br>
                    <Table size="small" class="node-all-table" :loading="loading" :columns="tableColumns" :data="tableData"></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="total" :current="pageNo"  show-elevator show-total @on-change="changePage" @on-page-size-change="changePageSize">
                            </Page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<style lang="less">
.cir {
  list-style: decimal;
}
</style> 
<script>
import { GetPromNode, GetPromTargets } from "../../api/prom";
import moment from "moment";

export default {
  data() {
    return {
      editInfo:false,
      loading: true,
      searchKeyword: "",
      tableColumns: [
        {
          title: "采集目标",
          key: "address",
          width: 120
        },
        {
          title: "配置文件名",
          key: "file",
          width: 280,
          render: (h, { row, column, index }) => {
            return h("div", this.$route.query.host + ":" + row.file);
          }
        },
        {
          title: "任务名",
          key: "job",
          width: 80,
          render: (h, { row, column, index }) => {
            switch (row.job) {
              case "node_exporter":
                return h("span", { class: "label label-dark" }, row.job);
                break;
              case "mysql_exporter":
                return h("span", { class: "label label-warning" }, row.job);
                break;
              default:
                return h("span", { class: "label label-default" }, row.job);
            }
          }
        },
        {
          title: "最近报错",
          key: "lastError",
          width: 250
        },
        {
          title: "最近采集时间",
          key: "lastScrape",
          width: 100,
          render: (h, { row, column, index }) => {
            return h(
              "div",
              moment(row.lastScrape).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "状态",
          key: "status",
          width: 50,
          render: (h, { row, column, index }) => {
            switch (row.status) {
              case "down":
                return h("span", { class: "label label-success" }, "在线");
                break;
              case "up":
                return h("span", { class: "label label-danger" }, "离线");
                break;
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 50,
          align: "center",
          render: (h, { row, column, index }) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.showModal()
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ],
      tableData: [],
      pageNo: 1,
      pageSize: 50,
      total: 50,
      Filter: []
    };
  },
  computed: {},
  components: {},
  methods: {
    handleInputChange: function(event) {
      this.keyWord = event.target.value;
      this.pageNo = 1;
      this.pageSize = 10;
      this.search();
    },
    changePage: function(pageNo) {
      this.pageNo = pageNo;
      this.search();
    },
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.search();
    },
    changeTableColumns: function() {},
    showModal:function(){
       $.Notification.notify('white', 'top right', '提醒', '暂不支持页面操作，请登录到堡垒机修改')
    },
    search: function() {
      let Filter = {
        search: this.searchKeyword.replace(/\s/g, "")
      };
      GetPromTargets(this.$route.query.host)
        .then(res => {
          return res;
        })
        .then(arr => {
          this.loading = false;
          this.tableData = arr.Sets.slice(0, 50);
          this.total = 50;
        });
    }
  },
  mounted() {
    this.search();
  },

  filters: {}
};
</script>
