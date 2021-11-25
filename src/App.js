import './App.css'
import React, { useState } from 'react'
import BottomNav from './BottomNav'
import Content from './Content'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Counter from './Counter'
import RecipeList from './RecipeList'
import AddRecipe from './AddRecipe'

function App() {
  const [activeMenu, setActiveMenu] = useState('home')

  return (
    <BrowserRouter>
      <div>
        <BottomNav active={activeMenu} onMenuChange={setActiveMenu} />
        <Routes>
          <Route
            path='/'
            element={
              <Content title='Nos dernières recettes'>
                <RecipeList />
              </Content>
            }
          />
          <Route
            path='/ajouter-une-recette'
            element={
              <Content title='Ajouter une recette'>
                <AddRecipe />
              </Content>
            }
          />
          <Route
            path='/conteur'
            element={
              <Content title='Super conteur'>
                <Counter />
              </Content>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
