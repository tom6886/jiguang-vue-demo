import Vue from 'vue'
import Vuex from 'vuex'
import {types} from '../utils/mutation-types'
import Cookies from 'js-cookie'
import {router} from "../router/index"
import {TimeUtil, MessageUtil} from "../utils/util";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        JIM: null,
        myName: null,
        isLogin: false,
        hasOffline: false,
        currentContact: null,
        friends: [],
        charts: []
    },
    getters: {
        getLastMsg: (state) => (username) => {
            let _chart = state.charts.find(x => x.username === username);
            if (!_chart || _chart.msgs.length === 0) {
                return {last_msg_text: '', last_msg_time_text: '', last_msg_time: 0}
            }
            let _last = _chart.msgs[_chart.msgs.length - 1];
            let _last_msg_text = '';
            switch (_last.content.msg_type) {
                case "text":
                    _last_msg_text = _last.content.msg_body.text;
                    break;
                case "image":
                    _last_msg_text = "[图片]";
                    break;
            }
            return {
                last_msg_text: _last_msg_text.length > 8 ? _last_msg_text.substr(0, 8) + "..." : _last_msg_text,
                last_msg_time_text: TimeUtil.stamp2timeString(_last.ctime_ms),
                last_msg_time: _last.ctime_ms
            }
        },
        getActiveMsgs: (state) => {
            let _chart = state.charts.find(x => x.username === state.currentContact);
            return _chart ? _chart.msgs : [];
        }
    },
    mutations: {
        [types.SET_JIM](state, JIM) {
            state.JIM = JIM;
        },
        [types.SET_ISLOGIN](state, login) {
            state.isLogin = login;
        },
        [types.SET_MYNAME](state, name) {
            state.myName = name;
        },
        [types.SET_FRIENDS](state, arr) {
            state.friends = arr;
        },
        [types.SET_CURRENT_CONTACT](state, current) {
            state.currentContact = current;
        },
        [types.SET_HASOFFLINE](state, hasoffline) {
            state.hasOffline = hasoffline;
        },
        [types.SET_OFFLINE](state, offline) {
            let contact = state.friends.find(x => x.username === offline.from_username);
            state.friends.splice(state.friends.indexOf(contact), 1);
            Object.assign(contact, {unread_msg_count: offline.unread_msg_count});
            state.friends.push(contact);
            state.charts.push({username: offline.from_username, msgs: MessageUtil.parseArray(offline.msgs)});
        },
        [types.ADD_MESSAGE](state, message) {
            let _username = message.content.from_id === state.myName ? message.content.target_id : message.content.from_name;
            let _chart = state.charts.find(x => x.username === _username);
            if (!_chart) {
                state.charts.push({username: _username, msgs: [MessageUtil.parseSingle(null, message)]})
            } else if (_chart.msgs.length === 0) {
                _chart.msgs.push(MessageUtil.parseSingle(null, message));
            } else {
                _chart.msgs.push(MessageUtil.parseSingle(_chart.msgs[_chart.msgs.length - 1], message));
            }
        }
    },
    actions: {
        initJIM({commit, dispatch}) {
            const JIM = new JMessage();
            commit(types.SET_JIM, JIM);

            JIM.init({
                "appkey": "4f7aef34fb361292c566a1cd",
                "random_str": "404",
                "signature": '7db047a67a9d7293850ac69d14cc82bf',
                "timestamp": 1507882399401,
                "flag": 1
            }).onSuccess(function (data) {
                console.log('success:' + JSON.stringify(data));
                if (location.pathname !== "/login") {
                    dispatch("loginJIM");
                }
            }).onFail(function (data) {
                console.log('error:' + JSON.stringify(data))
            });
        },
        loginJIM({state, commit, dispatch}) {
            let user = JSON.parse(Cookies.get("accessToken"));
            Object.assign(user, {is_md5: true});
            state.JIM.login(user).onSuccess(function () {
                commit(types.SET_MYNAME, user.username);
                commit(types.SET_ISLOGIN, true);
                dispatch("getFriends");
            }).onFail(function (data) {
                console.log("loginError" + JSON.stringify(data));
                router.push({name: "login"})
            }).onTimeout(function () {
                router.push({name: "login"})
            });
        },
        logOut({state}) {
            state.JIM.loginOut();
            Cookies.remove("accessToken");
            router.push({name: "login"});
        },
        getFriends({state, commit, dispatch}) {
            state.JIM.getFriendList().onSuccess(function (data) {
                commit(types.SET_FRIENDS, data.friend_list);
                Promise.all([
                    dispatch("getAllMessage"),
                    dispatch("listenMessageReceive"),
                    dispatch("listenDisconnect"),
                    dispatch("listenOnEventNotification")
                ])
            });
        },
        getAllMessage({state, commit}) {
            // 离线消息同步监听
            if (state.hasOffline) {
                return;
            }

            state.JIM.onSyncConversation((data) => {
                commit(types.SET_HASOFFLINE, true);
                console.log(data)
                data.forEach(x => commit(types.SET_OFFLINE, x));
            })
        },
        listenMessageReceive({state, commit}) {
            state.JIM.onMsgReceive((data) => {
                console.log(JSON.stringify(data))
                data.messages.forEach(x => commit(types.ADD_MESSAGE, x));
            });
        },
        listenDisconnect({state, commit}) {
            state.JIM.onDisconnect(() => {
                commit(types.SET_ISLOGIN, false);
            });
        },
        listenOnEventNotification({state, commit}) {
            state.JIM.onEventNotification((data) => {
                if (data.event_type === 1) {
                    commit(types.SET_ISLOGIN, false);
                }
            });
        }
    }
})
