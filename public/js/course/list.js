/**
 * Created by HUCC on 2017/8/25.
 */
define(["jquery", "template"],function ($, template) {
  $(function () {
    
    $.ajax({
      type:"get",
      url:"/api/course",
      success:function (info) {
        if(info.code == 200) {
          console.log(info);
          var html = template("course_list_tpl", info);
          $(".courses").html(html);
        }
      }
    });
    
  });
});