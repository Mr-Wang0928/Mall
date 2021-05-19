import React,{ Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App.js'

import store from './store/index.js'



/* 
*1.在Provider 组件中指定 store
*2.用Provider 组件包裹应用的顶层组件，这样整个应用的所有组件的可以使用store
*/
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))