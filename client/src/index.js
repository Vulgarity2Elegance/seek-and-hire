import React from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from "react-redux"
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Login from "./container/Login"
import Register from "./container/Register"
import reducers from "./reducer"
import "./config"
import 'antd-mobile/dist/antd-mobile.css'
import AuthRoute from './components/AuthRoute/AuthRoute'
import HirerInfo from './container/HirerInfo'
import SeekerInfo from './container/SeekerInfo'
import Dashboard from './components/Dashboard'
import Chat from './components/Chat'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute/>
        <Switch>
          <Route path='/seekerinfo' component={SeekerInfo} />
          <Route path='/hirerinfo' component={HirerInfo} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/chat/:user' component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>), 
  document.getElementById('root')
)
