import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import CheckoutSteps from "../Components/CheckoutSteps";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);

  const orderCreate = useSelector((state)=>state.orderCreate)
  const {order , loading , error , success} = orderCreate;
  
  const navigate = useNavigate();
   
  // if(cart.cartItems.length===0){
  //   navigate("/")
  // }

  // const toPrice = (num) => Number(parseFloat(num).toFixed(2));
    cart.itemsPrice = cart.cartItems.reduce((a, c) => a + Number(c.qty) * Number(c.price.split(',').join('')), 0);
  cart.shipping = cart.itemsPrice >= 500 ? 0 : 30 ;
  // cart.shipping = (cart.shippingAddress)
  cart.taxPrice = 0.18 * cart.itemsPrice;
  cart.orderTotal = cart.itemsPrice + cart.shipping + cart.taxPrice;
  
  const dispatch = useDispatch();

  const placeOrderHandler = ()=>{
    dispatch(createOrder({...cart,orderItems:cart.cartItems})) 
  }
   
  
  useEffect(()=>{
    if(success){
    navigate(`/orders/${order._id}`)
    dispatch({type:ORDER_CREATE_RESET})
    }
  },[navigate,dispatch,order,success])

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {cart.shippingAddress.fullname}
                  <br />
                  <strong>Address:</strong>
                  {cart.shippingAddress.address},{cart.shippingAddress.city},
                  {cart.shippingAddress.postalCode},
                  {cart.shippingAddress.country}
                  <br />
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {cart.paymentMethod}
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                {cart.cartItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div>
                        <img
                          className="small"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div>
                        {item.qty} X ₹{item.price} = ₹ {(Number(item.qty) * Number(item.price.split(',').join(''))).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  <strong>Order Summary</strong>
                </h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>₹ {(cart.itemsPrice).toLocaleString('en-IN')}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>₹ {(cart.shipping).toLocaleString('en-IN')}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>₹ {(cart.taxPrice).toLocaleString('en-IN')}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>₹ {(cart.orderTotal).toLocaleString('en-IN')}</div>
                </div>
              </li>
              <li>
                <button type="button" className="primary block" onClick={placeOrderHandler} disabled={cart.cartItems.length===0}>
                  Place Order
                </button>
              </li>
              {
                loading && (<LoadingBox></LoadingBox>)
              }
              {
                error && (<MessageBox variant="danger">{error}</MessageBox>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
