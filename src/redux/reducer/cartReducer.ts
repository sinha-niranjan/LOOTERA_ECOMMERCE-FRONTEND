import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cartReducerInitialState } from "../../types/reducer-types";
import { CartItem } from "../../types/types";

const initialState: cartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  ShippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );
      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },
    calculatePrice: (state) => {
      // let subtotal = 0;
      // for (let i = 0; i < state.cartItems.length; i++) {
      //   const item = state.cartItems[i];
      //   subtotal += item.price * item.quantity;
      // }

      const subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 1000 ? 0 : 200;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
    },
  },
});

export const { addToCart, removeCartItem,calculatePrice } = cartReducer.actions;
