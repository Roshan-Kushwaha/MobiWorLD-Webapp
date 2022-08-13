import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams } from "react-router-dom";
import { detailsOrder, payOrder } from "../actions/orderAction";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

export default function OrderScreen() {
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    error: errorPay,
    success: successPay,
    loading: loadingPay,
  } = orderPay;

  const { id } = useParams();
  const orderId = id;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onLoad = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({type:ORDER_PAY_RESET})
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, sdkReady, orderId , successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h2>
        <strong>Order {order._id}</strong>
      </h2>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullname}
                  <br />
                  <strong>Address:</strong>
                  {order.shippingAddress.address},{order.shippingAddress.city},
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                  <br />
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                {order.orderItems.map((item) => (
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
                        {item.qty} X ₹{item.price} = ₹{" "}
                        {(
                          Number(item.qty) *
                          Number(item.price.split(",").join(""))
                        ).toLocaleString("en-IN")}
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
                  <div>
                    ₹ {Number(order.itemsPrice).toLocaleString("en-IN")}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>₹ {Number(order.shipping).toLocaleString("en-IN")}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>₹ {Number(order.taxPrice).toLocaleString("en-IN")}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      ₹ {Number(order.orderTotal).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </div>
              </li>
              <br />
              {!order.isPaid && (
                <li>
                  {!setSdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                  <>
                  {errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)} {loadingPay && (<LoadingBox></LoadingBox>)}  
                    <PayPalButton
                      amount={Number(order.orderTotal)}
                      onSuccess={successPaymentHandler}
                    ></PayPalButton>
                   </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
