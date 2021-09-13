import { createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'
import { fredux } from '../Util/Function'

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
    activate: fredux(() => R.assoc('activated', true)),

    desactivate: fredux(() => R.assoc('activated', false)),

    toggleLoading: fredux(({ payload }) =>
      R.evolve({
        loading: value => (payload ? !!payload : !value),
      }),
    ),

    changeReason: fredux(({ payload }) => R.assoc('reason', payload)),
  },
})

export const selectActivated = R.path([name, 'activated'])
export const selectReason = R.path([name, 'reason'])
export const selectLoading = R.path([name, 'loading'])
export const selectSplashScreen = R.prop(name)

export const { activate, desactivate, changeReason, toggleLoading } =
  slice.actions

export default slice.reducer
