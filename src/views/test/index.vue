<template>
    <div class="content-page">
        <div class="content">
            <div class="container">
                <Row type="flex" justify="space-around" class="code-row-bg">
                    <Col span="5">
                        <div style="text-align:center" class="widget-simple-chart card-box bg-secondary text-white">
                            <p>CPU核数量</p>
                            <p class="CpuNum">Content of card</p>
                        </div>
                    </Col>
                    <Col span="5">
                        <div style="text-align:center" class="widget-simple-chart card-box bg-primary text-white">
                            <p>内存容量</p>
                            <p class="MemoryCapacity">Content of card</p>
                        </div>
                    </Col>
                    <Col span="5">
                        <div style="text-align:center" class="widget-simple-chart card-box bg-success text-white">
                            <p>磁盘容量</p>
                            <p class="diskSize">Content of card</p>
                        </div>
                    </Col>
                     <Col span="5">
                        <div style="text-align:center" class="widget-simple-chart card-box bg-danger text-white">
                            <p>服务器数量</p>
                            <p class="servicerNum">Content of card</p>
                        </div>
                    </Col>
                </Row>
                 
                <div class="card-box mt2" style="overflow: hidden">
                        
                   
                    <div class="input-group col-md-4" style="float:right;z-index: 99;">
                        
                        <Input type="text" name="example-input1-group2" placeholder="输入机器名或IP地址进行搜索" v-on:keyup="search()" id="search" v-model="search_value">
                            <select slot="prepend" style="width:50px;border:none" class="bg-secondary text-white search_type">
                                <option value="0">模糊</option>
                                <option value="1">精准</option>
                            </select>
                            <Button slot="append" icon="ios-search" class="input-group-addon" id="search_btn"></Button>
                        </Input>
                    </div>
                    <Tabs type="card" value="tab1" ref="tabs" id="TabelList">
                        
                        <TabPane label="全部" name="tab1">
                           <div class="row">
                                <br>
                                <Table stripe :columns="tableColumns" :data="tableData" size="small" class="node-all-table bg-inverse" :loading="loading01"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="dataCount1" :page-size="this.pageSize" :current.sync="curPage" show-total  @on-change="changepage"></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="离线节点" name="offline">
                            <div class="row">
                                <br>
                                <Table stripe :columns="tableColumns2" :data="tableData2" size="small" class="node-all-table" :loading="loading02"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="dataCount2" :page-size="this.pageSize" show-total  @on-change="changepage2" :current.sync="curPage2"></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                        <TabPane label="保修节点" name="repairing">
                            <div class="row">
                                <br>
                                <Table stripe :columns="tableColumns3" :data="tableData3" size="small" class="node-all-table" :loading="loading03"></Table>
                                <div style="margin: 10px;overflow: hidden">
                                    <div style="float: right;">
                                        <Page :total="dataCount3" :page-size="this.pageSize" show-total  @on-change="changepage3" :current.sync="curPage3"></Page>
                                    </div>
                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                    
                </div>
            </div>
            
            <Modal
                v-model="modal1"
                title="报修主机"
                @on-ok="ok"
                width="800"
                :loading="loading"
                >
                
                 <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                     <p style="color: #98a6ad;font-size: 14px;margin-bottom: 3%;margin-left: 1.5%;">报修主机：<span class="hostType">hzxs-prometheus-03</span></p>
                    <FormItem label="报修类型" required>
                        <select class="form-control WarrantyType" placeholder="报修类型" v-model="formValidate.select">
                            <option value="硬盘">硬盘</option>
                            <option value="内存">内存</option>
                            <option value="CPU">CPU</option>
                            <option value="Raid控制器">Raid控制器</option>
                            <option value="网卡">网卡</option>
                            <option value="PCIE">PCIE</option>
                            <option value="主板">主板</option>
                            <option value="其他">其他</option>
                        </select>
                    </FormItem>
                    <FormItem label="报修描述" prop="desc" required>
                        <textarea class="form-control" id="field-7" placeholder="报修描述" v-model="formValidate.desc" style="height:150px"></textarea>
                    </FormItem>
                 </Form>
            </Modal>
        </div>
        
    </div>
