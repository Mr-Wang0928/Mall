import * as type from './actionTypes.js'
import api from 'api'

//使用async函数的运行时
import regeneratorRuntime from "regenerator-runtime"

/**
 * 1. 默认的action只能是一个对象,不能是处理异步请求的函数, 如果是异步请求的函数会报错:
 * Actions must be plain objects. Use custom middleware for async actions.
 * 2. 如果添加了redux-thunk中间件,action就可以是一个处理异步请求的函数了
 * 3. 返回的异步处理函数接收一个dispatch函数,在异步处理结束后再根据请求结果使用这个dispatch函数派发一个对象类型的action
 */
const getrequestCounts=(payload)=>({
    type:type.HOME_COUNTS,
    payload:payload
})

export const getCountsAction = ()=>{
    return async function (dispatch){
        const result = await api.getCounts()
        if(result.code == 0){
            dispatch(getrequestCounts(result.data))
        }
    }
}

