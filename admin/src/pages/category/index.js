import React,{Component} from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import CategoryList from './list'
import CategorySave from './save'


class Category extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/category/save/:categoryId?' component={CategorySave}/>
                <Route exact path='/category' component={CategoryList}/>
            </Switch>
            
        )
    }
}
export default Category