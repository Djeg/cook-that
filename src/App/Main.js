import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BottomNav from './Component/BottomNav'
import { StateProvider } from './Context/StateContext'
import Home from './Home/Home'
import SignFrame from './SignFrame/SignFrame'
import SplashScreen from './SplashScreen/SplashScreen'

export default () => (
  <React.StrictMode>
    <BrowserRouter>
      <SplashScreen>
        <StateProvider>
          <SignFrame />
          <BottomNav />
          <Route exact path='/'>
            <Home />
          </Route>
        </StateProvider>
      </SplashScreen>
    </BrowserRouter>
  </React.StrictMode>
)
