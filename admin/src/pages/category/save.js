import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Button, Select} from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store';

import AdminLayout from 'components/custom-layout'
import UpLoadImages from 'components/upLoad-images'

import {CATEGORY_ICON_UPLOAD} from 'api/config'
import api from 'api'
import { values } from 'regenerator-runtime';

const { Content } = Layout
const { Option } = Select;

const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 8,
    },
  };
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 0,
    },
};


class CategorySave extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.categoryId,
            icon:'',
            iconValidata:{
                help:'',
                validateStatus:''
            }
        }
        this.formRef = React.createRef()
        this.handleIcon = this.handleIcon.bind(this)
        this.handleFinish = this.handleFinish.bind(this)
        this.handleValidata = this.handleValidata.bind(this)
    }
    handleIcon(icon){
        this.setState({
            icon:icon,
            iconValidata:{
                help:'',
                validateStatus:''
            }
        })
    }
    handleFinish(values){
        const {icon,id} =this.state
        this.handleValidata()
        if(icon){
            values.id=id
            values.icon=icon
            this.props.handleSave(values)
        }
    }
    handleValidata(){
        const {icon} =this.state
        if(!icon){
            this.setState({
                icon:'',
                iconValidata:{
                    help:'请上传封面图片',
                    validateStatus:'error'
                }
            })
        }
    }
    async componentDidMount(){
        this.props.handleLeveCategories()
        if(this.state.id){
            const result = await api.getCategoryDetailActive({id:this.state.id})
            const data = result.data
            
            this.formRef.current.setFieldsValue({
                pid: data.pid,
                name: data.name,
                mobileName: data.mobileName,
            })
            this.setState({
                icon:data.icon
            })
            // this.props.handleSetIcon(data.icon)
        }else{
            this.setState({
                icon:''
            })
            // this.props.handleSetIcon('')
        }
        
    }
    render(){
        
        const {levelCategories} =this.props
        console.log('levelCategories',levelCategories);
        const options = levelCategories.map(category=><Option key={category._id} value={category._id}>{category.name}</Option>)
        const { icon ,iconValidata} = this.state
        let fileList = []
        if (icon) {
            fileList.push({
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: icon,
            })
        } else {
            fileList = []
        }
        return(
            <div className='CategorySave'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '修改分类' : '添加分类'}</Breadcrumb.Item>
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
                            onFinish={this.handleFinish}
                            onFinishFailed={this.handleValidata}
                            ref={this.formRef}
                        >
                            <Form.Item 
                                name="pid" 
                                label="父级分类" 
                                rules={[{ 
                                    required: true ,
                                    message:'请选择分类名称'
                                }]}>
                                <Select
                                    placeholder="请选择分类名称"
                                    onChange={()=>{}}
                                    allowClear
                                >
                                <Option value="0">根目录</Option>
                                {options}
                                </Select>
                            </Form.Item>
                            
                            <Form.Item 
                                name="name" 
                                label="分类名称" 
                                rules={[{ 
                                    required: true ,
                                    message:'请输入分类名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="mobileName" 
                                label="手机分类名称" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入手机分类名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                label='手机分类图标'
                                required={true}
                                {...iconValidata}
                            >
                                <UpLoadImages  /*上传图片的组件 */
                                    getImageUrlLists={this.handleIcon} 
                                    fileList={fileList}
                                    max={2}
                                    active={CATEGORY_ICON_UPLOAD} //图片上传地址(写为变量直接在api中改变)
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
    levelCategories:state.get('category').get('levelCategories'),
})
const mapDispatchToProps=(dispatch)=>({
    // handleSetIcon:(icon)=>{
    //     dispatch(actionCreator.getSetIconAction(icon))
    // },
    handleSave:(values)=>{
        
        dispatch(actionCreator.saveAction(values))
    },
    handleLeveCategories:()=>{
        dispatch(actionCreator.LeveCategoriesAction())
    },
    // handleValidata:()=>{
    //     dispatch(actionCreator.ValidataAction())
    // },
})
export default connect(mapStateToProps,mapDispatchToProps)(CategorySave)