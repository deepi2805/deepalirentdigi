import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import queryString from "query-string";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Resetpassword extends React.Component {
  state = {
    id: queryString.parse(this.props.location.search).id,
    newpassword: "",
    confirmpassword: "",
    otp: "",
    loading: false
  };
  initall = {
    newpassword: "",
    confirmpassword: "",
    otp: "",
  };
  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //for login
  resetSubmit = (e) => {

    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.newpassword === "") {
      this.setState({ validnewpassword: "New password is required*" });
    } else {
      this.setState({ validnewpassword: "" });
    }
    if (this.state.confirmpassword === "") {
      this.setState({ validconfirmpassword: "Confirm password is required*" });
    } else {
      this.setState({ validconfirmpassword: "" });
    }
    if (this.state.otp === "") {
      this.setState({ validotp: "OTP is required*" });
    } else {
      this.setState({ validotp: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.newpassword === "" ||
      this.state.confirmpassword === "" ||
      this.state.otp === ""
    ) {
    } else if (this.state.newpassword != this.state.confirmpassword) {
      toast("New password & Confirm password not matched!");
    } else {

      this.setState({ loading: true });

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: this.state.newpassword,
          otp: this.state.otp,
          id: this.state.id,
        }),
      };
      fetch(config.googleAuth.backURL + `reset_user_pwd`, options)
        .then((res) => {
          this.setState({ loading: false });
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
            this.setState(this.initall);
            this.props.history.push("/signup.html");
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
          this.setState({ loading: false });
          toast("Something went wrong");
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
                        Reset<span>Password</span>
                      </h2>
                    </div>
                  </div>

                  <div class="space30"></div>
                  <form
                    class="formStyle"
                    method="POST"
                    id="forgotfrm"
                    onSubmit={this.resetSubmit}
                  >
                    <div class="row g-3">
                      <div class="col-12">
                        <h3 class="errormsgforgot"></h3>
                        <label
                          for="emailFLd"
                          class="form-label"
                          id="emailfield"
                        >
                          OTP{" "}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="forgotemail"
                          name="otp"
                          placeholder="Enter OTP"
                          onChange={this.changedata}
                          value={this.state.otp}
                        />
                        <span class="errormsgforgotemail">
                          {this.state.validotp}
                        </span>
                        <br />

                        <label
                          for="emailFLd"
                          class="form-label"
                          id="emailfield"
                        >
                          Your New Password{" "}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="forgotemail"
                          name="newpassword"
                          placeholder="New password"
                          onChange={this.changedata}
                          value={this.state.newpassword}
                        />
                        <span class="errormsgforgotemail">
                          {this.state.validnewpassword}
                        </span>
                        <br />
                        <label
                          for="emailFLd"
                          class="form-label"
                          id="emailfield"
                        >
                          Your Confirm Password{" "}
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="forgotemail"
                          name="confirmpassword"
                          placeholder="Confirm password"
                          onChange={this.changedata}
                          value={this.state.confirmpassword}
                        />
                        <span class="errormsgforgotemail">
                          {this.state.validconfirmpassword}
                        </span>
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
                            Password reset
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
