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
            selectHandler:"&"
        },
        link: function (scope, elem) {
            angular.element(elem).citySelect({
                selectHandler:scope.selectHandler
            });
        }
    }
})