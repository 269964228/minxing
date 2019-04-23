<template>
  <div id="all">{{data.draft}}
    <figure class="opinion">
      <div class="bgcolor">审批意见：</div>
      <div class="border">
        <div class="opinion_show" v-for="(v,i) in json.TCommhld" :key="i">
          <div v-html="v.content"></div>
          <div style="text-align:right">
            {{v.user}}
            <span>({{v.time}})</span>
          </div>
        </div>
      </div>
    </figure> 
    <figure class="nesting">
      <div class="nesting_div">
        <div class="static_state">项目名称：</div>
        <div>{{data.draft.xiangmumingcheng}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">检查对象：</div>
        <div>{{data.draft.jianchaduixiang}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">立项部门：</div>
        <div>{{data.draft.lixiangbumen}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">变更类型：</div>
        <div>{{data.draft.biangengleixing}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">业务类型：</div>
        <div>{{data.draft.yewuleixing}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">产品类型：</div>
        <div>{{data.draft.chanpinleixing}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">检查方式：</div>
        <div>{{data.draft.jianchafangshi}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">检查类型：</div>
        <div>{{data.draft.jianchaleixing}}</div>
      </div>
      <div class="bgcolor">检查范围：</div>
      <div class="border">
        <div style="white-space:pre-wrap">{{data.draft.jianchafanwei}}</div>
      </div>
      <div class="bgcolor">主要检查内容：</div>
      <div class="border">
        <div style="white-space:pre-wrap">{{data.draft.zhuyaojianchaneirong}}</div>
      </div>
      <!--<div class="nesting_div">
        <div class="static_state">拟稿部门：</div>
        <div>{{data.draft.nigaobumen}}</div>
      </div>-->
      <!--<div class="bgcolor">意见建议：</div>
      <div class="border">
        <div style="white-space:pre-wrap">{{data.draft.yijian}}</div>
      </div>-->
      <div class="nesting_div">
        <div class="static_state">预计开始时间：</div>
        <div>{{data.draft.yujikaishishijian}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">预计结束时间：</div>
        <div>{{data.draft.yujijieshushijian}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">参与部门：</div>
        <div>{{data.draft.canyubumen}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">内控自评计划：</div>
        <div>{{data.draft.neikongzipingjihua}}</div>
      </div>
    </figure>
    <figure class="title">
        <!--<div class="character static_state">标题：</div>
        <div>{{data.draft.biaoti}}</div>-->
        <div class="character static_state">附件：</div>
        <div>
            <div v-for="(v,i) in data.attachlist" :key="i" @click="route(v)" class="enclo_div">
            <div>{{v.name}}</div>
            </div>
        </div>
    </figure>
    <figure class="nesting">
      <div class="nesting_div">
        <div class="static_state">备注：</div>
        <div>{{data.draft.beizhu}}</div>
      </div>
      <div class="nesting_div">
        <div class="static_state">新增/变更/删除原因：：</div>
        <div>{{data.draft.yuanyin}}</div>
      </div>
    </figure>
    <div class="nav">
      <div class="nav_div">
        <i class="el-icon-back"></i>
        <div @click="back()">返回</div>
      </div>
      <div class="nav_div" @click="Submission" v-if="data.flowsend.fldIsEditType == '1' || data.flowsend.rm_type == 'leadopin'">
        <i class="el-icon-edit"></i>
        <div>提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import getSSOTokenFn from "@/http/getSSOToken";
import { okclickJs } from "@/http/js/Submission";
import { ajaxPost,oaflowsend } from "@/http/MXCommon";

export default {
    data() {
        return {
            json:{},
            listKey: {},
            data: {},
            user: {},
            textarea: "",
            loading:false,
            isTrue: false,
            attachview: {},
            attachData: {},
            format: [
                'doc', 'docx', 'wps', 'odt', 'rtf', 'xls', 'xlsx', 'et', 'ods', 'csv', 'ppt',
                'pptx', 'dps', 'odp', 'pdf','txt', 'jpg', 'jpeg', 'gif', 'png', 'bmp', 'tif',
                'mp3', 'm4a', 'mid', 'wma', 'mp4', 'zip', 'rar', 'tar', 'dwg', 'dxf', 'dwf',
                'html','htm','xml','js','css','java','php','sql'
            ]
        };
    },created() {
        // 调用session中的数据：将数据转换成json对象的格式
        this.user =JSON.parse(sessionStorage.getItem('user'));
        this.listKey =JSON.parse(sessionStorage.getItem('listKey'));
        var that = this;
        var json = {};
        json.type = "viewdocument";

        var jsondoc = {};
        jsondoc.key = this.listKey.appid;
        jsondoc.dbpath = this.listKey.dbpath;
        jsondoc.unid = this.listKey.unid;

        json.query = jsondoc;
        getSSOTokenFn(json,(json) => {
            ajaxPost(json).then(res=>{
                that.data = res.data;
                window.sessionStorage.setItem("contentData",JSON.stringify(that.data));
                // 创建一个要放置多个数组集合的对象
                var json = {};
                // 创建一个新的数组，将要处理的数据赋值
                var arra = that.data.opinionlist;
                // for循环
                for (var i = 0; i < arra.length; i++) {
                    // 判断json对象中是否存在type类型
                    if (json[arra[i].type]) {        
                        json[arra[i].type].push(arra[i]);
                    } else{
                        // 类型不存在，创建一个新的数组
                        var arr = new Array();
                        arr.push(arra[i]);
                        json[arra[i].type] = arr;
                    }
                }
                that.json = json;
            })
        })
    },methods: {
        route (value) {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
            let that = this;
            let json = {};
            json.type = "showattach";
            var queryjson = {};
            queryjson.dbpath = value.dbpath;
            queryjson.unid = value.unid;
            queryjson.name = value.attachname;
            json.query = queryjson;
            getSSOTokenFn(json,(json,sso_token) => {
                ajaxPost(json).then(res=>{
                    that.attachData = res.data;
                    let index = that.attachData.url.lastIndexOf(".");
                    let obj = that.attachData.url.substring(index+1,that.attachData.length);
                    for (var i = 0;i < that.format.length; i++) {
                        if (that.format[i] == obj) {
                            this.isTrue = true;
                            break;
                        }else {
                            this.isTrue =false;
                        }
                    }
                    if (this.isTrue) {
                        MXCommon.openUrlPage("https://api.idocv.com/view/url?url=" + encodeURIComponent(that.attachData.url));
                    }else {
                        alert ("暂不支持的文件格式");
                    }
                })
            })
        },
        back () {
            this.$router.replace({path: "/List"});
        },
        sub () {
            this.$router.push({path: "/Submission"})
        },
        okclick(flag){
            var obj = document.getElementById("rtf_opinion");
            okclickJs(this.listKey,this.data,{},{},{},{},{},obj,flag,(res)=>{
                var result = res.data;
                if (result.status == "success") {
                    alert("提交成功");
                    this.$router.replace({ path: "/List" });
                } else {
                    alert(result.errinfo);
                }
            });
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
  padding: 4% 0;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
figure {
  margin: 0;
}
div {
  margin-right: 2%;
}
.static_state {
  width: 28%;
  padding: 4% 0;
  box-sizing: border-box;
}
.title {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.title > div {
  padding: 2% 0;
  margin: auto 0;
}
.title > div:nth-child(even) {
  width: 60%;
}
.nesting {
  width: 100%;
}
.nesting_div {
  width: 100%;
  display: -webkit-flex;
  border-bottom: solid 1px red;
}
.nesting_div > div:nth-child(2) {
  width: 70%;
}
.opinion_show {
  padding: 0;
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
}
.enclo_div {
  padding: 2% 0;
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
  width: 100%;
  padding: 2% 0;
  color: white;
  background-color: blueviolet;
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
  padding: 2% 0;
}
.nav_div {
  width: 50%;
}
.opinion {
  width: 100%;
}
.submit {
  width: 100%;
  border: solid 1px green;
}
.opinion > textarea {
  width: 98.5%;
}
</style>