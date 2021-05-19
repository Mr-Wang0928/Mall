import React,{Component} from 'react'
import { Layout, Breadcrumb,Card, Col, Row  } from 'antd'
import { connect } from 'react-redux'

import AdminLayout from 'components/custom-layout'

import { actionCreator } from './store';
import './index.less'

const { Content } = Layout


class Home extends Component{
    componentDidMount() {
        this.props.handleCounts()
    }
    render(){
        const {usernum,ordernum,productnum} = this.props
        return(
            <div className='Home'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 570,
                        }}
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Card title="用户数" bordered={false}>
                                    {usernum}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="订单数" bordered={false}>
                                {ordernum}
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card title="产品数" bordered={false}>
                                {productnum}
                                </Card>
                            </Col>
                        </Row>
                    </Content>
                </AdminLayout>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    usernum:state.get('home').get('usernum'),
    ordernum:state.get('home').get('ordernum'),
    productnum:state.get('home').get('productnum')

})
const mapDispatchToProps=(dispatch)=>({
    handleCounts:(values)=>{
        dispatch(actionCreator.getCountsAction(values))
    } 
})
export default connect(mapStateToProps,mapDispatchToProps)(Home)
