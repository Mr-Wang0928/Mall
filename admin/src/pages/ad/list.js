import React,{Component} from 'react'
import { Layout, Breadcrumb,Switch,Table ,Button,Image,InputNumber } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


import AdminLayout from 'components/custom-layout'
import { actionCreator } from './store'

const { Content } = Layout


class AdList extends Component{
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
            handleUpdateIsShow,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '广告名称',
                dataIndex: 'name',
                width:'20%',
            },
            {
                title: '广告位置',
                dataIndex: 'position',
                width:'20%',
            },
            {
                title: '广告缩略图',
                width:'15%',
                dataIndex: 'image',
                render:image=><Image width={50} src={image}/>
            },
            {
                title: '排序',
                dataIndex: 'order',
                width:'15%',
                render:(order,record)=><InputNumber 
                    defaultValue={order}
                    style={{width:'60%'}}
                    onBlur={ev=>{
                        if(ev.target.value!=order){
                            handleUpdateOrder(record._id,ev.target.value)
                        }
                    }}
                ></InputNumber>
            },
            {
                title: '是否显示',
                dataIndex: 'isShow',
                width:'15%',
                render:(isShow,record)=><Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                    checkedChildren="显示" 
                    unCheckedChildren="隐藏"  
                    checked={isShow=='1' ? true : false}
                    onChange={
                        checked=>{
                            const newIsShow = checked ? '1' : '0'
                            handleUpdateIsShow(record._id,newIsShow)
                        }
                    }
                />
            },
            {
                title: '操作',
                render:(text,record)=><NavLink to={'/ad/save/'+record._id} >修改</NavLink>
            },
            
        ]
        return(
            <div className='AdList'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>首页</Breadcrumb.Item>
                        <Breadcrumb.Item>广告管理</Breadcrumb.Item>
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
                            <NavLink to='./ad/save'>
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
    list:state.get('ad').get('list'),
    current:state.get('ad').get('current'),
    pageSize:state.get('ad').get('pageSize'),
    total:state.get('ad').get('total'),
    isLoading:state.get('ad').get('isLoading'),
})
const mapDispatchToProps=(dispatch)=>({
    handleList:(values)=>{
        dispatch(actionCreator.getListAction(values))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(actionCreator.getUpdateIsShowAction(id,newIsShow))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(AdList)
