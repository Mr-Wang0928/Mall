import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Tag ,InputNumber,Image } from 'antd';

import AdminLayout from 'components/custom-layout'

import api from 'api'
import './common.less'

const { Content } = Layout

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 10,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 0,
    },
}

class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.detailId,
            product:''
            // targetKeys: [],
            // selectedKeys: [],
            // coverImage:'',
            // coverImageValidata:{
            //     help:'',
            //     validateStatus:''
            // },
            // mainImage:'',
            // mainImageValidata:{
            //     help:'',
            //     validateStatus:''
            // },
            // detail:''
        }
        this.formRef = React.createRef();
    }
    async componentDidMount(){
        // this.props.handleLeveCategories() //获取分类
        // this.props.handleAllAttr()  //获取属性
        if(this.state.id){  //编辑
            const result = await api.getProductDetailActive({id:this.state.id})
            const data = result.data
            console.log('data:::',data)
            //回填数据
            this.formRef.current.setFieldsValue({
                category: data.category.name,
                name: data.name,
                description:data.description,
                price:data.price,
                stock:data.stock,
                payNums:data.payNums,
            })
            this.setState({
                product:data
            })
        }
        
    }
    render(){
        // const options = levelCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        // const dataSource = allAttrs.map(Attrs=>({ key:Attrs._id, title:Attrs.name}))
        const {attrs,images,mainImage,detail} = this.state.product
        let attrsTag = null
        let mainImageTag = null
        if(attrs){
            attrsTag = attrs.map((attr)=><Tag key={attr._id}>{attr.key}</Tag>)
        }
        if(mainImage){
            mainImageTag = mainImage.split(',').map((url,index)=><Image
                src={url}
                key={index}
          />)
        }
        return(
            <div className='ProductSave'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>查看详情</Breadcrumb.Item>
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
                            ref={this.formRef}
                            initialValues={{
                                price:0
                            }}
                               
                            
                        >
                            <Form.Item 
                                name="category" 
                                label="商品分类" 
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item 
                                name="name" 
                                label="商品名称" 
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item 
                                name="description" 
                                label="商品描述" 
                            >
                                <Input disabled={true} />
                            </Form.Item>
                            <Form.Item 
                                name="price" 
                                label="商品价格" 
                            >
                                <InputNumber  disabled={true} />     
                            </Form.Item>
                            <Form.Item 
                                name="stock" 
                                label="商品库存" 
                            >
                                <InputNumber disabled={true} />     
                            </Form.Item>
                            <Form.Item 
                                name="payNums" 
                                label="支付人数" 
                            >
                                <InputNumber disabled={true} />     
                            </Form.Item>
                            <Form.Item 
                                name="attrs"
                                label="商品属性" 
                            >
                                {attrsTag}
                            </Form.Item>
                            <Form.Item 
                                label='封面图片'
                                
                            >
                                <Image
                                    width={200}
                                    src={images}
                                />
                            </Form.Item>
                            <Form.Item 
                                label='商品图片'
                                labelCol={{span: 6,}}
                            >
                               {mainImageTag}
                            </Form.Item>
                            <Form.Item 
                                name="detail" 
                                label='商品详情'
                                labelCol={{span: 6,}}
                                wrapperCol={{span: 12}}
                               >
                                <div  dangerouslySetInnerHTML={{__html:detail}}></div>
                            </Form.Item>
                        </Form>
                    </Content>
                </AdminLayout>
            </div>
        )
    }
}
export default ProductDetail