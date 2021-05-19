import React,{Component} from 'react'
import { Form, Input, Button, Row,Col,Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreator } from './store';

class Login extends Component{
    constructor(props){
        super(props)
        // this.state = {
        //     captcha:''
        // }
        // this.getCaptcha=this.getCaptcha.bind(this)
    }

    // onFinish(values){
    //     this.props.handleLogin(values)
    // }
    // async getCaptcha(){
    //     const result = await axios({
    //         method:'get',
    //         url:'/users/captcha',
    //     })
    //     if(result.data.code == 0){
    //         this.setState({
    //             captcha:result.data.data
    //         })
    //     }
    // }
    componentDidMount (){
        this.props.handleCaptch()
    }
    render(){
        const { handleLogin,isLoading,handleCaptch,captcha} =this.props
        return(
            <div className='Login'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={handleLogin} //代替上边onFinish方法
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            },
                        ]}
                    >
                        <Input 
                            prefix={<UserOutlined className="site-form-item-icon" />} 
                            placeholder="用户名" 
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    

                    <Form.Item  extra="">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[
                                        {
                                            required: true,
                                            message: '请填写验证码!',
                                        }
                                        ,{
                                            pattern:/^[a-z0-9]{4}$/i,
                                            message: '验证码格式错误!',
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="验证码"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <div onClick={handleCaptch} className='captcha' dangerouslySetInnerHTML={{__html:captcha}}></div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    isLoading:state.get('login').get('isLoading'),
    captcha:state.get('login').get('captcha')
})
const mapDispatchToProps = (dispatch)=>({
    handleLogin:(values)=>{
        dispatch(actionCreator.getLoginItemAction(values))
    },
    handleCaptch:(values)=>{
        dispatch(actionCreator.getLoginCaptchaAction(values))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Login)
