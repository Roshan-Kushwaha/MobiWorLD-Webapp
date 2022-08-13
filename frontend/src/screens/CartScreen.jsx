import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../Components/MessageBox";

export default function CartScreen(props) {
  const queryParams = new URLSearchParams(window.location.search);
  const qty = queryParams ? queryParams.get("qty") : 1;
  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

 
  const removeFromCartHandler=(id)=>{
      dispatch(removeFromCart(id));
    }

  const checkOutHandler = () => {
    return navigate("/signin?redirect=shipping");
  };

 

  return (
    <div>
      <div className="row top">
        <div className="col-2">
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty <Link to="/"> Go Shopping </Link>
            </MessageBox> 
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="row">
                    <div>
                      <img className="small" src={item.image} alt={item.name} />
                    </div>
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div>
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div>₹ {item.price}</div>
                    <div>
                      <button type="button" onClick={() => { removeFromCartHandler(item.product) }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "} 
                   Item ) : ₹ {cartItems.reduce((a, c) => a + Number(c.qty) * Number(c.price.split(',').join('')), 0).toLocaleString('en-IN')}
                </h2>
              </li>
              <li>
                <button type="button" className="primary block" onClick={checkOutHandler} disabled={cartItems.length===0}>
                  Proceed to Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
