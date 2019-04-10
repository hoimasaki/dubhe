<template>
    <!-- Start content -->
    <div>
        <div class="row">
            <button type="button" class="btn btn-primary btn-custom waves-effect w-md waves-light m-b-5" >添加Prometheus节点</button>
        </div>
        <br>
        <div class="row">
            <div class="card-box">
                <div class="input-group col-md-4">
                    <span class="input-group-addon">
                        <i class="fa fa-search"></i>
                    </span>
                    <input v-model="searchKeyword" type="text" name="example-input1-group2" class="form-control" placeholder="搜索节点" v-on:keyup="search()">
                </div>
                <div class="row">
                    <br>
                    <Table size="small" class="node-all-table" :columns="tableColumns" :data="tableData"></Table>
                    <div style="margin: 10px;overflow: hidden">
                        <div style="float: right;">
                            <Page :total="total" :current="pageNo"  show-elevator show-total @on-change="changePage" @on-page-size-change="changePageSize">
                            </Page>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--删除确认对话框-->
        <!-- <Modal v-model="deleteHostModal">
            <p slot="header" style="text-align:center">
                <span>删除确认</span>
            </p>
            <div>
                确定删除主机{{delRowHostName}}吗？
            </div>
            <div slot="footer">
                <Button type="primary" @click="removeHostCertain()">确定</Button>
                <Button type="ghost" @click="deleteCancel()" style="margin-left: 8px">取消</Button>
            </div>
        </Modal> -->
    </div>
</template>

<style lang="less">
.cir {
  list-style: decimal;
}
</style> 
<script>
import { GetPromNode, GetPromTargets } from "../../api/prom";

export default {
  data() {
    return {
      searchKeyword: "",
      tableColumns: [
        {
          title: " ",
          width: 50,
          align: "center",
          render: (h, { row, column, index }) => {
            return h("div", [
              h("i", {
                class: "fa fa-tv",
                style: "cursor:pointer",
                title: "查看监控",
                on: {
                  click: () => {
                    this.viewMonitor(row.host);
                  }
                }
              })
            ]);
          }
        },
        {
          title: "域名",
          key: "domain",
          width: 200
        },
        {
          title: "实例名",
          key: "host",
          width: 200
        },
        {
          title: "IP",
          key: "ip",
          width: 100
        },
        {
          title: "端口",
          key: "port",
          width: 100
        },
        {
          title: "机房",
          key: "idc",
          width: 100
        },
        {
          title: "备注",
          key: "remark",
          width: 200
        },
        {
          title: "操作",
          key: "action",
          width: 150,
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
                      this.showTarget(row.host);
                    }
                  }
                },
                "查看目标"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.removeNode(row.host);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
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
      this.search(this.keyWord, this.$route.params.id);
    },
    changePage: function(pageNo) {
      this.pageNo = pageNo;
      this.search(this.keyWord, this.$route.params.id);
    },
    changePageSize: function(pageSize) {
      this.pageSize = pageSize;
      this.search(this.keyWord, this.$route.params.id);
    },
    changeTableColumns: function() {},
    showTarget: function(host) {
      this.$router.push({
        path: "/app/prom/target",
        query: { host: host }
      });
    },
    removeNode: function(host) {},
    viewMonitor:function(host){
        this.$router.push({
        path: "/app/simplemonitor/dashboard",
        query: { host: host }
      });
    },
    search: function() {
      let Filter = {
        search: this.searchKeyword.replace(/\s/g, "")
      };
      console.log(Filter.search);
      GetPromNode(Filter.search)
        .then(res => {
          return res;
        })
        .then(arr => {
          console.log(arr);
          this.tableData = arr.Sets;
          this.total = arr.Sets.length;
        });
    }
  },
  mounted() {
    this.search();
  },

  filters: {}
};
</script>
