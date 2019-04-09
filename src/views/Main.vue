<style lang="less">
    @import '../assets/css/admin/style.less';

    body {
        min-width: 1200px;
    }
</style>

<template>
    <div id="main">
        <Layout>
            <Header class="main-header">
                <Avatar icon="ios-person" size="large"/>
                <span>人工客服时间：周一至周日 9：00·17：30</span>
            </Header>
            <Layout>
                <Sider style="width:270px;min-width:270px;max-width:270px;">
                    <Contacts/>
                </Sider>
                <Layout>
                    <Content class="main-content">
                        <ChartWindow v-if="$store.state.currentContact"/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
        <Modal id="main-tips"
               v-model="!$store.state.isLogin"
               title="提示"
               :closable="false"
               :mask-closable="false"
               width="450">
            <p>网络断线，请检查网络或重新登陆</p>
            <div slot="footer">
                <Button size="large" @click="logOut">退出</Button>
                <Button type="info" size="large" @click="reLogin">重新登录</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Contacts from "../components/Contacts";
    import ChartWindow from "../components/ChartWindow";

    export default {
        components: {
            Contacts,
            ChartWindow
        },
        methods: {
            reLogin() {
                this.$store.dispatch("initJIM");
            },
            logOut() {
                this.$store.dispatch("logOut");
            }
        }
    }
</script>
