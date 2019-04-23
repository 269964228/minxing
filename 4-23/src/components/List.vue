<template>
    <div>
        页面加载中，请稍后...
    </div>
</template>

<script>
/* 
    List.vue -> Head (文种列表) -> List.vue (数据列表) -> 详情列表
    当前开发项目中包含全部OA移动办公中的分类
1、由web方式进入指定的项目：传入相应的index，传入的值要和Head中的文中列表相对应
2、通过获取index，进入想对应的列表
3、点击列表中的内容，通过遍历config中配置的数据，跳转到不同的详情文种
    （由于同一文种列表下可能存在总行和全行或支行和全行的搭配，所以在数据列表中需要判断当前用户点击的文种类型，
        ‘1’：全行，
        ‘2‘：总行和支行，
    在通过用户身份判断当前点击应该跳转到哪一个详情页面）

*注意事项：
1、上传web应用的url中传入的index要和head中的列表名称保持一致
*/
export default {
    created () {
        var url = JSON.stringify(location.href);
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.slice(url.indexOf("?") + 1, url.length - 1);
            var strs = [];
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        if (theRequest.index) {
            this.$router.push({path: theRequest.index});
        }
    }
}
</script>