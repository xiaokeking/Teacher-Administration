/**
 * Created by HUCC on 2017/8/20.
 */
define(["jquery", "template", "tool"], function ($, template, tool) {
  
  $(function () {
    
    //获取cg_id,如果有，编辑功能，否则，新增功能
    var cg_id = tool.getParam("cg_id");
    if (cg_id) {
      
      //发送ajax，获取当前分类的详细信息
      $.ajax({
        type: "get",
        url: "/api/category/edit",
        data: {
          cg_id: cg_id
        },
        success: function (info) {
          if (info.code == 200) {
            console.log(info.result);
            var data = info.result;
            data.title = "修改分类";
            data.btnText = "修 改"
            var html = template("category_add_tpl", data);
            $(".course-category").html(html);
            
            
          }
        }
      });
      
      
    } else {
      //发送一个ajax请求，获取所有的顶级分类，渲染到select框
      $.ajax({
        type:"get",
        url:"/api/category/top",
        success:function (info) {
          if(info.code == 200){
            var html = template("category_add_tpl", {
              title: "添加分类",
              btnText: "添 加",
              top:info.result
            });
            $(".course-category").html(html);
          }
        }
      });
    }
    
    
    //给按钮注册点击事件
    $("body").on("click", ".btn_save", function () {
    
      var url = "";
      if(cg_id){
        url = "/api/category/modify";
      }else {
        url = "/api/category/add"
      }
      
      $.ajax({
        type:"post",
        url:url,
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = "/category/list";
          }
        }
      });
    
    })
    
    
    
  });
  
  
});