/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-23 17:59:04
*/
import Swiper from 'swiper'
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')
require('swiper/dist/css/swiper.min.css')
var api = require('api')
var _util = require('util')

require('./index.less')

var categoriesTpl = require('./categories.tpl')
var childCategoriesTpl = require('./categories-child.tpl')
var swiperTpl = require('./swiper.tpl')
var floorTpl = require('./floor.tpl')
var elevatorTpl = require('./elevator.tpl')

var page = {
    init:function(){
        this.loadHomeCategories()
        this.loadSwiper()
        this.loadFloor()
        this.$win=$(window)
        this.bindEvent()
    },
    bindEvent:function(){
        console.log('$$$$$$$$$$$$$$',$);
        var _this = this
        //分类菜单显示隐藏事件
        $('.focus .categories').on('mouseenter','.keyowrd-item',function(){
            $('.child-categories').show().html('<div class="loading"></div>')
            var $elem = $(this)
            var id = $elem.data('id')
            if(!$elem.data('isload')){
                //1.发送请求
                api.getChildArrayCategories({
                    data:{id:id},
                    success:function(categories){
                        console.log(categories);
                        _this.render(categories)
                        $elem.data('isload',categories)
                    },
                    error:function(){
                        $('.child-categories').html('<span class="empty-cart">获取数据失败，请稍后再试</span>')
                    }
                })
            }else{
                _this.render($elem.data('isload'))
            }

            
        })

        $('.focus .category-box').on('mouseleave',function(){
            $('.child-categories').hide()
        })
        
        //监听win上边滑轮滚动，加载完毕事件
		this.$win.on('scroll load',function(){
			clearTimeout($('.elevator').timerShow)
			$('.elevator').timerShow=setTimeout(_this.setElevator(_this),50)
        })
        

		//监听点击事件,调到对应楼层
		$('.elevator').on('click','.elevator-item',function(){
            var index=$('.elevator-item').index(this);
            console.log('index',index);
			$('html').animate({
				scrollTop:$('.floor-box').eq(index).offset().top
			})
        })
        //工具栏返回顶部
		var $toolbarBtn=$('.toolbar .gotop');
        $toolbarBtn.on('click',_this.toolbarGoTop);
    },
    loadHomeCategories:function(){
        api.getHomeCategories({
            success:function(categories){
                var html = _util.render(categoriesTpl,{
                    categories:categories
                })
                $('.categories').html(html)
            }
        })
    },
    //获取轮播图
    loadSwiper(){
        api.getPositionAds({
            data:{
                position:1
            },
            success:function(data){
                var html = _util.render(swiperTpl,{
                    slides:data
                })
                $('.swiper-container .swiper-wrapper').html(html)
                var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项
                    autoplay:true,
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable:true
                    },
                    // 如果需要前进后退按钮
                    navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev',
                    },
                })                
            }
        }) 
    },
    //获取楼层
    loadFloor(){
        api.getFloors({
            success:function(floors){
                var floorHtml = _util.render(floorTpl,{
                    floors:floors
                })
                var elevatorHtml = _util.render(elevatorTpl,{
                    elevator:floors
                })
                $('.floor-wrap').html(floorHtml)
                $('.elevator').html(elevatorHtml)
            }
        })
    },
    render:function(result){
        if(result.length==0){
            $('.child-categories').html('<span class="empty-cart">没有更多数据了！</span>')
        }else{
            var html = _util.render(childCategoriesTpl,{
                childCategories:result
            })
            $('.child-categories').html(html)
        }


        
    },
    getFloorNum:function(){
        var num=-1;
        var _this=this
        $('.floor-box').each(function(index,elem){
            num=index;
            if ($(elem).offset().top>_this.$win.scrollTop()+_this.$win.height()/2){	//第二个elem满足条件
                num=index-1;//显示上一个elem的index
                return false;
            }
        })
        return num;
    },
    setElevator:function(){
        var num=this.getFloorNum();
        if (num==-1) {
            $('.elevator').fadeOut();

        }else{
            $('.elevator').fadeIn();
            $('.elevator-item').removeClass('active');//移除所有选中的
            $('.elevator-item').eq(num).addClass('active');//选中对应的电梯号
        }
    },
    toolbarGoTop:function (){//定义跳转顶部的函数
        $('html').animate({
            scrollTop:'0px'
        })
    }
}



$(function() {
    page.init()
})