</template>
<style lang="less">
.cir {
    list-style: decimal;
}
.bg-secondary{
    background-color: #6c757d!important;
}
.bg-inverse{
    background-color: #4c5667 !important;
}
.mt2{
   margin-top: 2%;
}
.col-98{
    color: #98a6ad !important;
}
.row {
    margin-right:0 !important;
    margin-left:0 !important;
}
.ivu-input-group-prepend{
    background-color: #6c757d !important;
    border: none;
}
.ivu-tabs-nav-wrap{
    float: left;
}
.ivu-tabs {
    -moz-box-sizing: border-box !important;
    overflow: visible !important;
}
.ivu-tabs-content-animated{
    margin-top: 1.5%;
}
.ivu-btn:focus {
    box-shadow:none !important;
}
.ivu-input-group-append, .ivu-input-group-prepend {
    color: #fff !important;
    font-weight: bold;
    background-color: #6c757d !important;
    border: 1px solid #6c757d !important;
}
.badge {
    border-radius: 5px !important;
}
.ivu-progress-success .ivu-progress-bg{
    background-color: #ed4014 !important;
}
.content-page {
    padding-left:5% !important;
}
.ivu-table {
    background-color: #323b44 !important;
}
.content-page .content {
    padding:20px 10px 0px 0px !important;
}
</style> 
<script>
import $ from 'jquery';
import bytes from 'bytes';
import { setTimeout } from 'timers';
let testData=[];

