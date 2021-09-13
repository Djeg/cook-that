import { createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { makeReducer } from '../Util/Function'

const name = 'SplashScreen'

const initialState = {
  activated: true,
  reason: 'Chargement en cours...',
  loading: false,
}

const slice = createSlice({
  name,
  initialState,
  reducers: {
    activate: makeReducer(() => R.assoc('activated', true)),

    desactivate: makeReducer(() => R.assoc('activated', false)),

    toggleLoading: makeReducer(({ payload }) =>
      R.evolve({
        loading: value => (payload ? !!payload : !value),
      }),
    ),

    changeReason: makeReducer(({ payload }) => R.assoc('reason', payload)),
  },
})

export const selectActivated = R.path([name, 'activated'])
export const selectReason = R.path([name, 'reason'])
export const selectLoading = R.path([name, 'loading'])
export const selectSplashScreen = R.prop(name)

export const { activate, desactivate, changeReason, toggleLoading } =
  slice.actions

export default slice.reducer
