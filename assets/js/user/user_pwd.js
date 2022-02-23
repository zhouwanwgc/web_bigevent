$(function() {

    //设置秘密校验规则
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        //原密码和新密码不能保持一致
        samePwd: function(value) {


            if (value === $('#oldpwd').val()) {
                return '原密码和新密码不能保持一致'
            }
        },

        //新密码和旧密码保持一致
        repwd: function(value) {
            if (value !== $('#newpwd').val()) {
                return '两次密码不一致'
            }
        }
    })

    updatePwd()
})


//pwd_form修改密码
function updatePwd() {
    $('#pwd_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('密码修改失败')
                }
                layui.layer.msg('密码修改成功')
                $('.layui-form')[0].reset() //重置表单
            }
        })
    })
}