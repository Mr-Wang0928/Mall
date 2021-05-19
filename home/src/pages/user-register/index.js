require('./index.less')

var _util = require('util')
var _api = require('api')

var formErr ={
    showErr:function(msg){
        $('#register .error-item').show().find('.error-msg').html(msg)
    },
    hideErr:function(){
        $('#register .error-item').hide()
    }
}
var page ={
    init:function(){
        this.bindEvent()
        this.handelTimer()
    },
    bindEvent:function(){
        var _this = this
        //点击提交按钮提交数据
        $('#btn-submit').on('click',function(){
            _this.submit()
        })
        //按回车键提交数据
        $('input').on('keydown',function(ev){
            if(ev.keyCode == 13){
                _this.submit()
            }
        })
        //获取验证码
        $('#btn-verify-code').on('click',function(){
            if($('#btn-verify-code').hasClass('disable-btn')){
                return
            }
            $('.captcha-box').show()
            //向后台发送请求验证码
            _this.getCaptcha()
            //点击图形验证码可以切换
            $('.captcha-img').on('click',function(){
                _this.getCaptcha()
            })
        })
        //点击按钮发送验证码
        $('#btn-captcha-code').on('click',function(){
            //1.验证手机号和验证码
            _this.valiCaptcha()
        })
    },
    submit:function(){
        //1.获取数值
        var formData ={
            phone:$('input[name="phone"]').val(),
            verifyCode:$('input[name="verify-code"]').val(),
            password:$('input[name="password"]').val(),
            repassword:$('input[name="repassword"]').val(),
        }
        //2.验证
        var result = this.valiData(formData)
        console.log(result);
        if(result.status){//验证成功
            formErr.hideErr()
            //3.发送链接提交到端口
            _api.register({
                data:formData,
                success:function(result){
                    _util.goResult('register')
                },
                error:function(msg){
                    formErr.showErr(msg)
                }
            })
            console.log('ok');
            
        }else{//验证失败
            formErr.showErr(result.msg)
        }
        
    },
    valiData:function(formData){
        var result ={
            status:false,
            msg:''
        }
        if(!_util.validata(formData.phone,'require')){
            result.msg='手机号不能为空'
            return result
        }
        if(!_util.validata(formData.phone,'phone')){
            result.msg='手机号格式错误'
            return result
        }
        if(!_util.validata(formData.verifyCode,'require')){
            result.msg='验证码不能为空'
            return result
        }
        if(!_util.validata(formData.verifyCode,'verify-code')){
            result.msg='验证码格式错误'
            return result
        }
        if(!_util.validata(formData.password,'require')){
            result.msg='密码不能为空'
            return result
        }
        if(!_util.validata(formData.password,'password')){
            result.msg='密码格式错误'
            return result
        }
        if(formData.password!=formData.repassword){
            result.msg='输入两次密码不一致'
            return result
        }
       
        result.status=true
        return result

    },
    //获取验证码
    getCaptcha:function(){
        _api.getCaptcha({
            success:function(result){
                $('.captcha-img').html(result)
            }
        })
    },
    //图形验证码验证
    valiCaptcha:function(){
        var _this = this
        const phone=$('input[name="phone"]').val()
        const captchaCode=$('input[name="captcha-code"]').val()
        if(!_util.validata(phone,'require')){
            formErr.showErr('手机号不能为空')
            return 
        }
        if(!_util.validata(captchaCode,'require')){
            formErr.showErr('图形验证码不能为空')
            return 
        }
        if(!_util.validata(phone,'phone')){
            formErr.showErr('手机号格式错误')
            return
        }
        if(!_util.validata(captchaCode,'captcha-code')){
            formErr.showErr('图形验证码格式错误')
            return
        }
        formErr.hideErr('')
        //2.发送验证码
        _api.getRegisterVerifyCode({
            data:{
                phone,
                captchaCode
            },
            success:function(){
                _util.showSuccessMsg('手机验证码已发送')
                $('input[name="captcha-code"]').val('')
                $('.captcha-box').hide()
                //设置在window本地数据
                window.localStorage.setItem('getRegisterVerifyCodeTime',Date.now())
                _this.handelTimer()

            },
            error:function(msg){
                formErr.showErr(msg)
            }
        })
    },
    handelTimer:function(){
        var _this = this
        var $btn = $('#btn-verify-code')
        //从window的本地储存上边拿数据,解决刷新过后handleTimer中数据跟着刷新
        var getRegisterVerifyCodeTime = window.localStorage.getItem('getRegisterVerifyCodeTime')
        if(getRegisterVerifyCodeTime){
            var totalSecond = 10 //总共倒计时间
            var passTimer = parseInt((Date.now() - getRegisterVerifyCodeTime)/1000)
            var restSecond =totalSecond - passTimer
            if(restSecond > 0){
                $btn.addClass('disable-btn')
                $btn.html(restSecond+'s后重试')//解决刷新后瞬间不显示问题
                this.timer=setInterval(() => {
                    passTimer = parseInt((Date.now() - getRegisterVerifyCodeTime)/1000)
                    restSecond = totalSecond - passTimer
                    if(restSecond > 0){
                        $btn.html(restSecond+'s后重试')
                    }else{
                        clearInterval( _this.timer)
                        $btn.removeClass('disable-btn').html('获取验证码')
                    }
                },1000)
            }else{
                clearInterval( _this.timer)
                $btn.removeClass('disable-btn').html('获取验证码')
                window.localStorage.removeItem('getRegisterVerifyCodeTime')
            }
        }
    }
}
$(function(){
    page.init()
})
