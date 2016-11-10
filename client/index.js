import React from 'react'
import ReactDOM, { render } from 'react-dom'
import {Router, browserHistory, Route, IndexRoute} from 'react-router'
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import ChatReducer from './reducers/ChatReducer'
import PrimaryChatroom from './src/app'
import SideBar from './src/sidebar.js'
import Test from './src/test.js'
import Test2 from './src/Test2.js'

const store = createStore(ChatReducer);

const rootRoute = {
  component: PrimaryChatroom,
  path: '/',
  indexRoute: {
    getComponent (location, cb) {
      require.ensure([], () => {
        cb(null, require('./src/app'))
      })
    }
  },
  childRoutes: [
    {
      component: SideBar,
      path: 'sidebar',
      getComponent (location, cb) {
        require.ensure([], () => {
          cb(null, require('./src/sidebar'))
        })
      }
    }
  ]
}


const appRender = () => ReactDOM.render(

  <Provider store={store}>
    <Router routes={rootRoute} history={browserHistory} />
  </Provider>
  , 
  document.getElementById('app')
)

appRender()
store.subscribe(appRender)


