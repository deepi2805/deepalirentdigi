import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Forgot extends React.Component {
  state = {
    email: "",
    loading: false
  };
  initall = {
    email: "",
  };
  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //for login
  forgotSubmit = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.email === "") {
      this.setState({ validemail: "Email is required*" });
    } else {
      if (reg.test(this.state.email) === false) {
        this.setState({ validemail: "Invalid Email" });
      } else {
        this.setState({ validemail: "" });
      }
    }

    /*console.log(JSON.stringify(this.state));*/
    if (this.state.email === "") {
    } else {
      this.setState({ loading: true });

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.state.email }),
      };
      fetch(config.googleAuth.backURL + `forgot_user_pwd`, options)
        .then((res) => {
          this.setState({ loading: false });

          return res.json();
        })
        .then((data) => {

          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
            this.setState(this.initall);
            // this.setState(this.initialstate)
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          toast("Something went wrong");

          console.log("error", err);
        });
    }
  };
  render() {
    return (
      <body class="loginSignup">
        <ToastContainer />
        <div class="loginLogoCol d-none d-lg-inline-block">
          <a href="javascript:void(0)">
            <img src="images/logo.png" alt="..." />
          </a>
        </div>
        <div class="centerBox">
          <div class="lContent">
            <div class="row g-0 h-100 align-items-center justify-content-center">
              <div class="loginSignContent">
                <div class="loginContent">
                  <div class="loginLogoCol d-lg-none">
                    <a href="javascript:void(0)">
                      <img src="images/logo.png" alt="..." />
                    </a>
                  </div>
                  <div class="mainHdng pdbtm-30">
                    <div class="mainHdngTitle">
                      <h2>
                        Forgot<span>Password</span>
                      </h2>
                    </div>
                  </div>
                  <h5 id="emailforgot">
                    Please enter the email you used to sign in.
                  </h5>
                  <div class="space30"></div>
                  <form
                    class="formStyle"
                    method="POST"
                    id="forgotfrm"
                    onSubmit={this.forgotSubmit}
                  >
                    <div class="row g-3">
                      <div class="col-12">
                        <h3 class="errormsgforgot"></h3>
                        {this.state.validemail ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validemail}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld" class="form-label">
                              Email
                            </label>
                          </>
                        )}
                        {/* <label
                          for="emailFLd"
                          class="form-label"
                          id="emailfield"
                        >
                          Your email{" "}
                        </label> */}
                        <input
                          type="email"
                          class="form-control"
                          id="forgotemail"
                          name="email"
                          placeholder="Write your email"
                          onChange={this.changedata}
                          value={this.state.email}
                        />
                        {/* <span class="errormsgforgotemail">
                          {this.state.validemail}
                        </span> */}
                      </div>
                      <div class="col-12" id="resetfrmbutton">
                        {this.state.loading ?
                          <button class="loading-btn w-100">
                            <div class="spinner-border text-light" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </button>
                          :
                          <button type="submit" class="comn-btn blu w-100">
                            Request password reset
                          </button>
                        }
                      </div>
                      <div class="backBtn text-center">
                        <Link to="/signup.html">Back to sign in</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}