/*
* @Author: Tom
* @Date:   2018-08-06 09:23:30
* @Last Modified by:   Tom
* @Last Modified time: 2019-11-12 16:01:53
*/
const http = require('http')

const Router = require('express').Router;
const UserModel = require('../models/user.js');
const OrderModel = require('../models/order.js');
const AliPay = require("../service/payment/alipay/Alipay")
const {getRandomStr} = require('../util/random.js')
const {HOST_DOMAIN,kuaidiExpressApiId} = require("../config")

const router = Router();
//用户登录权限控制
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			code:10
		})
	}
})
//获取订单列表
router.get('/list',(req,res)=>{
	const { page,keyword,status }  = req.query;
	let channel = req.query.channel || 'page'

	const query = {}
	//普通用户只能查看自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	//搜索处理
	if(keyword){
		query.orderNo = {$regex:new RegExp(keyword,'i')}
	}
	//处理状态
	if(status){
		query.status = status
	}

	if(channel == 'page'){//pc端
		OrderModel.getPaginationOrders(page,query)
		.then(result=>{
			res.json({
				code:0,
				data:{
					current:result.current,
					total:result.total,
					pageSize:result.pageSize,
					list:result.list,
					keyword:keyword,
					status:status					
				}
			})		
		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取订单列表失败'
			})
		})		
	}
	else{//移动端
		const start = parseInt(req.query.start || 0)
		const limit = parseInt(req.query.limit || 20)
		OrderModel.find(query)
		.sort({_id:-1})
		.skip(start)
		.limit(limit)
		.then(orders=>{
			res.json({
				code:0,
				data:orders
			})				
		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取订单列表失败'
			})
		})		
	}
	
})
//给订单添加物流信息
async function addDeliverForOrder(order){
	const getDeliverPromise = new Promise((resolve,reject)=>{
		if(order.expressNo){
			const option = {
				host: 'api.kuaidi.com',
				method:'GET',
				path:'/openapi.html?id='+kuaidiExpressApiId+'&com='+order.expressCom+'&nu='+order.expressNo,
			}
			const reqDeliver = http.request(option, function(resDeliver){
				let body = ''
				resDeliver.on('data', (chunk) => {
			    	body += chunk
			  	});
			  	resDeliver.on('end', () => {
			  		const expressRes = JSON.parse(body)
			  		if(expressRes.success){
			  			order.expressInfo = {
			  				code:0,
			  				data:expressRes.data
			  			}
			  		}else{
			  			order.expressInfo = {
			  				code:1,
			  				message:expressRes.reason
			  			}
			  		}
			  		resolve(order)
			  	})		
			})
			reqDeliver.on('error',e=>{
	  			order.expressInfo = {
	  				code:1,
	  				message:'获取物流接口调用失败'
	  			}
	  			resolve(order)			
			})
			reqDeliver.end()			
		}else{
			order.expressInfo = {
				code:1,
				message:'暂无物流信息'
			}
			resolve(order)			
		}
	})

	const result = await getDeliverPromise

	return result	
}

//获取订单详情
router.get('/detail',(req,res)=>{
	const {orderNo} = req.query;
	const query = {}
	//普通用户只能查看自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	query.orderNo = orderNo	
	OrderModel.findOne(query)
	.then(order=>{
		//添加快递信息
		addDeliverForOrder({...order._doc})
		.then(newOrder=>{
			res.json({
				code:0,
				data:newOrder
			})			
		})		
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单失败'
		})
	})	
})

//获取生成订单的商品列表
router.get('/products',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		user.getOrderProductList()
		.then(cart=>{
			res.json({
				code:0,
				data:cart
			})			
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取订单商品失败'
		})
	})	
})
/**
 * [payOrder 支付订单]
 * @param  {[type]} order [description]
 * @param  {[type]} res   [description]
 * @return {[type]}       [description]
 */
function payOrder(order,channel,res){
	const paymentType = order.paymentType
	//支付渠道 
	//page pc端 
	//wap  手机端	
	if(paymentType == '10'){//支付宝
		const options = {
		        outTradeNo: order.orderNo,
		        subject: '购买商城商品',
		        amount: order.payment,
		        body: '购买商城商品',
		        //支付完成后的异步回调
		        notifyUrl:HOST_DOMAIN + '/payments/alipay/notify',
		}
		const aliPay = new AliPay()
		if(channel == 'page'){//支付宝pc端
			res.json({
				code:0,
				data:{
					url:aliPay.pagePay(options)
				}
			})
		}else{//支付宝手机端
			options.quitUrl = HOST_DOMAIN + '/payments/alipay/quit'
			res.json({
				code:0,
				data:{
					url:aliPay.wapPay(options)
				}
			})			
		}
	}
	//微信
	else if(paymentType == '20'){
		res.json({
			code:0,
			data:{
				url:'http://www.weixin.com'
			}
		})
	}
}

