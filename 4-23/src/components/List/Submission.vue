<template>
  <div id="all">
    <div>
      <div>意见：</div>
      <br>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" id="rtf_opinion" v-model="textarea"></el-input>
    </div>
    <div v-if="routeHide">
      <div>路径列表：
        <div v-for="(v,i) in routeData" :key="i">
          <input name="rdoroute" :id="v.id" type="radio" v-model="routevalue" :value="v" @change="getUsers()">
          <label :for="v.id">{{v.name}}</label>
        </div>
      </div>

      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="org.name|filterOrg" name="1" v-for="(org, index) in userTree.items" :key="index">
          <div v-for="(v,i) in org.userlist" :key="i">
            <input type="radio" v-model="selectedUser"  :value="{'orgid':org.id,'orgname':org.name,'user':v}" :id="i" v-if="userTree.radiotype=='0'">
            <input type="checkbox" v-model="selectedUsers" :value="{'orgid':org.id,'orgname':org.name,'user':v}" :id="i" v-if="userTree.radiotype=='1'">
            <label :for="i">{{v.name}}</label>
          </div>
          <el-collapse-item :title="sorg.name|filterOrg" name="1" v-for="(sorg, index) in org.items" :key="index" :model="sorg" accordion>
            <div v-for="(v,i) in sorg.userlist" :key="i">
              <input type="radio" v-model="selectedUser" :value="{'orgid':sorg.id,'orgname':sorg.name,'user':v}" :id="i" v-if="userTree.radiotype=='0'">
              <input type="checkbox" v-model="selectedUsers" :value="{'orgid':sorg.id,'orgname':sorg.name,'user':v}" :id="i" v-if="userTree.radiotype=='1'" >
              <label :for="i">{{v.name}}</label>
            </div>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div>
      <el-button type="primary" style="width:100%" class="submitBtn" @click="okclick('common')">普通提交</el-button>
    </div>
    <div class="nav">
        <div class="nav_div">
            <i class="el-icon-back"></i>
            <div @click="back()">返回办文单</div>
        </div>
    </div>
  </div>
</template>

<script>
import createdJs from "@/http/js/Submission";
import { okclickJs , getUsersJs } from "@/http/js/Submission";

export default {
  data() {
    return {
      radio: 1,
      admin: {},
      listKey: {},
      contentData: {},
      activeName: '1',
      routeHide: false,
      routeData: {},
      routevalue: {},
      userTree: {},
      adminOpinion: {},
      selectedUser: {},
      selectedUsers: [],
      strOpinion: {},
      textarea: "",
    };
  },
  created() {
    // 获取初始化路径信息
    this.listKey = JSON.parse(sessionStorage.getItem("listKey"));
    this.contentData = JSON.parse(sessionStorage.getItem("contentData"));
    // 判断路径隐藏
    if (this.contentData.flowsend.rm_type == "singsubmit") {
      this.routeHide = true;
      this.textarea = this.strOpinion = JSON.parse(sessionStorage.getItem("strOpinion"));
    } else {
      this.routeHide = false;
    }

    // 获取数据
    var that = this;
    createdJs(that.listKey,that.contentData,(res)=>{
      var result = res.data;
      if (result.status == "success") {
        that.routeData = result.items;
        if (that.routeData[0]) {
          that.routevalue = {'name':that.routeData[0].name,'id':that.routeData[0].id,'type':that.routeData[0].type,'endid':that.routeData[0].endid,'endname':that.routeData[0].endname};
        }
        var routeData = that.routeData[0];
        getUsersJs(this.listKey,routeData,this.contentData,(res)=>{
        var result = res.data;
        if (result.status == "success") {
          that.userTree = result.userlist; // 将后台的传值赋值
          for (let i = 0; i < that.userTree.items.length; i++) {
            // 获取到需要排序的数组
            var ust = that.userTree.items[i];
            // 将数组进行排序
            ust.userlist.sort((a, b) => {
              return a.sort - b.sort;
            });
            if (ust.userlist.length == "1") {
              this.selectedUser = {
                orgid: ust.id,
                orgname: ust.name,
                user: ust.userlist[0]
              };
            }else if (ust.items.length == "1" && ust.items[0].userlist.length == "1") {
              this.selectedUser = {
                orgid: ust.items[0].id,
                orgname: ust.items[0].name,
                user: ust.items[0].userlist[0]
              };
            }
          }
        } else {
          alert(result.errinfo);
        }
      });
      } else {
        alert("获取路径失败！");
      }
    })
    this.getRouteState = true;
  },
  filters: {
    filterOrg(v) {
      return v.split("↑")[v.split("↑").length - 1];
    }
  },
  methods: {
    back () {
      this.$router.go(-1);//返回上一层
    },
    getUsers(){
      getUsersJs(this.listKey,this.routevalue,this.contentData,(res)=>{
        var result = res.data;
        if (result.status == "success") {
          this.userTree = result.userlist; // 将后台的传值赋值
          for (let i = 0; i < this.userTree.items.length; i++) {
            // 获取到需要排序的数组
            var ust = this.userTree.items[i];
            // 将数组进行排序
            ust.userlist.sort((a, b) => {
              return a.sort - b.sort;
            });
            // for (let n = 0; n < ust.items.length; n++) {
            //     var ust2 = ust.items[n];
            //   ust2.userlist.sort((a, b) => {
            //       return a.sort - b.sort;
            //   });
            // }
            if (ust.userlist.length == "1") {
              this.selectedUser = {
                orgid: ust.id,
                orgname: ust.name,
                user: ust.userlist[0]
              };
            }else if (ust.items.length == "1" && ust.items[0].userlist.length == "1") {
              this.selectedUser = {
                orgid: ust.items[0].id,
                orgname: ust.items[0].name,
                user: ust.items[0].userlist[0]
              };
            }
          }
        } else {
          alert(result.errinfo);
        }
      });
    },
    okclick(flag){
      var obj = document.getElementById("rtf_opinion");
      okclickJs(this.listKey,this.contentData,this.routevalue,this.routeData,this.userTree,this.selectedUser,this.selectedUsers,obj,flag,(res)=>{
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
}
</script>

<style scoped>
#all > div {
  padding: 2% 0;
}
.submitBtn {
  margin-bottom: 20%;
}
.nav{
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
}
.nav_div {
    width: 50%;
}
</style>