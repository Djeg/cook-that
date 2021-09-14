import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BottomNav from './Component/BottomNav'
import { MenuProvider } from './Context/Menu'
import Home from './Home/Home'
import SplashScreen from './SplashScreen/SplashScreen'

export default () => (
  <React.StrictMode>
    <BrowserRouter>
      <SplashScreen>
        <MenuProvider>
          <BottomNav />
          <Route exact path='/'>
            <Home />
          </Route>
        </MenuProvider>
      </SplashScreen>
    </BrowserRouter>
  </React.StrictMode>
)
