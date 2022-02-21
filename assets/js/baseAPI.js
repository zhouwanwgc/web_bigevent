//每次调用 $.get $.post $.ajax前都会执行该方法
$.ajaxPrefilter(function(option) {
    console.log(option.url);
    //http://www.liulongbin.top:3007
    option.url = 'http://www.liulongbin.top:3007' + option.url

})