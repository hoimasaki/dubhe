<template>
    <div class="wrapper-page">
        <div class="text-center">
            <a href="../html/index.html" class="logo-lg"><img style="vertical-align: middle" width="30"
                                                              src="../assets/images/logo-blue.png" alt=""><span
                    style="vertical-align: middle"><b class="m-l-10">BECAUSE 监控平台</b></span> </a>
        </div>

        <div class="form-horizontal m-t-20" @keydown.enter="submit(username,password)">


            <div class="form-group">
                <div class="col-xs-12">
                    <input class="form-control" type="text" required="" placeholder="用户名" v-model="username">
                    <i class="fa fa-user-circle form-control-feedback l-h-34"></i>
                </div>
            </div>

            <div class="form-group">
                <div class="col-xs-12">
                    <input class="form-control" type="password" required="" placeholder="密码" v-model="password" >
                    <i class="fa fa-user-circle form-control-feedback l-h-34"></i>
                </div>
            </div>

            <!--<div class="form-group">-->
            <!--<div class="col-xs-12">-->
            <!--<div class="checkbox checkbox-primary">-->
            <!--<input id="checkbox-signup" type="checkbox">-->
            <!--<label for="checkbox-signup">-->
            <!--Remember me-->
            <!--</label>-->
            <!--</div>-->

            <!--</div>-->
            <!--</div>-->

            <div class="form-group text-right m-t-20">
                <div class="col-xs-12">
                    <button onclick="void(0)" class="btn btn-primary btn-custom w-md waves-effect waves-light"
                            v-on:click="submit(username,password)">登录
                    </button>
                </div>
            </div>

            <div class="form-group m-t-30">
                <div class="col-sm-7">
                    <a class="text-muted"><i class="fa fa-lock m-r-5"></i> 忘记密码</a>
                </div>
                <div class="col-sm-5 text-right">
                    <a class="text-muted">创建账户</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

    /*清除了默认样式*/
    input.form-control:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #323b44 inset;
        border: 1px solid #CCC !important;
        -webkit-text-fill-color: #fff;

    }
</style>
<script>
    import router from '../router/index';
    import {Login} from '../api/common/index';
    import {user} from '../utils';

    export default{
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {

            submit(username, password){
                Login(username, password).then(function (data) {
                    console.log(data)
                    console.log(user.entryUrl)
                    console.log(data.Sets)
                    console.log(data.Sets.value)

                    if (data.Sets && data.Sets.value === 1) {
                        console.log("ok")
                        window.localStorage.setItem('token', data.Sets.Token);
                        router.push(user.entryUrl);

                    } else {
                        $.Notification.autoHideNotify('error', 'top right', '用户名或密码错误', '');
                    }
                });
            }
        }


    }
</script>
