<template>
    <div class="login_images">
        <!-- <router-link :to="{name:'admin'}">跳转admin页面</router-link> -->
        <Row>
            <Form :model="user" :rules="ruleValidate" ref="form"
                  style="float:right;margin-right:10%;margin-top:20%;width:300px;">
                <Card>
                    <p slot="title">欢迎登录</p>
                    <FormItem prop="username">
                        <Input name="username" placeholder="请输入用户名" type="text" v-model="user.username">
                            <span slot="prepend"><Icon :size="16" type="ios-person"></Icon></span>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input name="password" placeholder="请输入密码" type="password" v-model="user.password">
                            <span slot="prepend"><Icon :size="14" type="md-lock"></Icon></span>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button @click="beforeLogin" long type="primary">登录</Button>
                    </FormItem>
                </Card>
            </Form>
        </Row>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import {router} from "../router/index";
    import {types} from "../utils/mutation-types";

    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                },
                ruleValidate: {
                    username: [
                        {required: true, message: '用户名不可为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            beforeLogin() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        this.$Message.error('请先完善信息!');
                    }
                })
            },
            login() {
                let _this = this;
                _this.$store.state.JIM.login(_this.user).onSuccess(function (data) {
                    Cookies.set("accessToken", _this.user);
                    _this.$store.commit(types.SET_MYNAME, _this.user.username);
                    _this.$store.dispatch("getFriends");
                    router.push({
                        name: "home"
                    });
                }).onFail(function (data) {
                    _this.$Message.error(JSON.stringify(data));
                }).onTimeout(function (data) {
                    _this.$Message.error(JSON.stringify(data));
                });
            }
        }
    }
</script>

<style lang="less">
    .login_images {
        width: 100%;
        height: 100vh;
        background: url('../assets/images/login.jpeg') no-repeat center center;
        background-size: cover;
    }
</style>
