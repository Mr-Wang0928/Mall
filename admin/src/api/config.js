//这是api的配置文件
export const SERVER = process.env.NODE_ENV == 'production' ? 'http:api.sortmall.com' : ''
export const VERSION = 'v1'

export const CATEGORY_ICON_UPLOAD = '/categories/icons'
export const PRODUCT_IMAGE_UPLOAD = '/products/images'
export const PRODUCT_DETAIL_UPLOAD = '/products/detailImages'
export const AD_IMAGE_UPLOAD = '/ads/image'


export const API_CONFIG ={
    //方法名称：                           [请求地址，请求方法]
    getCaptcha:                           ['/users/captcha','get'],
    getLogin:                             ['/users/login','post'],
    getCounts:                            ['/counts','get'],
    logout:                               ['/users/logout','get'],
    getUserList:                          ['/users/list','get'],
    getUpdateActive:                      ['/users/isActive','put'],
    updatePwd:                            ['/users/pwd','put'],


    addCategoryActive:                    ['/categories','post'],
    updateCategoryActive:                 ['/categories','put'],
    getLeveCategories:                    ['/categories/levelCategories','get'],
    getCategoryList:                      ['/categories/list','get'],
    getUpdateListNameActive:              ['/categories/name','put'],
    getUpdateListMobileNameActive:        ['/categories/mobileName','put'],
    getUpdateCategoryListIsShowActive:    ['/categories/isShow','put'],
    getUpdateListIsFloorActive:           ['/categories/isFloor','put'],
    getUpdateListOrderActive:             ['/categories/order','put'],
    getCategoryDetailActive:              ['/categories/detail','get'],

    addAttrActive:                        ['/attrs','post'],
    getAttrList:                          ['/attrs/list','get'],
    updateAttrOrderAction:                ['/attrs/order','put'],
    updateAttrDetailActive:               ['/attrs','put'],
    getAttrDetailActive:                  ['/attrs/detail','get'],
    getAllAttrs:                          ['/attrs/allAttrs','get'],

    addProductActive:                     ['/products','post'],
    updateProductActive:                  ['/products','put'],
    getProductList:                       ['/products/list','get'],
    updateProductIsShowAction:            ['/products/isShow','put'],
    updateProductStatusAction:            ['/products/status','put'],
    updateProductIsHotAction:             ['/products/isHot','put'],
    updateProductOrderAction:             ['/products/order','put'],
    getProductDetailActive:               ['/products/detail','get'],

    

    addAdActive:                          ['/ads','post'],
    updateAdActive:                       ['/ads','put'],
    getAdList:                            ['/ads/list','get'],
    getUpdateAdListIsShowActive:          ['/ads/isShow','put'],
    getUpdateListOrderActive:             ['/ads/order','put'],
    getAdDetailActive:                    ['/ads/detail','get'],
}