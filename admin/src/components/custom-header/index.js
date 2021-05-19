import React,{Component} from 'react'

import { Layout, Menu ,Dropdown } from 'antd'
import { LogoutOutlined ,DownOutlined} from '@ant-design/icons'

import { getUsername,removeUsername,goLogin } from 'util'

import api from 'api'

import './index.less'

const { Header } = Layout



export default class CustomHeader extends Component{
    constructor(props){
        super(props)
        this.handleLogout=this.handleLogout.bind(this)
    }
    async handleLogout(){
        const result = await api.logout()
        console.log('result::::',result);
        removeUsername()
        goLogin()
    }
    render(){
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a href="#" onClick={this.handleLogout}>退出 <LogoutOutlined /></a>
                </Menu.Item>
            </Menu>
        )
        return(
            <div className='CustomHeader'>
                <Header className="header">
                    <div className="logo">SortMall</div>
                    <div className="logout">
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault() }>
                                {getUsername()} <DownOutlined />
                            </a>
                        </Dropdown>
                    </div>
                </Header>
            </div>
        )
    }
}
