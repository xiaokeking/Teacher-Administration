/**
 * Created by HUCC on 2017/8/23.
 */
define(["jquery"],function ($) {
  $(function () {
  
    //1. 给按钮注册点击事件
    //2. 判断新密码与确认密码是否一直，如果不一致，不发送ajax请求
    //3. 发送ajax请求，如果成功，触发退出登录事件
    $(".btn_modify").click(function () {
      
      var tc_new_pass = $("#tc_new_pass").val();
      var tc_confirm_pass = $("#tc_confirm_pass").val();
      if(tc_confirm_pass != tc_new_pass){
        alert("确认密码与新密码不一致")
        return false;
      }
      
      
      $.ajax({
        type:"post",
        url:"/api/teacher/repass",
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            alert("密码修改成功，请重新登录");
            $("#logout").click();
          }
          
        }
      });
      
      
    });
    
    
  
  });
  
});