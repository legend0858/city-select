/*
 * 城市选择jquer插件
 *
 * Licensed under the MIT license:
 * https://github.com/callmeJozo/city-select
 *
 * Author: Naraku(http://segmentfault.com/u/naraku_)
 *
 * Version:  1.0.1  2016-01-14
 *
 */
//https://sjipiao.alitrip.com/city_search.do?_ksTS=1457274028074_2274&callback=jsonp2275&lines=10&_input_charset=utf-8&needProvince=true&q=%E8%B5%A3%E5%B7%9E

(function($) {
    var CitySelect = function() {
        this.targets = null;
        this.domReady = false;
        this.domContainer = null;
    };
    CitySelect.prototype = {
        constructor: CitySelect,
        init: function(targets) {
            this.targets = targets;
            this.bindEvents(targets);
        },
        getBaseCities: function() {
       		// 获取初始化插件的数据
        	var url = 'https://www.alitrip.com/go/rgn/trip/chinahotcity_jsonp.php';
            return $.ajax({
                url: url,
                type: 'get',
                dataType: 'jsonp'
            });
        },
        getSearchResult: function() {

        },
        showMain: function() {
            var _this = this;
            if (this.domReady) {
                this.getBaseCities().success(function(result) {
                    _this.createMainDom(result);
                    _this.domReady = true;
                })
            }
        },
        createMainDom: function(baseCiites) {
        	var domContainer = $('<div class="kucity"><div>'),
        		header = $('<h3 class="kucity_header">热门城市(支持汉字/拼音搜索)</h3>'),

        },
        createResutl: function() {

        },
        bindEvents: function(targets) {
            var _this = this;
            $(targets).on('click', function() {
                _this.showMain()
            })
        },
        setPosition: function() {

        }
    };
    var citySelectSingleProxy = (function() {
        var instance = null;
        return function(targets) {
            if (!instance) {
                instance = new CitySelect();
            }
            instance.init(targets)
        }
    })();
    $.fn.citySelect = function() {
        citySelectSingleProxy(this);
    };

})(jQuery);
