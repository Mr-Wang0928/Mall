import * as type from './actionTypes.js'
import axios from 'axios'
import api from 'api'
import {message} from 'antd'

import {saveUsername} from 'util'
//使用async函数的运行时
import regeneratorRuntime from "regenerator-runtime"


const getrequestList=(payload)=>({
    type:type.USER_LIST,
    payload:payload
})
const getPageRequestStart=()=>({
    type:type.USER_PAGE_START
})
const getPageRequestEnd=()=>({
    type:type.USER_PAGE_END
})

export const getCategoryListAction = (page)=>{
    return async function (dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getCategoryList({
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
export const getUpdateNameActive = (id,newName)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try{
            const result = await api.getUpdateListNameActive({
                id:id,
                name:newName,
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
export const getUpdateMobileNameAction = (id,newName)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try{
            const result = await api.getUpdateListMobileNameActive({
                id:id,
                mobileName:newName,
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


export const clearPages =()=>({
    type:type.CATEGORY_CLEAR_PAGES,
})

export const saveAction=(values)=>{
    return async function (dispatch,getState){
        try{
            let request = api.addCategoryActive
            let actionMessage = "添加分类成功"
            if(values.id){
                request = api.updateCategoryActive
                actionMessage = "修改分类成功"
            }
            console.log('values::',values);
            const result = await request(values)
            if(result.code == 0){
                message.success(actionMessage,1)
                dispatch(setLeveCategories(result.data))
                dispatch(clearPages())
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
const setLeveCategories=(payload)=>({
    type:type.SET_LEVE_CATEGORIES,
    payload:payload
})
export const LeveCategoriesAction=()=>{
    return async function (dispatch){
        try{
            const result = await api.getLeveCategories()
            if(result.code == 0){
                dispatch(setLeveCategories(result.data))
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
        const page = getState().get('category').get('current')
        try{
            const result = await api.getUpdateCategoryListIsShowActive({
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
export const getUpdateIsFloorAction = (id,newIsFloor)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('category').get('current')
        try{
            const result = await api.getUpdateListIsFloorActive({
                id:id,
                isFloor:newIsFloor,
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
        const page = getState().get('category').get('current')
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








