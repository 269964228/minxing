import { getSSOToken } from "@/http/MXCommon";
export default function getSSOTokenFn(json, callBack) {
    let appid = "OA_Quanduban"; //此处需要通过配置获取
    getSSOToken(appid, (sso_token) => {
        json.token = sso_token;
        json.mx_app_id = appid;
        callBack(json);
    })
}