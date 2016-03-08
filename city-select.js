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
            if (!this.domReady) {
                this.showContainer();
                this.getBaseCities().success(function(res) {
                    _this.createMainDom(res.results);
                })
                _this.domReady = true;

            }
           },
        showContainer: function() {
            var domContainer = this.domContainer = $('<div class="kucity"><div>');
            $('body').append(domContainer)
        },
        createMainDom: function(cities) {
            var itemLength = cities.length;

            var header = $('<h3 class="kucity_header">热门城市(支持汉字/拼音搜索)</h3>'),
                tabContainer = $('<ul class="kucity_nav"></ul>'),
                itemsContainer = $('<div class="kucity_body">'),
                tabHtml = '';
            for (var i = 0; i < itemLength; i++) {
                tabHtml += '<li>' + cities[i].tabname + '</>';
                createItems(cities[i], itemsContainer);
            }
            tabContainer.html(tabHtml);
            tabContainer.find('li:first-child').addClass('active');
            itemsContainer.find('div:first-child').addClass('active');
            this.domContainer.append(header);
            this.domContainer.append(tabContainer);
            this.domContainer.append(itemsContainer)

            function createItems(item, itemsContainer) {
                var currentItem = $('<div class="kucity_item group">');
                var tabdata = item.tabdata;
                for (var i = 0; i < tabdata.length; i++) {
                    var current = tabdata[i].dd;
                    var dl = $('<dl>'),
                        dt = '<dt>' + tabdata[i].dt + '</dt>',
                        dd = $('<dd>'),
                        str = '';
                    for (var j = 0, jLen = current.length; j < jLen; j++) {
                        str += '<span>' + current[j].cityName + '</span>'
                    }
                    dd.append(str);
                    dl.append(dt).append(dd);
                    currentItem.append(dl);
                }
                itemsContainer.append(currentItem);
            }
        },
        createResutl: function() {

        },
        bindEvents: function(targets) {
            var _this = this;
            $(targets).on('click', function(e) {
                _this.showMain();
                _this.setPosition(e.target)
            })
        },
        setPosition: function(target) {
            var $target = $(target),
                top = $target.offset().top + $(window).scrollTop() + $target.outerHeight();
            left = $target.offset().left + $(window).scrollLeft();
            this.domContainer.animate({
                top: top,
                left: left
            }, ' fast')
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
