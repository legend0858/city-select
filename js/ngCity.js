/**
 * 模块名称
 * @description 模块描述
 * @module moduleid
 * @author:岳(liuyue@travelsky.com)
 */
angular.module("myApp").directive("kuCity",function() {
    return {
        restrict: "A",
        scope: {
            codeModel: "="
        },
        require: "ngModel",
        link: function (scope, elem, attr, ngModel) {
            angular.element(elem).citySelect({
                selectHandler: function (name, code) {
                    scope.$apply(function() {
                        ngModel.$setViewValue(name);
                    })
                    //elem.val(name);
                    scope.codeModel = code;
                }
            });
        }
    }
})