/**
 * Created by HUCC on 2017/8/22.
 */
define(["jquery", "datepicker", "datepicker_cn"], function ($) {
  
  function getParamObj() {
    var paramStr = location.search;
    //去除第一个?
    paramStr = paramStr.slice(1);
    
    var paramArr = paramStr.split("&");
    var paramObj = {};
    for(var i = 0; i < paramArr.length; i++) {
      var key = paramArr[i].split("=")[0];
      var value = paramArr[i].split("=")[1];
      
      paramObj[key] = value;
    }
    return paramObj;
  }
  
  function getParam(key) {
    return getParamObj()[key];
  }
  
  function setDate(ele) {
    //不行：这个时候页面还能东西
    $(ele).datepicker({
      format: 'yyyy-mm-dd',//日期的格式
      //startDate: '-10d',  //可以选择的开始时间
      endDate:"+0d",        //选择的结束时间
      autoclose:true,      //选完日期自动关闭
      language:"zh-CN",     //选择语言，注意需要额外引入一个语言包
      todayBtn:"linked",
      todayHighlight:true
    });
  }
  
  return {
    getParamObj:getParamObj,
    getParam:getParam,
    setDate:setDate
  }
  
  
});