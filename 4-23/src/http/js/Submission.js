import { oaflowsend } from "@/http/MXCommon";
import getSSOTokenFn from "@/http/getSSOToken";

//createdJs
export default function createdJs(listKey,contentData,callBack) {
  var json = {};
  json.type = "getrout";
  var queryjson = getJsonHeader(listKey,contentData);
  queryjson.strDeptID = contentData.flowsend.fldCurUserDeptID;
  queryjson.strStepID = contentData.flowsend.fldCurLinkID;
  
  json.query = queryjson;
  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
      callBack(res)
    });
  })
}

// 设置数据请求的基本信息
function getJsonHeader(listKey,contentData) {
  var json = {};
  json.rm_appid = listKey.appid;
  json.strUNID = listKey.unid;
  json.rm_dbpath = listKey.dbpath;
  json.strUserName = contentData.flowsend.fldCurUserName;
  return json;
}

// 点击路径获取候选人员信息
export function getUsersJs(listKey,routevalue,contentData,callBack) {
  var json = {};
  var queryjson = getJsonHeader(listKey,contentData);
  if (routevalue.type == "Normal") {
    //正常提交
    json.type = "getuserlist";
  } else if (routevalue.type == "Back") {
    //退回
    json.type = "getuserlistback";
  } else if (routevalue.type == "dirsend") {
    //退回上一处理人
    json.type = "getuserlistper";
  } else if (routevalue.type == "LeaderPath"){
    // 送阅示
    json.type = "getuserlistread";
  }else {
    alert("路径类型暂不支持！");
    return;
  }
  queryjson.strDeptID = contentData.flowsend.fldCurUserDeptID;
  queryjson.strStepID = routevalue.endid;
  json.query = queryjson;
  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
        callBack(res);
      });
    })
}

//多人提交检查
function mulcheck(listKey,contentData,callBack) {
  var json = {};
  var queryjson = getJsonHeader(listKey,contentData);
  json.type = "checkmullist";
  queryjson.strUNID = listKey.unid;
  queryjson.strUserName = contentData.flowsend.fldCurUserName;
  queryjson.strDeptID = contentData.flowsend.fldCurUserDeptID;
  queryjson.strStepID = contentData.flowsend.fldCurLinkID;
  json.query = queryjson;

  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
      var result = res.data;
      if (result.status == "success") {
        callBack(result.result);
      } else {
        alert(result.errinfo);
      }
    });
  })
}

//单人提交
function singlesubmit(listKey,contentData,routevalue,routeData,userTree,selectedUser,selectedUsers,strOpinion,callBack) {
  getSelectedUserList(userTree,selectedUser,selectedUsers,jsonUser => {
    if (!jsonUser.isselected) {
      alert("请选择人员！");
      return false;
    } else {
      var arr = new Array();
      // 外出判断
      agentcheck(listKey,contentData,jsonUser.strAgent, res => {
        for (var index in res) {
          // 外出isagent=="1"
          if (res[index].isagent == "1") {
            arr.push(res[index]);
          }
        }
        for (var i = 0; i < jsonUser.reuserlist.length; i++) {
          var user = jsonUser.reuserlist[i];
          for (var j = 0; j < arr.length; j++) {
            var agent = arr[j];
            if (
              user.ROAMReUsers == agent.usernmae &&
              user.ROAMReUsersDeptID == agent.orgid
            ) {
              //人员外出
              user.isagent = "1";
              user.ROAMReOldUsers = agent.agentuser;
              user.ROAMFirstUsers = agent.usernmae;
              user.ROAMFirstUsersDeptID = agent.orgid;
              user.ROAMReUsers = agent.agentuser;
              user.ROAMReFirstUsers = agent.usernmae;
              user.ROAMReUsersAltName = agent.newusecn;
            }
          }
        }
        var json = {};
        for (var i = 0; i < routeData.length; i++) {
          if (routeData[i].type == "LeaderPath"){
            json.type = "sendread";
            break;
          }else{
            json.type = "singsubmit";
          }
        }
        
        var queryjson = getJsonHeader(listKey,contentData,routevalue);
        queryjson.fldCurUserDeptID = contentData.flowsend.fldCurUserDeptID;
        queryjson.fldCurUserDeptName = contentData.flowsend.fldCurUserDeptName;
        queryjson.strUserName = contentData.flowsend.fldCurUserName;
        queryjson.fldCurUserShortName = contentData.flowsend.fldCurUserShortName;
        queryjson.fldCurUserHLDeptName = contentData.flowsend.fldCurUserHLDeptName;
        queryjson.fldCurUserHLDeptID = contentData.flowsend.fldCurUserHLDeptID;

        queryjson.ROAMReLinkID = routevalue.endid;
        queryjson.ROAMSendID = routevalue.id;
        queryjson.ROAMreceName = routevalue.name;
        queryjson.ROAROpinText = strOpinion;

        queryjson.fldCurStepIsConsigned = contentData.flowsend.fldCurStepIsConsigned;
        queryjson.fldCurAgentName = contentData.flowsend.fldCurAgentName;
        queryjson.fldCurConsignerDeptID = contentData.flowsend.fldCurConsignerDeptID;
        queryjson.fldCurConsignerName = contentData.flowsend.fldCurConsignerName;

        queryjson.reuserlist = jsonUser.reuserlist;
        json.query = queryjson;
        getSSOTokenFn(json,(json) => {
          oaflowsend(json).then(res=>{
            callBack(res)
          });
        })
      });
    }
  });
}

