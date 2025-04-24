import React from 'react'
import NavBar from './page/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Menu from './page/Menu'
import Dashboard from './page/Dashboard'
import ValiderPaiement from './page/ValiderPaiement'
import Detai from './page/Detai'
import Footer from './page/Footer'

export default function AppProject() {
  return (
    <div>
      <NavBar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Menu' element={<Menu />}/>
        <Route path='/dashbord' element={<Dashboard/>}/>
        <Route path='/detai/:id' element={<Detai/>}/>
        <Route path='/Valide' element={<ValiderPaiement />}/>
        <Route path='/About' element={<h1>about us</h1>}/>
        <Route path='/*' element={<h1>page not fand</h1>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
