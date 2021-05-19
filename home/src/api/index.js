import {SERVER,VERSION,API_CONFIG} from './config'

var _util =require('util')

const getApiObj=(apiConfig)=>{
    const apiObj={}
    for(let key in apiConfig){
        apiObj[key]=(options)=>{
            const url = apiConfig[key][0] || ''
            // if(!url.startsWith('http://')){//老师物流请求
            //     url = url
            // }
            
            const method = apiConfig[key][1] || 'get'
            return request({
                url:url,
                type:method,
                data:options.data,
                success:options.success,
                error:options.error,
                params:options.params //其他特殊配置
            })
        }
    }
    return apiObj
}
const request=(options)=>{
    let params ={}
    if(options.params){
        params = options.params
    }
    return $.ajax({
        url:options.url,
        type:options.type,
        dataType:'json',
        data:options.data,
        xhrFields:{withCredentials: true},//跨域请求是否携带cookie设置,true为携带
        ...params,
        success:function(result){
            if(result.code == 0){
                options.success && options.success(result.data)
            }else if(result.code == 1){
                options.error && options.error(result.message)
            }else if(result.code== 10){
                _util.goLogin()
            }else if(!result.code){
                options.success && options.success(result)
            }
        },
        error:function(){
            options.error && options.error('网络请求错误')
        },
    })
    // return new Promise((resolve,rejcect)=>{
    //     const options = {
    //         method,
    //         url,
    //     }
    //     switch(method.toUpperCase()){
    //         case 'GET':
    //             options.params = data
    //             break
    //         default:
    //             options.data = data
    //             break
    //     }
    //     axios(options)
    //     .then(result=>{
    //         const data = result.data
    //         if(data.code==10){//没有权限
    //             removeUsername()
    //             goLogin()
    //             rejcect('没有权限')
    //         }else{
    //             resolve(data)
    //         }
          
    //     })
    //     .catch(e=>{
    //         rejcect(e)
    //         console.log('1111111',e);
    //     })
    // })
}

module.exports =getApiObj(API_CONFIG)