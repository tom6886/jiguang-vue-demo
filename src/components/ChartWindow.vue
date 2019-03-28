<template>
    <div class="chart-window">
        <div class="chart-head">
            <span class="chart-username">{{$store.state.currentContact}}</span>
        </div>
        <div class="chart-body">
            <div class="chat-panel-wrap" v-for="item in $store.getters.getActiveMsgs">
                <p class="chat-panel-time" v-if="item.time_show">{{item.time_show}}</p>
                <div class="chat-panel-me-msg chat-panel-msg" v-if="item.from_id === myName">
                    <Avatar class="float-right" shape="square" icon="ios-person" size="large"/>
                    <div class="chat-panel-message-img-wrap float-right" v-if="item.content.msg_type === 'image'">
                        <img :src="item.content.media_url" title="点击查看大图"/>
                    </div>
                    <div class="chat-panel-msgText-me float-right" v-if="item.content.msg_type === 'text'">
                        <p>{{ item.content.msg_body.text}}</p>
                    </div>
                    <div style="clear:right;"></div>
                </div>
                <div class="chat-panel-other-msg chat-panel-msg" v-if="item.from_id !== myName">
                    <Avatar class="float-left" shape="square" icon="ios-person" size="large"/>
                    <div class="chat-panel-message-img-wrap float-left" v-if="item.content.msg_type === 'image'">
                        <img :src="item.content.media_url" title="点击查看大图"/>
                    </div>
                    <div class="chat-panel-msgText-other" v-if="item.content.msg_type === 'text'">
                        <p>{{ item.content.msg_body.text}}</p>
                    </div>
                    <div style="clear:left;"></div>
                </div>
            </div>
        </div>
        <div class="chart-message">
            <Row class="chart-send-file">
                <Upload action="/" :before-upload="sendImage" accept="image/*">
                    <Button icon="ios-cloud-upload-outline"></Button>
                </Upload>
            </Row>
            <Row class="chart-send-text">
                <Input type="textarea" v-model="textMsg"/>
                <Button @click="sendTextMsg">发送</Button>
            </Row>
        </div>
    </div>
</template>

<script>
    import {apiService} from "../utils/chart-service";
    import {types} from "../utils/mutation-types";

    export default {
        data() {
            return {
                myName: this.$store.state.myName,
                textMsg: ""
            }
        },
        mounted() {
            this.$nextTick(function () {
                let div = document.getElementsByClassName('chart-body')[0];
                div.scrollTop = div.scrollHeight;
            })
        },
        updated() {
            this.$nextTick(function () {
                let div = document.getElementsByClassName('chart-body')[0];
                div.scrollTop = div.scrollHeight;
            })
        },
        methods: {
            async sendTextMsg() {
                let _msg = {
                    target_username: this.$store.state.currentContact,
                    content: this.textMsg,
                    need_receipt: true
                };
                let res = await apiService.sendSingleMsg(_msg);
                this.$store.commit(types.ADD_MESSAGE, res);
                this.textMsg = "";
            },
            async sendImage(file) {
                let _msg = {
                    target_username: this.$store.state.currentContact,
                    image: file,
                    need_receipt: true
                };
                console.log(file)
                let res = await apiService.sendSinglePic(_msg);
                console.log(res)
                return false;
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/chart-window";
</style>