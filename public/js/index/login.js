/**
 * Created by HUCC on 2017/8/20.
 */
define(["jquery", "jquery_cookie", "jquery_form"], function ($) {
  
  $(function () {
    //onsubmit事件 ，给表单注册
    //表单提交的时候触发
    $("form").submit(function () {

      $(this).ajaxSubmit({
        type:"post",
        url:"/api/login",
        success:function (info) {
          //成功了
          if(info.code == 200) {
            //在跳转之前，需要把info.result存到cookie中
            //cookie只能存字符串，扔一个对象，需要把对象转换成字符串的形式。
            var userinfo = JSON.stringify(info.result);
            $.cookie("userinfo", userinfo, {path:"/", expires:1});
            location.href = "/";
          }
        }
      });
      return false;
    });

  });
});