<template>
    <li class="display-flex" :class="{'active':user.username === $store.state.currentContact}"
        @click="changeContact(user.username)">
        <Row>
            <Col span="5">
                <Badge :count="user.unread_msg_count">
                    <Avatar shape="square" icon="ios-person" size="large"/>
                </Badge>
            </Col>
            <Col span="14" class="user-mes">
                <Row>
                    <p class="conversation-nickname">{{user.username}}</p>
                </Row>
                <Row>
                    <p class="conversation-recentMsg">{{lastMsg.last_msg_text}}</p>
                </Row>
            </Col>
            <Col span="5" class="conversation-time">
                <p>{{lastMsg.last_msg_time_text}}</p>
            </Col>
        </Row>
    </li>
</template>

<script>
    import {types} from "../utils/mutation-types";

    export default {
        name: "Contacts-Member",
        props: {
            user: {
                type: Object,
                default: {
                    username: "error",
                    unread_msg_count: 0
                }
            }
        },
        computed: {
            lastMsg() {
                return this.$store.getters.getLastMsg(this.user.username);
            }
        },
        methods: {
            changeContact(user) {
                this.$store.commit(types.SET_CURRENT_CONTACT, user)
            }
        }
    }
</script>

<style scoped>

</style>