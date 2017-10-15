<?php
/**
 * Created by PhpStorm.
 * User: HUCC
 * Date: 2017/8/19
 * Time: 10:23
 */
header("content-type:text/html;charset=utf-8");

//不能写死， 不能仅仅include index.html
//如果我能够拿到 /teacher/list
//我就可以include  views/teacher/list.html

//$_SERVER
// PATH_INFO  :  获取到/user/add
$pathInfo = $_SERVER['PATH_INFO'];
//去除pathInfo第一个/
$pathInfo = substr($pathInfo, 1);

//explode : 把字符串打散成数组
$arr = explode("/", $pathInfo);

include 'views/'.$arr[0].'/'.$arr[1].'.html';