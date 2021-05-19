import React,{Component} from 'react'
import { BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import AttrList from './list'
import AttrSave from './save'


class Attr extends Component{
    render(){
        return(
            <Switch>
                <Route exact path='/attrs/save/:attrsId?' component={AttrSave}/>
                <Route exact path='/attrs' component={AttrList}/>
            </Switch>
            
        )
    }
}
export default Attr