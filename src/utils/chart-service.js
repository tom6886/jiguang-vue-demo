import store from "../store/index"

export class apiService {
    timeoutData = {code: -2};

    // 发送或者转发单聊文本
    static sendSingleMsg(singleMsg, success, error, timeout) {
        return this.msgCallback(store.state.JIM.sendSingleMsg(singleMsg), success, error, timeout);
    }

    // 发送或者转发单聊图片
    static sendSinglePic(singlePic, success, error, timeout) {
        return this.msgCallback(store.state.JIM.sendSinglePic(singlePic), success, error, timeout);
    }

    static sendSingleFile(singleFile, success, error, timeout) {
        return this.msgCallback(store.state.JIM.sendSingleFile(singleFile), success, error, timeout);
    }

    static callback(obj, ...args) {
        return new Promise((resolve) => {
            if (obj && obj.onSuccess) {
                obj.onSuccess((successData) => {
                    if (successData.code) {
                        delete successData.code;
                    }
                    if (args[0] && args[0] instanceof Function) {
                        args[0](successData);
                    }
                    resolve(successData);
                }).onFail((errorData) => {
                    if (args[1] && args[1] instanceof Function) {
                        args[1](errorData);
                    }
                    resolve(errorData);
                }).onTimeout(() => {
                    if (args[2] && args[2] instanceof Function) {
                        args[2]();
                    }
                    resolve(this.timeoutData);
                });
            }
        });
    }

    // 发送消息回调函数
    static msgCallback(obj, ...args) {
        return new Promise((resolve) => {
            if (obj && obj.onSuccess) {
                obj.onSuccess((successData, msgs) => {
                    if (successData.key) {
                        msgs.key = successData.key;
                    }
                    msgs.unread_count = successData.unread_count || 0;
                    if (args[0] && args[0] instanceof Function) {
                        args[0](msgs);
                    }
                    resolve(msgs);
                }).onFail((errorData) => {
                    if (args[1] && args[1] instanceof Function) {
                        args[1](errorData);
                    }
                    resolve(errorData);
                }).onTimeout(() => {
                    if (args[2] && args[2] instanceof Function) {
                        args[2]();
                    }
                    resolve(this.timeoutData);
                });
            }
        });
    }
}