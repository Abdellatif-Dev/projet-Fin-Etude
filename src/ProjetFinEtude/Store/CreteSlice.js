import { createSlice } from "@reduxjs/toolkit";
import { menuData,Restaurants,Reviews,User } from "../data/data";

const initialState = {
    menuData: menuData,
    Restaurants:Restaurants,
    Reviews:Reviews,
    User:User,
    Commande:[]
  }
const TSlice=createSlice({
    name:'Taches',
    initialState,
    reducers:{
        addPlatToCommande: (state, action) => {
            const exist = state.Commande.find(item => item.id_Menu === action.payload.id_Menu);
            if (exist) {
              exist.quantity += 1;
            } else {
              state.Commande.push({ ...action.payload, quantity: 1 });
            }
          },
          increaseQuantity: (state, action) => {
            const item = state.Commande.find(cmd => cmd.id_Menu === action.payload);
            if (item) {
              item.quantity += 1;
            }
          },
          decreaseQuantity: (state, action) => {
            const item = state.Commande.find(cmd => cmd.id_Menu === action.payload);
            if (item && item.quantity > 1) {
              item.quantity -= 1;
            } else {
              state.Commande = state.Commande.filter(cmd => cmd.id_Menu !== action.payload);
            }
          },
          removePlatFromCommande: (state, action) => {
            state.Commande = state.Commande.filter(cmd => cmd.id_Menu !== action.payload);
          },
          clearCommande: (state) => {
            state.Commande = [];
          }
    }
})
export const {addPlatToCommande,increaseQuantity,decreaseQuantity,removePlatFromCommande,clearCommande} = TSlice.actions;
export default TSlice;