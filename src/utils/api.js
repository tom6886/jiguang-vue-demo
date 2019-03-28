import axios from "axios";
import Cookies from "js-cookie";
import {router} from "../router/index";

// axios 配置
axios.defaults.timeout = 6000;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.baseURL = "http://127.0.0.1:9099";

axios.interceptors.request.use(
    config => {
        let token = Cookies.get("accessToken");
        if (token) {
            config.headers = {
                Authorization: token
            };
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 返回状态判断
axios.interceptors.response.use(
    res => {
        if (res.data.code === 403) {
            Cookies.remove("accessToken");

            router.push({
                name: "login"
            });
        }

        if (res.status === 200) {
            if (res.headers.authorization) {
                Cookies.set("accessToken", res.headers.authorization);
            }
            return res;
        }

        return Promise.reject(res);
    },
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            Cookies.remove("accessToken");

            router.push({
                name: "login"
            });
        }
        return Promise.reject(error);
    }
);

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
