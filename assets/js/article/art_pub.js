$(function() {

    initCate()


    // 初始化富文本编辑器
    initEditor()



    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview'
        }
        // 3. 初始化裁剪区域  
    $image.cropper(options)


    $('#photo_btn').on('click', function(e) {
        $('#getfile').click()
    })

    //<input type="file">的change事件，获取被选择的文件
    $('#getfile').on('change', function(e) {
        // 1获取选择后的图片
        var file = e.target.files
        if (file.length <= 0) {
            return
        }
        //2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file[0])

        //先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        console.log($('#image'));

        $('#image')
            .cropper('destroy')    // 销毁旧的裁剪区域
             .attr('src', newImgURL)  // 重新设置图片路径 
             .cropper(options)     // 重新初始化裁剪区域
    })


    //发布
    var artstatus = '已发布'
    $('#caogao').on('click', function() {
        artstatus = '草稿'
    })

    $('#pub').on('submit', function(e) {
        e.preventDefault();
        //基于form表单，创建一个formdata对象

        var fd = new FormData($(this)[0])
        fd.append('state', artstatus)

        //接收裁剪区图片，放入formdata
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作 


                fd.append('cover_img', blob)
                publishAtr(fd)
                fd.forEach(function(v, k) {
                    console.log(v, k);

                })

            })




    })

})


function initCate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取文章分类失败')
            }
            var t = template('cate', res)
            $('#cateList').html(t)
            layui.form.render()

        }
    })
}

//发表文章
function publishAtr(fd) {
    $.ajax({
        type: 'POST',
        url: '/my/article/add',
        data: fd,
        //如果传入的是formdata，必须添加配置项
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('发表文章失败')
            }
            location.href = "/article/art_list.html"
        }
    })
}