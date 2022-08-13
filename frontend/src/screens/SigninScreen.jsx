import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../actions/userAction";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo , error , loading  } = userSignin;

  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  const navigate = useNavigate();
  const redirect = window.location.href.split("=")[1] ? "/shipping" : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> Sign In </h1>
        </div>
        {
          loading && (<LoadingBox></LoadingBox>)
        }{
          error && (<MessageBox variant="danger">{error}</MessageBox>)
        }
        <div>
          <label htmlFor="email"> Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email address"
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div>
        <label />
          <button type="submit" className="primary">
            Sign In
          </button>
        </div>
        <div>
          <div>
            <label />
            New Customer? <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
