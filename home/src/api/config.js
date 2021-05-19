//这是api的配置文件
export const SERVER = process.env.NODE_ENV == 'production' ? 'http:api.sortmall.com' : ''
export const VERSION = 'v1'

export const API_CONFIG ={
    //方法名称：                           [请求地址，请求方法]
    getCaptcha:                           ['/users/captcha','get'],
    getLogin:                             ['/sessions/users','post'],
    getCounts:                            ['/counts','get'],
    logout:                               ['/sessions/users','delete'],
    register:                             ['/users','post'],
    getRegisterVerifyCode:                ['/users/registerVerifyCode','get'],
    getDynamicLogin:                      ['/users/dynamicLogin','post'],
    getLoginVerifyCode:                   ['/users/loginVerifyCode','get'],
    getUsername:                          ['/sessions/username','get'],
    getUserinfo:                          ['/sessions/users','get'],
    updateUsers:                          ['/users/pwd','put'],

    getCartCount:                         ['/carts/count','get'],
    getCartList:                          ['/carts','get'],



    getProductsSearchList:                ['/products/search', 'get'],
    getProductsList:                      ['/products/list','get'],
    getListCategories:                    ['/categories/list','get'],
    getProductsDetail:                    ['/products/detail','get'], 

    getHomeCategories:                    ['/categories/homeCategories','get'],
    getChildArrayCategories:              ['/products/childCategories','get'],
    getPositionAds:                       ['/ads/positionAds','get'],
    getFloors:                            ['/floors','get'],

    addCarts:                             ['/carts','post'],    
    getCartsCount:                        ['/carts/count','get'],    
    getCarts:                             ['/carts','get'],    
    updateCartsChoices:                   ['/carts/choices','put'],    
    deleteCarts:                          ['/carts','delete'],    
    updateCartsCounts:                    ['/carts/counts','put'], 

    getOrdersProducts:                    ['/orders/products','get'],
    addOrders:                            ['/orders','post'],
    getOrdersList:                        ['/orders/list','get'],
    getOrdersDetail:                      ['/orders/detail','get'],
    updateOrdersStatus:                   ['/orders/status','put'],

    addShippings:                         ['/shippings','post'],      
    getShippingsList:                     ['/shippings/list','get'],      
    deleteShippings:                      ['/shippings','delete'],      
    getShippingsDetail:                   ['/shippings/detail','get'],      
    updateShippings:                      ['/shippings','put'],

    getPayments:                          ['/payments','get'], 
    getPaymentsStatus:                    ['/payments/status','get'], 
}