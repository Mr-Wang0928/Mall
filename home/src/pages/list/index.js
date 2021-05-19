require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('util/pagination')
require('pages/common/iconfont')
var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
var listCategoriesTpl = require('./categories.tpl')
require('./index.less')
require('./jquery.slimscroll.min.js')
require('./left-side-menu.css')
// require('./left-side-menu.js')

var page = {
    productsListPrarms:{
        category:_util.getParamFromUrl('categoryId'),
        keyword:_util.getParamFromUrl('keyword'),
        page:_util.getParamFromUrl('page') || 1,
        orderBy:_util.getParamFromUrl('orderBy') || 'default',
        nav:_util.getParamFromUrl('nav'),
    },    
    init:function(){
        this.initPagination()
        
        this.loadProductList()
        this.loadHomeCategories()
        this.bindEvent()
    },
    loadHomeCategories:function(){
        api.getListCategories({
            data:{i:0},
            success:function(listCategories){
                console.log(listCategories);
                var html = _util.render(listCategoriesTpl,{
                    listCategories:listCategories.list
                })
                $('.list-categorys').html(html)
            }
        })
        
    },
    initPagination:function(){
        var _this = this
        this.$pagination = $('.pagination-box')
        this.$pagination.on('page-change',function(ev,page){
            _this.productsListPrarms.page = page
            _this.loadProductList()
        })
        //初始化分页组件
        this.$pagination.pagination()
    },
    bindEvent:function(){
        var _this = this
        //处理排序
        //根据点击的排序按钮来决定排序参数,根据新的排序参数获取数据再重新渲染页面
        $('.sort-item').on('click',function(){
            var $this = $(this)
            //点击默认排序
            if($this.hasClass('default')){
                if($this.hasClass('active')){
                    return
                }
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')

                _this.productsListPrarms.orderBy = 'default'
            }
            //点击按价格排序
            else if($this.hasClass('price')){
                $this.addClass('active')
                .siblings('.sort-item').removeClass('active')
                
                if($this.hasClass('asc')){
                    $this.removeClass('asc').addClass('desc')
                    //改变使用的上下箭头icon
                    var html ='<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shangxiajiantou11"></use></svg>'
                    $this.find('svg').html(html)
                    
                    _this.productsListPrarms.orderBy = 'price_desc'
                }else if($this.hasClass('desc')){
                    $this.removeClass('desc')
                    .addClass('asc')
                    //改变使用的上下箭头icon
                    var html ='<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shangxiajiantou1"></use></svg>'
                    $this.find('svg').html(html)
                    _this.productsListPrarms.orderBy = 'price_asc'                    
                }                
            }
            _this.productsListPrarms.page = 1
            _this.loadProductList()            
        })



        $('.lsm-scroll').slimscroll({
            height: 'auto',
            position: 'right',
            railOpacity: 1,
            size: "5px",
            opacity: .4,
            color: '#fffafa',
            wheelStep: 5,
            touchScrollStep: 50
        });
        $('.lsm-container ul ul').css("display", "none");
        // lsm-sidebar收缩展开事件
        $('.lsm-sidebar ul').on('click','.lsm-sidebar-item a',function(){
            $('.lsm-sidebar a').removeClass('active')
            _this.productsListPrarms.category = $(this).data('categoryid')
            $(this).addClass('active')
            _this.loadProductList()
            $('.lsm-scroll').slimscroll({
                height: 'auto',
                position: 'right',
                size: "8px",
                color: '#9ea5ab',
                wheelStep: 5,
                touchScrollStep: 50
            });
            if (!$('.left-side-menu').hasClass('lsm-mini')) {
                $(this).parent("li").siblings("li.lsm-sidebar-item").children('ul').slideUp(200);
                if ($(this).next().css('display') == "none") {
                    console.log($(this),'this');
                    //展开未展开
                    // $('.lsm-sidebar-item').children('ul').slideUp(300);
                    $(this).next('ul').slideDown(200);
                    $(this).parent('li').addClass('lsm-sidebar-show').siblings('li').removeClass('lsm-sidebar-show');
                }else{
                    //收缩已展开
                    $(this).next('ul').slideUp(200);
                    //$('.lsm-sidebar-item.lsm-sidebar-show').removeClass('lsm-sidebar-show');
                    $(this).parent('li').removeClass('lsm-sidebar-show');
                }
            }
        });
        //lsm-mini
        $('.lsm-mini-btn svg').on('click',function(){
            if ($('.lsm-mini-btn input[type="checkbox"]').prop("checked")) {
                $('.lsm-sidebar-item.lsm-sidebar-show').removeClass('lsm-sidebar-show');
                $('.lsm-container ul').removeAttr('style');
                $('.left-side-menu').addClass('lsm-mini');
                $('.left-side-menu').stop().animate({width : 60},200);
            }else{
                $('.left-side-menu').removeClass('lsm-mini');
                $('.lsm-container ul ul').css("display", "none");
                $('.left-side-menu').stop().animate({width: 240},200);
            }
    
        });
    
        $(document).on('mouseover','.lsm-mini .lsm-container ul:first>li',function(){
            $(".lsm-popup.third").hide();
            $(".lsm-popup.second").length == 0 && ($(".lsm-container").append("<div class='second lsm-popup lsm-sidebar'><div></div></div>"));
            $(".lsm-popup.second>div").html($(this).html());
            $(".lsm-popup.second").show();
            $(".lsm-popup.third").hide();
            var top = $(this).offset().top;
            var d = $(window).height() - $(".lsm-popup.second>div").height();
            if(d - top <= 0 ){
                top  = d >= 0 ?  d - 8 : 0;
            }
            $(".lsm-popup.second").stop().animate({"top":top}, 100);
        });
    
        $(document).on('mouseover','.second.lsm-popup.lsm-sidebar > div > ul > li',function(){
            if(!$(this).hasClass("lsm-sidebar-item")){
                $(".lsm-popup.third").hide();
                return;
            }
            $(".lsm-popup.third").length == 0 && ($(".lsm-container").append("<div class='third lsm-popup lsm-sidebar'><div></div></div>"));
            $(".lsm-popup.third>div").html($(this).html());
            $(".lsm-popup.third").show();
            var top = $(this).offset().top;
            var d = $(window).height() - $(".lsm-popup.third").height();
            if(d - top <= 0 ){
                top  = d >= 0 ?  d - 8 : 0;
            }
            $(".lsm-popup.third").stop().animate({"top":top}, 100);
        });
    
        $(document).on('mouseleave','.lsm-mini .lsm-container ul:first, .lsm-mini .slimScrollBar,.second.lsm-popup ,.third.lsm-popup',function(){
            $(".lsm-popup.second").hide();
            $(".lsm-popup.third").hide();
        });
    
        $(document).on('mouseover','.lsm-mini .slimScrollBar,.second.lsm-popup',function(){
            $(".lsm-popup.second").show();
        });
        $(document).on('mouseover','.third.lsm-popup',function(){
            $(".lsm-popup.second").show();
            $(".lsm-popup.third").show();
        });
    },
    loadProductList:function(){
        var _this = this
        api.getProductsList({
            data:this.productsListPrarms,
            success:function(result){
                if(result.list.length > 0){
                    var html = _util.render(tpl,{
                        list:result.list
                    })
                    $('.product-list-box').html(html)
                    //渲染分页组件
                    _this.$pagination.pagination('render',{
                        current:result.current,
                        total:result.total,
                        pageSize:result.pageSize
                    })
                }else{
                    $('.product-list-box').html('<p class="empty-message">您找的商品去火星了!</p>')
                }
            }
        })
    },
}



$(function() {
    page.init()
})