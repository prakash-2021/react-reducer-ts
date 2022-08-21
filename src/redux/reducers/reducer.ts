import userAccount from "./userAccountReducer";
import { combineReducers } from "redux";
import initializeProduct from "./tableReducer";
import productsInCart from "./cartReducer";
import orderProducts from "./orederReducer";

const reducers = combineReducers({
  userAccount: userAccount,
  initializeProduct: initializeProduct,
  productsInCart: productsInCart,
  orderProducts: orderProducts,
});

export default reducers;
