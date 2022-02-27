$(function() {

    var indexEdit = null

    getList()
    var Addnum = null //弹出层索引，用于获取索引关闭
    indexEdit = $('#btnAdd').on('click', function() {
        Addnum = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#tpl-form').html()
        });

    })

    addList(Addnum)

    editorList()

    editor_submit(indexEdit)

    del()


})



//获取文章列表
function getList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取文章列表失败')
            }
            var temp = template('tpl-table', res)
            console.log(res);
            $('tbody').html(temp)

        }
    })
}

//文章列表提交功能
function addList(Addnum) {

    $('body').on('submit', '#addForm', function(e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('文章列表添加失败')
                }
                getList()
                layui.layer.closeAll(Addnum) //获取弹出层的索引，来关闭弹出层
            }
        })
    })
}

//编辑按钮
function editorList() {

    $('body').on('click', '.btn_editor', function() {

        layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#editor_form').html()
        });
        var form = layui.form
        $.ajax({
            type: 'GET',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取分类数据失败')
                }
                form.val('editor_form', res.data)
            }
        })



    })
}


// 编辑提交
function editor_submit(indexEdit) {
    $('body').on('submit', '#form-edit', function(e) {


        e.preventDefault();

        var data = $(this).serialize()


        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate?' + data,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新分类信息失败')
                } 
                layer.msg('更新分类数据成功！')
                layui.layer.close(indexEdit)
                getList()


            }
        })
    })
}

//删除功能
function del() {
    $('body').on('click', '.btn_del', function() {
        var data = $(this).attr('data_id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + data,
                success: function(res) {
                    console.log(res);

                    if (res.status !== 0) {
                        return layui.layer.msg('删除信息失败')
                    } 
                    layui.layer.msg('删除信息成功！')
                    layer.close(index);
                    getList()
                }
            })
        });

    })
}