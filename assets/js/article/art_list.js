$(function() {

    var laypage = layui.laypage;
    //定义事件过滤器
    template.defaults.imports.default = function(data) {
        var date = new Date(data);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dates = date.getDate();
        var h = date.getHours();
        h = h < 10 ? '0' + h : h;
        var m = date.getMinutes();
        m = m < 10 ? '0' + m : m;
        var s = date.getSeconds();
        s = s < 10 ? '0' + s : s;
        var str = year + '-' + month + '-' + dates + ' ' + h + ':' + m + ':' + s
        return str
    }

    //定义要传入后端的参数
    var q = {
        pagenum: 1, //	页码值
        pagesize: 2, //每页显示多少条数据
        cate_name: '', //	文章分类的 Id
        state: '' //	文章的状态，可选值有：已发布、草稿
    }
    initTable()
    classification()

    //筛选
    $('#form_classify').on('submit',function(e){
        e.preventDefault();
          
        q.cate_name = $('[name=cate_id]').val()
         q.state =  $('[name=state]').val()
        initTable()
        
    })

    //删除文章
    $('tbody').on('click','.btn_del',function(){
        var id= $(this).attr('data_id')
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+ id,
                success:function(res){
                    if(res.status!==0){
                        return layui.layer.msg('删除文章失败')
                    }
                    layui.layer.msg('删除文章成功')
                    
                    //当数据删除完成后，判断当前这一页是否有剩余数据，如果没有剩余，页码值-1，重新加载
                    var len = $('.btn_del').length//获取删除按钮个数
                
                    if(len === 1){//如果len=1则表明删除完以后，页面没有剩余数据了，页码值-1
                        q.pagenum = q.pagenum===1?1:q.pagenum -1;                       
                    }
                    initTable()
                }
            })
            layer.close(index);
          });
    })


    //获取文章列表
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
              
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                var t = template('art_list_form', res)
                $('tbody').html(t)
                var sum = res.total
                randerPage(sum)
            }
        })
    }

    

//获取文章分类
function classification(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg('获取文章分类失败')
                }
              var t =  template('classify',res)
              $('#fenlei').html(t)
              //由于表单获取的是动态生成的数据，所以获取数据后要刷新表单
              layui.form.render()
            }
        })
}

//分页方法
function randerPage(sum){
    //计算出总共多少页 = 总条数/每页显示的条数
   
   // console.log(Math.ceil(size));
    //执行一个laypage实例
    laypage.render({
      elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: sum //数据总数，从服务端得到
      ,limit: q.pagesize//每页几条数据
      ,limits:[2,3,5,10]
      ,curr:q.pagenum//默认选择页码
      ,layout:['count','limit','prev', 'page', 'next','skip']
      ,jump:function(obj,first){
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            if(!first){
                initTable()
            }
        }
    });
}



})