import * as type from './actionTypes.js'
import api from 'api'
import {message} from 'antd'


const getrequestList=(payload)=>({
    type:type.ATTR_LIST,
    payload:payload
})
const getPageRequestStart=()=>({
    type:type.ATTR_PAGE_START
})
const getPageRequestEnd=()=>({
    type:type.ATTR_PAGE_END
})

export const getAttrListAction = (page)=>{
    return async function (dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getAttrList({
                page:page
            })
            if(result.code == 0){
                dispatch(getrequestList(result.data))
            }
        }
        catch(e){
            message.error('网络请求失败',1)
            console.log(e);
        }
        finally{
            dispatch(getPageRequestEnd())
        }
        dispatch(getPageRequestEnd())
    }
}

export const saveAction=(values,id)=>{
    return async function (dispatch){
        try{
            let request = api.addAttrActive
            let actionMessage = "添加属性成功"
            if(id){
                request = api.updateAttrDetailActive
                actionMessage = "修改属性成功"
                values.id = id
            }
            const result = await request(values)
            if(result.code == 0){
                message.success(actionMessage,1)
            }else{
                message.error(result.message,1)
            }
        }
        catch(e){
            message.error('网络请求失败',1)
            console.log(e);
        }
        
    }
}
export const getUpdateOrderAction = (id,order)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('attr').get('current')
        try{
            const result = await api.updateAttrOrderAction({
                id:id,
                order:order,
                page:page
            })
            if(result.code == 0){
                dispatch(getrequestList(result.data))
                message.success('修改成功',1)
            }else{
                message.error(result.message,1)
            }
        }
        catch(e){
            message.error('网络请求失败',1)
            console.log(e);
        }
        finally{
            dispatch(getPageRequestEnd())
        }
    }
}








