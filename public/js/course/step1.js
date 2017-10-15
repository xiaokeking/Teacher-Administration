/**
 * Created by HUCC on 2017/8/25.
 */
define(["jquery", "tool", "template", "ckeditor"],function ($, tool, template, CKEDITOR) {

  $(function () {
    
    //1. 先获取到参数cs_id
    //2. 通过cs_id获取到该课程的基本信息
    //3. 提取模版
    //4. 渲染模版
    //5. 点击保存按钮，保存基本信息，成功时跳转到第二步
    
    var cs_id = tool.getParam("cs_id");
   
    $.ajax({
      type:"get",
      url:"/api/course/basic",
      data:{
        cs_id:cs_id
      },
      success:function (info) {
        if(info.code == 200){
          var html = template("step1_tpl", info.result);
          $(".course-add").html(html);
  
  
          CKEDITOR.replace("cs_brief",{
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
    
    
    //给一级分类注册change事件，
    //获取到一级分类的id
    //发送ajax，获取到子分类的数据
    //渲染到二级分类
    $("body").on("change", "#cs_cg_pid", function () {
  
      var cg_id = $(this).val();
      $.ajax({
        type:"get",
        url:"/api/category/child",
        data:{
          cg_id:cg_id
        },
        success:function (info) {
          if(info.code == 200){
            //渲染二级分类
            var html = template("category_tpl", info);
            $("#cs_cg_id").html(html);
          }else {
            $("#cs_cg_id").html('<option value="">二级分类</option>');
          }
          
          
        }
      });
  
  
    });
    
    
    //给保存按钮注册委托事件
    //表单序列化，发送ajax请求
    //如果成功，跳转到step2
    $("body").on("click", ".btn_save", function () {
  
      //点击提交时，把富文本编辑的内容同步到textarea中，这样后端获取到这个值
      for ( instance in CKEDITOR.instances ) {
        CKEDITOR.instances[instance].updateElement();
      }
    
      $.ajax({
        type:"post",
        url:"/api/course/update/basic",
        data:$("form").serialize(),
        success:function (info) {
          if(info.code == 200){
            location.href = "/course/step2?cs_id="+cs_id;
          }
        }
      });
    
    });
    
    
  })
  
});