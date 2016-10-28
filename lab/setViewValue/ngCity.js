/**
 * 模块名称
 * @description 模块描述
 * @module moduleid
 * @author:岳(liuyue@travelsky.com)
 */
angular.module("myApp").directive("kuCity",function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function (scope, elem, attr, ngModel) {
            /*angular.element(elem).citySelect({
                selectHandler:scope.selectHandler
            });*/
            angular.element(elem).citySelect({
                setName:false
            }).on("citySelect",function(event,name,code){
                ngModel.$setViewValue(name);
                ngModel.$render();
            })
        }
    }
})