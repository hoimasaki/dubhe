<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="btn-toolbar m-t-20" role="toolbar">
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary waves-effect waves-light ">
                            <i class="fa fa-inbox"></i>
                        </button>
                        <button type="button" class="btn btn-primary waves-effect waves-light ">
                            <i class="fa fa-exclamation-circle"></i>
                        </button>
                        <button type="button" class="btn btn-primary waves-effect waves-light ">
                            <i class="fa fa-trash-o"></i>
                        </button>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-folder"></i>
                            <b class="caret"></b>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="mail-inbox.html#">Action</a>
                            </li>
                            <li>
                                <a href="mail-inbox.html#">Another action</a>
                            </li>
                            <li>
                                <a href="mail-inbox.html#">Something else here</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="mail-inbox.html#">Separated link</a>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary waves-effect waves-light  dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            <i class="fa fa-tag"></i>
                            <b class="caret"></b>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li>
                                <a href="mail-inbox.html#">Action</a>
                            </li>
                            <li>
                                <a href="mail-inbox.html#">Another action</a>
                            </li>
                            <li>
                                <a href="mail-inbox.html#">Something else here</a>
                            </li>
                            <li class="divider"></li>
                            <li>
                                <a href="mail-inbox.html#">Separated link</a>
                            </li>
                        </ul>
                    </div>
    
                    <div class="btn-group">
                        <button type="button" class="btn btn-primary waves-effect waves-light  dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                            更多
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="mail-inbox.html#">Dropdown link</a>
                            </li>
                            <li>
                                <a href="mail-inbox.html#">Dropdown link</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- End row -->
        <div class="panel panel-default m-t-20">
            <div class="panel-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mails m-0">
                        <tbody>
                            <tr class="unread" v-for="row in this.tableData">
                                <td class="mail-select">
                                    {{row.level}}
                                    <div class="checkbox checkbox-primary m-r-15">
                                        <input id="checkbox1" type="checkbox">
                                        <label for="checkbox1"></label>
                                    </div>
    
                                    <i class="fa fa-star m-r-15 text-muted"></i>
    
                                    <i class="fa fa-circle m-l-5 text-warning"></i>
                                </td>
    
                                <td>
                                    <router-link class="email-name" to="/app/event/detail">{{row.instance_name}}</router-link>
    
                                </td>
    
                                <td>
                                    <a href="mail-read.html" class="email-msg">{{row.message}}</a>
                                </td>
                                <td style="width: 20px;">
                                    <i class="fa fa-paperclip"></i>
                                </td>
                                <td class="text-right">
                                  {{row.time}}
                                </td>
                            </tr>
    
              
                        </tbody>
                    </table>
                </div>
    
            </div>
            <!-- panel body -->
        </div>
        <!-- panel -->
        <div class="row">
            <div class="col-xs-7">
                显示 1 - 20 共 289
            </div>
            <div class="col-xs-5">
                <div class="btn-group pull-right">
                    <button type="button" class="btn btn-default waves-effect">
                        <i class="fa fa-chevron-left"></i>
                    </button>
                    <button type="button" class="btn btn-default waves-effect">
                        <i class="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="less">
.mails td:last-of-type{
    width:200px !important;
}
</style>
<script>


import { GetAlarmList } from '../../api/event';
import { alarmStyle, alarmClass, alarmLevel } from '../../utils/constants';


export default {
    data() {
        return {
                startTime: 1124570279071,
                endTime: 1524656679071,
                page: 1,
                pageSize: 20,
                tableData: "",
                total : ""
        }
    },
    methods: {
          search: function () {
                GetAlarmList(this.startTime,this.endTime,this.page, this.pageSize).then(res => {
                    return res;
             }).then(arr => {
                    console.log(arr)
                    this.tableData = arr.Sets
                    this.total = arr.Count
                });
        },

    },
    mounted: function () {
        this.search();
    }
}

</script>