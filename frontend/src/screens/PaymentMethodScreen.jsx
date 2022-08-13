import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../Components/CheckoutSteps";


export default function PaymentMethodScreen() {
  const [paymentMethod, setPaymentMethod] = useState("paypal");

// const cart = useSelector((state)=>state.cart)
// const {shippingAddress} = cart;

  const navigate = useNavigate();

//  if(!shippingAddress.address){
//      navigate("/shipping");
// }
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Payment Method</h2>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="PayPal"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="googlePay"
              value="Google Pay"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <label htmlFor="googlePay">Google Pay</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="phonePe"
              value="PhonePe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <label htmlFor="phonePe">PhonePe</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              id="credit/debit"
              value="Credit/Debit Card"
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            />
            <label htmlFor="credit/debit">Credit/Debit Card</label>
          </div>
        </div>
          <div>
            <button type="submit" className="primary">
              Continue
            </button>
        </div>
      </form>
    </div>
  );
}
