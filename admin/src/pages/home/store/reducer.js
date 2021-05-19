import * as type from './actionTypes.js'
//immutable是一种扩展的JavaScript数据类型,最主要的特点是一旦创建,就不能再被更改,

import { fromJS } from 'immutable'

//定义一个初始化的state
const defaultState = fromJS({
    usernum:0,
    ordernum:0,
    productnum:0
})

function reducer(state = defaultState,action){
    if(action.type == type.HOME_COUNTS){
        const {usernum,ordernum,productnum} = action.payload

        return state.merge({
            usernum,
            ordernum,
            productnum,
        })
    }
    return state
}
export default reducer