export default {
    data() {
        return {
           modal1: false,
           loading: true,
           search_value: '',
           cup:0,
           status_tab:'',
           ajaxHistoryData:[],
           ajaxHistoryData2:[],
           ajaxHistoryData3:[],
           // 初始化信息总条数
           dataCount1:0,
           dataCount2:0,
           dataCount3:0,
            // 每页显示多少条
            pageSize:10,
            curPage:1,//当前页码
            curPage2:1,
            curPage3:1,
            totalPage:0,//总页数

            //表格是否加载过程
            loading01:true,
            loading02:true,
            loading03:true,

           //表单初始化、表单验证规则
           formValidate: {
                select: '硬盘',
                desc: ''
            },
            ruleValidate: {
                city: [
                    { required: true, message: '请选择报修类型', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写报修描述', trigger: 'blur' }
                ]
            },
            //表格
            tableColumns: [
                    {
                        title: '机器名',
                        key: 'hostname',
                    },
                    {
                        title: 'IP地址',
                        key: 'ip'
                    },
                    {
                        title: '硬件资源',
                        key: 'resource',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                       margin:'8px 0',
                                    },
                                }, 'cpu:'+this.ajaxHistoryData[params.index].cpu),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                    
                                    },
                                }, 'mem:'+this.ajaxHistoryData[params.index].memory),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                       margin:'8px 0',
                                    },
                                }, 'disk:'+this.ajaxHistoryData[params.index].disk),
                            ]);
                        }
                    },
                    {
                        title: 'agent版本',
                        key: 'version'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let _this=this;
                                let label_status=_this.ajaxHistoryData[params.index].status
                                let color =  label_status=== 'offline' ? 'badge label-table badge-danger' : label_status === 'online' ? 'badge label label-success' : 'badge label badge-warning';
    
                                return h("span", { class: color }, _this.ajaxHistoryData[params.index].status);
                            
                        }
                    },
                    {
                        title: 'cpu使用率',
                        key: 'cpu',
                        render: (h, params) => {
                            let _this=this;
                            if(_this.ajaxHistoryData[params.index].cpu_usage){
                                const numerator = _this.ajaxHistoryData[params.index].cpu_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData[params.index].cpu_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                return h('Progress',{props:{
                                    percent:percent,
                                    role:"progressbar"
                                }})
                            }else{
                                return h('h4','0/0')
                            }
                                
                        }
                    },
                    {
                        title: '内存使用率',
                        key: 'memory',
                        render: (h, params) => {
                            let _this=this;
                            if(_this.ajaxHistoryData[params.index].memory_usage){
                               const numerator = _this.ajaxHistoryData[params.index].memory_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData[params.index].memory_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                                return h('Poptip', {
                                    props: {
                                        trigger:"hover",
                                        content: Poptip_val
                                    }
                                },
                                    [h('Progress',{props:{
                                        percent:percent,
                                        role:"progressbar"
                                    }})
                                ]);
                            }else{
                                return h('h4','0/0')
                            }
                                
                        }
                    },
                    {
                        title: '磁盘使用率',
                        key: 'disk',
                        render: (h, params) => {
                            let _this=this;
                            if(_this.ajaxHistoryData[params.index].disk_usage){
                                const numerator = _this.ajaxHistoryData[params.index].disk_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData[params.index].disk_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                                return h('Poptip', {
                                    props: {
                                        trigger:"hover",
                                        content: Poptip_val
                                    }
                                },
                                    [h('Progress',{props:{
                                        percent:percent,
                                        role:"progressbar"
                                    }})
                                ]);
                            }else{
                                return h('h4','0/0')
                            }
                                
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:() => {
                                            this.modal1 = true;
                                            //console.log(params.row.name)
                                            $('.hostType').html(params.row.hostname)
                                        }
                                    }
                                }, '送保'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirm(params.row.ip);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
           tableColumns2: [
                    {
                        title: '机器名',
                        key: 'hostname',
                    },
                    {
                        title: 'IP地址',
                        key: 'ip'
                    },
                    {
                        title: '硬件资源',
                        key: 'resource',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                       margin:'8px 0',
                                    },
                                }, 'cpu:'+this.ajaxHistoryData2[params.index].cpu),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                    
                                    },
                                }, 'mem:'+this.ajaxHistoryData2[params.index].memory),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                       margin:'8px 0',
                                    },
                                }, 'disk:'+this.ajaxHistoryData2[params.index].disk),
                            ]);
                        }
                    },
                    {
                        title: 'agent版本',
                        key: 'version'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let _this=this;
                               let label_status=_this.ajaxHistoryData2[params.index].status
                               let color =  label_status=== 'offline' ? 'badge label-table badge-danger' : label_status === 'online' ? 'badge label label-success' : 'badge label badge-warning';
                               return h("span", { class: color }, _this.ajaxHistoryData2[params.index].status);
                        }
                    },
                    {
                        title: 'cpu使用率',
                        key: 'cpu',
                        render: (h, params) => {
                            let _this=this;
                                const numerator = _this.ajaxHistoryData2[params.index].cpu_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData2[params.index].cpu_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                return h('Progress',{props:{
                                    percent:percent,
                                    role:"progressbar"
                                }})
                        }
                    },
                    {
                        title: '内存使用率',
                        key: 'memory',
                        render: (h, params) => {
                            let _this=this;
                                const numerator = _this.ajaxHistoryData2[params.index].memory_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData2[params.index].memory_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                                return h('Poptip', {
                                    props: {
                                        trigger:"hover",
                                        content: Poptip_val
                                    }
                                },
                                    [h('Progress',{props:{
                                        percent:percent,
                                        role:"progressbar"
                                    }})
                                ]);
                        }
                    },
                    {
                        title: '磁盘使用率',
                        key: 'disk',
                        render: (h, params) => {
                            let _this=this;
                                const numerator = _this.ajaxHistoryData2[params.index].disk_usage.split('/')[0] || 0;
                                const denominator = _this.ajaxHistoryData2[params.index].disk_usage.split('/')[1] || 0;
                                const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                                let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                                return h('Poptip', {
                                    props: {
                                        trigger:"hover",
                                        content: Poptip_val
                                    }
                                },
                                    [h('Progress',{props:{
                                        percent:percent,
                                        role:"progressbar"
                                    }})
                                ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:() => {
                                            this.modal1 = true;
                                            //console.log(params.row.name)
                                            $('.hostType').html(params.row.hostname)
                                        }
                                    }
                                }, '送保'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirm(params.row.ip);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableColumns3: [
                    {
                        title: '机器名',
                        key: 'hostname',
                    },
                    {
                        title: 'IP地址',
                        key: 'ip'
                    },
                    {
                        title: '硬件资源',
                        key: 'resource',
                        render: (h, params) => {
                            return h('div', [
                                h('p', {
                                    style: {
                                      margin:'8px 0',
                                    },
                                }, 'cpu:'+this.ajaxHistoryData3[params.index].cpu),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                    
                                    },
                                }, 'mem:'+this.ajaxHistoryData3[params.index].memory),
                                h('div', {
                                    style: {
                                        display: 'block',height: '1px',width: '70%',margin:'10px 0',clear:'both',background:'#eee' 
                                    },
                                }),
                                h('p', {
                                    style: {
                                      margin:'8px 0',
                                    },
                                }, 'disk:'+this.ajaxHistoryData3[params.index].disk),
                            ]);
                        }
                    },
                    {
                        title: 'agent版本',
                        key: 'version'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            let _this=this;
                                const row = params.row;
                                let label_status=_this.ajaxHistoryData3[params.index].status
                                let color =  label_status=== 'offline' ? 'badge label-table badge-danger' : label_status === 'online' ? 'badge label label-success' : 'badge label badge-warning';

                                return h("span", { class: color}, _this.ajaxHistoryData3[params.index].status);
                        }
                    },
                    {
                        title: 'cpu使用率',
                        key: 'cpu',
                        render: (h, params) => {
                            const numerator = this.ajaxHistoryData3[params.index].cpu_usage.split('/')[0] || 0;
                            const denominator = this.ajaxHistoryData3[params.index].cpu_usage.split('/')[1] || 0;
                            const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                            return h('Progress',{props:{
                                percent:percent,
                                role:"progressbar"
                            }})
                        }
                    },
                    {
                        title: '内存使用率',
                        key: 'memory',
                        render: (h, params) => {
                            const numerator = this.ajaxHistoryData3[params.index].memory_usage.split('/')[0] || 0;
                            const denominator = this.ajaxHistoryData3[params.index].memory_usage.split('/')[1] || 0;
                            const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                            let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                            return h('Poptip', {
                                props: {
                                    trigger:"hover",
                                    content: Poptip_val
                                }
                            },
                                [h('Progress',{props:{
                                    percent:percent,
                                    role:"progressbar"
                                }})
                            ]);
                        }
                    },
                    {
                        title: '磁盘使用率',
                        key: 'disk',
                        render: (h, params) => {
                            const numerator = this.ajaxHistoryData3[params.index].disk_usage.split('/')[0] || 0;
                            const denominator = this.ajaxHistoryData3[params.index].disk_usage.split('/')[1] || 0;
                            const percent = denominator == 0 ? 0 : Math.round((Number(numerator) / Number(denominator)) * 100);
                            let Poptip_val=`${bytes(Number(numerator), {decimalPlaces: 1})} / ${bytes(Number(denominator), {decimalPlaces: 1})}`
                            return h('Poptip', {
                                props: {
                                    trigger:"hover",
                                    content: Poptip_val
                                }
                            },
                                [h('Progress',{props:{
                                    percent:percent,
                                    role:"progressbar"
                                }})
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click:() => {
                                            this.modal1 = true;
                                            //console.log(params.row.name)
                                            $('.hostType').html(params.row.hostname)
                                        }
                                    }
                                }, '送保'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.confirm(params.row.ip);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                tableData: [
                ],
                tableData2: [
                ],
                tableData3: [
                ]
        }
    },
    methods: {
        //报修主机表单点击确认
        ok () {
            setTimeout(() => {
                this.handleSubmit('formValidate')
                if(this.loading){
                   this.loading = false;
                }else{
                  this.loading = true;
                }
                
            }, 2000);
            
        },
        //表单提交
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.RepairHost();
                    
                } else {
                    this.$Message.error('提交失败!');
                }
            })
        },
        //确认删除的弹框
        confirm (IP) {
            this.$Modal.confirm({
                title: 'Title',
                content: '<p>确认要删除该主机？</p>',
                onOk: () => {
                    this.DelHost(IP)
                },
                onCancel: () => {
                    this.$Message.info('取消成功');
                }
            });
        },
        //获取所有主机列表
        AllHostList(item){
           let selt=this
           selt.loading01=true;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/',
               type:'get',
               data:item,
               success:function(data){
                 console.log(data);
                 selt.loading01=false;
                 selt.ajaxHistoryData=data.data
                 selt.dataCount1 =data.count
                 selt.tableData=data.data
                 //selt.handleListApproveHistory('all',data.data);
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        //获取所有主机信息
        totalHost(){
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/total',
               type:'get',
               success:function(data){
                 console.log(data)
                 $('.CpuNum').html(data.data.total_cpu);
                 $('.MemoryCapacity').html(data.data.total_memory);
                 $('.diskSize').html(data.data.total_disk);
                 $('.servicerNum').html(data.data.total_host);
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        changePageSize: function(pageSize) {
            this.pageSize = pageSize;
            this.search();
        },
        //报修主机
       RepairHost(){
           let _this=this;
           _this.loading03=true;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/repair',
               type:'put',
               data:{
                "hostname": $('.hostType').html(),
                "desc": $('textarea').val(),
                "errtype": $(".WarrantyType  option:selected").text()
               },
               success:function(data){
                 console.log(data);
                 _this.$Message.success('提交成功!');
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        //删除主机
        DelHost(IP){
           let _this=this;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/'+IP,
               type:'DELETE',
               success:function(data){
                 console.log(data)
                 _this.$Message.info('删除成功');
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        //保修节点
        repairList(item){
           let _this=this;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/search?status=repairing',
               type:'get',
               data:item,
               success:function(data){
                 console.log(data)
                 _this.loading03=false;
                 _this.ajaxHistoryData3=data.data
                 _this.dataCount3 =data.count
                 //_this.handleListApproveHistory('repairing',data.data);
                 _this.tableData3=data.data
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        //离线节点
        OfflineList(item){
            let _this=this;
            _this.loading02=true;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/search?status=offline',
               type:'get',
               data:item,
               success:function(data){
                 console.log(data)
                 _this.loading02=false;
                 _this.ajaxHistoryData2=data.data
                 _this.dataCount2 =data.count
                 //_this.handleListApproveHistory('Offline',data.data);
                 _this.tableData2=data.data
               },
               error:function(data){
                 console.log(data)
               }
           })
        },
        //搜索节点
        seekList(item){
            let _this=this;
            _this.loading03=true;
            _this.loading02=true;
            _this.loading01=true;
           $.ajax({
               url:'http://172.16.38.83:5000/v1/hosts/search',
               type:'get',
               data:item,
               success:function(data){
                 console.log(data)
                 if(!item.status){
                    _this.ajaxHistoryData=data.data
                    _this.dataCount1 =data.count
                    _this.tableData=data.data
                    
                    //搜索后其他初始化
                     _this.repairList({
                        per_page:10,
                        page:1
                    });
                    _this.OfflineList({
                        per_page:10,
                        page:1
                    });
                 }else if(item.status=='offline'){
                    _this.ajaxHistoryData2=data.data
                    _this.dataCount2 =data.count
                    _this.tableData2=data.data
                    //搜索后其他初始化
                    _this.repairList({
                        per_page:10,
                        page:1
                    });
                    _this.AllHostList({
                        per_page:10,
                        page:1
                    });
                 }else if(item.status=='repairing'){
                    _this.ajaxHistoryData3=data.data
                    _this.dataCount3 =data.count
                    _this.tableData3=data.data
                    //搜索后其他初始化
                     _this.AllHostList({
                        per_page:10,
                        page:1
                    });
                     _this.OfflineList({
                        per_page:10,
                        page:1
                    });
                 }
                _this.loading03=false;
                _this.loading02=false;
                _this.loading01=false;
               },
               error:function(data){
                   if(data.status=='404'){
                     _this.$Message.error('搜索不到该数据');
                   }
                 console.log(data)
               }
           })
        },
        // 获取历史记录信息
        // handleListApproveHistory(tabs,testData){
                
        //     // 保存取到的所有数据
        //     this.ajaxHistoryData = testData
            
            
            
        //     // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        //     if(testData.length < this.pageSize){
        //         if(tabs=='all'){
        //           console.log()
        //           this.tableData = this.ajaxHistoryData;
        //         }else if(tabs=='Offline'){
        //           this.dataCount2=testData.length;
        //           this.tableData2 = this.ajaxHistoryData;
        //         }else if(tabs=='repairing'){
        //           this.dataCount3=testData.length;
        //           this.tableData3 = this.ajaxHistoryData;
        //         }
                
        //     }else{
        //         if(tabs=='all'){
        //           this.tableData = this.ajaxHistoryData.slice(0,this.pageSize);
        //         }else if(tabs=='Offline'){
        //           this.tableData2 = this.ajaxHistoryData.slice(0,this.pageSize);
        //         }else if(tabs=='repairing'){
        //           this.tableData3 = this.ajaxHistoryData.slice(0,this.pageSize);
        //         }
                
        //     }
        // },
        //分页
        changepage(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            console.log(index)
            console.log(_start+'|'+_end)
            if(!this.$route.query.status){
                if(this.$route.query.exact==0||this.$route.query.exact){
                    this.seekList({
                        search:this.$route.query.search,
                        exact:this.$route.query.exact,
                        page:index,
                        per_page:10
                    })
                }else{
                    this.AllHostList({
                        per_page:10,
                        page:index
                    })
                }
               
            }else{
              this.AllHostList({
                per_page:10,
                page:index
              })
            }
            
            
            //this.tableData = this.ajaxHistoryData.slice(_start,_end);
        },
        //分页
        changepage2(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            //this.tableData2 = this.ajaxHistoryData2.slice(_start,_end);
            if(this.$route.query.status=='offline'){
                this.seekList({
                    search:this.$route.query.search,
                    exact:this.$route.query.exact,
                    status:this.$refs.tabs.activeKey,
                    page:index,
                    per_page:10
                })
            }else{
                this.OfflineList({
                    per_page:10,
                    page:index
                });
            }
            
        },
        //分页
        changepage3(index){
            var _start = ( index - 1 ) * this.pageSize;
            var _end = index * this.pageSize;
            //this.tableData3 = this.ajaxHistoryData3.slice(_start,_end);
            if(this.$route.query.status=='repairing'){
                this.seekList({
                    search:this.$route.query.search,
                    exact:this.$route.query.exact,
                    status:this.$refs.tabs.activeKey,
                    page:index,
                    per_page:10
                })
            }else{
                this.repairList({
                    per_page:10,
                    page:index
                });
            }
        }
    },
    computed: {

    },
    components: {

    },
    mounted() {
        if(this.$route.query.search){
          this.search_value=this.$route.query.search;
        }
      if(this.$route.query.search||this.$route.query.exact==0||this.$route.query.exact){
        this.seekList({
            search:this.$route.query.search,
            exact:this.$route.query.exact,
            page:1,
            per_page:10
        })
      }else{
        this.AllHostList({
          per_page:10,
          page:1
        });
      }
      if(this.$route.query.status=='offline'){
         this.seekList({
            search:this.$route.query.search,
            exact:this.$route.query.exact,
            status:'offline',
            page:1,
            per_page:10
        })
      }else{
        this.OfflineList({
            per_page:10,
            page:1
        });
      }

      if(this.$route.query.status=='repairing'){
         this.seekList({
            search:this.$route.query.search,
            exact:this.$route.query.exact,
            status:'repairing',
            page:1,
            per_page:10
        })
      }else{
        this.repairList({
            per_page:10,
            page:1
        });
      }
      this.totalHost();
     
      
      let _this=this;
      //搜索方法
      $('#search_btn').on('click',function(e){
          _this.curPage=1;
          _this.curPage2=1;
          _this.curPage3=1;
          if(_this.$refs.tabs.activeKey!='tab1'){
            _this.$router.push({
                path: `/app/bdmgr/index?search=${$('.ivu-input').val()}&exact=${$(".search_type  option:selected").attr('value')}&status=${_this.$refs.tabs.activeKey}`,
            })
            let data={
                search:$('.ivu-input').val(),
                exact:$(".search_type  option:selected").attr('value'),
                status:_this.$refs.tabs.activeKey,
                per_page:10,
                page:1
            }
            _this.seekList(data);
            _this.curPage=1;
          }else{
            _this.$router.push({
                path: `/app/bdmgr/index?search=${$('.ivu-input').val()}&exact=${$(".search_type  option:selected").attr('value')}`,
            })
            let data={
                search:$('.ivu-input').val(),
                exact:$(".search_type  option:selected").attr('value'),
                per_page:10,
                page:1
            }
            _this.seekList(data);
           
            
          }
         
      })
    },

    filters: {

    },

}
</script>
