import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../Components/Rating";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { useState } from "react";


export default function ProductScreen(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productId = id;
  const [qty ,setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler =()=>{
     navigate(`/cart/${productId}?qty=${qty}`);
  }
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/"><span className="style"><i class="fa fa-angle-double-left"></i> Back</span></Link>
          <div className="row top">
            <div className="col-2">
              <img className="large" src={product.image} alt={product.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price:₹ {product.price}</li>
                <li>
                  <h3>Description:</h3>
                  <span className="description"> {product.description}</span>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">₹ {product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="error">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map((x)=> {
                               return <option key={x+1} value={x + 1}>{x + 1}</option>
                              })}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button  onClick={ addToCartHandler} className="primary block">Add to cart</button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
