<template>
  <div id="all">
    <figure class="nesting">
      <div class="nesting_div">
        <div class="static_state">编号：</div>
        <div>{{data.draft.bianhao}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">申请时间：</div>
        <div>{{data.draft.shenqingshijian}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">申请单位：</div>
        <div>{{data.draft.shenqingdanwei}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">经办人：</div>
        <div>{{data.draft.jingbanren}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">联系电话：</div>
        <div>{{data.draft.lianxidianhua}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">申请业务：</div>
        <div>{{data.draft.shenqingyewu}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">标题：</div>
        <div>{{data.draft.biaoti}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">印章类别：</div>
        <div>{{data.draft.yinzhangleibie}}</div>
      </div>
    </figure>
    <figure class="opinion">
      <div class="bgcolor">印章名称：</div>
      <div class="border">
        <div class="opinion_show">{{data.draft.yinzhangmingcheng}}</div>
      </div>
    </figure>
    <figure class="nesting">
      <div class="nesting_div">
        <div class="static_state">原专管员：</div>
        <div>{{data.draft.yuanzhuanguanyuan}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">现专管员：</div>
        <div>{{data.draft.xianzhuanguanyuan}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">原监印员：</div>
        <div>{{data.draft.yuanjianyinyuan}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">现监印员：</div>
        <div>{{data.draft.xianjianyinyuan}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">附件：</div>
        <div>
          <div v-for="(v,i) in data.attachlist" :key="i" @click="route(v)" class="enclo_div">
            <div>{{v.name}}</div>
          </div>
        </div>
      </div>
      <div class="nesting_div">
        <div class="static_state">印章印模：</div>
        <div>{{data.draft.yinzhangyinmu}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">刻制印章申请文号：</div>
        <div>{{data.draft.shenqingwenhao}}</div>
      </div>
      <div class="nesting_div">印章迁移单位：</div>
      <div class="nesting_div" style="margin-left:5%">
        <div class="static_state">迁出单位：</div>
        <div>{{data.draft.qianchudanwei}}</div>
      </div>
      <div class="nesting_div" style="margin-left:5%">
        <div class="static_state">迁入单位：</div>
        <div>{{data.draft.qianchudanwei}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">制发单位：</div>
        <div>{{data.draft.zhifadanwei}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">制发单位联系人：</div>
        <div>{{data.draft.zhifadanweilianxiren}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">制发单位联系人电话：</div>
        <div>{{data.draft.zhifadanweilianxirendianhua}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">启用时间：</div>
        <div>{{data.draft.qiyongshijian}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">启用文号：</div>
        <div>{{data.draft.qiyongwenhao}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">业务拟办时间：</div>
        <div>{{data.draft.nibanshijian}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">废印销毁年度：</div>
        <div>{{data.draft.xiaohuiniandu}}</div>
      </div>
    </figure>
    <figure class="opinion">
      <div class="bgcolor">情况说明：</div>
      <div class="border">
        <div class="opinion_show">{{data.draft.qingkuangshuoming}}</div>
      </div>
    </figure>
    <figure class="nesting">
      <div class="nesting_div">
        <div class="static_state">专管员签名：</div>
        <div>{{data.draft.zhuanguanyuanqianzi}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">监印员签名：</div>
        <div>{{data.draft.jianyinyuanqianzi}}</div>
      </div>
    </figure>
    <figure class="opinion">
      <div class="bgcolor">印章管理部门(处室)负责人意见：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommGLDept" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
      <div class="bgcolor">相关部门负责人意见：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommxb" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
        <div class="opinion_show" v-for="(v,i) in json.TCommxbPrint" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
      <div class="bgcolor">分管领导审批：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommhld" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
      <div class="bgcolor">管辖支行综合部门备案：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommGXZH" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
      <div class="bgcolor">总行备案：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommZH" :key="i">
          <div>{{v.content}}</div>
          <div style="float:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
      <div class="bgcolor">备注：</div>
      <div class="border">
        <div class="opinion_show">{{data.draft.beizhu}}</div>
      </div>
    </figure>
  </div>
</template>

<script>
import axios from "axios";
import { ajaxPost } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";

export default {
  data() {
    return {
      json: {},
      listKey: {},
      data: {},
      isTrue: false,
      attachview: {},
      attachData: {},
      format: [
        "doc",
        "docx",
        "wps",
        "odt",
        "rtf",
        "xls",
        "xlsx",
        "et",
        "ods",
        "csv",
        "ppt",
        "pptx",
        "dps",
        "odp",
        "pdf",
        "txt",
        "jpg",
        "jpeg",
        "gif",
        "png",
        "bmp",
        "tif",
        "mp3",
        "m4a",
        "mid",
        "wma",
        "mp4",
        "zip",
        "rar",
        "tar",
        "dwg",
        "dxf",
        "dwf",
        "html",
        "htm",
        "xml",
        "js",
        "css",
        "java",
        "php",
        "sql"
      ]
    };
  },
  created() {
    // 调用session中的数据：将数据转换成json对象的格式
    this.listKey = JSON.parse(sessionStorage.getItem("listKey"));
    var that = this;
    var json = {};
    json.type = "viewdocument";

    var jsondoc = {};
    jsondoc.key = this.listKey.appid;
    jsondoc.dbpath = this.listKey.dbpath;
    jsondoc.unid = this.listKey.unid;

    json.query = jsondoc;
    getSSOTokenFn(json, json => {
      ajaxPost(json).then(res => {
        that.data = res.data;
        window.sessionStorage.setItem("contentData", JSON.stringify(that.data));
        // 创建一个要放置多个数组集合的对象
        var json = {};
        // 创建一个新的数组，将要处理的数据赋值
        var arra = that.data.opinionlist;
        console.log(JSON.stringify(arra))
        // for循环
        for (var i = 0; i < arra.length; i++) {
          // 判断json对象中是否存在type类型
          if (json[arra[i].type]) {
            json[arra[i].type].push(arra[i]);
          } else {
            // 类型不存在，创建一个新的数组
            var arr = new Array();
            arr.push(arra[i]);
            json[arra[i].type] = arr;
          }
        }
        that.json = json;
      });
    });
  },
  methods: {
    route(value) {
      let that = this;
      let json = {};
      json.type = "showattach";
      var queryjson = {};
      queryjson.dbpath = value.dbpath;
      queryjson.unid = value.unid;
      queryjson.name = value.attachname;
      json.query = queryjson;
      getSSOTokenFn(json, (json, sso_token) => {
        ajaxPost(json).then(res => {
          that.attachData = res.data;
          let index = that.attachData.url.lastIndexOf(".");
          let obj = that.attachData.url.substring(
            index + 1,
            that.attachData.length
          );
          for (var i = 0; i < that.format.length; i++) {
            if (that.format[i] == obj) {
              this.isTrue = true;
              break;
            } else {
              this.isTrue = false;
            }
          }
          if (this.isTrue) {
            window.open(
              "https://api.idocv.com/view/url?url=" +
                encodeURIComponent(that.attachData.url),
              "_blank"
            );
          } else {
            alert("暂不支持的文件格式");
          }
        });
      });
    },
    back() {
      this.$router.replace({ path: "/List" });
    },
    sub() {
      this.$router.push({ path: "/submission" });
    }
  }
};
</script>

<style scoped>
#all {
  margin-bottom: 10%;
  width: 100%;
}
.nesting_div > div:nth-child(even) {
  width: 70%;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
figure {
  margin: 0;
}
div {
  padding: 2% 0;
  margin-right: 2%;
}
.static_state {
  width: 28%;
  box-sizing: border-box;
}
.nesting {
  width: 100%;
}
.nesting_div {
  /* width: 100%; */
  display: -webkit-flex;
  border-bottom: solid 1px red;
}
.nesting_div > div:nth-child(2) {
  width: 70%;
}
.opinion_show {
  width: 100%;
  height: 50%;
  box-sizing: border-box;
}
.enclo_div {
  box-sizing: border-box;
  border: dashed 1px gainsboro;
}
.border {
  border: solid 1px;
  width: 100%;
  height: 150px;
  overflow-y: scroll;
  box-sizing: border-box;
}
.bgcolor {
  background-color: blueviolet;
  margin: 1px 0;
  width: 100%;
  color: white;
}
.nav {
  width: 100%;
  display: flex;
  font-size: 12px;
  text-align: center;
  justify-content: space-around;
  width: 100%;
  position: fixed;
  bottom: 0%;
  left: 0%;
  background: #f4f1f1;
  padding: 0%;
}
.nav_div {
  width: 50%;
}
</style>