$(function() {
    // 1.1 获取裁剪区域的 DOM 元素  
    var $image = $('#image') 
        // 1.2 配置选项  
    const options = {  
            // 纵横比   
            aspectRatio: 1,
              
            // 指定预览区域    
            preview: '.img-preview'
        }  // 1.3 创建裁剪区域 
         
    $image.cropper(options)

    $('#upload').on('click', function() {
        $('#ipt').click()
    })

    //获取图片
    $('#ipt').on('change', function(e) {
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layui.layer.msg('没有选择图片')
        }
        //把图片放入方框
        //(1)拿到用户选择的文件
        var file = e.target.files[0]

        //(2)根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        console.log(newImgURL);

        //(3)先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image .cropper('destroy')    // 销毁旧的裁剪区域
             .attr('src', newImgURL)  // 重新设置图片路径 
             .cropper(options)     // 重新初始化裁剪区域
    })

    $('#determine').on('click', function() {
        var dataURL = $image  .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100  
            })  .toDataURL('image/png')    // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('头像更换失败')
                }
                layui.layer.msg('头像更换成功')
                window.parent.getUserInfo()
            }
        })

    })

})