import { configureStore } from '@reduxjs/toolkit'
import SplashScreenState from './SplashScreen/SplashScreenState'
import createSagaMiddleware from '@redux-saga/core'
import * as Eff from 'redux-saga/effects'
import startSplashScreenEffect from './SplashScreen/SplashScreenEffect'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    SplashScreen: SplashScreenState,
  },
  middleware: [sagaMiddleware],
})

function* rootSaga() {
  yield Eff.fork(startSplashScreenEffect)
}

sagaMiddleware.run(rootSaga)

export default store
