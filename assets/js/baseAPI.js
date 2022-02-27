//每次调用 $.get $.post $.ajax前都会执行该方法
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url

    //统一请求头信息，路径含有/my的才能拥有headers
    //一次写，多次执行
    if (option.url.indexOf('/my/') != -1) {

        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

    }

    // 无论ajax成功还是失败， 都会执行
    option.complete = function(res) {

        if (res.responseJSON.status == 1 || res.responseJSON.message == '身份认证失败！') {
            //跳转到login页面
            location.href = '/login.html';
            //强制清除token
            localStorage.removeItem('token')
        }

    }

})