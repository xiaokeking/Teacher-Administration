/**
 * Created by HUCC on 2017/8/22.
 */
define(["jquery", "template", "tool", "ckeditor", "uploadify", "jquery_region", "jquery_cookie"], function ($, template, tool, CKEDITOR) {
  
  $(function () {
    //1. 发送ajax，获取到个人的详细信息
    $.ajax({
      type: "get",
      url: "/api/teacher/profile",
      success: function (info) {
        if (info.code == 200) {
          
          var html = template("settings_tpl", info.result);
          $(".teacher-profile").html(html);
          
          tool.setDate("#tc_birthday");
          tool.setDate("#tc_join_date");
          
          
          //上传头像功能的实现
          $("#upfile").uploadify({
            height: 120,  //上传按钮的高度
            swf: '/public/assets/uploadify/uploadify.swf',  //必须指定，依赖flash上传
            uploader: '/api/uploader/avatar',   //上传的后台接口
            fileObjName: "tc_avatar",
            width: 120,  //上传按钮的宽度
            buttonText: "",  //设置按钮的文本
            fileSizeLimit: "2MB",
            fileTypeExts: '*.gif; *.jpg; *.png',
            onUploadSuccess: function (f, data) {
              data = JSON.parse(data);
              var path = data.result.path;
              //修改上传图片的地址
              $(".preview img").attr("src", path);
  
              $("#userinfo img").attr("src", path);
              
              //改cookie
              var userinfo = $.cookie("userinfo");
              userinfo = JSON.parse(userinfo);
              userinfo.tc_avatar = path;
              
              $.cookie("userinfo", JSON.stringify(userinfo), {path:"/", expires:1});
            }
          });
          
          //省市区三级联动功能
          $("#region").region({
            url: "/public/assets/jquery-region/region.json"
          })
          
          
          //富文本编辑器功能
          CKEDITOR.replace("tc_introduce", {
            toolbarGroups: [
              {name: 'clipboard', groups: ['clipboard', 'undo']},
              
              {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
              '/',
              {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
              {name: 'styles'},
              {name: 'colors'},
            ]
          });
        }
      }
    });
    
    
    //注册事件
    $("body").on("click", ".btn_save", function () {
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
  
      //发送ajax请求
      $.ajax({
        type: "post",
        url: "/api/teacher/modify",
        data: $("form").serialize(),
        success: function (info) {
          if(info.code == 200){
            location.href = "/settings";
          }
        }
      });
      
      
    });
    
  });
  
});