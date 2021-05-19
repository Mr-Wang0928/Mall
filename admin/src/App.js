import React,{ Component } from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'

import {getUsername} from 'util'
import Login from 'pages/login'
import Home from 'pages/home'
import User from 'pages/user'
import Category from 'pages/category'
import Attr from 'pages/attr'
import Product from 'pages/product'
import Order from 'pages/order'
import Ad from 'pages/ad'
import Pwd from 'pages/pwd'
import NotFound from 'pages/notfound'

import 'pages/login/index.less'

const ProtectRoute = ({component:Component,...rest})=> 
        <Route 
            {...rest} 
            render={
                ()=>(getUsername() ? <Component /> : <Redirect to='login' />) 
            }
        />

const LoginRoute = ({component:Component,...rest})=> 
<Route 
    {...rest} 
    render={
        ()=>(getUsername() ? <Redirect to='/' /> : <Component /> ) 
    }
/>

class App extends Component{
    render(){
        
        return (
            <Router>
                <div className='App'>
                    <Switch>
                        <ProtectRoute exact path='/' component={Home}/>
                        <LoginRoute exact path='/login' component={Login}/>
                        <Route path='/user' component={User}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/attrs' component={Attr}/>
                        <Route path='/products' component={Product}/>
                        <Route path='/orders' component={Order}/>
                        <Route path='/ad' component={Ad}/>
                        <Route path='/pwd' component={Pwd}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}


export default  App