<template>
  <div id="all">
    <div @click="List('A783392','1')">调额申请</div>
  </div>
</template>

<script>
import { ajaxPost } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";
// 静态ip地址
import axios from "axios";

export default {
  data() {
    return {
      user: {},
      minIp: {},
      url: {},
      listKey: {},
    };
  },
  created() {
    var url = JSON.stringify(location.href);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.slice(url.indexOf("?") + 1, url.length - 1);
      var strs = [];
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
      }
    }
    if (theRequest.external) {
      var user = {};
      user.dir = theRequest.dir;
      user.scope = theRequest.scope;
      user.serverip = theRequest.serverip;
      user.fullname = theRequest.fullname;
      window.sessionStorage.setItem("user",JSON.stringify(user));
      window.sessionStorage.setItem("listKey",JSON.stringify(theRequest));
      axios.get("static/route.json", {}).then(res => {
        var data = res.data;
        for (var i = 0; i < data.zhihang.length; i++) {
          if (data.zhihang[i][theRequest.appid]) {
            this.$router.push({ path: data.zhihang[i][theRequest.appid] });
            break;
          }
        }
      });
    } else {
      var that = this;
      axios.get("static/config.json", {}).then(function(response) {
        that.minIp = response.data[0].minIp;
        window.sessionStorage.setItem("minIp", JSON.stringify(that.minIp));
        var json = {};
        json.type = "getuserinfo";
        getSSOTokenFn(json, sso_token => {
          ajaxPost(json).then(res => {
            that.user = res.data;
            window.sessionStorage.setItem("user",JSON.stringify(that.user.result));
          });
        });
      });
    }
  },
  methods: {
    List(key, type) {
      // 发文列表
      window.sessionStorage.setItem("dispatchKey", JSON.stringify(key));
      window.sessionStorage.setItem("dispatchType", JSON.stringify(type));
      this.$router.push({ path: "/List" });
    }
  }
};
</script>
<style scoped>
#all > div {
  margin: 10px;
  padding: 6px;
  border: 1px solid;
  border-radius: 8px;
  text-align: center;
}
figure {
  width: 100%;
  margin: 0 0;
  border: dashed 2px red;
  box-sizing: border-box;
}
figure > div {
  margin: 10px;
  padding: 6px;
  border: 1px solid;
  border-radius: 8px;
  text-align: center;
}
.showList {
  margin-top: 0;
}
.top {
  height: 4px;
}
</style>
