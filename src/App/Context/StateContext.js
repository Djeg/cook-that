import React, { useContext, useEffect, useReducer } from 'react'
import { action, createRootReducer } from '../Util/Function'
import * as R from 'ramda'

// STATE

export const MENU = {
  HOME: 'home',
  NEW_RECIPE: 'plus-square',
  NONE: 'none',
  FAVORITES: 'heart',
  PROFILE: 'user',
}

export const MENU_ROUTE = {
  HOME: '/',
  NEW_RECIPE: '/nouvelle-recette',
  NONE: '/',
  FAVORITES: '/mes-favories',
  PROFILE: '/mon-profile',
}

export const SIGN_FRAME_STEP = {
  login: 'login',
  subscribe: 'subscribe',
  welcome: 'welcome',
}

export const STATE = {
  menu: {
    active: MENU.HOME,
  },
  signFrame: {
    open: false,
    step: SIGN_FRAME_STEP.login,
  },
  user: {
    uuid: null,
    email: null,
    isConnected: false,
  },
}

// ACTION

export const changeMenu = action({
  slice: 'menu',
  name: 'changeMenu',
  reducer: ({ payload }) => R.assoc('active', payload),
})

export const openSignFrame = action({
  slice: 'signFrame',
  name: 'open',
  reducer: () => R.assoc('open', true),
})

export const closeSignFrame = action({
  slice: 'signFrame',
  name: 'close',
  reducer: () => R.assoc('open', false),
})

export const logInUser = action({
  slice: 'user',
  name: 'logIn',
  reducer: ({ payload: { uuid, email } }) =>
    R.pipe(
      R.assoc('email', email),
      R.assoc('uuid', uuid),
      R.assoc('isConnected', true),
    ),
})

export const logOutUser = action({
  slice: 'user',
  name: 'logOut',
  reducer: () => R.always(STATE.user),
})

export const reducer = createRootReducer([
  changeMenu,
  openSignFrame,
  closeSignFrame,
  logInUser,
  logOutUser,
])

// HOOKS

export const StateContext = React.createContext([STATE, () => STATE])

export const useDispatch = () => {
  const [state, dispatch] = useContext(StateContext)

  return dispatch
}

export const useStateSlice = slice => {
  const [state] = useContext(StateContext)

  return R.path(slice.split('.'), state)
}

export const useMenu = () => {
  const menu = useStateSlice('menu')

  return menu
}

export const useActiveMenu = menu => {
  const activeMenu = useStateSlice('menu.active')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!Object.values(MENU).includes(menu)) {
      console.error(`The menu ${menu} does not exists.`)

      return
    }

    if (menu !== activeMenu) {
      dispatch(changeMenu(menu))
    }
  }, [])
}

// CONTEXT

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, STATE)

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}
