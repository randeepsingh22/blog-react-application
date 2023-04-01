import React, { useState } from "react";
import "../LoginPages/LoginSignUpPage.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/api";
import { setUserId, setUserName } from "../../helpers/sessionFile";


export default function LoginSignUpPage(props) {

  const [crediantials, setCrediantials] = useState({
    full_name: "",
    email: "",
    password: "",
  });
 

  const [message, setmessage] = useState("");
  const navigate = useNavigate();

  var isSignIn = props.isForSignIn;

  const onSubmit = (event) => {
    event.preventDefault();
    var obj = {};
    if (isSignIn) {
      obj = {
        email: crediantials.email,
        password: crediantials.password,
      };
      signIn(obj)
    } else {
      obj = crediantials;
      signUp(obj);
    }
    console.log(obj);
  };

  // /**
  //  * Sigin Api
  //  */
  // const sigin = () => [];
  /**
   * Sign Up Api
   */
  const signUp = async (obj) => {
    axiosInstance
      .post("/signup", obj)
      .then((response) => {
        console.log(response.data);
        if (response.data?.status === 1) {
          setmessage("Account Created Successfully.");
          setUserId(response.data?.data.user._id)
          setUserName(response.data?.data.full_name)
          navigate("/home")
        }
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response.data.message);
        setmessage(error.response.data.message);
      });
  };
  /**
   * Sigin Api
   */
  const signIn = async (obj) => {
    axiosInstance
      .post("/signin", obj)
      .then((response) => {
        console.log(response.data?.data.user._id);
      
        if (response.data?.status.toString() === "1") {
          console.log(response.data?.data.user._id);
          setmessage(response.data.message);
          setUserId(response.data?.data.user._id)
          setUserName(response.data?.data.user.full_name)
          navigate("/home")
        }
   
      })
      .catch((error) => {
        setmessage(error.response.data.message);
      });
  };

  const handleRedirection = () => {
    setCrediantials({full_name:"",email:"",password:""})
    setmessage("")
    if (isSignIn) {
      navigate("/signup");
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className="main-login-vw">
      <div className="main-inner-login-vw">
        <form onSubmit={onSubmit} className="form-vw">
          <div className="show-title">{isSignIn ? "Sign In" : "Sign Up"}</div>

          <div
            className="message-vw"
            style={{
              color: "green",
              fontSize: ".7em",
            }}
          >
            {message ? message : ""}
          </div>
          {!isSignIn ? (
            <div>
              <label for="exampleInputEmail1" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                name="full_name"
                aria-describedby="emailHelp"
                value={crediantials.full_name}
                onChange={(event) =>
                  setCrediantials({
                    ...crediantials,
                    full_name: event.target.value,
                  })
                }
                required
              />

              {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
            </div>
          ) : (
            ""
          )}
          <div>
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              aria-describedby="emailHelp"
              value={crediantials.email}
              onChange={(event) =>
                setCrediantials({ ...crediantials, email: event.target.value })
              }
              required
            />

            {/* <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div>
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={crediantials.password}
              onChange={(event) =>
                setCrediantials({
                  ...crediantials,
                  password: event.target.value,
                })
              }
              required
            />
          </div>
          <button type="submit" className=" btn-sub">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <div className="or-text">OR</div>
          <div className="other-option-vw">
            <div className="text-vw">
              {isSignIn ? "Do not have account?" : "Already have an account?"}{" "}
            </div>
            <div className="show-login-option" onClick={handleRedirection}>
              {isSignIn ? "Sign Up" : "Sign In"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
