import * as type from './actionTypes.js'
//immutable是一种扩展的JavaScript数据类型,最主要的特点是一旦创建,就不能再被更改,

import { fromJS } from 'immutable'

//定义一个初始化的state
const defaultState = fromJS({
    list:[],
    current:1,
    pageSize:0,
    total:0,
    isLoading:false,
    
})

function reducer(state = defaultState,action){
    if(action.type == type.GET_LIST){
        return state.merge({
            'list':action.payload.list,
            'current': action.payload.current,
            'pageSize': action.payload.pageSize,
            'total': action.payload.total,		
        })
    }
    if(action.type ==type.PAGE_START){
        return state.set('isLoading',true)
    }
    if(action.type == type.PAGE_END){
        return state.set('isLoading',false)
    }
    return state
}
export default reducer