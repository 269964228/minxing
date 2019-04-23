<template>
    <div>
        <!-- 页面页数渲染 -->
        <el-tree v-if="data.showlist && data.showlist.length == '0' || data.totalcount == '0'"></el-tree>
        <div v-for="(v,i) in datatime" :key="i" class="list_content" @click="dispatch(v)">
            <div class="list_title">
                {{v.title}}
            </div>
            <div class="list_title_user">
                <div class="list_user">
                    发布人：{{v.user}}
                </div>
                <div class="list_time">
                    {{v.time}}
                </div>
            </div>
        </div>
        <div class="cHeight"></div>
        <!-- 分页部分 -->
        <el-button-group v-if="data.status">
            <el-button type="primary" icon="el-icon-arrow-left" @click="upward(data)">上一页</el-button>
            <el-button type="primary" @click="down(data)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
import { ajaxPost } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";

import axios from "axios";
export default {
    data () {
        return {
            key: {},
            user: {},
            data: {},
            datatime: {},
            dispatchType: {}
        }
    },created () {
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.data = JSON.parse(sessionStorage.getItem('data'));
        this.dispatchType = JSON.parse(sessionStorage.getItem('dispatchType'));
        this.datatime = this.data.showlist.sort((a,b) => {
            return Date.parse(b.time) - Date.parse(a.time);//时间正序
        })
    },methods: {
        dispatch (v) {
            // 将要存储的数组转换为字串的形式
            window.sessionStorage.setItem('listKey', JSON.stringify(v));
            axios.get("static/route.json",{}).then(res => {
                var data = res.data;
                if (this.dispatchType == "1") {
                    for (var i=0;i<data.quanhang.length;i++) {
                        if (data.zonghang[i][v.appid]) {
                            this.$router.push({path: data.quanhang[i][v.appid]});
                            break;
                        }
                    }
                }else {
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
                }
            })
        },upward (paging) {
            var that = this;
            if(paging.pagenum>1){
                paging.pagenum--;
                var json = {};
                json.type = "viewlist";
                var queryjson = {};
                queryjson.key = this.key;
                queryjson.pagenum = paging.pagenum;
                queryjson.pagesize = 10;
                queryjson.totalcount = 0;
                json.query = queryjson;
                getSSOTokenFn(json,(json) => {
                    ajaxPost(json).then(res=>{
                        that.data = res.data;
                        that.datatime = that.data.showlist.sort((a,b) => {
                            return Date.parse(b.time) - Date.parse(a.time);//时间正序
                        })
                    })
                })
            }else{
                alert("已经到第一页了");
            }
        },down (paging) {
            var that = this;
            if(paging.pagenum<Math.ceil(paging.totalcount/paging.pagesize)){
                paging.pagenum++;
                var json = {};
                // ajax获取分页数据
                json.type = "viewlist";
                var queryjson = {};
                queryjson.key = this.key;
                queryjson.pagenum = paging.pagenum;
                queryjson.pagesize = 10;
                queryjson.totalcount = 0;
                json.query = queryjson;
               getSSOTokenFn(json,(json) => {
                    ajaxPost(json).then(res=>{
                        that.data = res.data;
                        that.datatime = that.data.showlist.sort((a,b) => {
                            return Date.parse(b.time) - Date.parse(a.time);//时间正序
                        })
                    })
                })
            }else{
                alert("这是最后一页了");
            }
        }
    }
}
</script>

<style scoped>
.list_content{
    padding: 2% 1%;
    border-bottom: dashed 1px gainsboro;
}
.list_title{
    width: 90%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.list_user{
    width: 50%;
    font-size: 14px;
    padding: 2% 0 0 0;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.list_title_user{
    display: flex;
    justify-content: space-between;
}
.list_time{
    color: gray;
    font-size: 14px;
    padding: 1.5% 0;
}

.el-button-group {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 22%;
}

.cHeight{
    height: 50px;
}
</style>