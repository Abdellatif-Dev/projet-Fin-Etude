import React, { useEffect } from 'react'
import NavBar from './page/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Menu from './page/Menu'
import Dashboard from './page/Dashboard'
import ValiderPaiement from './page/ValiderPaiement'
import Detai from './page/Detai'
import Footer from './page/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "./Store/CreteSlice";
import DashboardClient from './page/DashboardClient'
import ShowRestaurant from './page/ShowRestaurant'
import DashboardAdmin from './page/DashboardAdmin'
export default function AppProject() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
    }
}, []);
  const user = useSelector(s => s.Tache.currentUser);
  console.log(user);
  
  return (
    <div>
      <NavBar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Menu' element={<Menu />}/>
        <Route path='/dashbord' element={<Dashboard/>}/>
        <Route path='/DashboardClient' element={<DashboardClient/>}/>
        <Route path='/DashboardAdmin' element={<DashboardAdmin/>}/>
        <Route path='/detai/:id' element={<Detai/>}/>
        <Route path='/showRestaurant/:id' element={<ShowRestaurant/>}/>
        <Route path='/Valide' element={<ValiderPaiement />}/>
        <Route path='/About' element={<h1>about us</h1>}/>
        <Route path='/*' element={<h1>page not fand</h1>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
