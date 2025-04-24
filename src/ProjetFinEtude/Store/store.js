
import { configureStore } from '@reduxjs/toolkit'
import TSlice from './CreteSlice'
export const Restaurants = configureStore({
  reducer: {
    Tache:TSlice.reducer
  },
})
