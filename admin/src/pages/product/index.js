import React,{Component} from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import ProductList from './list'
import ProductSave from './save'
import ProductDetail from './detail'


class Product extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/products/save/:productsId?' component={ProductSave}/>
                <Route exact path='/products/detail/:detailId?' component={ProductDetail}/>
                <Route exact path='/products' component={ProductList}/>
            </Switch>
            
        )
    }
}
export default Product