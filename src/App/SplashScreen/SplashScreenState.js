import { createSlice } from '@reduxjs/toolkit'
import * as R from 'ramda'

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
    activate: R.assoc('activated', true),
    desactivate: R.assoc('activated', false),
    toggleLoading: (state, action) => ({
      ...state,
      loading: undefined !== action.payload ? action.payload : !!state.loading,
    }),
    changeReason: (state, action) => R.assoc('reason', action.payload, state),
  },
})

export const selectActivated = R.path([name, 'activated'])
export const selectReason = R.path([name, 'reason'])
export const selectLoading = R.path([name, 'loading'])
export const selectSplashScreen = R.prop(name)

export const { activate, desactivate, changeReason, toggleLoading } =
  slice.actions

export default slice.reducer
