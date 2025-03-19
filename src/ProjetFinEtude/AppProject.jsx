import React, { useState } from 'react'
import NavBar from './page/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Menu from './page/Menu'
import Dashboard from './page/Dashboard'
import ValiderPaiement from './page/ValiderPaiement'

export default function AppProject() {
  const [tableC,setTable]=useState([])
  const Command=(x)=>{
      setTable(x)
  }
  return (
    <div>
      <NavBar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Menu' element={<Menu tabComm={Command}/>}/>
        <Route path='/dashbord' element={<Dashboard/>}/>
        <Route path='/Valide' element={<ValiderPaiement TabComm={tableC}/>}/>
        <Route path='/About' element={<h1>about us</h1>}/>
        <Route path='/Login' element={<h1>login</h1>}/>
        <Route path='/*' element={<h1>page not fand</h1>}/>
      </Routes>
    </div>
  )
}
