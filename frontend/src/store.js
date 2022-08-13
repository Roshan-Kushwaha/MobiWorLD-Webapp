import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";

import thunk from "redux-thunk";
import { cartReducers } from "./reducers/cartReducers";
import { orderCreateReducers, orderDetailsReducers, orderPayReducers } from "./reducers/orderReducers";
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { userRegisterReducers, userSigninReducers } from "./reducers/userReducers";

const initialState = {
  
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress:localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")): {},
    paymentMethod:"PayPal"
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducers,
  userSignin: userSigninReducers,
  userRegister:userRegisterReducers,
  orderCreate:orderCreateReducers,
  orderDetails:orderDetailsReducers,
  orderPay : orderPayReducers,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
