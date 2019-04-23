export default function getUrl(json,callBack) {
    var url = "";
    var zonghang = "minxingnew.nsf";
    var zhihang = "mobilezh.nsf";
    var minIp = JSON.parse(sessionStorage.getItem('minIp'));
    var user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
        json.scope = user.scope;
        json.dir = user.dir;
        if (user.scope == "1") {
        url = 'http://' + user.serverip + '/mobile/'+ zonghang +'/mobilequery?openagent';
        }else {
        url = 'http://' + user.serverip + '/mobile/'+ zhihang +'/mobilequery?openagent';
        }
    }else {
        url = 'http://' + minIp + '/mobile/minxingnew.nsf/mobilequery?openagent';
    }
    let data = { json: JSON.stringify(json) };
    callBack(url,data);
}