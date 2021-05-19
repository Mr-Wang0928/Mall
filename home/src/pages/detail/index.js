/*
* @Author: TomChen
* @Date:   2019-08-21 17:42:33
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-26 09:40:34
*/
require('pages/common/nav')
require('pages/common/search')
require('pages/common/footer')

var api = require('api')
var _util = require('util')

var tpl = require('./index.tpl')
require('./index.css')

var page = {
    productsDetailPrarms:{
        id:_util.getParamFromUrl('productId')
    },    
    init:function(){
        this.$elem = $('.detail-box')
        this.bindEvent()
        this.productsDetail()
    },

    bindEvent:function(){
        var _this = this
        //1.图片切换
        this.$elem.on('mouseenter','.product-small-img-item',function(){
            var $this = $(this)
            //小图片样式切换
            $this.addClass('active')
            .siblings('.product-small-img-item').removeClass('active')
            //大图切换地址
            var imgSrc = $this.find('img').attr('src')
            $('.product-main-img img').attr('src',imgSrc)
            $('#big-box img').attr('src',imgSrc)
        })
        //2.处理购买数量
        this.$elem.on('click','.count-btn',function(){
            var $this = $(this)
            var $input = $('.count-input')
            var current = parseInt($input.val())
            //增加
            if($this.hasClass('plus')){
                $input.val(current == _this.stock ? _this.stock : current+1)
            }
            //减少
            else if($this.hasClass('minus')){
                $input.val(current == 1 ? 1 : current-1)
            }
        })
        //3.添加购物车
        this.$elem.on('click','.add-cart-btn',function(){
            api.addCarts({
                data:{
                    productId:_this.productsDetailPrarms.id,
                    count:$('.count-input').val()
                },
                success:function(){
                    _util.goResult('addCart')
                }
            })
        })
        //4.添加放大镜
        let ll=''
        let tt=''
        let rateX=''
        let rateY=''
        let bigll =''
        let bigtt = ''
        this.$elem.on('mouseenter','.product-main-img',function(){
            let $this = $(this)
            let imgSrc = $this.find('img').attr('src')

            $('#big-box').find('img').attr('src',imgSrc)
            $('#big-box').show()
            $('#mask').show()

            $('.product-main-img').on('mousemove',function(ev){
                ll=ev.clientX-$('#mask').width()*0.5-_this.$elem.offset().left+$(window).scrollLeft();
                tt=ev.clientY-$('#mask').height()*0.5-_this.$elem.offset().top+$(window).scrollTop();
                if (ll<0) {
                    ll=0;
                }
                else if (ll>$('.product-main-img').width()-$('#mask').width()) {
                    ll=$('.product-main-img').width()-$('#mask').width();
                }
                if (tt<0) {
                    tt=0;
                }
                else if (tt>$('.product-main-img').height()-$('#mask').height()) {
                    tt=$('.product-main-img').height()-$('#mask').height();
                }
                $('#mask').css({'left':ll+'px',
                                'top':tt+'px'
                            })
                rateX=ll/($('.product-main-img').width()-$('#mask').width())
                rateY=tt/($('.product-main-img').height()-$('#mask').height())
                bigll = ($('#big-box').width()-$('#big-box').find('img').width())*rateX
                bigtt = ($('#big-box').height()-$('#big-box').find('img').height())*rateY
        
                $('#big-box').find('img').css({'left':bigll+'px',
                                                'top':bigtt+'px'
                                            })
            })
        
        })
        this.$elem.on('mouseleave','.product-main-img',function(){
            $('#big-box').hide()
            $('#mask').hide()

        })
    },
    
    productsDetail:function(){
        if(!this.productsDetailPrarms.id){
            return
        }
        var _this = this
        api.getProductsDetail({
            data:this.productsDetailPrarms,
            success:function(product){
                if(product){
                    //缓存库存,为了增加数量时验证
                    _this.stock = product.stock
                    product.images = product.images.split(',')
                    product.activeImage = product.images[0]
                    var html = _util.render(tpl,product)
                    _this.$elem.html(html)
                }else{
                    _this.$elem.html('<p class="empty-message">您找的商品去火星了!</p>')
                }
            }
        })
    },
}



$(function() {
    page.init()
})