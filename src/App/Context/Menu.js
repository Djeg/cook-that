import React, { useContext, useEffect, useState } from 'react'

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

export const MenuContext = React.createContext([MENU.HOME, () => null])

export const MenuProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(MENU.HOME)

  return (
    <MenuContext.Provider value={[activeMenu, setActiveMenu]}>
      {children}
    </MenuContext.Provider>
  )
}

export const useMenu = () => {
  const [activeMenu, setActiveMenu] = useContext(MenuContext)

  return [activeMenu, setActiveMenu]
}

export const useActiveMenu = menu => {
  const [activeMenu, setActiveMenu] = useContext(MenuContext)

  useEffect(() => {
    if (!Object.values(MENU).includes(menu)) {
      console.error(`The menu ${menu} does not exists.`)

      return
    }

    if (menu !== activeMenu) {
      setActiveMenu(menu)
    }
  }, [])
}
