$(function() {

    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.length < 6) {
                return '昵称长度在1-6个之间'
            }
        }
    })

    //调用ajax，获取个人全部信息，把这个人的昵称，账号，密码都拿过来
    initUserInfo(form)


    //重置
    userReset(form)

    //修改昵称，邮箱
    user_Submit(form)
})


//调用ajax，获取个人全部信息，把这个人的昵称，账号，密码都拿过来
function initUserInfo(form) {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户失败')
            }

            form.val('user_form', res.data)
        }
    })
}

//reset重置事件
function userReset(form) {
    $('#reset').on('click', function(e) {
        e.preventDefault();
        initUserInfo(form)

    })
}

//修改昵称，邮箱
function user_Submit(form) {
    $('#user_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新用户失败')
                }
                layui.layer.msg('更新用户成功')

                window.parent.getUserInfo()

                initUserInfo(form)
            }
        })
    })
}