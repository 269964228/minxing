<template>
  <div id="all">
    <figure class="nesting">
        <div class="nesting_div">
            <div class="static_state">申请号：</div>
            <div>{{data.draft.shenqinghao}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">申请时间：</div>
            <div>{{data.draft.shenqingshijian}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">印章类别和名称：</div>
            <div>{{data.draft.yongyinleibie}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">标题(目的):</div>
            <div>{{data.draft.biaoti}}</div>
        </div>
    </figure>
    <figure class="title" style="border-bottom:solid 1px red">
        <div class="character static_state">附件：</div>
        <div>
            <div v-for="(v,i) in data.attachlist" :key="i" @click="route(v)" class="enclo_div">
                <div>{{v.name}}</div>
            </div>
        </div>
    </figure>
    <figure class="nesting">
        <div class="nesting_div">
            <div class="static_state">用印单位：</div>
            <div>{{data.draft.yongyindanwei}}</div>
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
            <div class="static_state">发往单位：</div>
            <div>{{data.draft.fawangdanwei}}</div>
        </div>
    </figure>
    <figure class="table">
        <div class="nesting_div">用印事项及份数：</div>
        <table>
            <tr>
                <td>{{data.draft.shixiang1}}</td>
                <td>{{data.draft.cailiao1}}</td>
                <td>{{data.draft.geshu1}}</td>
            </tr>
            <tr>
                <td>{{data.draft.shixiang2}}</td>
                <td>{{data.draft.cailiao2}}</td>
                <td>{{data.draft.geshu2}}</td>
            </tr>
            <tr>
                <td>{{data.draft.shixiang3}}</td>
                <td>{{data.draft.cailiao3}}</td>
                <td>{{data.draft.geshu3}}</td>
            </tr>
            <tr>
                <td>{{data.draft.shixiang4}}</td>
                <td>{{data.draft.cailiao4}}</td>
                <td>{{data.draft.geshu4}}</td>
            </tr>
            <tr>
                <td>{{data.draft.shixiang5}}</td>
                <td>{{data.draft.cailiao5}}</td>
                <td>{{data.draft.geshu5}}</td>
            </tr>
        </table>
    </figure>
    <figure class="nesting">
        <div class="nesting_div">签批权限依据：</div>
        <div class="nesting_div" style="margin-left:5%">
            <div class="static_state">制度依据：</div>
            <div>dfghjhk</div>
        </div>
        <div class="nesting_div" style="margin-left:5%">
            <div class="static_state">领导分工依据：</div>
            <div>dafghjk</div>
        </div>
    </figure>

    <figure class="nesting">
        <div class="nesting_div">法律审核：</div>
        <div class="nesting_div" style="margin-left:5%">
            <div class="static_state">是否经过法审：</div>
            <div>{{data.draft.fashen}}<span style="margin-left:20%">{{data.draft.fashen1}}</span></div>
        </div>
        <div class="nesting_div" style="margin-left:5%">
            <div class="static_state">是否经过法审意见修改完善：</div>
            <div>{{data.draft.fashenyijian}}<span style="margin-left:20%">{{data.draft.fashenyijian1}}</span></div>
        </div>
    </figure>
    
    <figure class="opinion">
        <div class="bgcolor">分管领导审批：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommhld" :key="i">
                <div>{{v.content}}</div>
                <div style="float:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">用印单位意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommzb" :key="i">
                <div>{{v.content}}</div>
                <div style="float:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">相关部门审核：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommxb" :key="i">
                <div>{{v.content}}</div>
                <div style="float:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
        <div class="bgcolor">印章(档案)管理部门意见：</div>
        <div class="border">
            <div class="opinion_show" v-for="(v,i) in json.TCommSeal" :key="i">
                <div>{{v.content}}</div>
                <div style="float:right">{{v.user}}<span>({{v.time}})</span></div>
            </div>
        </div>
    </figure>
    <figure class="nesting">
        <div class="nesting_div">
            <div class="static_state">印章专管员签字:</div>
            <div>{{data.draft.yinzhangzhuanguanyuan}}</div>
        </div>
        <div class="nesting_div">
            <div class="static_state">监印员签字:</div>
            <div>{{data.draft.jianyinyuan}}</div>
        </div>
    </figure>
    <figure class="opinion">
        <div class="bgcolor">留存资料：</div>
        <div class="border">
            <div class="opinion_show">{{data.draft.liucunziliao}}</div>
        </div>
        <div class="bgcolor">备注：</div>
        <div class="border">
            <div class="opinion_show">{{data.draft.beizhu}}</div>
        </div>
    </figure>

    <div class="nav">
        <div class="nav_div">
            <i class="el-icon-back"></i>
            <div @click="back()">返回</div>
        </div>
        <div class="nav_div" v-if="data.flowsend.fldIsEditType == '1' || data.flowsend.rm_type == 'leadopin'">
            <i class="el-icon-edit"></i>
            <div @click="sub()">提交</div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ajaxPost } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";

export default {
    data() {
        return {
            json:{},
            listKey: {},
            data: {},
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
        this.listKey =JSON.parse(sessionStorage.getItem('listKey'));
        // console.log(JSON.stringify(this.listKey));
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
    },
    methods: {
        route (value) {
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
                        window.open("https://api.idocv.com/view/url?url="+encodeURIComponent(that.attachData.url),"_blank");
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
        }
    }
};
</script>

<style scoped>
#all {
    margin-bottom: 10%;
    width: 100%;
}.nesting_div > div:nth-child(even){
    width: 70%;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
}figure {
    margin: 0;
}div{
    padding: 2% 0;
    margin-right: 2%;
}.static_state {
    width: 28%;
    box-sizing: border-box;
}.nesting {
    width: 100%;
}.nesting_div {
    /* width: 100%; */
    display: -webkit-flex;
    border-bottom: solid 1px red;
}.nesting_div > div:nth-child(2) {
    width: 70%;
}.opinion_show {
    width: 100%;
    height: 50%;
    box-sizing: border-box;
}.enclo_div {
    box-sizing: border-box;
    border: dashed 1px gainsboro;
}.border {
    border: solid 1px ;
    width:100%;
    height: 150px;
    overflow-y: scroll;
    box-sizing: border-box;
}.bgcolor{
    background-color: blueviolet;
    margin: 1px 0;
    width: 100%;
    color: white;
}.nav{
    width: 100%;
    display: flex;
    font-size: 12px;
    text-align: center;
    justify-content: space-around;
    width: 100%;
    position: fixed;
    bottom: 0%;
    left: 0%;
    background: #F4F1F1;
    padding:0%;
}.nav_div {
    width: 50%;
}.table,.table > table{
    width: 100%;
}.table > table > tr > td {
    width: 33%;
    text-align: center;
}.title {
    width: 98%;
    display: -webkit-flex;
    flex-wrap: wrap;
}.title > div:nth-child(even) {
    width: 65%;
}
</style>