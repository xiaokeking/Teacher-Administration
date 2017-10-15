/**
 * Created by HUCC on 2017/8/25.
 */
define(["jquery", "template", "tool", "bootstrap", "jquery_form"], function ($, template, tool) {
  $(function () {
    
    //1. 获取cs_id
    //2. 通过cs_id获取课时管理的所有的数据
    //3. 通过模版引擎渲染数据
    
    var cs_id = tool.getParam("cs_id");
    
    $.ajax({
      type: "get",
      url: "/api/course/lesson",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        if (info.code == 200) {
          var html = template("step3_tpl", info.result);
          $(".course-add").html(html);
        }
      }
    });
    
    
    //点击添加按钮，显示模态框
    $("body").on("click", ".btn_add", function () {
      
      var html = template("lesson_tpl", {
        title: "添加课时",
        btnText: "添 加",
        type:"add",
        ct_cs_id:cs_id   //添加时没有cs_id
      });
      
      $("#lesson").data("type", "add");
      $("#lesson").html(html);
      
      $("#lesson").modal("show");
    });
    
    
    $("body").on("click", ".btn_edit", function () {
      
      //获取到ct_id
      var ct_id = $(this).parent().data("id");
      
      $.ajax({
        type: "get",
        url: "/api/course/chapter/edit",
        data: {
          ct_id: ct_id
        },
        success: function (info) {
          if (info.code == 200) {
            console.log(info);
            
            var data = info.result;
            data.title = "修改课时";
            data.btnText = "修 改";
            
            var html = template("lesson_tpl", data);
  
            $("#lesson").data("type", "edit");
            $("#lesson").html(html);
            
            $("#lesson").modal("show");
            
          }
        }
      });
      
      
    });
    
    $("body").on("click", ".btn_save", function () {
    
      var type = $("#lesson").data("type");
      var url = "";
      if(type == "add"){
        url = "/api/course/chapter/add";
      }else {
        url = "/api/course/chapter/modify";
      }
      
      //判断选中没选中
      var ct_is_free ;
      if($("#ct_is_free").prop("checked")){
        ct_is_free = 0;
      }else {
        ct_is_free = 1;
      }
    
      $("form").ajaxSubmit({
        type:"post",
        url:url,
        data:{
          ct_is_free:ct_is_free
        },
        success:function (info) {
          if(info.code == 200){
            // location.reload();
          }
        }
      });
      
    })
    
  });
});