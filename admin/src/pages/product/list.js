import React,{Component} from 'react'
import { Layout, Breadcrumb,Table ,Button,InputNumber,Switch, Divider,Input} from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const { Search } = Input
import AdminLayout from 'components/custom-layout'
import { actionCreator } from './store'

const { Content } = Layout


class ProductList extends Component{
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
            keyword,
            handleUpdateIsShow,
            handleUpdateStatus,
            handleUpdateIsHot,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                ellipsis:true,
                render:(name)=>{
                    if(keyword){
                        //搜索关键词高亮处理
                        const reg = new RegExp('('+keyword+')','ig')
                        const html = name.replace(reg,'<b style="color:red">$1</b>')
                        return <span dangerouslySetInnerHTML={{__html:html}}></span>
                    }
                    else{
                        return name
                    }
                }
            },
            {
                title: '是否显示在首页',
                dataIndex: 'isShow',
                width:'15%',
                render:(isShow,record)=><Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                    checkedChildren="是" 
                    unCheckedChildren="否"  
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
                title: '上架/下架',
                dataIndex: 'status',
                width:'10%',
                render:(status,record)=><Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                    checkedChildren="上架" 
                    unCheckedChildren="下架"  
                    checked={status=='1' ? true : false}
                    onChange={
                        checked=>{
                            const newStatus = checked ? '1' : '0'
                            handleUpdateStatus(record._id,newStatus)
                        }
                    }
                />
            },
            {
                title: '是否热卖',
                dataIndex: 'isHot',
                width:'10%',
                render:(isHot,record)=><Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                    checkedChildren="是" 
                    unCheckedChildren="否"  
                    checked={isHot=='1' ? true : false}
                    onChange={
                        checked=>{
                            const newIsHot = checked ? '1' : '0'
                            handleUpdateIsHot(record._id,newIsHot)
                        }
                    }
                />
            },
            {
                title: '排序',
                dataIndex: 'order',
                width:'10%',
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
                width:'15%',
                render:(text,record)=>
                <span>
                    <NavLink to={'/products/save/'+record._id} >修改</NavLink>
                    <Divider type="vertical" />
                    <NavLink to={'/products/detail/'+record._id} >查看</NavLink>
                </span>
                

            },
            
        ]
        return(
            <div className='ProductList'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>商品管理</Breadcrumb.Item>
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
                            marginBottom:'20px'
                        }}>
                            <Search
                                placeholder="请输入搜索关键词"
                                allowClear
                                enterButton="Search"
                                style={{width:400}}
                                onSearch={(values)=>{handleList(1,values)}}
                            />
                            
                            <NavLink to='/products/save'>
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
                                    handleList(pagination.current,keyword)
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
    list:state.get('product').get('list'),
    current:state.get('product').get('current'),
    pageSize:state.get('product').get('pageSize'),
    total:state.get('product').get('total'),
    isLoading:state.get('product').get('isLoading'),
    keyword:state.get('product').get('keyword'),
})
const mapDispatchToProps=(dispatch)=>({
    handleList:(page,keyword)=>{
        dispatch(actionCreator.getProductListAction(page,keyword))
    },
    handleUpdateIsShow:(id,newShow)=>{
        dispatch(actionCreator.getUpdateIsShowAction(id,newShow))
    },
    handleUpdateStatus:(id,newStatus)=>{
        dispatch(actionCreator.getUpdateStatusAction(id,newStatus))
    },
    handleUpdateIsHot:(id,newHot)=>{
        dispatch(actionCreator.getUpdateIsHotAction(id,newHot))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
