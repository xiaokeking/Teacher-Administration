/**
 * Created by HUCC on 2017/8/20.
 */
define(["jquery", "template", "bootstrap"],function ($, template) {

  $(function () {
    $.ajax({
      type:"get",
      url:"/api/teacher",
      success:function (info) {
        if(info.code == 200){
          //使用模版引擎渲染数据
          var html = template("teacher_list_tpl", info);
          $("#teacher_list").html(html);
        }
      }
    });
    
    
    //给查看按钮注册点击事件,主要要注册委托事件
    $("#teacher_list").on("click", ".btn_view", function () {
      
      var tc_id = $(this).parent().data("id");
      
      //获取到id，发送ajax，查看讲师的详细的信息
      $.ajax({
        type:"get",
        url:"/api/teacher/view",
        data:{
          tc_id:tc_id
        },
        success:function (info) {
          if(info.code == 200){
          
            var html = template("teacher_info_tpl", info.result);
            $("#teacherModal").html(html).modal('show');
          }
        }
      });
      
      
     
    });
  
  
    $("#teacher_list").on("click", ".btn_handle", function () {
     
      var tc_id = $(this).parent().data("id");
      var tc_status = $(this).parent().data("status");
      var $that = $(this);
      
      $.ajax({
      
        type:"post",
        url:"/api/teacher/handle",
        data:{
          tc_id:tc_id,
          tc_status:tc_status
        },
        success:function (info) {
          console.log(info);
          if(info.code == 200){
            //根据返回的status切换当前按钮的
            if(info.result.tc_status == 0){
              $that.text("注 销");
              $that.removeClass("btn-success");
              $that.addClass("btn-warning");
            }else {
              $that.text("启 用");
              $that.addClass("btn-success");
              $that.removeClass("btn-warning");
            }
            $that.parent().data("status", info.result.tc_status);
          }
        }
      
      });
      
    });
  
  });
  
});
