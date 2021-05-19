import * as type from './actionTypes.js'
//immutable是一种扩展的JavaScript数据类型,最主要的特点是一旦创建,就不能再被更改,

import { fromJS } from 'immutable'

//定义一个初始化的state
const defaultState = fromJS({
    list:[],
    current:1,
    pageSize:0,
    total:0,
    levelCategories:[],
    allAttrs:[],
    keyword:''
    
    
})

function reducer(state = defaultState,action){
    if(action.type == type.PRODUCT_LIST){
        return state.merge({
            'list':action.payload.list,
            'current': action.payload.current,
            'pageSize': action.payload.pageSize,
            'total': action.payload.total,	
            'keyword':action.payload.keyword,

           
        })
    }
    if(action.type ==type.PRODUCT_PAGE_START){
        return state.set('isLoading',true)
    }
    if(action.type == type.PRODUCT_PAGE_END){
        return state.set('isLoading',false)
    }
    if(action.type == type.PRODUCT_LEVE_CATEGORIES){
        return state.set('levelCategories',action.payload)
    }
    if(action.type == type.PRODUCT_ALL_ATTRS){
        return state.set('allAttrs',action.payload)
    }
    if(action.type == type.PRODUCT_COVER_IMAGE){
        return state.merge({
            'coverImage':action.payload,
            'coverImageValidata':fromJS({
                help:'',
                validateStatus:''
            })
        })
    }
    if(action.type == type.PRODUCT_MAIN_IMAGE){
        return state.merge({
            'mainImage':action.payload,
            'mainImageValidata':fromJS({
                help:'',
                validateStatus:''
            })
        })
    }
    return state
}
export default reducer