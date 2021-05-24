import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // Actions
    addToBasket: (state, action) => {
      state.items=[...state.items,action.payload]
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(basketItem => basketItem.id === action.payload.id);
      let newBasket = [...state.items];
      if(index>=0){
        // Item exists in the baskety
        newBasket.splice(index,1);
      }
      else{
                // Item dose not exists in the baskety
          console.warn(`Cannot remove product (id: ${action.payload.id}) as item not in the basket`);

      }
      // Uopdating the redux to store to send the updated basket
      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) => state.basket.items.reduce((total,item) => total + item.price,0);
export default basketSlice.reducer;
