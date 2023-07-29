"use client";
import { createContext, useContext, useEffect, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";

const Context = createContext(null);
const initialState = {
  items: [],
  totalItemsCount: 0,
};

const calculateTotalPrice = (arr) => {
    return arr.reduce((total, current) => {
        console.log("CURRENT :",current);
        console.log("TOTAL :",total);
        total += current.price * current.count;
        return total;
    }, 0);
};

const addItem = (state, action) => {
  const { items: arr } = state;
  const { payload: product } = action;
  let found = false;
  const newArr = arr.map((item) => {
    if (item.id === product.id) {
      found = true;
      return { ...item, count: item.count + 1 };
    }
    return item;
  });
  if (!found) {
    return [...newArr, { ...product, count: 1 }];
  }
  return newArr;
};

const reducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
      return {
      items: addItem(state, action),
          totalItemsCount: state.totalItemsCount + 1,
    };
  } else if (action.type === "REMOVE_FROM_CART") {
    const filtered = state.items.filter((item) => item.id !== action.payload);
    const removedItem = state.items.find((item) => item.id === action.payload);
    return {
      ...state,
      items: filtered,
      totalItemsCount: state.totalItemsCount - removedItem.count,
    };
  } else if (action.type === "REDUCE_PRODUCT_COUNT") {
    const mapped = state.items.map((item) => {
      if (item.id === action.payload) {
        return { ...item, count: item.count === 1 ? 1 : item.count - 1 };
      }
      return item;
    });
    return {
      ...state,
      items: mapped,
      totalItemsCount: state.totalItemsCount - 1,
    };
  } else if (action.type === "INCREASE_PRODUCT_COUNT") {
    const mapped = state.items.map((item) => {
      if (item.id === action.payload) {
        return { ...item, count: ++item.count };
      }
      return item;
    });
    return {
      ...state,
      items: mapped,
      totalItemsCount: state.totalItemsCount + 1,
    };
  } else if (action.type === "SET_PERSISTED_CART") {
    return { ...action.payload };
  } else if (action.type === "CALCULATE_TOTAL") {
      calculateTotalPrice(state.items); 
    return { ...state};
  } else {
    throw new Error("Unknown action");
  }
};

const CartContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const cart = secureLocalStorage.getItem("cart");
    if (cart) {
      dispatch({ type: "SET_PERSISTED_CART", payload: cart });
    }
  }, []);

  useEffect(() => {
    secureLocalStorage.setItem("cart", state);
  }, [state.totalItemsCount]);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export default CartContext;

export const useCartContext = () => useContext(Context);
