import * as type from './actionTypes.js'
import api from 'api'
import {message} from 'antd'


const getrequestList=(payload)=>({
    type:type.PRODUCT_LIST,
    payload:payload
})
const getPageRequestStart=()=>({
    type:type.PRODUCT_PAGE_START
})
const getPageRequestEnd=()=>({
    type:type.PRODUCT_PAGE_END
})

export const getProductListAction = (page,keyword)=>{
    return async function (dispatch){
        dispatch(getPageRequestStart())
        try{
            const options ={
                page:page
            }
            if(keyword){
                options.keyword=keyword
            }
            console.log(options);
            const result = await api.getProductList(options)
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

export const saveAction=(values)=>{
    return async function (){
        try{
            let request = api.addProductActive
            let actionMessage = "添加商品成功"
            if(values.id){
                request = api.updateProductActive
                actionMessage = "修改商品成功"
            }
            console.log('666',values);
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
        const page = getState().get('product').get('current')
        try{
            const result = await api.updateProductIsShowAction({
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
export const getUpdateStatusAction = (id,newStatus)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try{
            const result = await api.updateProductStatusAction({
                id:id,
                status:newStatus,
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
export const getUpdateIsHotAction = (id,newIsHot)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('product').get('current')
        try{
            const result = await api.updateProductIsHotAction({
                id:id,
                isHot:newIsHot,
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
        const page = getState().get('product').get('current')
        try{
            const result = await api.updateProductOrderAction({
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
const setLeveCategories=(payload)=>({
    type:type.PRODUCT_LEVE_CATEGORIES,
    payload:payload
})
export const LeveCategoriesAction=()=>{
    return async function (dispatch){
        try{
            const result = await api.getLeveCategories({
                level:2
            })
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
const setAllAttrs=(payload)=>({
    type:type.PRODUCT_ALL_ATTRS,
    payload:payload
})
export const handleAllAttrAction=()=>{
    return async function (dispatch){
        try{
            const result = await api.getAllAttrs()
            if(result.code == 0){
                dispatch(setAllAttrs(result.data))
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
export const SetCoverImageAction =(payload)=>({
    type:type.PRODUCT_COVER_IMAGE,
    payload:payload
})
export const SetMainImageAction =(payload)=>({
    type:type.PRODUCT_MAIN_IMAGE,
    payload:payload
})







