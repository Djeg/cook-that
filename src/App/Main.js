import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import BottomNav from './Component/BottomNav'
import SplashScreen from './SplashScreen/SplashScreen'
import Store from './Store'

export default () => (
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <SplashScreen>
          <BottomNav />
          <Route exact path='/'>
            <h1>Welcome</h1>
          </Route>
        </SplashScreen>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
