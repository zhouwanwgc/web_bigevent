$(function(){
    //渲染用户头像，昵称
    getUserInfo()
     

    //退出操作
    signout()


})

function getUserInfo(  ){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success: function(res){
            if(res.status !== 0){
                return  layui.layer.msg('获取用户信息击败')
            }
            avanter(res.data)
        },
        
    })
}

// 渲染用户头像
function avanter(data){
    var charset = data.username.charAt(0,1).toUpperCase()

    //如果没有昵称就用用户名
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp' + name)
     if( data.user_pic ==null){
         //没有头像就使用字母头像
         $('.userinfo').children('img').hide()
         $('.text-avatar').html(charset) 
     }else{
         $('.userinfo').children('.text-avatar').hide()
         ('.layui-nav-img').attr('src',data.user_pic)
     }
  
}
 

//退出操作
function signout(){
    
    $('.layui-nav-item').on('click',function(){
        //点击退出，弹出提示框，点击确定再退出
        layer.confirm('确认退出登录吗?', {icon: 3, title:'提示'}, function(index){
            //执行'确认按钮'（1）跳转页面 （2）清除token
            location.href = '/login.html';
            localStorage.removeItem('token')
            layer.close(index);
          });  
    })
}