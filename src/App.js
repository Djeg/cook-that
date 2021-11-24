import './App.css'
import React from 'react'
import BottomNav from './BottomNav'
import Content from './Content'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipeList from './RecipeList'

function App() {
  return (
    <BrowserRouter>
      <div>
        <BottomNav active='home' />
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
                <p>coucou</p>
              </Content>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