// 多人提交
function mulsubmit(listKey,contentData,strOpinion,callBack) {
  //提交前检查 checkmullist
  mulcheck(listKey,contentData,res => {
    if (res == "true") {
      //校验成功，实际提交
      var json = {};
      json.type = "mulsubmit";

      var queryjson = getJsonHeader(listKey,contentData);
      queryjson.ROAmOrgStrID = contentData.flowsend.fldCurUserDeptID;
      queryjson.ROAmOrgStr = contentData.flowsend.fldCurUserDeptName;
      queryjson.ROAMUserId = contentData.flowsend.fldCurUserName;
      queryjson.ROAAppID = contentData.flowsend.fldAppID;
      queryjson.ROAROpinText1 = strOpinion;
      if (contentData.flowsend.fldCurStepIsConsigned == "1") {
        queryjson.CurUser = contentData.flowsend.fldCurConsignerName; //被代理人
      } else {
        queryjson.CurUser = ""; //被代理人
      }
      json.query = queryjson;

      getSSOTokenFn(json,(json) => {
        oaflowsend(json).then(res=>{
          callBack(res)
        });
      })
    } else {
      //检查不通过 提示用户，重新加载
      alert("有其他用户在处理，请重新提交！");
      window.sessionStorage.setItem("strOpinion",JSON.stringify(strOpinion));
      window.location.reload();    //刷新 
    }
  });
}

//外出判断
function agentcheck(listKey,contentData,strAgent,callBack) {
  var json = {};
  json.type = "getagent";

  var queryjson = getJsonHeader(listKey,contentData);
  queryjson.strUNID = listKey.unid;
  queryjson.strUserName = contentData.flowsend.fldCurUserName;
  queryjson.strDeptID = contentData.flowsend.fldCurUserDeptID;
  queryjson.strStepID = contentData.flowsend.fldCurLinkID;
  queryjson.strAgent = strAgent;
  json.query = queryjson;

  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
      const result = res.data;
      if (result.status == "success") {
        callBack(result.items);
      } else {
        alert(result.errinfo);
      }
      });
    })
}

// 阅示
function leaderopinion(listKey,contentData,strOpinion,callBack) {
  var json = {};
  json.type = "leadopin";

  var queryjson = getJsonHeader(listKey,contentData);
  queryjson.ROAmOrgStrID = contentData.flowsend.fldCurUserDeptID;
  queryjson.ROAmOrgStr = contentData.flowsend.fldCurUserDeptName;
  queryjson.ROAMUserId = contentData.flowsend.fldCurUserName;
  queryjson.ROAAppID = contentData.flowsend.fldAppID;
  queryjson.ROAROpinText1 = strOpinion;
  queryjson.CurUser = ""; //收文阅示，被代理人一直为空
  json.query = queryjson;
  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
      callBack(res);
    });
  })
}

