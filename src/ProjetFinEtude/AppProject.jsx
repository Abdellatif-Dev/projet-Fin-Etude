import React, { useEffect, useState } from 'react'
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
import ProtectedRoute from './ProtectedRoute'
import AboutUs from './page/Aboutus'

export default function AppProject() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.Tache.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
    setLoading(false); // حتى لو ما فيه مستخدم، نكمل التحميل
  }, [dispatch]);

  if (loading) {
    return <p className='text-center text-xl p-10'>Chargement...</p>;
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Menu' element={<Menu />} />
        <Route path="/DashboardClient" element={
          <ProtectedRoute
            element={<DashboardClient />}
            isAuthenticated={!!user?.name}
            allowedRoles={["client"]}
            userRole={user?.role}
          />
        } />
        <Route path="/dashbord" element={
          <ProtectedRoute
            element={<Dashboard />}
            isAuthenticated={!!user?.name}
            allowedRoles={["restaurant"]}
            userRole={user?.role}
          />
        } />
        <Route path="/DashboardAdmin" element={
          <ProtectedRoute
            element={<DashboardAdmin />}
            isAuthenticated={!!user?.name}
            allowedRoles={["administrateur"]}
            userRole={user?.role}
          />
        } />
        <Route path="/Valide" element={
          <ProtectedRoute
            element={<ValiderPaiement />}
            isAuthenticated={!!user?.name}
            allowedRoles={["client"]}
            userRole={user?.role}
          />
        } />
        <Route path='/detai/:id' element={<Detai />} />
        <Route path='/showRestaurant/:id' element={<ShowRestaurant />} />
        <Route path='/About' element={<AboutUs/>} />
        <Route path='/*' element={<h1>Page non trouvée</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}
