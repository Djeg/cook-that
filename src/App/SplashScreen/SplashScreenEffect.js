import * as Eff from 'redux-saga/effects'
import * as State from './SplashScreenState'

function* startSplashScreenEffect() {
  yield Eff.put(State.toggleLoading(true))
  yield Eff.put(State.changeReason('Chargement des cargaisons fraiches ...'))
  yield Eff.delay(1000)
  yield Eff.put(State.changeReason('Préparation de la cuisine ...'))
  yield Eff.delay(2000)
  yield Eff.put(State.changeReason('Mise en place des tables ...'))
  yield Eff.delay(2000)
  yield Eff.put(State.changeReason('Vérification des menus ...'))
  yield Eff.delay(2000)
  yield Eff.put(State.toggleLoading(false))
  yield Eff.put(State.desactivate())
}

export default startSplashScreenEffect
