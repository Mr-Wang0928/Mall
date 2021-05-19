import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Button, Select,InputNumber,Transfer} from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store';

import AdminLayout from 'components/custom-layout'
import UpLoadImages from 'components/upLoad-images'
import {AD_IMAGE_UPLOAD} from 'api/config'

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

class AdSave extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.adId,
            image:'',
            imageValidata:{
                help:'',
                validateStatus:''
            },
        }
        this.formRef = React.createRef();
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidata = this.handleValidata.bind(this)
        this.handleImage = this.handleImage.bind(this)
    }
    handleImage(image){
        this.setState({
            image:image,
            imageValidata:{
                help:'',
                validateStatus:''
            }
        })
    }
    handleFinish(values){
        const {image,id} =this.state
        this.handleValidata()
        if(image){
            values.id=id
            values.image=image
            this.props.handleSave(values)
        }
    }
    handleValidata(){
        const {image} =this.state
        if(!Image){
            this.setState({
                image:'',
                imageValidata:{
                    help:'请上传广告图片',
                    validateStatus:'error'
                }
            })
        }
    }
    async componentDidMount(){
        if(this.state.id){  //编辑
            const result = await api.getAdDetailActive({id:this.state.id})
            const data = result.data
            //回填数据
            this.formRef.current.setFieldsValue({
                name: data.name,
                link:data.link,
                position:data.position,
            })
            this.setState({
                image:data.image
            })
        }else{ //新增
            this.setState({
                image:'',
            })
        }
        
    }
    render(){
        const {
            imageValidata,
            image,
        } = this.state
        let imageFileList = []
        if (image) {
            console.log("you");
            imageFileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: image,
            })
        } else {
            imageFileList = []
            console.log('meiyou');
        }
        console.log('save imageFileList::',imageFileList);
        return(
            <div className='AdSave'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '修改广告' : '添加广告'}</Breadcrumb.Item>
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
                                name="name" 
                                label="广告名称" 
                                rules={[{ 
                                    required: true ,
                                    message:'请输入广告名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="link" 
                                label="广告地址" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入广告地址'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="position" 
                                label="广告位置" 
                                rules={[{ 
                                    required: true ,
                                    message:'请选择广告位置'
                                }]}>
                                <Select
                                    placeholder="请选择广告位置"
                                    onChange={()=>{}}
                                    allowClear
                                >
                                    <Option key={0}>电脑端首页轮播图</Option>
                                    <Option key={1}>手机端首页轮播图</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                label='广告图片'
                                required={true}
                                {...imageValidata}
                            >
                                <UpLoadImages  
                                    max={1}
                                    getImageUrlLists={this.handleImage}
                                    fileList={imageFileList}
                                    active={AD_IMAGE_UPLOAD} //图片上传地址(写为变量直接在api中改变)
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

})
const mapDispatchToProps=(dispatch)=>({
    handleSave:(values)=>{
        dispatch(actionCreator.saveAction(values))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(AdSave)