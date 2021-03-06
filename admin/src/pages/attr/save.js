import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Button, Select} from 'antd';
import { connect } from 'react-redux'
import { actionCreator } from './store';

import AdminLayout from 'components/custom-layout'

import api from 'api'

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


class AttrSave extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.attrsId
        }
        this.formRef = React.createRef();
    }
    async componentDidMount(){
        if(this.state.id){
            const result = await api.getAttrDetailActive({id:this.state.id})
            const data = result.data
            console.log(data);
            this.formRef.current.setFieldsValue({
                key: data.key,
                name: data.name,
                value: data.value,
            })
        }
    }
    render(){
        const {handleSave} =this.props
        return(
            <div className='AttrSave'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.id ? '修改属性' : '添加属性'}</Breadcrumb.Item>
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
                            onFinish={(values)=>handleSave(values,this.state.id)}
                            ref={this.formRef}
                        >
                            <Form.Item 
                                name="name" 
                                label="属性名称" 
                                rules={[{ 
                                    required: true ,
                                    message:'请输入属性名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="key" 
                                label="属性键" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入属性键名称'
                                }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="value" 
                                label="属性值" 
                                rules={[{ 
                                    required: true,
                                    message:'请输入属性值'
                                }]}>
                                <Input />
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
    handleSave:(values,id)=>{
        dispatch(actionCreator.saveAction(values,id))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(AttrSave)