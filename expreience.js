
var common = {
    //设置token
    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
    },
    //获取token
    getCookie: function (c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    },
    //获取url参数
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var q = window.location.pathname.substr(1).match(reg_rewrite);
        if (r != null) {
            return unescape(r[2]);
        } else if (q != null) {
            return unescape(q[2]);
        } else {
            return null;
        }
    },
    //ajax封装
    http: function (url, data, callback, config) {
        var _that = this;
        var formmateData = {}
        for (var i in data) {
            formmateData[i] = data[i]
        }
        formmateData.token = this.getCookie('token');
        var async = true;
        var type = 'post';
        if (config != undefined) {
            if (config.async != undefined) {
                async = config.async;
            }
            if (config.type != undefined) {
                type = config.type;
            }
        }
        $.ajax({
            beforeSend: function () {
                $.showLoading();
            },
            complete: function () {
                $.hideLoading();
            },
            url: config_BasePath + url,
            async: async,
            dataType: 'json',
            data: formmateData,
            type: type,
            success: function (res) {
                callback(res)
            }
        })
    },
    //电话验证
    checkPhone:function(phone) { 
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) { 
            alert("手机号码有误，请重填"); 
            return false; 
        }else{
            return true; 
        }
    },
    //身份证验证
    checkId:function (id) { 
        //身份证正则表达式(15位) 
        var isId1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        //身份证正则表达式(18位) 
        var isId2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|X)$/;
        if (!((isId1.test(id))||(isId2.test(id)))) {
            alert("身份证号码有误，请重填");
            return false;
        }else{
            return true;
        }
    }
}