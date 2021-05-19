import React,{Component} from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import AdList from './list'
import AdSave from './save'


class Ad extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/ad/save/:adId?' component={AdSave}/>
                <Route exact path='/ad' component={AdList}/>
            </Switch>
            
        )
    }
}
export default Ad