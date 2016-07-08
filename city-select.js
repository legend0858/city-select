/**
 * 城市选择jquery插件
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
        this.$input = null;
        this.domReady = false;
        this.kucity = null
        this.citybox = null;
        this.result = null;
        this.$currentInput = null;
    };
    CitySelect.prototype = {
        constructor: CitySelect,

        // 初始化
        init: function(input) {
            this.$input = $(input);
            this.bindInputClik(this.$input);
        },

        // 注册点击事件
        bindInputClik: function($input) {
            var _this = this;
            $input.on('click', function(e) {
                _this.$currentInput = $(e.target);
                _this.showMainDom();
                _this.setPosition(_this.$currentInput)
            })
        },

        // 注册tab切换事件
        bindTabClick: function() {
            var _this = this;
            this.tabNav.on('click', 'li', function(e) {
                var current = $(e.target),
                    index = current.index();
                current.addClass('active').siblings().removeClass('active');
                _this.citybox.find('.kucity_item').eq(index).addClass('active').siblings().removeClass('active');
                _this.citybox.find('.kucity_body').scrollTop(0);
            })
        },

        // 注册城市选择事件
        bindSelect: function() {
            var _this = this;
            this.tabsContainer.on('click', 'span', function(e) {
                _this.$currentInput.val(($(e.target).text()));
                _this.kucity.hide();
            })
        },

        // 检索
        getSearchResult: function() {

        },

        // 整体dom结构
        createMainDom: function(cities) {
            var itemLength = cities.length;
            var header = $('<h3 class="kucity_header">热门城市(支持汉字/拼音搜索)</h3>'),
                tabNav = this.tabNav = $('<ul class="kucity_nav"></ul>'),
                tabsContainer = this.tabsContainer = $('<div class="kucity_body">'),
                tabHtml = '';
            for (var i = 0; i < itemLength; i++) {
                tabHtml += '<li>' + cities[i].tabname + '</>';
                createTabs(cities[i], tabsContainer);
            }
            tabNav.html(tabHtml);
            tabNav.find('li:first-child').addClass('active');
            tabsContainer.find('div:first-child').addClass('active');
            this.citybox.append(header);
            this.citybox.append(tabNav);
            this.citybox.append(tabsContainer);
            this.bindTabClick();
            this.bindSelect();

            function createTabs(item, tabsContainer) {
                var currentItem = $('<div class="kucity_item group">');
                var current = item.tabdata;
                var str = "";
                for (var j = 0, jLen = current.length; j < jLen; j++) {
                    str += '<span>' + current[j].cityName + '</span>'
                }
                currentItem.append(str);
                tabsContainer.append(currentItem);
            }
        },

        // 搜索结果dom结构
        createResult: function() {

        },

        // 显示加载
        showContainer: function() {
            var kucity = this.kucity = $('<div class="kucity"></div>');
            var citybox = this.citybox = $('<div class="citybox"></div>');
            var result = this.result = $('<ul class="result"></ul>');
            kucity.append(citybox).append(result);
            $('body').append(kucity);
        },

        // 获取城市之后显示城市
        showMainDom: function() {
            $(this.kucity).fadeIn();
            var _this = this;
            if (!this.domReady) {
                this.showContainer();
                _this.createMainDom(cityInfo);
                _this.domReady = true;
            }
        },

        // 设置面板位置
        setPosition: function($target) {
            var top = $target.offset().top + $(window).scrollTop() + $target.outerHeight() + 5;
            left = $target.offset().left + $(window).scrollLeft();
            this.kucity.css({
                top: top,
                left: left
            })
        }
    };
    // 单例控制
    var citySelectSingleProxy = (function() {
        var instance = null;
        return function(input) {
            if (!instance) {
                instance = new CitySelect();
            }
            instance.init(input)
        }
    })();

    // 在jquery对象上注册插件
    $.fn.citySelect = function() {
        citySelectSingleProxy(this);
    };

})(jQuery);