//创建订单
router.post('/',(req,res)=>{
	UserModel.findById(req.userInfo._id)
	.then(user=>{
		let order = {};
		user.getOrderProductList()
		.then(result=>{
			if(result.cartList.length == 0){
				return res.json({
					code:1,
					message:'购物车中已经没有选中的商品了'
				})				
			}
			order.payment = result.totalCartPrice;
			//构建订单的商品
			let productList = [];
			result.cartList.forEach(item=>{
				productList.push({
					productId:item.product._id,
					count:item.count,
					totalPrice:item.totalPrice,
					price:item.product.price,
					mainImage:item.product.mainImage,
					name:item.product.name,
					attr:item.attr
				})
			})
			order.productList = productList;

			//构建订单的地址信息
			let shipping = user.shipping.id(req.body.shippingId);
			order.shipping = {
					shippingId:shipping._id,
				    name:shipping.name,
				    province:shipping.province,
				    city:shipping.city,
				    county:shipping.county,
				    address:shipping.address,
				    phone:shipping.phone,
				    zip:shipping.zip
			}
			//构建订单号
			order.orderNo = Date.now().toString() + parseInt(Math.random()*10000);

			//赋值用户ID
			order.user = user._id;
			order.paymentType = req.body.paymentType
			// order.paymentType = '10'
			
			if(order.paymentType == '10'){
				order.paymentTypeDesc = '支付宝'
			}
			else if(order.paymentType == '20'){
				order.paymentTypeDesc = '微信'
			}
			

			new OrderModel(order)
			.save()
			.then(newOder=>{
				//删除购物车中选中的商品
				UserModel.findById(req.userInfo._id)
				.then(userUser=>{
					let newCartList = userUser.cart.cartList.filter(item=>{
						return item.checked == false;
					})
					userUser.cart.cartList = newCartList;
					userUser.save()
					.then(newUser2=>{
						//返回支付信息到	(原来版本)
						// let channel = req.body.channel || 'page'
						// payOrder(order,channel,res)		
						
						//返回订单到前台
						res.json({
							code:0,
							data:newOder
						})					
					})
				})
			})	
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'创建订单商品失败'
		})
	})
})
//支付订单
router.put('/pay',(req,res)=>{
	const {orderNo} = req.body
	let channel = req.body.channel || 'page'
	OrderModel.findOne({orderNo:orderNo})
	.then(order=>{
		payOrder(order,channel,res)
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'支付订单失败'
		})
	})	
})

//更新订单状态
router.put('/status',(req,res)=>{
	const {orderNo,status} = req.body
	const query = {orderNo:orderNo}
	//普通用户只能修改自己的订单
	if(!req.userInfo.isAdmin){
		query.user = req.userInfo._id
	}
	const update = {}
	//权限检查
	//普通用户 修改订单状态是取消(20)
	if(req.userInfo.isAdmin && status == '20'){
		update.status = status
		update.statusDesc = "取消"
	}
	//普通用户 修改订单状态是完成(50)
	else if(req.userInfo.isAdmin && status == '50'){
		update.status = status
		update.statusDesc = "完成"
	}
	//没有权限
	else{
		return res.json({
			code:10
		})		
	}
	//更新
	OrderModel.findOneAndUpdate(
		query,
		update,
		{new:true}
	)
	.then(order=>{
		addDeliverForOrder({...order._doc})
		.then(newOrder=>{
			res.json({
				code:0,
				data:newOrder
			})			
		})	
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新订单失败'
		})
	})	
})

//发货
router.put('/deliver',(req,res)=>{
	const {orderNo,expressName,expressNo,expressCom} = req.body
	const query = {orderNo:orderNo}
	
	//非管理员不能发货
	if(!req.userInfo.isAdmin){
		return res.json({
			code:10
		})	
	}
	
	const update = {
		expressName:expressName,
		expressNo:expressNo,
		expressCom:expressCom,
		status:'40',
		statusDesc:"已发货"
	}

	//更新
	OrderModel.findOneAndUpdate(
		query,
		update,
		{new:true}
	)
	.then(order=>{
		addDeliverForOrder({...order._doc})
		.then(newOrder=>{
			res.json({
				code:0,
				data:newOrder
			})			
		})	
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'更新订单失败'
		})
	})	
})

module.exports = router;