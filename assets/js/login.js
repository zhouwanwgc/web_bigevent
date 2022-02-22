$(function() {
     
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show();
    })

    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //自定义表单验证
    var form = layui.form
    var layer = layui.layer

    form.verify({
        //自定义密码的校验规则
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //校验两次密码是否相同的规则
        repwd: function(value) {
            var psd = $('#password').val()
            if (psd !== value) {
                return '两次密码输入不一致！'
            }

        }
    })

    //注册表单的监听事件
    $('#form_reg').on('submit', function(e) {

        e.preventDefault()

        var data = { username: $('#uname').val(), password: $('#password').val() }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#link_login').click()

        })
    })

    //登录的监听事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#lname').val(), password: $('#lpassword').val() }

        $.post('/api/login', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
                //把token放入localStorage
            localStorage.setItem('token', res.token)
            location.href = "/index.html"
            console.log(res);
        })
    })

})