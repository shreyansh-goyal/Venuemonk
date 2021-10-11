import { useContext, useRef } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import axios from "axios";
import { LoginFailure, LoginStart, LoginSuccess } from "../../redux/auth/auth.actions";

function Login({isFetching,user,loginStart,loginFailure,loginSuccess}) {
  const email = useRef();
  const password = useRef();

  const loginCall = async (userCredential) => {
    loginStart();
    try {
      const res = await axios.post("/auth/login", userCredential);
      console.log(res.data);
      loginSuccess(res.data);
    } catch (err) {
      loginFailure(err);
    }
  };
  

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value }
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Venuesocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Venuesocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({auth:{user,isFetching}})=>({
  user,
  isFetching
})

const mapDispatchToProps = (dispatch) => ({
 loginStart : () => {dispatch(LoginStart())},
 loginSuccess : user => {dispatch(LoginSuccess(user))},
 loginFailure : err => {dispatch(LoginFailure(err))}

})

export default connect(mapStateToProps,mapDispatchToProps)(Login);