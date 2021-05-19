// module.exports= goLogin(){
//     window.location.href='/login'
// }
var Hogan = require('hogan.js')
module.exports ={
    validata:function(value,type){
        var value = $.trim(value);
		//非空验证
		if(type === 'require'){
			return !!value;
		}
		//用户名格式验证
		if(type === 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//密码格式验证
		if(type === 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机号格式验证
		if(type === 'phone'){
			return /^1[35678]\d{9}$/.test(value)
		}
		//邮箱地址的验证
		if(type === 'email'){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}	
		//手机验证码
		if(type === 'verify-code'){
			return /^[0-9]{6}$/.test(value)
		}
		//图形验证码
		if(type === 'captcha-code'){
			return /^[a-z0-9]{4}$/i.test(value)
		}
	},
	goLogin:function(){
		window.location.href='/user-login.html'
	},
	showErrorMsg:function(msg){
        alert(msg)
    },
	showSuccessMsg:function(msg){
		alert(msg)
	},
	showConfirm:function(msg){
        return window.confirm(msg)
    },
	goResult:function(type){
		window.location.href = '/result.html?type='+type
	},
	getParamFromUrl:function(key){
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;

	},
	//模板渲染
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data);
		return html
	},
		
}