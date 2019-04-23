<template>
    <div id="all">
      <p>全行内容</p>
      <div @click="List('A742743','1')">门禁卡管理</div>
      <div @click="List('A366807','1')">车辆申请</div>
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
      data: {},
    };
  },
  methods: {
    List(key,type) {// 发文列表
      if (sessionStorage.getItem('user') != null) {
        this.ajax (key,type);
      }else {
        this.ajax (key,type,'one');
      }
    },
    ajax (key,type,user) {
      var that = this
      axios.get("static/config.json", {}).then(function(response) {
        that.minIp = response.data[0].minIp;
        window.sessionStorage.setItem("minIp", JSON.stringify(that.minIp));
        var json = {};
        if (user == 'one' ) {
          json.type = "viewlistanduserinfo";
        } else {
          json.type = "viewlist";
        }
        var jsonpage = {};
        jsonpage.key = key;
        jsonpage.pagenum = 1;
        jsonpage.pagesize = 10;
        jsonpage.totalcount = 0;
        json.query = jsonpage;
        getSSOTokenFn(json,(json) => {
          ajaxPost(json).then((res)=>{
            that.data = res.data;
            that.datatime = that.data.showlist.sort((a,b) => {
              return Date.parse(b.time) - Date.parse(a.time);//时间正序
            });
            if (user == "one") {
              window.sessionStorage.setItem("user",JSON.stringify(that.data.result));
              window.sessionStorage.setItem("data",JSON.stringify(that.data));
              window.sessionStorage.setItem("dispatchType",JSON.stringify(type));
              that.$router.push({path: "/List"});
            } else {
              window.sessionStorage.setItem("data",JSON.stringify(that.data));
              window.sessionStorage.setItem("dispatchType",JSON.stringify(type));
              that.$router.push({path: "/List"});
            }
          })
        })
      })
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
