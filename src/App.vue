<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import {router} from "../src/router/index";

    export default {
        name: 'App',
        beforeCreate() {
            this.$store.dispatch("initJIM");
            // let _this = this;
            // _this.$JIM.init({
            //     "appkey": "4f7aef34fb361292c566a1cd",
            //     "random_str": "404",
            //     "signature": '7db047a67a9d7293850ac69d14cc82bf',
            //     "timestamp": 1507882399401,
            //     "flag": 1
            // }).onSuccess(function (data) {
            //     console.log('success:' + JSON.stringify(data));
            //
            //     // if (location.pathname === "/login") {
            //     //     return;
            //     // }
            //     //
            //     // // 如果没有登录Cookie 返回登录页
            //     // if (!Cookies.get("accessToken")) {
            //     //     router.push({
            //     //         name: "home"
            //     //     });
            //     //     return;
            //     // }
            //     //
            //     // _this.$JIM.login(_this.user).onSuccess(function () {
            //     // }).onFail(function () {
            //     //     router.push({
            //     //         name: "home"
            //     //     });
            //     // }).onTimeout(function () {
            //     //     router.push({
            //     //         name: "home"
            //     //     });
            //     // });
            // }).onFail(function (data) {
            //     console.log('error:' + JSON.stringify(data))
            // });
        }
    }
</script>

<style lang="less">
    .size {
        width: 100%;
        height: 100%;
    }

    html, body {
        .size;
        overflow: hidden;
        margin: 0;
        padding: 0;
    }

    #app {
        .size;
    }
</style>
