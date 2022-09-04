import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import config from "./config.js";
import jwt from "jsonwebtoken";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
} from "mdb-react-ui-kit";

class HeaderInner extends React.Component {
  constructor() {
    super();
    this.navLinks = React.createRef();
  }
  state = {
    userData: [],
    pagestatus: false,
    userType: localStorage.getItem("status"),
    countData: "",
  };
  componentDidMount() {
    /*  this.setState({
      userData: this.props.key1,
      pagestatus: true,
    }); */
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: decoded_id.Uid,
      }),
    };
    Promise.all([
      fetch(
        config.googleAuth.backURL + `/user/wishlist_user_property_count`,
        getList
      ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          countData: value[0].data,
          userData: this.props.key1,
          pagestatus: true,
        });
        //console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  menuAnimation = () => {
    this.navLinks.current.classList.toggle("open");
    $(".sideBarMenuDiv").toggleClass("sideBarClose");
  };
  logout = () => {
    //alert("hi");
    localStorage.removeItem("Uid");
    localStorage.removeItem("status");
    localStorage.removeItem("popBox");
    this.setState(this.initstate);
    window.location.reload();
    //this.props.history.push("/");
  };
  render() {
    return (
      <>
        {this.state.pagestatus ? (
          <>
            <header class="wrapper headerMain">
              <section class="containerLg">
                <div class="headrNavRow">
                  <div class="row align-items-center">
                    <div class="col">
                      <div class="logoMain">
                        <Link to="/">
                          <img src="images/logo.png" />
                        </Link>
                      </div>
                    </div>
                    <div class="col-auto">
                      <div class="d-flex pull-right">
                        <div class="hdr-user align-self-center">
                          <MDBDropdown className="pr20 inrNavBarInr">
                            <MDBDropdownToggle tag="a" className="">
                              <div class="prf-tp-img">
                                <img
                                  src={
                                    this.state.userData &&
                                      this.state.userData.userImg
                                      ? this.state.userData.userImg
                                      : "images/dummy.jpg"
                                  }
                                  id="imgProfiles"
                                />
                              </div>
                              {this.state.userData && this.state.userData.fname
                                ? this.Capitalize(this.state.userData.fname)
                                : ""}{" "}
                              {this.state.userData && this.state.userData.lname
                                ? this.Capitalize(this.state.userData.lname)
                                : ""}
                            </MDBDropdownToggle>

                            {/*<span class="headerDropDownMain">
                              <MDBDropdownToggle tag="a" className="d-none d-sm-block">
                                {this.Capitalize(this.state.userData.fname)}{" "}
                                {this.Capitalize(this.state.userData.lname)}                              
                              </MDBDropdownToggle>
                            </span>
                            <span class="headerDropDownMain">
                                <MDBDropdownToggle tag="a" className="d-block d-sm-none bgMenuMobile">
                                         <div class="mobileHdrPrflImg">
                                        <img
                                          src={
                                            this.state.userData.userImg
                                              ? config.googleAuth.imgurl +
                                                this.state.userData.userImg
                                              : "images/dummy.jpg"
                                          }
                                          id="imgProfiles"
                                        />
                                      </div>                 
                                </MDBDropdownToggle>
                            </span>*/}

                            <MDBDropdownMenu className="accuser-menu inrNavBar align-self-center">
                              <MDBDropdownItem>
                                <MDBDropdownLink href="#">
                                  <div class="prifle-usr-tp d-flex align-items-center">
                                    <div class="prf-tp-img">
                                      <img
                                        src={
                                          this.state.userData &&
                                            this.state.userData.userImg
                                            ? this.state.userData.userImg
                                            : "images/dummy.jpg"
                                        }
                                        id="imgProfiles"
                                      />
                                    </div>
                                    <div class="profl-tp-dtl">
                                      <h4>
                                        {this.state.userData &&
                                          this.state.userData.fname
                                          ? this.Capitalize(
                                            this.state.userData.fname
                                          )
                                          : ""}{" "}
                                        {this.state.userData &&
                                          this.state.userData.lname
                                          ? this.Capitalize(
                                            this.state.userData.lname
                                          )
                                          : ""}
                                      </h4>
                                      <p>
                                        {" "}
                                        {this.state.userData &&
                                          this.state.userData.userType == "1"
                                          ? "Landlord"
                                          : "Renter"}
                                      </p>
                                    </div>
                                  </div>
                                </MDBDropdownLink>
                              </MDBDropdownItem>
                              <MDBDropdownItem>
                                <Link
                                  to="myprofile.html"
                                  className="dropdown-item"
                                >
                                  <img src="images/user-icon.png" />
                                  My Profile
                                </Link>
                              </MDBDropdownItem>

                              <MDBDropdownItem>
                                <Link
                                  to="changepasword.html"
                                  className="dropdown-item"
                                >
                                  <img src="images/change-pass-icon.png" />
                                  Change Password
                                </Link>
                              </MDBDropdownItem>
                              {this.state.userData &&
                                this.state.userData.userType == "2" ? (
                                <>
                                  <MDBDropdownItem>
                                    <Link
                                      to="closeacount.html"
                                      className="dropdown-item"
                                    >
                                      <img src="images/close-icon.png" />
                                      Close Account
                                    </Link>
                                  </MDBDropdownItem>
                                </>
                              ) : (
                                <></>
                              )}
                              <MDBDropdownItem>
                                <MDBDropdownLink
                                  href="javascript:void(0)"
                                  className="dropdown-item"
                                  onClick={this.logout}
                                >
                                  <img src="images/logout-icon.png" />
                                  Logout
                                </MDBDropdownLink>
                              </MDBDropdownItem>
                            </MDBDropdownMenu>
                          </MDBDropdown>
                        </div>

                        {this.state.userData &&
                          this.state.userData.userType == 1 ? (
                          <>
                            <div class="hdrAddLstingBtn align-self-center">
                              <Link
                                to="addproperty.html"
                                class="comn-btn blu rounded-pill"
                              >
                                <img
                                  src="images/add-listing.png"
                                  alt="Add Listing"
                                />
                                <span>Add Listing</span>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div class="hdrWishList align-self-center">
                              <Link to="wishlist.html">
                                <div class="wishlistIcon">
                                  {this.state.countData == 0 ? (
                                    <>
                                      <i class="fa fa-heart-o"></i>
                                    </>
                                  ) : (
                                    <>
                                      <i class="fa fa-heart"></i>
                                    </>
                                  )}

                                  <small class="wishlst-count-icon">
                                    {" "}
                                    <span>{this.state.countData}</span>
                                  </small>
                                </div>
                              </Link>
                            </div>
                            <div class="hdrAddLstingBtn align-self-center">
                              <Link
                                to="listproperty.html"
                                class="comn-btn blu rounded-pill"
                              >
                                <img
                                  src="images/add-listing.png"
                                  alt="View Listing"
                                />
                                <span>View Listing</span>
                              </Link>
                            </div>
                          </>
                        )}
                        <div class="sideBarMenuDiv">
                          <div class="homeburgMenu">
                            <div className="menu" onClick={this.menuAnimation}>
                              <div className="line"></div>
                              <div className="line2"></div>
                              <div className="line3"></div>
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
                                  <Link to="listproperty.html">
                                    Property Listing
                                  </Link>
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
              </section>
            </header>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default withRouter(HeaderInner);
