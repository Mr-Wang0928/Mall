import React,{Component} from 'react'
import { Layout, Breadcrumb,Form, Input, Button, message} from 'antd';
import AdminLayout from 'components/custom-layout'
import api from 'api'

const { Content } = Layout
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


class Pwd extends Component{
    constructor(props){
        super(props)
        this.state={
            pwdValidata:{
                help:'',
                validateStatus:''
            }
        }
        this.handleFinish = this.handleFinish.bind(this)
    }
    async handleFinish(values){
       const {password,rePassword} = values
       if(password !=rePassword){
           this.setState({
                pwdValidata:{
                    help:'两次输入密码不一致',
                    validateStatus:'error'
                }
           })
       }else{
            this.setState({
                pwdValidata:{
                    help:'',
                    validateStatus:''
                }
            })
            const result = await api.updatePwd({password})
            if(result.code==0){
                message.success('密码修改成功',1)
            }
       }
    }
    render(){
        const {pwdValidata} = this.state
        return(
            <div className='Pwd'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>修改密码</Breadcrumb.Item>
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
                        >
                            <Form.Item 
                                name="password" 
                                label="新密码" 
                                rules={[
                                    {
                                        required: true,
                                        message:'请输入新密码'
                                    }
                                    ,{
                                        pattern:/^[a-z0-9]{4,8}$/i,
                                        message: '4-8位任意字符',
                                    }
                                ]}
                            >
                                <Input.Password placeholder="请输入新密码" />
                            </Form.Item>

                            <Form.Item 
                                name="rePassword" 
                                label="确认新密码" 
                                required={true}
                                {...pwdValidata}

                            >
                                <Input.Password placeholder="请输入新密码" />
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
export default Pwd