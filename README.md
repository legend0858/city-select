# citySelect 城市选择(依赖jquery并与angular、vue分别结合)
# jquery 的 datepicker 日期选择控件与Vue相结合
插件特性
----------  
1.单例  
2.支持搜索(借用了阿里的API)  
3.搜索框函数节流    
  
## city-select结合angular的使用说明
----
一，依赖的插件（jquery,angular）
  >* css:
```
<link rel="stylesheet"href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">
<link rel="stylesheet" href="../../css/ku-city.css">
``` 
   >* js:
```
     <script srcgit="../../js/lib/jquery.min.js"></script>
     <script src="../../js/city-info.js"></script>
     <script src="../../js/city-select.js"></script>
     <script src="http://cdn.bootcss.com/angular.js/1.5.7/angular.js"></script>
 ```
    
二，使用(ng-model的应用)
    修改后说明：<br/>
          1.在封装的js中添加自定义函数citySelect（在angular中触发函数进行操作）<br/>
          2.添加setName属性（是否赋值value,避免两次赋值冲突）<br/>
```
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
## city-select结合vuejs的使用说明 
----
一，依赖的插件（jquery,vuejs）
  >* css:    
```
 <link rel="stylesheet"href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">
 <link rel="stylesheet" href="../../css/ku-city.css">
``` 
>* js: 
```
     <script srcgit="../../js/lib/jquery.min.js"></script>
     <script src="../../js/city-info.js"></script>
     <script src="../../js/city-select.js"></script>
     <script src="vue/vue.min.js"></script>
 ```
二，使用(v-model的应用)
    修改后说明：<br/>
          1.在封装的js中添加自定义函数citySelect（在vue中触发函数进行操作）<br/>
          2.添加setName属性（是否赋值value,避免两次赋值冲突）<br/>
          3.将选中的值传入组建中，使v-model为传入的值
调用例如：
```
    <city-select :select-handler="deptSelectHandler" :source.sync="search.takeOffCityName" id="takeOffCityName" title="选择出发城市" ></city-select>
```
组件代码：
```
var citySelt = Vue.extend({
        template: '<input type="text" placeholder={{title}} v-model="source" title={{title}}>',
        props:{
            source:{
                type:String
            },
            "title":{
                type:String
            },
            "selectHandler": {
                type: Function
            },
        },
        ready(){
            let self = this;
            $(this.$el).citySelect({
                setName:false
            }).on("citySelect",function(event,name,code){
                self.selectHandler(name,code);
            });
        }
    })
```
插件截图
----------

![](http://7xi96x.com1.z0.glb.clouddn.com/kucity1.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity2.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity3.png)  
![](http://7xi96x.com1.z0.glb.clouddn.com/kucity4.png) 
 
## datepicker结合vue的使用说明
 ----
 
一，依赖的插件（jquery,angular）
  >* css:
```
<link rel="stylesheet"href="http://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css">
<link rel="stylesheet"  href="vue/jquery-ui.css">
``` 
   >* js:
```
    <script type="text/javascript" src="vue/vue.min.js"></script>
    <script type="text/javascript" src="vue/jquery.min.js"></script>
    <script type="text/javascript" src="vue/jquery-datepicker.js"></script>
    <script type="text/javascript" src="vue/loadsh.js"></script>
 ```
 二使用说明：
 调用例如：
 ```
 <datepicker v-ref:takeoffdate :value.sync="search.takeoffDate" :select-handler="changeTakeOffDate" title="结束日期" :options="dateOptions"></datepicker>
 ```
 组件代码：
 ```
   var datepicker = Vue.extend({
         template:'	<input type="text" class="form-control" :class="className" :disabled="disabled" placeholder="{{title}}" title="{{title}}" v-model="value">',
         props: {
             "className":String,
             "title":{
                 type:String,
                 required:true
             },
             "value":{
                 required:true
             },
             "selectHandler":{
                 type: Function
             },
             "options":{
                 type: Object
             },
             "showYear":{
                 type: Boolean,
                 default : false
             },
             "disabled" : {
                 type : Boolean,
                 default : function(){
                     return false;
                 }
             },
             "selected" : {
                 type : Date,
                 default : function(){
                     return '';
                 }
             }
         },
         methods:{
             setStartDate:function(date) {//设置最小时间
                 $(this.$el).datepicker("option","minDate",date);
             },
             setEndDate:function(date) {//设置最大时间
                 $(this.$el).datepicker("option","maxDate",date);
             },
             setDefaultValue: function (date) {//设置默认值
                 $(this.$el).datepicker("setDate",date);
                 let current = $(this.$el).val();
                 this.value = current;
             }
         },
         ready(){
             let self = this;
             $(this.$el).datepicker({
                 changeYear: self.showYear,
                 onSelect: function (selectedDate) {
                     self.selectHandler && self.selectHandler(selectedDate);
                     self.value = selectedDate;
                 }
             });
             if (self.showYear) {
                 let year = new Date().getFullYear();
                 $(this.$el).datepicker("option","yearRange",`1950:${year}`);
             }
             if (this.options){
                 _.forEach(this.options,function(value,key){
                     $(self.$el).datepicker("option",key,value);
                 });
             }
         }
     });
 ```
 
