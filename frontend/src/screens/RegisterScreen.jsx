import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register} from "../actions/userAction";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";

export default function RegisterScreen() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo , error , loading  } = userRegister;

  const dispatch = useDispatch();
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (confirmPassword !== password){
      alert("Password and confirm password does not match")
    }else{
      dispatch(register(name ,email, password));
    }
  };

  const navigate = useNavigate();
  const redirect = window.location.href.split("=")[1] ? window.location.href.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      console.log(window.location.href);
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1> Create Account </h1>
        </div>
        {
          loading && (<LoadingBox></LoadingBox>)
        }{
          error && (<MessageBox variant="danger">{error}</MessageBox>)
        }
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
        </div>
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
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
        </div>
        <div>
        <label />
          <button type="submit" className="primary">
            Register
          </button>
        </div>
        <div>
          <div>
            <label />
            Already have an account ?{" "}<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
