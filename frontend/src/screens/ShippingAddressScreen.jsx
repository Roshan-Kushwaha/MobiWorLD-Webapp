import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../Components/CheckoutSteps";

export default function ShippingAddressScreen() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullname, setFullname] = useState(shippingAddress.fullname);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const navigate = useNavigate();

  if (!userInfo) {
    navigate("/signin");
  }

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullname, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Shipping Address</h2>
        </div>
        <div>
        <label htmlFor="fullname">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={fullname}
            id="fullname"
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter full name"
            required
          />
          
        </div>
        <div>
        <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
            required
          />
        
        </div>
        <div>
        <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
          />
         
        </div>
        <div>
        <label htmlFor="postalCode">Postal Code</label>
          <input
            type="number"
            name="postalCode"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="Enter postal code"
            required
          />
         
        </div>
        <div>
        <label htmlFor="Country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Enter country"
            required
          />
         
        </div>
        <div>
          <label />
          <button type="submit" className="primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
