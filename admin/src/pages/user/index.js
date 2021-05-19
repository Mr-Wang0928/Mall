import React,{Component} from 'react'
import { Layout, Breadcrumb,Table,Switch } from 'antd'
import { connect } from 'react-redux'

import AdminLayout from 'components/custom-layout'

import { actionCreator } from './store';
import { getCreatedAt } from 'util';


const { Content } = Layout


class User extends Component{
    componentDidMount() {
        this.props.handleList()
    }
    render(){
        // const dataSource = [
        //     {
        //       key: '1',
        //       username: '胡彦斌',
        //       isAdmin: '0',
        //       isActive: '1',
        //       email:'1111@qq.com',
        //       phone:'1232321321',
        //       timestamps:'2020-12-10'

        //     },
        //];
        const { list,current,pageSize,total,handleList ,isLoading,handleUpdateIsActive} = this.props
        const dataSource = list
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '是否管理员',
                dataIndex: 'isAdmin',
                key: 'isAdmin',
                render: isAdmin => isAdmin ? '是' : '否',
            },
            {
                title: '是否有效用户',
                dataIndex: 'isActive',
                key: 'isActive',
                render:(isActive,record)=><Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                    checkedChildren="开启" 
                    unCheckedChildren="关闭"  
                    checked={isActive=='1' ? true : false}
                    onChange={
                        checked=>{
                            const newActive = checked ? '1' : '0'
                            handleUpdateIsActive(record._id,newActive)
                        }
                    }
                />
            },
            {
                title: 'email',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '电话',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render:createdAt => getCreatedAt(createdAt)
            },
        ]
        
        return(
            <div className='Home'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 570,
                        }}
                    >
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
    list:state.get('user').get('list'),
    current:state.get('user').get('current'),
    pageSize:state.get('user').get('pageSize'),
    total:state.get('user').get('total'),
    isLoading:state.get('user').get('isLoading'),
})
const mapDispatchToProps=(dispatch)=>({
    handleList:(values)=>{
        dispatch(actionCreator.getUserListAction(values))
    },
    handleUpdateIsActive:(id,isActive)=>{
        dispatch(actionCreator.getUpdateIsActive(id,isActive))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(User)
