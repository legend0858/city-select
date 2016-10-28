# kuCity 城市选择jquery插件  
  

插件特性
----------  
1.单例  
2.支持搜索(借用了阿里的API)  
3.搜索框函数节流    
  
  
插件使用
----  
一，引进插件（依赖jquery）  

`<link rel="stylesheet" href="kuCity.css"> `
  
`<script src="http://cdn.bootcss.com/jquery/1.9.1/jquery.min.js"></script>`
`<script src="kuCity.js"></script>`

二，使用  

`$('.search').kuCity();`
------------------------





## angular的使用说明
----
一，依赖的插件（jquery,angular）
   *css:
     `<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">`
     `<link rel="stylesheet" href="../../css/ku-city.css">` 
   *js:
     `<script src="../../js/lib/jquery.min.js"></script>`
     `<script src="../../js/city-info.js"></script>`
     `<script src="../../js/city-select.js"></script>`
     `<script src="http://cdn.bootcss.com/angular.js/1.5.7/angular.js"></script>`
    
二，使用(ng-model的应用)
    修改后说明：
          1.在封装的js中添加自定义函数citySelect（在angular中触发函数进行操作）
          2.添加setName属性（是否赋值value避免两次赋值冲突）
             `angular.element(elem).citySelect({
                          setName:false
                         }).on("citySelect",function(event,name,code){
                                  ngModel.$setViewValue(name);
                                     ngModel.$render();
              })`
               
 

插件截图
----------

![](http://7xi96x.com1.z0.glb.clouddn.com/kucity1.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity2.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity3.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity4.png)  
