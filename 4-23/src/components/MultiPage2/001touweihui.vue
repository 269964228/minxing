<template>
  <div id="all">
    <figure class="opinion">
        <div class="bgcolor">投委会主任委员意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommzrhld" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>

        <!-- 直接提交 -->
        <!--<div class="submit" v-if="
            data.flowsend.RoaIsSendDirect == '1' 
            && data.flowsend.fldIsEditType == '1'
            && user.scope == '1'
            || data.flowsend.rm_type == 'leadopin'">
            <div class="opinion">
                <div>意见：</div>
                <br>
                <textarea id="rtf_opinion" rows="5" v-model="textarea"></textarea>
            </div>
            <div>
                <el-button type="primary" style="width:100%" class="submitBtn" @click="okclick('direct')">直接提交</el-button>
            </div>
        </div> -->

        <div class="bgcolor">主管行领导意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommfghld" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">发起单位意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommfqdw" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">归口管理部门意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommgkbm" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">相关部门意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommfxgl" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">风险管理部意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommbgs" :key="i">
                <div v-html="v.content"></div>
                <div style="text-align:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
    </figure>
    <figure class="title">
        <div class="character static_state">标题：</div>
        <div>{{data.draft.biaoti}}</div>
        <div class="character static_state">附件：</div>
        <div>
            <div v-for="(v,i) in data.attachlist" :key="i" @click="route(v)" class="enclo_div">
            <div>{{v.name}}</div>
            </div>
        </div>
    </figure>
    <figure class="nesting">
        <div class="nesting_div">
            <div class="static_state">业务类型：</div>
            <div>{{data.draft.leixing}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">报审单文号：</div>
            <div>{{data.draft.baoshenwenhao}}</div>
        </div>
        <div class="bgcolor">审议事项：</div>
        <div class="border">
            <div style="white-space:pre-wrap">{{data.draft.shixiang}}</div>
        </div>
        <div class="bgcolor">业务基本概况：</div>
        <div class="border">
            <div style="white-space:pre-wrap">{{data.draft.gaiguang}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">主办部门：</div>
            <div>{{data.draft.zhubanbumen}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">拟稿人：</div>
            <div>{{data.draft.nigaoren}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">相关部门：</div>
            <div>{{data.draft.xiangguanbumen}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">联系电话：</div>
            <div>{{data.draft.dianhua}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">拟稿时间：</div>
            <div>{{data.draft.shijian}}</div>
        </div>
    </figure>{{data.draft}}
    <div class="nav">
        <div class="nav_div">
            <i class="el-icon-back"></i>
            <div @click="back()">返回</div>
        </div>
        <div class="nav_div" v-if="data.flowsend.fldIsEditType == '1' || data.flowsend.rm_type == 'leadopin'">
            <!-- fldIsEditType=1，表示该用户可编辑，rm_type是领导阅示 -->
            <i class="el-icon-edit"></i>
            <div @click="sub()">提交</div>
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
            // 静态创建
            json:{},
            data:{},
            user:{},
            textarea:"",
            listKey:{},
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
        this.user =JSON.parse(sessionStorage.getItem('user'));
        this.listKey =JSON.parse(sessionStorage.getItem('listKey'));

        var that = this;
        var json = {};
        json.type = "viewdocument";

        var jsonquery = {};
        jsonquery.key = this.listKey.appid;
        jsonquery.dbpath = this.listKey.dbpath;
        jsonquery.unid = this.listKey.unid;

        json.query = jsonquery;
        getSSOTokenFn(json,(json) => {
            ajaxPost(json).then(res=>{
                // 意见数据处理
                that.data = res.data;
                window.sessionStorage.setItem("contentData",JSON.stringify(that.data));
                // 创建一个要放置多个数组集合的对象
                var json = {};
                // 创建一个新的数组，将要处理的数据赋值
                var arra = that.data.opinionlist;
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
            this.$router.push({path: "/submission"})
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
    },
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
  width: 70%;
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