# citySelect 城市选择(依赖jquery并与angular结合)
插件特性
----------  
1.单例  
2.支持搜索(借用了阿里的API)  
3.搜索框函数节流    
  
## city-select结合angular的使用说明
----
一，依赖的插件（jquery,angular）
  >* css:
```python
<link rel="stylesheet"href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">
<link rel="stylesheet" href="../../css/ku-city.css">
``` 
   >* js:
```python
     <script srcgit="../../js/lib/jquery.min.js"></script>
     <script src="../../js/city-info.js"></script>
     <script src="../../js/city-select.js"></script>
     <script src="http://cdn.bootcss.com/angular.js/1.5.7/angular.js"></script>
 ```
    
二，使用(ng-model的应用)
    修改后说明：
          1.在封装的js中添加自定义函数citySelect（在angular中触发函数进行操作）
          2.添加setName属性（是否赋值value,避免两次赋值冲突）
```python
angular.module("myApp").directive("kuCity",function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, elem, attr, ngModel) {
            angular.element(elem).citySelect({
                setName:false
            }).on("citySelect",function(event,name,code){
                ngModel.$setViewValue(name);
                ngModel.$render();
            })
        }
    }
})

```
               
 

插件截图
----------

![](http://7xi96x.com1.z0.glb.clouddn.com/kucity1.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity2.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity3.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity4.png)  

