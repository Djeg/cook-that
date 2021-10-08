import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { createStore, Provider, Render } from 'reactivr'
import * as SplashScreen from './SplashScreen/SplashScreen'
import * as BottomNav from './BottomNav/BottomNav'
import * as Home from './Home/Home'
import * as SignIn from './SignFrame/SignIn'
import * as SignUp from './SignFrame/SignUp'
import * as SignFrame from './SignFrame/SignFrame'
import * as Welcome from './SignFrame/Welcome'

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider
          store={createStore({
            modules: [
              SplashScreen,
              BottomNav,
              Home,
              SignIn,
              SignFrame,
              SignUp,
              Welcome,
            ],
          })}
        >
          <Render state={SplashScreen}>
            <Render state={SignFrame} />
            <Route path='/' exact strict>
              <Render state={Home} />
            </Route>
            <Render state={BottomNav} />
          </Render>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
