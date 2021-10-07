import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createStore, Provider, Render } from 'reactivr'
import * as SplashScreen from './SplashScreen/SplashScreen'

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Provider
          store={createStore({
            modules: [SplashScreen],
          })}
        >
          <Render state={SplashScreen}>
            <h1>Bienvenue</h1>
          </Render>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  )
}
