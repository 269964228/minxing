<template>
  <div id="all">
    <el-tree v-if="data.showlist.length == '0'"></el-tree>
    <div v-for="(v,i) in dataPaging" :key="i" class="list_content" @click="being(v)">
      <div class="list_title">{{v.title}}</div>
      <div class="list_title_user">
        <div class="list_user">发布人：{{v.user}}</div>
        <div class="list_link">{{v.linkname}}</div>
      </div>
      <div class="list_time">{{v.time}}</div>
    </div>
    <el-button-group v-if="data.showlist">
      <el-button type="primary" icon="el-icon-arrow-left" @click="upward()">上一页</el-button>
      <el-button type="primary" @click="down()">
        下一页
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
import { ajaxPost } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";

import axios from "axios";
export default {
  data() {
    return {
      minIp: {},
      user: {},
      contentData: {},
      data: {}, //  数据的存储
      dataTime: {}, //  data中数据的排序新集合
      currentPage: 1, // 初始页码
      pageSize: 7 // 每页显示条数
    };
  },
  created() {
    var that = this;
    if (sessionStorage.getItem('user')) {
      this.user = JSON.parse(sessionStorage.getItem("user"));
      var json = {};
      json.fullname = this.user.fullname;
      json.type = "doinglist_zonghang";
      getSSOTokenFn(json, sso_token => {
        ajaxPost(json).then(res => {
          that.data = res.data;
          that.dataTime = that.data.showlist.sort((a, b) => {
            return Date.parse(b.time) - Date.parse(a.time); //时间正序
          });
        });
      });
    }else{
      axios
        .get("static/config.json", {})
        .then(function(response) {
          that.minIp = response.data[0].minIp;
          window.sessionStorage.setItem("minIp", JSON.stringify(that.minIp));
          var json = {};
          json.type = "doinglistanduserinfo_zonghang";
          getSSOTokenFn(json, sso_token => {
            ajaxPost(json).then(res => {
              that.data = res.data;
              that.dataTime = that.data.showlist.sort((a, b) => {
                return Date.parse(b.time) - Date.parse(a.time); //时间正序
              });
              window.sessionStorage.setItem("user",JSON.stringify(that.data.result));
            });
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  computed: {
    dataPaging() {
      return this.dataTime.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  methods: {
    being(v) {
      window.sessionStorage.setItem("listKey",JSON.stringify(v))
      window.sessionStorage.setItem("dispatchType",JSON.stringify(v.type))
      var that = this;
      axios.get("static/route.json", {}).then(res => {
        var data = res.data;
        if (v.type == "1") {
          for (var i = 0; i < data.quanhang.length; i++) {
            if (data.quanhang[i][v.appid]) {
              that.$router.push({ path: data.quanhang[i][v.appid] });
              break;
            }
          }
        } else if (v.type == "2") {
          if (this.user.scope == "1") {
            for (var i=0;i<data.zonghang.length;i++) {
                if (data.zonghang[i][v.appid]) {
                    this.$router.push({path: data.zonghang[i][v.appid]});
                    break;
                }
            }
          }else {
            for (var i=0;i<data.zhihang.length;i++) {
                if (data.zonghang[i][v.appid]) {
                    this.$router.push({path: data.zhihang[i][v.appid]});
                    break;
                }
            }
          }
        } else {
          alert("当前功能尚未完成");
        }
      });
    },
    upward() {
      if (this.currentPage > 1) {
        this.currentPage--;
      } else {
        alert("已经是第一页了");
      }
    },
    down() {
      if (this.currentPage < this.data.showlist.length / this.pageSize) {
        this.currentPage++;
      } else {
        alert("已经是最后一页了");
      }
    }
  }
};
</script>

<style scoped>
#all {
  margin-bottom: 10%;

}
.list_content {
  padding: 2% 1%;
  border-bottom: dashed 1px gainsboro;
}
.list_title {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_user,
.list_link,
.list_time {
  font-size: 14px;
  padding: 2% 0 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.list_title_user {
  display: flex;
  justify-content: space-between;
}
.list_time {
  color: gray;
  text-align: right;
}
.el-button-group {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 21%;
}
</style>