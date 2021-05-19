import React,{Component} from 'react'
import { Layout, Breadcrumb,Table ,Button,InputNumber,Input} from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


import AdminLayout from 'components/custom-layout'
import { actionCreator } from './store'

const { Content } = Layout


class AttrList extends Component{
    componentDidMount() {
        this.props.handleList()
    }
    render(){
        const { 
            list,
            current,
            pageSize,
            total,
            handleList ,
            isLoading,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '属性键',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: '属性值',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: '排序',
                dataIndex: 'order',
                key: 'order',
                render:(order,record)=><InputNumber 
                    defaultValue={order}
                    onBlur={ev=>{
                        if(ev.target.value!=order){
                            handleUpdateOrder(record._id,ev.target.value)
                        }
                    }}
                ></InputNumber>
            },
            {
                title: '操作',
                render:(text,record)=><NavLink to={'/attrs/save/'+record._id} >修改</NavLink>
            },
            
        ]
        return(
            <div className='AttrList'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>属性管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 570,
                        }}
                    >
                        <div style={{
                            display:'flex',
                            justifyContent:'space-between',
                            marginBottom:'20px',
                            flexDirection:'row-reverse'
                        }}>
                            <NavLink to='/attrs/save'>
                                <Button type="primary" >新增</Button>
                            </NavLink>
                        </div>
                        <Table rowKey='_id' 
                            dataSource={dataSource} 
                            columns={columns} 
                            pagination={
                                {
                                    current,
                                    pageSize,
                                    total,
                                    showSizeChanger:false
                                }
                            }
                            onChange={
                                (pagination)=>{
                                    handleList(pagination.current)
                                }
                            }
                            loading={
                                {
                                    spinning:isLoading,
                                    tip:'数据正在加载'
                                }

                            }
                        />
                    </Content>
                </AdminLayout>
            </div>
        )
    }
}
const mapStateToProps=(state)=>({
    list:state.get('attr').get('list'),
    current:state.get('attr').get('current'),
    pageSize:state.get('attr').get('pageSize'),
    total:state.get('attr').get('total'),
    isLoading:state.get('attr').get('isLoading'),
})
const mapDispatchToProps=(dispatch)=>({
    handleList:(values)=>{
        dispatch(actionCreator.getAttrListAction(values))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(AttrList)
