import React,{Component} from 'react'
import { Layout, Breadcrumb,Switch,Table ,Button,Input,InputNumber,Image } from 'antd'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


import AdminLayout from 'components/custom-layout'
import { actionCreator } from './store'

const { Content } = Layout


class CategoryList extends Component{
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
            handleUpdateName,
            handleUpdateMobileName,
            handleUpdateIsShow,
            handleUpdateIsFloor,
            handleUpdateOrder,
        } = this.props
        const dataSource = list
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                width:'20%',
                render:(name,record)=><Input //name和record两个参数位置不能写反，数分别为当前行的值，当前行数据
                    defaultValue={name}
                    style={{width:'60%'}}
                    onBlur={ev=>{
                        if(ev.target.value!=name){
                            handleUpdateName(record._id,ev.target.value)
                        }
                    }}
                ></Input>
            },
            {
                title: '手机分类名称',
                dataIndex: 'mobileName',
                width:'20%',
                render:(mobileName,record)=><Input //name和record两个参数位置不能写反，数分别为当前行的值，当前行数据
                    defaultValue={mobileName}
                    style={{width:'60%'}}
                    onBlur={ev=>{
                        if(ev.target.value!=mobileName){
                            handleUpdateMobileName(record._id,ev.target.value)
                        }
                    }}
                ></Input>
                
            },
            {
                title: '手机图标',
                dataIndex: 'icon',
                render:icon=><Image width={60} src={icon}/>
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
                title: '是否显示楼层',
                dataIndex: 'isFloor',
                width:'15%',
                render:(isFloor,record)=>{
                    return record.level == '1' ?
                    <Switch //(record._id)是用来向后台传参数，确定修改的哪一行参数
                        checkedChildren="显示" 
                        unCheckedChildren="隐藏"  
                        checked={isFloor=='1' ? true : false}
                        onChange={
                            checked=>{
                                const newIsFloor = checked ? '1' : '0'
                                handleUpdateIsFloor(record._id,newIsFloor)
                            }
                        }
                    /> : null
                }
                
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
                title: '操作',
                render:(text,record)=><NavLink to={'/category/save/'+record._id} >修改</NavLink>
            },
            
        ]
        return(
            <div className='CategoryList'>
                <AdminLayout>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>分类管理</Breadcrumb.Item>
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
                            <NavLink to='./category/save'>
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
    list:state.get('category').get('list'),
    current:state.get('category').get('current'),
    pageSize:state.get('category').get('pageSize'),
    total:state.get('category').get('total'),
    isLoading:state.get('category').get('isLoading'),
})
const mapDispatchToProps=(dispatch)=>({
    handleList:(values)=>{
        dispatch(actionCreator.getCategoryListAction(values))
    },
    handleUpdateName:(id,newName)=>{
        dispatch(actionCreator.getUpdateNameActive(id,newName))
    },
    handleUpdateMobileName:(id,newName)=>{
        dispatch(actionCreator.getUpdateMobileNameAction(id,newName))
    },
    handleUpdateIsShow:(id,newIsShow)=>{
        dispatch(actionCreator.getUpdateIsShowAction(id,newIsShow))
    },
    handleUpdateIsFloor:(id,newIsFloor)=>{
        dispatch(actionCreator.getUpdateIsFloorAction(id,newIsFloor))
    },
    handleUpdateOrder:(id,newOrder)=>{
        dispatch(actionCreator.getUpdateOrderAction(id,newOrder))
    },
})
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)
