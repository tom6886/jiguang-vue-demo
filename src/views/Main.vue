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
    </div>
</template>

<script>
    import Contacts from "../components/Contacts";
    import ChartWindow from "../components/ChartWindow";

    export default {
        components: {
            Contacts,
            ChartWindow
        }
    }
</script>
