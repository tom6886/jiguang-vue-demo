import {chartMessage} from "./chart-message";

export class TimeUtil {
    static stamp2timeString(timestamp) {
        let _date = new Date(timestamp);
        if (this.isToday(_date)) {
            return _date.getHours() + ":" + _date.getMinutes();
        }

        if (this.isYestDay(_date)) {
            return "昨天  " + _date.getHours() + ":" + _date.getMinutes();
        }

        if (_date.getFullYear() === new Date().getFullYear()) {
            return (_date.getMonth() + 1) + "月" + _date.getDate() + "日  " + _date.getHours() + ":" + _date.getMinutes();
        }

        return _date.getFullYear() + "年" + (_date.getMonth() + 1) + "月" + _date.getDate() + "日  " + _date.getHours() + ":" + _date.getMinutes();
    }

    static isToday(date) {
        return this.isSameDay(date, new Date());
    }

    static isYestDay(date) {
        return this.isSameDay(date, new Date(new Date().getTime() - 24 * 60 * 60 * 1000));
    }

    static isSameDay(dayOne, dayTwo) {
        return (dayOne.getFullYear() === dayTwo.getFullYear() && dayOne.getMonth() === dayTwo.getMonth()
            && dayOne.getDate() === dayTwo.getDate());
    }

    static fiveMinutes(newTime, oldTime) {
        return (newTime - oldTime) > Math.abs(5 * 60 * 1000);
    }
}

export class MessageUtil {
    static parseArray(arr) {
        if (arr.length === 0) {
            return [];
        }

        let _arr = [];
        let _msg = new chartMessage(arr[0]);
        _msg.time_show = TimeUtil.stamp2timeString(arr[0].ctime_ms);
        _arr.push(_msg);

        for (let i = 1; i < arr.length; i++) {
            let _item = new chartMessage(arr[i]);
            if (TimeUtil.fiveMinutes(arr[i].ctime_ms,
                arr[i - 1].ctime_ms)) {
                _item.time_show = TimeUtil.stamp2timeString(arr[i].ctime_ms);
            }
            _arr.push(_item);
        }

        return _arr;
    }

    static parseSingle(last, msg) {
        let _msg = new chartMessage(msg);
        if (!last || TimeUtil.fiveMinutes(msg.ctime_ms, last.ctime_ms)) {
            _msg.time_show = TimeUtil.stamp2timeString(msg.ctime_ms);
        }
        return _msg;
    }
}