/**
 * Created by HUCC on 2017/8/22.
 */
define(["jquery", "template"],function ($, template) {
  
  $(function () {
    
    //1. 发送ajax请求，获取到所有的分类列表
    $.ajax({
      type:"get",
      url:"/api/category",
      success:function (info) {
        if(info.code == 200){
          var html = template("category_list_tpl", info);
          $("tbody").html(html);
        }
      }
    });
    
    
    
  });
  
  
});