import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import BottomNav from './Component/BottomNav'
import { StateProvider, MENU_ROUTE } from './Context/StateContext'
import Home from './Home/Home'
import SignFrame from './SignFrame/SignFrame'
import SplashScreen from './SplashScreen/SplashScreen'
import NewRecipe from './NewRecipe/NewRecipe'
import Firewall from './Component/Firewall'

export default () => (
  <React.StrictMode>
    <BrowserRouter>
      <StateProvider>
        <SplashScreen>
          <SignFrame />
          <BottomNav />
          <Route exact path={MENU_ROUTE.HOME}>
            <Home />
          </Route>
          <Route exact path={MENU_ROUTE.NEW_RECIPE}>
            <Firewall>
              <NewRecipe />
            </Firewall>
          </Route>
        </SplashScreen>
      </StateProvider>
    </BrowserRouter>
  </React.StrictMode>
)
