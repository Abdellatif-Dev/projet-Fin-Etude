
import { configureStore } from '@reduxjs/toolkit'
import TSlice,  { fetchUsers, fetchMenuData } from './CreteSlice'
export const Restaurants = configureStore({
  reducer: {
    Tache:TSlice.reducer
  },
})

Restaurants.dispatch(fetchUsers());
Restaurants.dispatch(fetchMenuData());