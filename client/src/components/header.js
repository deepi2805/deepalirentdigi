import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Header extends React.Component {
  constructor() {
    super();
    this.navLinks = React.createRef();
  }
  state = {
    usertype: "",
    userid: "",
    pop: localStorage.getItem("popBox"),
  };
  initstate = {
    usertype: "",
    userid: "",
  };
  componentDidMount() {
    // alert(localStorage.getItem("popBox"));
    if (localStorage.getItem("Uid")) {
      const decoded_id = jwt.verify(
        localStorage.getItem("Uid"),
        config.login_secret_renter.key
      );
      this.setState({
        usertype: localStorage.getItem("status"),
        userid: decoded_id.Uid,
      });
      //toast(decoded_id.Uid);
    }
    $(window).scroll(function(){
      var sticky = $('.sticky'),
      scroll = $(window).scrollTop();
    
      if (scroll >= 160) sticky.addClass('fixed');
      else sticky.removeClass('fixed');
    });
  }
  menuAnimation = () => {
    this.navLinks.current.classList.toggle("open");
    $(".sideBarMenuDiv").toggleClass("sideBarClose");
  };

  closeTopbar = () => {
    $(".headrTopBar").addClass("removeTopBar").fadeIn(1000);
    localStorage.setItem("popBox", "manish");
  };
  logout = () => {
    //alert("hi");
    localStorage.removeItem("Uid");
    localStorage.removeItem("status");
    localStorage.removeItem("popBox");
    this.setState(this.initstate);
    this.props.history.push("/");
  };

  copyCodeToClipboard = () => {
    toast("Copied Code!");
  }
  render() {
    return (
      <header class="wrapper headerMain">
        <ToastContainer />
        {this.state.pop != "manish" ? (
          <>
            <div class=" align-items-center headrTopBar">
              <div class="col">
                <div class="tpBarContent">
                  <h3>
                    <img src="images/rate-icon.png" alt="rate icon" />{" "}
                    <span>Rates are still low.</span> See if you can save by
                    finding a lender to refinance or prepare to buy.
                    <a href="javascript:void(0)">Get Started</a>{" "}
                  </h3>
                </div>
                <p>
                  <button onClick={() => this.copyCodeToClipboard(navigator.clipboard.writeText('NMLS #1303160'))}>NMLS #1303160{" "}</button>
                  <span>
                    <a href="javascript:void(0)" onClick={this.closeTopbar}>x</a>
                  </span>
                </p>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div class="headerMiddle sticky">
          <div class="containerLg">
            <div class="headrNavRow">
              <div class="row align-items-center">
                <div class="col-md-4">
                  <div class="logoMain">
                    <Link to="/">
                      <img src="images/logo.png" />
                    </Link>
                  </div>
                </div>
                <div class="col-md-8 ">
                  <div class="d-flex pull-right">
                    {this.state.userid ? (
                      <>
                        <div class="hdrloginbtn align-self-center">
                          <p>
                            {" "}
                            <a href="javascript:void(0);" onClick={this.logout}>
                              <span>
                                {" "}
                                <img src="images/login.png" alt="Login Icon" />
                              </span>
                              Sign Out
                            </a>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="hdrloginbtn align-self-center">
                          <p>
                            {" "}
                            <Link to="/signup.html">
                              <span>
                                {" "}
                                <img src="images/login.png" alt="Login Icon" />
                              </span>
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </>
                    )}

                    {this.state.usertype == 1 ? (
                      <>
                        <div class="hdrAddLstingBtn">
                          <Link
                            to="addproperty.html"
                            class="comn-btn blu rounded-pill"
                          >
                            <img src="images/add-listing.png" alt="Add Listing" />
                            <span>Add Listing</span>
                          </Link>
                        </div>
                      </>
                    ) : this.state.usertype == 2 ? (
                      <>
                        <div class="hdrWishList align-self-center">
                          <a href="javascript:void(0)">
                            <div class="wishlistIcon">
                              <i class="fa fa-heart-o"></i>
                              <small class="wishlst-count-icon">
                                {" "}
                                <span>0</span>
                              </small>
                            </div>
                          </a>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div class="sideBarMenuDiv">
                      <div class="homeburgMenu">
                        <div className="menu" onClick={this.menuAnimation}>
                          <div className="line" />
                          <div className="line2" />
                          <div className="line3" />
                        </div>

                        <div className="nav-links" ref={this.navLinks}>
                          <div class="sideBarLogo">
                            <a href="javascript:void(0)">
                              <img src="images/ftr-logo.png" />
                            </a>
                          </div>

                          <ul>
                            <li onClick={this.menuAnimation}>
                              <Link to="/">Home</Link>
                            </li>

                            <li onClick={this.menuAnimation}>
                              <Link to="listproperty.html">Property Listing</Link>
                            </li>
                            <li onClick={this.menuAnimation}>
                              <Link to="about.html">About Us</Link>
                            </li>
                            <li onClick={this.menuAnimation}>
                              <Link to="contact.html">Contact Us</Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default withRouter(Header);
