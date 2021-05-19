import * as type from './actionTypes.js'
import api from 'api'
import {message} from 'antd'

//使用async函数的运行时
import regeneratorRuntime from "regenerator-runtime"

const getrequestList=(payload)=>({
    type:type.GET_LIST,
    payload:payload
})
const getPageRequestStart=()=>({
    type:type.PAGE_START
})
const getPageRequestEnd=()=>({
    type:type.PAGE_END
})
export const getListAction = (page)=>{
    return async function (dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getAdList({
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

export const getSetIconAction =(payload)=>({
    type:type.SET_IMAGE,
    payload:payload
})

export const saveAction=(values)=>{
    return async function (){
        try{
            let request = api.addAdActive
            let actionMessage = "添加广告成功"
            if(values.id){
                request = api.updateAdActive
                actionMessage = "修改广告成功"
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
export const getUpdateIsShowAction = (id,newIsShow)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try{
            const result = await api.getUpdateAdListIsShowActive({
                id:id,
                isShow:newIsShow,
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

export const getUpdateOrderAction = (id,order)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('ad').get('current')
        try{
            const result = await api.getUpdateListOrderActive({
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








