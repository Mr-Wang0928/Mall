import React,{Component} from 'react'

import { Layout, Menu,  } from 'antd'
import { HomeOutlined,UserOutlined, OrderedListOutlined,SlidersOutlined,ShoppingOutlined,MoneyCollectOutlined,NotificationOutlined,LockOutlined} from '@ant-design/icons'
import { NavLink,Link } from 'react-router-dom'

import './index.less'

const { Sider } = Layout

export default class CustomSider extends Component{
    constructor(props){
        super(props)
        this.onActive=this.onActive.bind(this)
    }
    onActive(){
        console.log('aa');
        this.className='ant-menu-item-selected'
    }
    render(){
        return(
            <div className='CustomSider'>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        style={{ minHeight: 650, borderRight: 0 }}
                    >
                        <Menu.Item key="1">
                            <NavLink exact to='/' ><HomeOutlined />首页</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to='/user'><UserOutlined />用户管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink  to='/category'><OrderedListOutlined />分类管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink  to='/attrs'><SlidersOutlined /> 属性管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink  to='/products'><ShoppingOutlined /> 商品管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="6">
                            <NavLink  to='/orders'><MoneyCollectOutlined /> 订单管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="7">
                            <NavLink  to='/ad'><NotificationOutlined /> 广告管理</NavLink>    
                        </Menu.Item>
                        <Menu.Item key="8">
                            <NavLink  to='/pwd'><LockOutlined /> 密码管理</NavLink>    
                        </Menu.Item>
                    </Menu>
                </Sider>
            </div>
        )
    }
}
