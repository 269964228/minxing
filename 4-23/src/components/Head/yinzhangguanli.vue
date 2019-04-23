<template>
    <div id="all">
      <p>支行行政印章管理</p>
      <div @click="List('A656940','2')">印章申请</div>
      <div @click="List('A867540','1')">管辖行申请总行印章</div>
      <div @click="List('A395668','2')">行政印章管理</div>
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
    };
  },
  created () {
    var that = this;
    axios
      .get("static/config.json", {})
      .then(function(response) {
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
      })
  },
  methods: {
    List(key,type) {// 发文列表
      window.sessionStorage.setItem("dispatchKey",JSON.stringify(key));
      window.sessionStorage.setItem("dispatchType",JSON.stringify(type));
      this.$router.push({path: "/list"});
    }
  },
};
</script>
<style scoped>
#all>div{
  margin: 10px;
  padding: 6px;
  border: 1px solid ;
  border-radius: 8px;
  text-align: center;
}
figure{
  width: 100%;
  margin: 0 0;
  border: dashed 2px red;
  box-sizing: border-box;
}
figure>div{
  margin: 10px;
  padding: 6px;
  border: 1px solid ;
  border-radius: 8px;
  text-align: center;
}
.showList{
  margin-top: 0;
}
.top{
  height: 4px;
}
</style>
