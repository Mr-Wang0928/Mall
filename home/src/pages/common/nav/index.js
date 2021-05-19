require('./index.less')
var _util = require('util')
var _api = require('api')
var tpl = require('./index.tpl')
var page={
    init:function(){
        this.loadUsername()
        this.loadCartsCount()
        this.bindEvent()
        return this
    },
    bindEvent:function(){
        var _this = this
        //退出事件
        $('#logout').on('click',function(){
            _api.logout({
                success:function(){
                    $('.not-login').removeClass('hide')
                    $('.login').addClass('hide')
                    window.location.reload()
                }
            })
        })

        
        $('.nav-list .shopping-box').hover(function(){
            $('.cart-content').show().html('<div class="loading"></div>')
            _api.getCartList({
                success:function(result){
                    _this.render(result)
                },
                error:function(){
                    $('.cart-content').html('<span class="empty-cart">获取购物车失败，请稍后再试</span>')
                }
            })
        },function(){
            $('.cart-content').html('').hide()
        })
    },
    //获取用户名
    loadUsername:function(){
        _api.getUsername({
            success:function(result){
                $('.not-login').addClass('hide')
                $('.login').removeClass('hide').find('.username').html(result.username)
            }
        })
    },
    //获取购物车数据
    
    loadCartsCount:function(){
        _api.getCartCount({
            success:function(result){
                $('.cart-count').html(result || 0)
            },
            error:function(){
                $('.cart-count').html(0)
            }
        })
    },
    render:function(result){
        if(result.cartList.length==0){
            $('.cart-content').html('<span class="empty-cart">购物车空空，快来选购吧！</span>')
        }else{
            var html = _util.render(tpl,result)
            $('.cart-content').html(html)
        }
    }
}


module.exports = page.init()
