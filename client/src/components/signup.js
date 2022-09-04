import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class SignUp extends React.Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    usertype: "",
    termPolicy: "",
    url: "",
    loginemail: "",
    loginpassword: "",

    loading: false
  };

  initialregstate = {
    validfname: "",
    validlname: "",
    validemail: "",
    validphone: "",
    validpassword: "",
    validconfirmpassword: "",
    validusertype: "",
    validtermPolicy: "",
  };
  initall = {
    email: "",
    fname: "",
    lname: "",
    phone: "",
    password: "",
    confirmpassword: "",
    termPolicy: "",
  };
  addLoginClass = () => {
    $(".loginSignup").addClass("actSignup");
  };

  removeLoginClass = () => {
    $(".loginSignup").removeClass("actSignup");
  };
  changedata = (e) => {

    this.setState({ validfname: "", validlname: "", validphone: "", validpassword: "", validconfirmpassword: "" });
    let specialCharacters = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~1234567890]/;
    const numberpattern = new RegExp(/^[0-9\b]+$/);
    let passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;



    if (e.target.name == 'fname' && specialCharacters.test(e.target.value)) {

      return this.setState({ validfname: "Special characters and numbers not allowed" });

    } else if (e.target.name == 'lname' && specialCharacters.test(e.target.value)) {

      return this.setState({ validlname: "Special characters and numbers not allowed" });
    }
    else if (e.target.name == 'phone' && !numberpattern.test(e.target.value) && e.target.value != "") {
      return this.setState({ validphone: "Please enter only number" });
    }
    else if (e.target.name == 'confirmpassword' && !this.state.password) {
      return this.setState({ validpassword: "Please enter password" });
    }
    else if (e.target.name == 'confirmpassword' && !passwordValidation.test(this.state.password)) {
      return this.setState({ validpassword: "Enter password with 6 to 16 letters and with atleast one number and special character" });
    }
    else if (e.target.name == 'confirmpassword' && !this.state.password.includes(e.target.value)) {
      return this.setState({ validconfirmpassword: "Please enter correct password" });
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  changedataradio = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  //for login
  loginSubmit = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.loginemail === "") {
      this.setState({ validloginemail: "Email is required*" });
    } else {
      if (reg.test(this.state.loginemail) === false) {
        this.setState({ validloginemail: "Invalid Email" });
      } else {
        this.setState({ validloginemail: "" });
      }
    }

    if (this.state.loginpassword === "") {
      this.setState({ validloginpassword: "Password is required*" });
    } else {
      this.setState({ validloginpassword: "" });
    }
    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.loginemail === "" ||
      this.state.loginpassword === "" ||
      reg.test(this.state.loginemail) === false
    ) {
    } else {
      this.setState({ loading: true });

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.loginemail,
          password: this.state.loginpassword,
        }),
      };
      fetch(config.googleAuth.backURL + `user_auth_email_pwd`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState({ loading: false });

          if (data.status == true) {
            console.log(data.data._id);
            var userId = data.data._id;
            const status = data.data.userType;
            //return false;
            //alert(data.userstatus);

            const token_email = jwt.sign(
              { expiresInMinutes: 60, Uid: userId },
              "pokemon"
            );
            localStorage.setItem("Uid", token_email);
            localStorage.setItem("status", status);
            console.log("localstorage Uid", localStorage.getItem("Uid"));
            jwt.verify(
              localStorage.getItem("Uid"),
              "pokemon",
              (err, decoded) => {
                console.log(decoded);
              }
            );
            //verify
            jwt.verify(token_email, "pokemon", (err, decoded) => {
              console.log("verify", decoded); // bar
            });
            // get the decoded payload and header
            var decoded = jwt.decode(token_email, { complete: true });
            let decode_email = jwt.decode(localStorage.getItem("Uid"));
            console.log("decode data", decode_email);
            console.log("header", decoded.header);
            console.log("payload", decoded.payload);
            //toast(data.message);

            // this.setState(this.initialstate)
            if (status == 1) {
              this.props.history.push("/addproperty.html");
            } else {
              this.props.history.push("/");
            }
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          this.setState({ loading: false });
          toast("Something went wrong");
          this.setState({ loading: false });

          console.log("error", err);
        });
    }
  };
  registerSubmit = (e) => {
    e.preventDefault();

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const pattern = new RegExp(/^[0-9\b]+$/);
    if (this.state.fname === "") {
      this.setState({ validfname: "First name is required*" });
    } else {
      this.setState({ validfname: "" });
    }

    if (this.state.lname === "") {
      this.setState({ validlname: "Last name is required*" });
    } else {
      this.setState({ validlname: "" });
    }

    if (this.state.email === "") {
      this.setState({ validemail: "Email is required*" });
    } else {
      if (reg.test(this.state.email) === false) {
        this.setState({ validemail: "Invalid Email" });
      } else {
        this.setState({ validemail: "" });
      }
    }
    if (this.state.phone === "") {
      this.setState({ validphone: "Phone is required*" });
    } else {
      if (pattern.test(this.state.phone) === false) {
        this.setState({ validphone: "Please enter only number." });
      } else if (this.state.phone.length != 10) {
        this.setState({ validphone: "Please enter valid phone number." });
      } else {
        this.setState({ validphone: "" });
      }
    }
    if (this.state.password === "") {
      this.setState({ validpassword: "Password is required*" });
    } else {
      this.setState({ validpassword: "" });
    }
    if (this.state.confirmpassword === "") {
      this.setState({ validconfirmpassword: "Confirm password is required*" });
    } else {
      this.setState({ validconfirmpassword: "" });
    }
    if (this.state.usertype === "") {
      this.setState({ validusertype: "User type is required*" });
    } else {
      this.setState({ validusertype: "" });
    }
    if (this.state.termPolicy === "") {
      this.setState({ validtermPolicy: "Please click its required*" });
    } else {
      this.setState({ validtermPolicy: "" });
    }

    if (
      this.state.email === "" ||
      this.state.password === "" ||
      this.state.confirmpassword === "" ||
      this.state.fname === "" ||
      this.state.lname === "" ||
      this.state.phone === "" ||
      this.state.termPolicy === "" ||
      this.state.usertype === "" ||
      reg.test(this.state.email) === false ||
      pattern.test(this.state.phone) === false
    ) {
    } else if (this.state.password != this.state.confirmpassword) {
      toast("Password & Confirmpassword not matched!");
    } else {
      console.log(this.state);
      this.setState({ loading: true });

      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          fname: this.state.fname,
          lname: this.state.lname,
          phoneNo: this.state.phone,
          password: this.state.password,
          userType: this.state.usertype,
          bookingUrl: this.state.url,
        }),
      };
      fetch(config.googleAuth.backURL + `user_signup`, options)
        .then((res) => {
          //console.log("response",res)
          return res.json();
        })
        .then((data) => {
          this.setState({ loading: false });

          if (data.status == true) {
            this.setState(this.initall);
            toast(data.msg);
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          toast("Something went wrong");
          console.log("error", err);
        });
    }
  };

  render() {
    return (

      <body class="loginSignup ">
        <ToastContainer />
        <div class="loginLogoCol  d-none d-lg-inline-block">
          <Link to="/">
            <img src="images/logo.png" />
          </Link>
        </div>
        {console.log("Newwwww", this?.props?.location?.state?.success)}

        <section class="loginSignupPage d-none d-lg-block">
          <div class="row g-0 minH100vh align-items-center">
            <div class="col-lg-6">
              <div class="lgTriigerCol">
                <div class="mainHdng pd40">
                  <div class="mainHdngTitle">
                    <h2>
                      Create <span>Account</span>
                    </h2>
                  </div>
                </div>
                <a
                  href="javascript:void(0)"
                  onClick={this.addLoginClass}
                  class="comn-btn whiteBtn"
                >
                  Sign Up
                </a>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="lgTriigerCol">
                <div class="mainHdng pd40">
                  <div class="mainHdngTitle">
                    <h2>
                      Have an <span>Account?</span>
                    </h2>
                  </div>
                </div>
                <a
                  href="javascript:void(0)"
                  onClick={this.removeLoginClass}
                  class="btn btn-outline-light loginBtn "
                >
                  Login
                </a>
              </div>
            </div>
          </div>
        </section>

        <div class="loginSignupFormCol">
          <div class="lContent">
            <div class="row g-0 h-100 align-items-center">
              <div class="loginSignContent">
                <div class="loginContent">
                  <div class="loginLogoCol d-lg-none">
                    <a href="javascript:void(0)">
                      <img src="images/logo.png" />
                    </a>
                  </div>
                  {this?.props?.location?.state?.success && <h5 style={{ color: "green", fontSize: "24px" }}>Your email is verified successfully, you can login now.</h5>}
                  <h5>Welcome back</h5>
                  <div class="mainHdng">
                    <div class="mainHdngTitle pdbtm-30">
                      <h2>
                        Login to your <span>account</span>
                      </h2>
                    </div>
                  </div>
                  <span class="errormsglogin"></span>
                  <form
                    class="formStyle"
                    id="loginfrm"
                    onSubmit={this.loginSubmit}
                  >
                    <div class="row g-3">
                      <div class="col-12">
                        {this.state.validloginemail ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validloginemail}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld" class="form-label">
                              Email
                            </label>
                          </>
                        )}
                        <input
                          type="email"
                          class="form-control"
                          id="msgloginemail"
                          name="loginemail"
                          placeholder="john.doe@gmail.com"
                          onChange={this.changedata}
                          value={this.state.loginemail}
                        />
                        <span class="errormsgloginemail"></span>
                      </div>
                      <div class="col-12">
                        {this.state.validloginpassword ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validloginpassword}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld" class="form-label">
                              Password
                            </label>
                          </>
                        )}

                        <input
                          type="password"
                          class="form-control"
                          id="msgloginpassword"
                          name="loginpassword"
                          placeholder="Password"
                          onChange={this.changedata}
                          value={this.state.loginpassword}
                        />
                        <span class="errormsglogpassword"></span>
                      </div>

                      <div class="col">
                        <div class="ima-radio">
                          <div class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="remember"
                              name="remember"
                              value="1"
                            />
                            <label class="form-check-label" for="rememberCheck">
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-auto pdbtm-30">
                        <Link to="/forgot.html">Forgot password?</Link>
                      </div>
                    </div>
                    <div class="row ">
                      <div class="col-md-5">
                        {this.state.loading ?
                          <button class="loading-btn">
                            <div class="spinner-border text-light" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </button>
                          :
                          <button type="submit" class="comn-btn blu ">
                            Login
                          </button>
                        }
                      </div>
                      <div class="col-md-7">
                        <div class="loginSocial socialmediaicons">
                          <p>or login with </p>
                          <ul class="social-links">
                            <li>
                              {" "}
                              <a href="#">
                                {" "}
                                <i class="fa fa-facebook"></i>{" "}
                              </a>{" "}
                            </li>
                            <li>
                              {" "}
                              <a href="#">
                                {" "}
                                <i class="fa fa-google-plus"></i>{" "}
                              </a>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="lgTriigerCol d-lg-none">
                    <h4>Create Account</h4>
                    <a href="javascript:void(0)" class="comn-btn blu">
                      Sign Up
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sContent">
            <div class="row g-0 h-100 align-items-center">
              <div class="loginSignContent">
                <div class="SignupContent">
                  <div class="loginLogoCol d-lg-none">
                    <a href="javascript:void(0)">
                      <img src="images/logo.png" />
                    </a>
                  </div>
                  <h5>Hello!</h5>
                  <div class="mainHdng pdbtm-30">
                    <div class="mainHdngTitle">
                      <h2>
                        Sign Up to <span>Get Started</span>
                      </h2>
                    </div>
                  </div>
                  <form
                    class="formStyle"
                    method="POST"
                    id="registrationfrm"
                    onSubmit={this.registerSubmit}
                  >
                    <div class="row g-3">
                      <div class="col-6">
                        {this.state.validfname ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validfname}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="fullNameFld" class="form-label">
                              First Name
                            </label>
                          </>
                        )}

                        <input
                          type="text"
                          class="form-control"
                          id="sfname"
                          name="fname"
                          placeholder="John"
                          onChange={this.changedata}
                          value={this.state.fname}
                        />
                        {/*  <span class="errormsgregname">
                          {this.state.validfname}
                        </span> */}
                      </div>
                      <div class="col-6">
                        {this.state.validlname ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validlname}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="fullNameFld" class="form-label">
                              Last Name
                            </label>
                          </>
                        )}

                        <input
                          type="text"
                          class="form-control"
                          id="lname"
                          name="lname"
                          placeholder="Doe"
                          onChange={this.changedata}
                          value={this.state.lname}
                        />
                        {/* <span class="errormsglname">
                          {this.state.validlname}
                        </span> */}
                      </div>
                      <div class="col-6">
                        {this.state.validemail ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validemail}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld2" class="form-label">
                              Email Address
                            </label>
                          </>
                        )}

                        <input
                          type="email"
                          class="form-control"
                          id="semail"
                          name="email"
                          placeholder="john.doe@gmail.com"
                          onChange={this.changedata}
                          value={this.state.email}
                        />
                        {/*  <span class="errormsgregemail">
                          {this.state.validemail}
                        </span> */}
                      </div>
                      <div class="col-6">
                        {this.state.validphone ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validphone}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld2" class="form-label">
                              Phone Number
                            </label>
                          </>
                        )}

                        <input
                          type="text"
                          class="form-control"
                          id="phonenum"
                          name="phone"
                          maxlength="10"
                          placeholder="ex.+91-9999988888"
                          onChange={this.changedata}
                          value={this.state.phone}
                        />
                        {/*  <span class="errormsgregphone">
                          {this.state.validphone}
                        </span> */}
                      </div>
                      <div class="col-6">
                        {this.state.validpassword ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validpassword}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld2" class="form-label">
                              Password
                            </label>
                          </>
                        )}
                        {/*   <label for="passwordFld2" class="form-label">
                          Password
                        </label> */}
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          name="password"
                          placeholder="Password"
                          onChange={this.changedata}
                          value={this.state.password}
                        />
                        {/*  <span class="errormsgregpass">
                          {this.state.validpassword}
                        </span> */}
                      </div>
                      <div class="col-6">
                        {this.state.validconfirmpassword ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validconfirmpassword}
                            </label>
                          </>
                        ) : (
                          <>
                            <label for="emailFld2" class="form-label">
                              Confirm Password
                            </label>
                          </>
                        )}

                        <input
                          type="password"
                          class="form-control"
                          id="conpwd"
                          name="confirmpassword"
                          placeholder="Confirm Password"
                          onChange={this.changedata}
                          value={this.state.confirmpassword}
                        />
                        {/* <span class="errormsgregconpass">
                          {this.state.validconfirmpassword}
                        </span> */}
                      </div>

                      <div class="ima-radio">
                        <div class="form-check">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="age1"
                            name="usertype"
                            onChange={this.changedataradio}
                            value="1"
                          />
                          <label class="form-check-label" for="age1">
                            Landlord
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            type="radio"
                            class="form-check-input"
                            id="age2"
                            name="usertype"
                            onClick={this.changedataradio}
                            value="2"
                          />
                          <label class="form-check-label" for="age2">
                            Tenant/Renter
                          </label>
                        </div>
                        <span class="errormsgregconpass red">
                          {this.state.validusertype}
                        </span>
                      </div>
                      {this.state.usertype == "1" ? (
                        <>
                          <div class="col-12">
                            <label for="emailFld2" class="form-label">
                              Booking Url
                            </label>

                            <input
                              type="text"
                              class="form-control"
                              id="url"
                              name="url"
                              placeholder="Enter Url"
                              onChange={this.changedata}
                              value={this.state.url}
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div class="col-12">
                        <div class="ima-radio">
                          <div class="form-check">
                            <input
                              type="checkbox"
                              class="form-check-input"
                              id="acceptCheck"
                              name="termPolicy"
                              onClick={this.changedata}
                              required=""
                              value="1"
                            />

                            <label class="form-check-label" for="acceptCheck">
                              I accept our{" "}
                              <Link to="/termsofuse.html">Terms of use</Link>{" "}
                              and our{" "}
                              <Link to="/privacyPolicy.html">
                                Privacy policy
                              </Link>
                              &nbsp;
                              <span class="errormsgregconpass red">
                                {this.state.validtermPolicy}
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-5">
                        {this.state.loading ?
                          <button class="loading-btn">
                            <div class="spinner-border text-light" role="status">
                              <span class="sr-only">Loading...</span>
                            </div>
                          </button>
                          :
                          <button type="submit" class="comn-btn blu">
                            Register
                          </button>
                        }
                      </div>
                      <div class="col-7">
                        <div class="loginSocial socialmediaicons">
                          <p>or login with </p>
                          <ul class="social-links">
                            <li>
                              {" "}
                              <a href="#">
                                {" "}
                                <i class="fa fa-facebook"></i>{" "}
                              </a>{" "}
                            </li>
                            <li>
                              {" "}
                              <a href="#">
                                {" "}
                                <i class="fa fa-google-plus"></i>{" "}
                              </a>{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div class="lgTriigerCol d-lg-none">
                    <h4>Have an Account?</h4>
                    <a href="javascript:void(0)" class="comn-btn blu">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