// 判断选择类型执行不同方法
function getSelectedUserList(userTree,suser,selectedUsers,callBack) {
  var jsonUser = {};
  var userlist = new Array();
  var bol = false;
  // var suser = "";
  var reId, reorg, reuser, reusershort;
  var strAgent = new Array();
  // 判断选择的类型    0是单选
  if (userTree.radiotype == "0") {
    // suser = selectedUser;
    if (suser.orgid) {
      reId = suser.orgid.split("↑")[suser.orgid.split("↑").length - 1];
      reorg = suser.orgname;
      reuser = suser.user.fullname;
      reusershort = suser.user.name;

      var agentJson = {};
      agentJson.username = reuser;
      agentJson.orgid = reId;
      strAgent.push(agentJson);
      bol = true;

      var userJson = {};
      userJson.ROAMReUsers = reuser;
      userJson.ROAMReFirstUsers = reuser;
      userJson.ROAMReUsersAltName = reusershort;
      userJson.ROAMReUsersDeptName = reorg;
      userJson.ROAMReUsersDeptID = reId;
      userJson.isagent = "0";
      userJson.ROAMFirstUsers = "";
      userJson.ROAMFirstUsersDeptID = "";
      userJson.ROAMReOldUsers = "";
      userlist.push(userJson);
    } else {
      bol = false;
    }
    // 判断选择类型    1是多选
  } else if (userTree.radiotype == "1") {
    if (selectedUsers.length) {
      reId = "";
      reorg = "";
      reuser = "";
      reusershort = "";
      var strsplit = "";
      for (var i = 0; i < selectedUsers.length; i++) {
        suser = selectedUsers[i];
        reId = suser.orgid.split("↑")[suser.orgid.split("↑").length - 1];
        reorg = suser.orgname;
        reuser = suser.user.fullname;
        reusershort = suser.user.name;

        var agentJson = {};
        agentJson.username = reuser;
        agentJson.orgid = reId;
        strAgent.push(agentJson);
        bol = true;

        var userJson = {};
        userJson.ROAMReUsers = reuser;
        userJson.ROAMReFirstUsers = reuser;
        userJson.ROAMReUsersAltName = reusershort;
        userJson.ROAMReUsersDeptName = reorg;
        userJson.ROAMReUsersDeptID = reId;
        userJson.isagent = "0";
        userJson.ROAMFirstUsers = "";
        userJson.ROAMFirstUsersDeptID = "";
        userJson.ROAMReOldUsers = "";
        userlist.push(userJson);
      }
      bol = true;
    } else {
      alert("please select user");
    }
  }
  jsonUser.isselected = bol;
  jsonUser.reuserlist = userlist;
  jsonUser.strAgent = strAgent;
  callBack(jsonUser); 
}

// 直接提交
function directsend(listKey,contentData,strOpinion,callBack) {
  var json = {};
  json.type = "dsendsub";

  var queryjson = getJsonHeader(listKey,contentData);
  queryjson.fldCurUserDeptID = contentData.flowsend.fldCurUserDeptID;
  queryjson.fldCurUserDeptName = contentData.flowsend.fldCurUserDeptName;
  queryjson.fldCurUserName = contentData.flowsend.fldCurUserName;
  queryjson.fldCurUserShortName = contentData.flowsend.fldCurUserShortName;
  queryjson.fldCurUserHLDeptName = contentData.flowsend.fldCurUserHLDeptName;
  queryjson.fldCurUserHLDeptID = contentData.flowsend.fldCurUserHLDeptID;

  queryjson.ROAROpinText = strOpinion;

  queryjson.fldCurStepIsConsigned = contentData.flowsend.fldCurStepIsConsigned;
  queryjson.fldCurAgentName = contentData.flowsend.fldCurAgentName;
  queryjson.fldCurConsignerDeptID = contentData.flowsend.fldCurConsignerDeptID;
  queryjson.fldCurConsignerName = contentData.flowsend.fldCurConsignerName;

  json.query = queryjson;

  getSSOTokenFn(json,(json) => {
    oaflowsend(json).then(res=>{
      callBack(res);
    });
  })
}

// 提交按钮功能
export function okclickJs(listKey,contentData,routevalue,routeData,userTree,selectedUser,selectedUsers,obj,flag,callBack) {
  var canOpinion = contentData.flowsend.ROAMCanWriteOpinion; //是否可填写意见,1可填写，0，不可填写
  var isEmpOpinion = contentData.flowsend.ROAMOpinIsAN; //是否意见为空，
  var strOpinion = "";
  if (canOpinion == "1") {
    if (isEmpOpinion == "0") {
      //意见不允许为空
      if (obj.value == "") {
        alert("请填写意见！");
        return false;
      }
    }
    strOpinion = obj.value;
    strOpinion = strOpinion.replace(/\n/g, "<br>");
  }
  //判断单人多人处理
  if (contentData.flowsend.rm_type == "singsubmit") {
    if(flag == "common"){
      //单人处理-普通提交
      singlesubmit(listKey,contentData,routevalue,routeData,userTree,selectedUser,selectedUsers,strOpinion,callBack);
    }else{
      //单人处理-直接提交
      directsend(listKey,contentData,strOpinion,callBack);
    }
  } else if (contentData.flowsend.rm_type == "mulsubmit") {
    //多人处理
    mulsubmit(listKey,contentData,strOpinion,callBack);
  } else if (contentData.flowsend.rm_type == "leadopin") {
    //阅示意见
    leaderopinion(listKey,contentData,strOpinion,callBack);
  } else {
    alert("单人多人参数错误！");
    return false;
  }
}