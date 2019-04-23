function MXApi(callbacks) {
    var deviceReady = false;
    var taskQueue = [];
    document.addEventListener('deviceready', function deviceReadyHandler() {
        deviceReady = true;
        taskQueue.forEach(function (task) {
            applyApi.apply(null, task);
        })
        callbacks.ready && callbacks.ready();
        document.removeEventListener('deviceready', deviceReadyHandler, false);
    }, false)
    function applyApi(namespace, api, args) {
        if (window[namespace] && window[namespace][api]) {
            callbacks.beforeApply && callbacks.beforeApply(namespace, api, args);
            window[namespace][api].apply(null, args);
        } else if (!deviceReady) {
            taskQueue.push([namespace, api, args]);
        } else {
            callbacks.error && callbacks.error(['该终端没有', namespace, '.', api, '方法!'].join(''), namespace, api);
            throw new Error(['该终端没有', namespace, '.', api, '方法!'].join(''));
        }
    }
    return applyApi;
}

const applyApi = MXApi({
    ready: function () {
        console.log('device ready!!');
    },
    error: function (err) {
        console.log(err);
    },
    beforeApply: function (namespace, api, args) {
    }
});


const makeApi = namespace => (api, ...args) => applyApi(namespace, api, args);
const MXCommon = makeApi('MXCommon');
const MXWebui = makeApi('MXWebui');
const MXContacts = makeApi('MXContacts');
const MXLocation = makeApi('MXLocation');
const WifiWizard = makeApi('WifiWizard');
export const getCurrentBSSID = () => new Promise((resolve, reject) => {
    WifiWizard('getCurrentBSSID', resolve, reject);
})
export const showOptionMenu = () => {
    return MXWebui('showOptionMenu');
}

export const setCustomHeaderMenu = (...args) => {
    return MXWebui('setCustomHeaderMenu', ...args);
}
export const getSSOToken = (...args) => {
    return MXCommon('getSSOToken', ...args);
}

export const getLocation = args => {
    return new Promise((resolve, reject) => MXLocation('getLocation', resolve, reject, args));

}
export const closeWindow = () => {
    return MXWebui('closeWindow');
}

export const getUDID = callback => {
    return new Promise((resolve, reject) => {
        MXCommon('getUDID', {
            onSuccess: resolve,
            onFail: reject
        });
    })
}
export const getCurrentUser = callback => {
    return new Promise((resolve, reject) => {
        MXCommon('getCurrentUser', resolve);
    })
}

export const MXSelectUsers = userIds => {
    return new Promise((resolve, reject) => {
        MXContacts('selectUsers', function (result) {
            resolve(result);
        }, {
                customUserIDS: userIds,
                enableSelectDept: false,
                canSelectSelf: true
            })
    })
}

export const ajax = (params) => {
    return new Promise((resolve, reject) => {
        params = Object.assign({}, params, {
            async: true,
            success: function (data, status, xhr) {
                console.log("ajax成功")
                resolve({ data: JSON.parse(data), status });
            },
            error: function (data, status, xhr) {
                console.log("ajax失败")
                reject({ data: data, status, xhr });
            }
        })
        MXCommon('ajax', params);
    })
}

export const ajaxGet = (url, query) => {
    url = query ? `${url}?${queryString.stringify(query)}` : url;
    const params = {
        type: 'GET',
        url,
    }
    return ajax(params);
}

export const ajaxPost = (json) => {
    // 通过判断确定数据请求的地址
    var url = "";
    var zonghang = "minxingnew.nsf";
    var zhihang = "mobilezh.nsf";
    var quanhang = "minxingfull.nsf";
    var minIp = JSON.parse(sessionStorage.getItem('minIp'));
    var user = JSON.parse(sessionStorage.getItem('user'));
    var type = JSON.parse(sessionStorage.getItem('dispatchType'));
    if (user) {
        json.scope = user.scope;
        json.dir = user.dir;
        json.fullname = user.fullname;
        if (type == '1') {
            // 获取全行流程列表的路径
            url = 'http://139.199.99.136/mobile/'+ quanhang + '/mobilequery?openagent';
        }else {
            // 总行支行中的列表的路径
            if (user.scope == "1") {
                // 总行列表的路径
                url = 'http://' + user.serverip + '/mobile/' + zonghang + '/mobilequery?openagent';
            } else{
                // 支行列表的路径
                url = 'http://' + user.serverip + '/mobile/' + zhihang + '/mobilequery?openagent';
            }
        }
    } else {
        // 获取用户身份的路径
        url = 'http://' + minIp + '/mobile/minxingnew.nsf/mobilequery?openagent';
    }

    // alert(url);
    let data = {json: JSON.stringify(json)};
    // 返回的是一个函数（ajax），传入的参数是地址url，前台获取数据传给后台的json文件
    return ajax({
        type: 'POST',
        url,
        data,
    })
}

export const oaflowsend = (json) => {
    var url = "";
    var zonghang = "minxingnew.nsf";
    var zhihang = "mobilezh.nsf";
    var quanhang = "minxingfull.nsf";
    var user = JSON.parse(sessionStorage.getItem('user'));
    var type = JSON.parse(sessionStorage.getItem('dispatchType'));
    json.scope = user.scope;
    json.dir = user.dir;
    json.fullname = user.fullname;

    if (type == '1') {
        // 获取全行流程列表的路径
        url = 'http://139.199.99.136/mobile/'+ quanhang + '/agRmoblienew?openagent';
    }else {
        if (user.scope == "1") {
            url = 'http://' + user.serverip + '/mobile/' + zonghang + '/agRmoblienew?openagent';
        } else {
            url = 'http://' + user.serverip + '/mobile/' + zhihang + '/agRmoblienew?openagent';
        }
    }
    let data = { json: JSON.stringify(json) };
    return ajax({
        type: 'POST',
        url,
        data,
    })
}

export const ajaxPut = (url, data) => {
    return ajax({
        type: 'PUT',
        url,
        data
    })
}

export const ajaxDelete = (url, id) => {
    return ajax({
        type: 'DELETE',
        url: `${url}/${id}`
    })
}