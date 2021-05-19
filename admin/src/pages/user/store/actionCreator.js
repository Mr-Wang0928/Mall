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
export const getUserListAction = (page)=>{
    return async function (dispatch){
        dispatch(getPageRequestStart())
        try{
            const result = await api.getUserList({
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
export const getUpdateIsActive = (id,isActive)=>{
    return async function (dispatch,getState){
        dispatch(getPageRequestStart())
        const page = getState().get('user').get('current')
        try{
            const result = await api.getUpdateActive({
                id:id,
                isActive:isActive,
                page:page
            })
            if(result.code == 0){
                dispatch(getrequestList(result.data))
                message.success('修改成功',1)

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

