import React,{Component} from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import OrderList from './list'
import OrderDetail from './detail'


class Order extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/orders/detail/:ordersId?' component={OrderDetail}/>
                <Route exact path='/orders' component={OrderList}/>
            </Switch>
        )
    }
}
export default Order