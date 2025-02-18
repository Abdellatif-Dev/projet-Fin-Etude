import React from 'react'
import NavBar from './page/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Menu from './page/Menu'

export default function AppProject() {
  return (
    <div>
      <NavBar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/About' element={<h1>about us</h1>}/>
        <Route path='/Login' element={<h1>login</h1>}/>
        <Route path='/*' element={<h1>page not fand</h1>}/>
      </Routes>
    </div>
  )
}
