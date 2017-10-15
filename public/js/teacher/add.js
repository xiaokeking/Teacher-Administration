/**
 * Created by HUCC on 2017/8/22.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  $(function () {
    //需要判断是新增还是修改，获取到地址中的tc_id, 如果tc_id有值，说明是修改操作，否则就是新增操作。
    var tc_id = tool.getParam("tc_id");
    if (tc_id) {
      //编辑
      //发送一个ajax请求，把tc_id对应的讲师信息获取到
      $.ajax({
        type: "get",
        url: "/api/teacher/edit",
        data: {
          tc_id: tc_id
        },
        success: function (info) {
          if (info.code == 200) {
            var data = info.result;
            data.title = "讲师编辑";
            data.btnText = "修 改";
            data.type = "edit";
            var html = template("teacher_add_tpl", data);
            $(".teacher").html(html);
            
            tool.setDate("#tc_join_date");
            
          }
        }
      })
      
    } else {
      //新增
      var html = template("teacher_add_tpl", {
        title: "讲师新增",
        btnText: "添 加",
        type: "add"
      });
      $(".teacher").html(html);
      tool.setDate("#tc_join_date");
    }
    
    
    //给按钮注册点击事件
    $("body").on("click", ".btn_add", function () {
      
      var url = "";
      if (tc_id) {
        //发送编辑的ajax
        url = "/api/teacher/update";
      } else {
        //发送添加的ajax
        url = "/api/teacher/add";
      }
      
      $.ajax({
        type: "post",
        url: url,
        data: $("form").serialize(),
        success: function (info) {
          if (info.code == 200) {
            location.href = "/teacher/list";
          }
        }
      });
      
      
    });
    
    
    
    
  });
  
  
});