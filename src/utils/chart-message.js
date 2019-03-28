import store from "../store/index"

export class chartMessage {
    ctime_ms = 0;
    time_show = "";
    is_read = true;
    from_id = '';
    target_id = '';
    content = {
        msg_type: '',
        msg_body: null,
        media_url: ''
    };
    success = 1;

    constructor(msg) {
        this.ctime_ms = msg.ctime_ms ? msg.ctime_ms : msg.content.create_time;
        this.from_id = msg.content.from_id;
        this.target_id = msg.content.target_id;
        this.content.msg_type = msg.content.msg_type;
        this.content.msg_body = msg.content.msg_body;

        if (msg.content.msg_type === "image") {
            let _this = this;
            store.state.JIM.getResource({"media_id": msg.content.msg_body.media_id}).onSuccess(function (data) {
                _this.content.media_url = data.url;
            });
        }
    }
}