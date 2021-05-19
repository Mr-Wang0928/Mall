import React,{Component} from 'react'

import { Layout } from 'antd'
import CustomHeader from 'components/custom-header'
import CustomSider from 'components/custom-sider'

export default class CustomHome extends Component{
    render(){
        return(
            <div className='Home'>
                <Layout>
                    <CustomHeader />
                    <Layout>
                        <CustomSider />
                        <Layout style={{ padding: '0 24px 24px' }}>
                            {this.props.children} {/*引入的pages中父组件home中内容*/}
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
