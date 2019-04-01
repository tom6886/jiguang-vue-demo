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
                    <div class="chat-panel-message-file-wrap float-right" v-if="item.content.msg_type === 'file'">
                        <div class="chat-panel-file-icon">
                            <div></div>
                            <p>{{ shortName(item.content.msg_body.fname) }}</p>
                        </div>
                        <div class="chat-panel-range">
                            <div>
                                <span class="float-left">{{ parseSize(item.content.msg_body.fsize) }}</span>
                                <span class="float-right chat-panel-download-file"
                                      @click="downLoadFile(item.content.media_url)">下载文件</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-panel-msgText-me float-right" v-if="item.content.msg_type === 'text'">
                        <p>{{ item.content.msg_body.text }}</p>
                    </div>
                    <div style="clear:right;"></div>
                </div>
                <div class="chat-panel-other-msg chat-panel-msg" v-if="item.from_id !== myName">
                    <Avatar class="float-left" shape="square" icon="ios-person" size="large"/>
                    <div class="chat-panel-message-img-wrap float-left" v-if="item.content.msg_type === 'image'">
                        <img :src="item.content.media_url" title="点击查看大图"/>
                    </div>
                    <div class="chat-panel-message-file-wrap float-left" v-if="item.content.msg_type === 'file'">
                        <div class="chat-panel-file-icon">
                            <div></div>
                            <p>{{ shortName(item.content.msg_body.fname) }}</p>
                        </div>
                        <div class="chat-panel-range">
                            <div>
                                <span class="float-left">{{ parseSize(item.content.msg_body.fsize) }}</span>
                                <span class="float-right chat-panel-download-file"
                                      @click="downLoadFile(item.content.media_url)">下载文件</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-panel-msgText-other" v-if="item.content.msg_type === 'text'">
                        <p>{{ item.content.msg_body.text }}</p>
                    </div>
                    <div style="clear:left;"></div>
                </div>
            </div>
        </div>
        <div class="chart-message">
            <Row class="chart-send-file">
                <Col span="2">
                    <Upload action="/" :before-upload="sendImage" accept="image/*" title="发送图片">
                        <Button icon="ios-cloud-upload-outline"></Button>
                    </Upload>
                </Col>
                <Col span="2">
                    <Upload action="/" :before-upload="sendDoc" title="发送文件">
                        <Button icon="ios-cloud-upload"></Button>
                    </Upload>
                </Col>
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
    import * as download from 'downloadjs';
    import {FileUtil} from "../utils/util";

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
                let fd = new FormData();
                fd.append(file.name, file);
                let _msg = {
                    target_username: this.$store.state.currentContact,
                    image: fd,
                    need_receipt: true
                };
                let res = await apiService.sendSinglePic(_msg);
                console.log(res)
                this.$store.commit(types.ADD_MESSAGE, res);
                return false;
            },
            async sendDoc(file) {
                console.log(file)
                let fd = new FormData();
                fd.append(file.name, file);
                let _msg = {
                    target_username: this.$store.state.currentContact,
                    file: fd,
                    need_receipt: true
                };
                let res = await apiService.sendSingleFile(_msg);
                console.log(res)
                this.$store.commit(types.ADD_MESSAGE, res);
                return false;
            },
            shortName(name) {
                return FileUtil.shortName(name);
            },
            parseSize(size) {
                return FileUtil.parseSize(size);
            },
            downLoadFile(url) {
                download(url);
            }
        }
    }
</script>

<style lang="less">
    @import "../assets/css/chart-window";
</style>