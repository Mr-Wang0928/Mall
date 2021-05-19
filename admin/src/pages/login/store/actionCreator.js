import * as type from './actionTypes.js'
import axios from 'axios'
import { message } from 'antd';
import api from 'api'

import {saveUsername,goHome} from 'util'
//使用async函数的运行时
import regeneratorRuntime from "regenerator-runtime"

/**
 * 1. 默认的action只能是一个对象,不能是处理异步请求的函数, 如果是异步请求的函数会报错:
 * Actions must be plain objects. Use custom middleware for async actions.
 * 2. 如果添加了redux-thunk中间件,action就可以是一个处理异步请求的函数了
 * 3. 返回的异步处理函数接收一个dispatch函数,在异步处理结束后再根据请求结果使用这个dispatch函数派发一个对象类型的action
 */
const getRequestStart=()=>({
    type:type.LOGIN_START
})
const getRequestEnd=()=>({
    type:type.LOGIN_END
})
const getRequestCaptcha=(values)=>({
    type:type.LOGIN_CAPTCH,
    payload:values
})
export const getLoginCaptchaAction = ()=>{
    // return async function (dispatch){
    //     const result = await axios({
    //         method:'get',
    //         url:'/users/captcha',
    //     })
    //     if(result.data.code == 0){
    //         dispatch(getRequestCaptcha(result.data.data))
    //     }
    // } 
    return async function (dispatch){
        const result = await api.getCaptcha()
        if(result.code == 0){
            dispatch(getRequestCaptcha(result.data))
        }
    }
}
export const getLoginItemAction = (values)=>{
    return  async function (dispatch){
        // const result = await axios.get('http://192.168.1.102:3000')//无线
        // const result = await axios.get('http://192.168.0.1:3000')//有线
        // dispatch({type:type.LOGIN_START})

        // dispatch(getRequestStart())
        // const result = await axios({
        //     method:'post',
        //     url:'/users/login',
        //     data:{
        //         username:values.username,
        //         password:values.password,
        //         role:'admin',
        //         captchaCode:values.captcha
        //     }
        // })


        dispatch(getRequestStart())
        const result = await api.getLogin({
            username:values.username,
            password:values.password,
            role:'admin',
            captchaCode:values.captcha
        })
        if(result.code == 1){
            message.error(result.message,1) //第一个参数：页面显示的内容。第二个参数：显示的时长
        }
        else{
            message.success('登陆成功',1)
            //保存用户登录状态
            saveUsername(result.data.username)
            //跳转后台主页
            // window.location.href='/'
            goHome()
        }
        dispatch(getRequestEnd())
    }
}

export const getChangeItemAction = (payload)=>({
    type:type.CHANGE_ITEM,payload:payload
})
