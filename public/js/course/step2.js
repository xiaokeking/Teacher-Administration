/**
 * Created by HUCC on 2017/8/25.
 */
define(["jquery", "tool", "template", "uploadify", "jquery_Jcrop"], function ($, tool, template) {
  $(function () {
    
    var cs_id = tool.getParam("cs_id");
    var x, y, w, h;
    
    $.ajax({
      type: "get",
      url: "/api/course/picture",
      data: {
        cs_id: cs_id
      },
      success: function (info) {
        
        if (info.code == 200) {
          var html = template("step2_tpl", info.result);
          $(".course-add").html(html);
          
          
          //上传图片插件
          $("#upfile").uploadify({
            swf: "/public/assets/uploadify/uploadify.swf",
            buttonText: "上传图片",
            buttonClass: "btn btn-success btn-sm btn_upfile",
            width: 70,
            height: 30,
            fileObjName: "cs_cover_original",
            formData: {
              cs_id: cs_id
            },
            itemTemplate: "<span></span>",
            uploader: "/api/uploader/cover",
            fileSizeLimit: "2MB",
            fileTypeExts: '*.gif; *.jpg; *.png',
            onUploadSuccess: function (file, data) {
              data = JSON.parse(data);
              
              var path = data.result.path;
              $(".preview img").attr("src", path);
              $(".brief img").attr("src", path);
              $("#btn_jcrop").removeAttr("disabled");
              
            }
            
          });
          
          
        }
        
      }
    });
    
    
    $("body").on("click", "#btn_jcrop", function () {
      if ($(this).text() == "裁切图片") {
        $(this).text("保存图片");
        $('.preview img').Jcrop({
          setSelect: [0, 0, 10000, 10000],
          aspectRatio: 2,   //宽高比
          boxWidth: 400
        }, function () {
          this.initComponent('Thumbnailer', {width: 240, height: 120, parent: ".thumb"});
          //一进来，先获取到裁剪框的值，初始化x,y,w,h
          var init = this.getSelection();
          x = init.x;
          y = init.y;
          w = init.w;
          h = init.h;
          
          $('.preview').on("cropmove", function (a, b, c) {
            x = parseInt(c.x);
            y = parseInt(c.y);
            w = parseInt(c.w);
            h = parseInt(c.h);
          });
        });
      } else {
        console.log("呵呵");
        //发送ajax请求，裁切图片
        $.ajax({
          type:"post",
          url:"/api/course/update/picture",
          data:{
            cs_id:cs_id,
            x:x,
            y:y,
            w:w,
            h:h
          },
          success:function (info) {
            console.log(info);
            if(info.code == 200){
              location.href = "/course/step3?cs_id="+cs_id;
            }
          }
        });
      }
    })
    
    
  });
});