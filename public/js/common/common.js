/**
 * Created by HUCC on 2017/8/20.
 */
define(["jquery", "template", "nprogress", "jquery_cookie"], function ($, template, np) {
  $(function () {
    
    np.start();
    
    setTimeout(function () {
      np.done();
    }, 500);
    
    
    $(document).ajaxStart(function () {
      $(".mask").fadeIn();
    });
    
    $(document).ajaxStop(function () {
      setTimeout(function () {
        $(".mask").fadeOut();
      }, 400);
    });
    
    //除了登录页面，其他页面都需要
    if (location.pathname !== "/login") {
      
      
      //判断用户有没有PHPSESSID，如果有，说明登录了，如果没有，跳转到login页面
      if ($.cookie("PHPSESSID")) {
        //1. 设置头像
        var userinfo = $.cookie("userinfo");
        userinfo = JSON.parse(userinfo);
        var html = template("userinfo-tpl", userinfo);
        $("#userinfo").html(html);
      } else {
        location.href = "/login";
      }
      
      //退出登录
      $("#logout").click(function () {
        
        //发送ajax请求，告诉服务器，我要退出登录
        $.ajax({
          type: "post",
          url: "/api/logout",
          success: function (info) {
            if (info.code == 200) {
              
              //删除userinfo这个cookie
              $.removeCookie("userinfo", {path: "/"});
              //跳转到login页面
              location.href = "/login";
              
            }
          }
        });
        
        
      });
      
      
      //侧边栏高亮（当前页面）
      //获取到地址栏中pathname，跟a标签的href属性对比，如果相同，就让这个a高亮，排他
      var pathname = location.pathname;
      
      //记录地址栏与a标签的地址不一致
      var pathObj = {
        "/teacher/add": "/teacher/list",
        "/settings": "/",
        "/repass":"/",
        "/category/add":"/category/list",
        "/course/step1":"/course/add",
        "/course/step2":"/course/add",
        "/course/step3":"/course/add",
      }
      pathname = pathObj[pathname] || pathname;
      
      
      var $links = $(".navs a");
      $links.each(function () {
        
        var $that = $(this);
        
        $that.removeClass("active");
        
        //地址栏的地址和a标签的地址匹配
        if ($that.attr("href") == pathname) {
          $that.addClass("active");
        }
        
      });
      
      //如果是二级菜单的时候，点击的时候，需要展开内容
      $(".two_menu").click(function () {
        $(this).children("ul").slideToggle();
      });
      
      //如果是二级菜单下的某个菜单亮起来，需要让这个二级菜单展开的状态。
      $(".two_menu").find(".active").parent().parent().show();
      
      
    }
    
    
  });
})