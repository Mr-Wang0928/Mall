import * as type from './actionTypes.js'
//immutable是一种扩展的JavaScript数据类型,最主要的特点是一旦创建,就不能再被更改,

import { fromJS } from 'immutable'

//定义一个初始化的state
const defaultState = fromJS({isLoading:false,captch:''})

function reducer(state = defaultState,action){
    if(action.type == type.LOGIN_START){
        return state.set('isLoading',true)
        // return state.set('isLoading',action.payload)
    }
    if(action.type == type.LOGIN_END){
        return state.set('isLoading',false)
        // return state.set('isLoading',action.payload)
    }
    if(action.type == type.LOGIN_CAPTCH){
        return state.set('captcha',action.payload)
        
    }
    return state
}
export default reducer