import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { menuData, Restaurants, Reviews, User } from "../data/data";
import axios from "axios";

export const fetchMenuData = createAsyncThunk(
  'Taches/fetchMenuData',
  async () => {
    const response = await axios.get("http://localhost:8000/api/menu");
    return response.data;
  }
);
export const fetchUsers = createAsyncThunk(
  'Taches/fetchUsers',
  async () => {
    const response = await axios.get("http://localhost:8000/api/users");
    return response.data;
  }
);

const initialState = {
  menuData: [],
  User: [],
  currentUser: null,
  Commande: [],
  loading: false,
  error: null
}
const TSlice = createSlice({
  name: 'Taches',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addPlatToCommande: (state, action) => {
      const exist = state.Commande.find(item => item.id === action.payload.id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.Commande.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.Commande.find(cmd => cmd.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.Commande.find(cmd => cmd.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.Commande = state.Commande.filter(cmd => cmd.id !== action.payload);
      }
    },
    removePlatFromCommande: (state, action) => {
      state.Commande = state.Commande.filter(cmd => cmd.id !== action.payload);
    },
    clearCommande: (state) => {
      state.Commande = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuData.fulfilled, (state, action) => {
        state.loading = false;
        state.menuData = action.payload;
      })
      .addCase(fetchMenuData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.User = action.payload;
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
}
})
export const { addPlatToCommande, increaseQuantity, decreaseQuantity, removePlatFromCommande, clearCommande, setUser } = TSlice.actions;
export default TSlice;