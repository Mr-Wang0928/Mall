import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Button, Select,InputNumber,Transfer} from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store';

import AdminLayout from 'components/custom-layout'
import UpLoadImages from 'components/upLoad-images'
import RichEditor from 'components/rich-editor'
import {PRODUCT_IMAGE_UPLOAD,PRODUCT_DETAIL_UPLOAD} from 'api/config'

import api from 'api'

const { Content } = Layout
const { Option } = Select

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 8,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 0,
    },
}

class ProductSave extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.productsId,
            targetKeys: [],
            selectedKeys: [],
            coverImage:'',
            coverImageValidata:{
                help:'',
                validateStatus:''
            },
            mainImage:'',
            mainImageValidata:{
                help:'',
                validateStatus:''
            },
            detail:''
        }
        this.formRef = React.createRef();
        this.handleChange = this.handleChange.bind(this)
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidata = this.handleValidata.bind(this)
        this.handleCoverImage = this.handleCoverImage.bind(this)
        this.handleMainImage = this.handleMainImage.bind(this)
        this.handleDetail = this.handleDetail.bind(this)
    }
    
    handleChange(nextTargetKeys, direction, moveKeys) {
        this.setState({ targetKeys: nextTargetKeys })
    
        console.log('targetKeys: ', nextTargetKeys)
        console.log('direction: ', direction)
        console.log('moveKeys: ', moveKeys)
    }
    
    handleSelectChange(sourceSelectedKeys, targetSelectedKeys){
        this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] })
    
        console.log('sourceSelectedKeys: ', sourceSelectedKeys)
        console.log('targetSelectedKeys: ', targetSelectedKeys)
    }
    handleCoverImage(coverImage){
        this.setState({
            coverImage:coverImage,
            coverImageValidata:{
                help:'',
                validateStatus:''
            },
        })
    }
    handleMainImage(mainImage){
        this.setState({
            mainImage:mainImage,
            mainImageValidata:{
                help:'',
                validateStatus:''
            }
        })
    }
    handleFinish(values){
        const {coverImage,mainImage,id,detail,targetKeys} =this.state
        if(targetKeys.length > 0){
            values.attrs = targetKeys.join(',')
        }
        this.handleValidata()
        if(coverImage && mainImage){
            values.id=id
            values.images=coverImage
            values.mainImage=mainImage
            values.detail=detail
            this.props.handleSave(values)
        }
        
    }
    handleValidata(){
        const {coverImage,mainImage} =this.state
        if(!coverImage){
            this.setState({
                coverImage:'',
                coverImageValidata:{
                    help:'请上传封面图片',
                    validateStatus:'error'
                }
            })
        }
        if(!mainImage){
            this.setState({
                mainImage:'',
                mainImageValidata:{
                    help:'请上传商品图片',
                    validateStatus:'error'
                }
            })
        }
    }
    handleDetail(detail){
        this.setState({
            detail:detail
        })
    }
    async componentDidMount(){
        this.props.handleLeveCategories() //获取分类
        this.props.handleAllAttr()  //获取属性
        if(this.state.id){  //编辑
            const result = await api.getProductDetailActive({id:this.state.id})
            const data = result.data
            console.log(data);
            //回填数据
            this.formRef.current.setFieldsValue({
                category: data.category._id,
                name: data.name,
                description:data.description,
                price:data.price,
                stock:data.stock,
                payNums:data.payNums,
            })
            this.setState({
                targetKeys:data.attrs.map(attr=>attr._id),
                mainImage:data.mainImage,
                coverImage:data.images,
                detail:data.detail
            })
        }else{ //新增
            this.setState({
                mainImage:'',
                coverImage:'',
            })
        }
        
    }
    render(){
        const {
            handleSave,
            levelCategories,
            allAttrs,
        } =this.props

        const {
            targetKeys,
            selectedKeys,
            coverImageValidata,
            mainImageValidata,
            mainImage,
            coverImage,
            detail
        } = this.state
        const options = levelCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        const dataSource = allAttrs.map(Attrs=>({ key:Attrs._id, title:Attrs.name}))

        let coverImageFileList = []
        if (coverImage) {
            coverImageFileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: coverImage,
            })
        } else {
            coverImageFileList = []
        }
        let mainImageFileList = []
        if (mainImage) {
            mainImageFileList = mainImage.split(',').map((url,index)=>({
                uid: index,
                name: index+'.png',
                status: 'done',
                url: url,
                response:{//为了修改时候可以取得原来的值
                    status:"done",
                    url:url
                }
            }))
        } else {
            mainImageFileList = []
        }
        return(
            <div className='ProductSave'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '修改商品' : '添加商品'}</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 570,
                        }}
                    >
                        <Form {...layout} 
                            name="control-hooks" 
                            // onFinish={(values)=>console.log(values)}
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidata}
                            ref={this.formRef}
                            initialValues={{
                                price:0
                            }}
                               
                            
                        >
                            <Form.Item 
                                name="category" 
                                label="商品分类" 
                                rules={[{ 
                                    required: true ,
                                    message:'请选择商品分类'
                                }]}>
                                <Select
                                    placeholder="请选择商品分类"
                                    onChange={()=>{}}
                                    allowClear
                                >
                                {options}
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="商品名称" 
                                rules={[{ 
                                    required: true ,
                                    message:'请输入商品名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="description" 
                                label="商品描述" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入商品描述'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="price" 
                                label="商品价格" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入商品价格'
                                }]}>
                                <InputNumber  min={0}/>     
                            </Form.Item>
                            <Form.Item 
                                name="stock" 
                                label="商品库存" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入商品库存'
                                }]}>
                                <InputNumber min={0}/>     
                            </Form.Item>
                            <Form.Item 
                                name="payNums" 
                                label="支付人数" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入支付人数'
                                }]}>
                                <InputNumber min={0} />     
                            </Form.Item>
                            <Form.Item 
                                name="attrs"
                                label="商品属性" 
                                >
                                <Transfer
                                    dataSource={dataSource}
                                    titles={['未选属性', '已选属性']}
                                    targetKeys={targetKeys}
                                    selectedKeys={selectedKeys}
                                    onChange={this.handleChange}
                                    onSelectChange={this.handleSelectChange}
                                    render={item => item.title}
                                />  
                            </Form.Item>
                            <Form.Item 
                                label='封面图片'
                                required={true}
                                {...coverImageValidata}
                            >
                                <UpLoadImages  
                                    getImageUrlLists={this.handleCoverImage}
                                    fileList={coverImageFileList}
                                    active={PRODUCT_IMAGE_UPLOAD} //图片上传地址(写为变量直接在api中改变)
                                />
                            </Form.Item>
                            <Form.Item 
                                label='商品图片'
                                required={true}
                                {...mainImageValidata}
                            >
                                <UpLoadImages  
                                    getImageUrlLists={this.handleMainImage}
                                    fileList={mainImageFileList}
                                    active={PRODUCT_IMAGE_UPLOAD} 
                                />
                            </Form.Item>
                            <Form.Item 
                                name="detail" 
                                label="商品详情" 
                                labelCol={{span: 6,}}
                                wrapperCol={{span: 12}}
                               >
                                <RichEditor 
                                    data={detail}
                                    url={PRODUCT_DETAIL_UPLOAD}
                                    getDetail={this.handleDetail}
                                />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </Content>
                </AdminLayout>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    levelCategories:state.get('product').get('levelCategories'),
    allAttrs:state.get('product').get('allAttrs'),
})
const mapDispatchToProps=(dispatch)=>({
    handleSave:(values)=>{
        console.log('values',values);
        // dispatch(actionCreator.saveAction(values))
    },
    handleLeveCategories:()=>{
        dispatch(actionCreator.LeveCategoriesAction())
    },
    handleAllAttr:()=>{
        dispatch(actionCreator.handleAllAttrAction())
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(ProductSave)