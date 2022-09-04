import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import Header from "./header";
import Header1 from "./headerinner";
import Footer from "./footer";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Swiper core and required modules

import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export default class Home extends React.Component {
  state = {
    type: "",
    address: "",
    bannerData: [],
    blogData: [],
    bathData: [],
    sponsorData: [],
    imgurl: config.googleAuth.imgurl,
    checkUser: localStorage.getItem("Uid"),
    userData: [],
    pagestatus: false,
    loginuserId: "",
  };
  componentDidMount() {
    if (localStorage.getItem("Uid")) {
      const decoded_id = jwt.verify(
        localStorage.getItem("Uid"),
        config.login_secret_renter.key
      );
      var t = decoded_id.Uid;
    } else {
      var t = "";
    }

    let getloginuser = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: t,
      }),
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          userData: value[0].data,
          pagestatus: true,
        });
        console.log(value[0].data);
      })
      .catch((err) => {
        console.log(err);
      });
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `settings/fetch_banner`, options).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `settings/fetch_all_blog`,
        options
      ).then((value) => value.json()),
      fetch(config.googleAuth.backURL + `settings/fetch_sponsor`, options).then(
        (value) => value.json()
      ),
    ])
      .then((value) => {
        console.log("test", value[2]);
        this.setState({
          bannerData: value[0].data.bannerDetails,
          blogData: value[1].data,
          sponsorData: value[2].data.sponsorDetails,
        });

        //json response
      })
      .catch((err) => {
        console.log(err);
      });
  }
  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  searchSubmit = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.type === "") {
      this.setState({ validType: "Select type*" });
    } else {
      this.setState({ validType: "" });
    }
    if (this.state.address === "") {
      this.setState({ validaddress: "City & address cannot be null*" });
    } else {
      this.setState({ validaddress: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (this.state.type === "" || this.state.address === "") {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: this.state.type,
          address: this.state.address,
        }),
      };
      fetch(config.googleAuth.backURL + `reset_user_pwd`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
            this.setState(this.initall);
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  render() {
    return (
      <div class="body">
        <ToastContainer />
        {this.state.checkUser ? (
          <>
            {this.state.pagestatus ? (
              <Header1 key1={this.state.userData} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <Header />
        )}

        <section class="wrapper indexSlider">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {this.state.bannerData.map((l) => {
              return (
                <>
                  <SwiperSlide>
                    {l.filename != "" ? (
                      <>
                        <img src={`${this.state.imgurl}${l.filename}`} />
                      </>
                    ) : (
                      <>
                        <img src="images/banner.jpg" />
                      </>
                    )}
                  </SwiperSlide>
                </>
              );
            })}
            {/*  <SwiperSlide>
              <img src="images/banner.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="images/banner.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="images/banner.jpg" />
            </SwiperSlide> */}
          </Swiper>
        </section>

        <section class="wrapper  advanceSrchBlk">
          <div class="container">
            <div class="advanceSrchDiv">
              <form
                class="commonForm advanceSrchForm"
                onSubmit={this.searchSubmit}
              >
                <div class="row align-items-center">
                  <div class="form-group col-md-5 ">
                    <div class="srchCity">
                      <input
                        type="text"
                        class="form-control d-inline "
                        placeholder="Seach by city or address"
                        name="address"
                        value={this.state.address}
                        onChange={this.changedata}
                      />
                    </div>
                    <span
                      class="errormsgforgotemail"
                      style={{
                        color: "red",
                      }}
                    >
                      {this.state.validaddress}
                    </span>
                  </div>
                  <div class="form-group col-md-3">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      name="type"
                      value={this.state.type}
                      onChange={this.changedata}
                    >
                      <option selected>Type</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                    <span
                      class="errormsgforgotemail"
                      style={{
                        color: "red",
                      }}
                    >
                      {this.state.validType}
                    </span>
                  </div>
                  <div class="form-group col-md-2 ">
                    <div class="advanceSrchTogle">
                      <a href="javascript:void(0)">
                        <p class="d-inline">Advance Search</p>
                        <div class="advanceSrchIcon d-inline ">
                          <i class="fa fa-plus"> </i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="form-group col-md-2">
                    <button class="btn btn-primary" type="submit">
                      Rent Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section class="wrapper exploreCitiesBlk pd60">
          <div class="container">
            <div class="mainHdng pdbtm-60">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle">
                    <h2>
                      Explore the <span>Cities</span>
                    </h2>
                  </div>
                </div>
                <div class="col">
                  <div class="hdngAviableRight pull-right">
                    <a href="javascript:void(0)">
                      <div class="hdngIcon d-inline">
                        <img src="images/home.png" alt="Home Icon" />
                      </div>
                      <div class="hdngRigtTitle d-inline">
                        <span>20+ Cities</span>Available Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="explorcitySlider swiperFullArrow">
            <Swiper
              slidesPerView={6}
              spaceBetween={30}
              navigation={true}
              clickable={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property2.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>British Columbia</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property3.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Ontario</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Nova Scotia</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property2.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Quebec</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="explrCityItem">
                  <a href="javascript:void(0)">
                    <img src="images/property1.jpg" alt="property1" />
                    <div class="expleItmDiv">
                      <p>92 Properties</p>
                      <h2>Alberta</h2>
                    </div>
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

        <section class="wrapper lightBg proprType pd80">
          <div class="container">
            <div class="row">
              <div class="col-md-10">
                <div class="properTypeFeature">
                  <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    navigation={true}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img
                              src="images/office-icon.png"
                              alt="Office Icon"
                            />
                          </div>
                          <h2>Office</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox active text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/house-icon.png" alt="House Icon" />
                          </div>
                          <h2>House</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/villa-icon.png" alt="Villa Icon" />
                          </div>
                          <h2>Villa</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img
                              src="images/appartment-icon.png"
                              alt="Appartment Icon"
                            />
                          </div>
                          <h2>Appartment</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img
                              src="images/office-icon.png"
                              alt="Office Icon"
                            />
                          </div>
                          <h2>Office</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/house-icon.png" alt="House Icon" />
                          </div>
                          <h2>House</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/villa-icon.png" alt="Villa Icon" />
                          </div>
                          <h2>Villa</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img
                              src="images/appartment-icon.png"
                              alt="Appartment Icon"
                            />
                          </div>
                          <h2>Appartment</h2>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div class="col-md-2">
                <div class="mainHdng">
                  <div class=" align-items-center">
                    <div class="mainHdngTitle">
                      <h2>
                        Explore by <span>Property Type</span>
                      </h2>
                    </div>
                  </div>
                  <div class="Mainhdingbtn">
                    <a href="javascript:void(0)" class="comn-btn blu">
                      <span>+2300 Available Properties</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper featrdPrprtyBlk pd60">
          <div class="container">
            <div class="mainHdng ">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle">
                    <h2>
                      Featured <span>Propeties</span>
                    </h2>
                  </div>
                </div>
                <div class="col">
                  <div class="hdngAviableRight pull-right">
                    <a href="javascript:void(0)">
                      <div class="hdngIcon  d-inline">
                        <img src="images/home.png" alt="Home Icon" />
                      </div>
                      <div class="hdngRigtTitle d-inline">
                        <span>20+ Cities</span>Available Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="featureProprtyBlk swiperFullArrow pdtop-60">
            <Swiper
              navigation={true}
              slidesPerView={3}
              spaceBetween={30}
              className="mySwiper"
            >
              <SwiperSlide>
                <div class="cardPropertyBox">
                  <div class="row g-0 d-flex">
                    <div class="cartBlkImg col-auto">
                      <img src="images/f-property1.jpg" />
                      <span class="batchImg">Featured</span>
                      <div></div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cardPropertyBox">
                  <div class="row g-0 d-flex">
                    <div class="cartBlkImg col-auto">
                      <img src="images/f-property3.jpg" />
                      <span class="batchImg">Featured</span>
                      <div></div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cardPropertyBox">
                  <div class="row g-0 d-flex">
                    <div class="cartBlkImg col-auto">
                      <img src="images/f-property4.jpg" />
                      <span class="batchImg">Featured</span>
                      <div></div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div class="cardPropertyBox">
                  <div class="row g-0 d-flex">
                    <div class="cartBlkImg col-auto">
                      <img src="images/f-property2.jpg" />
                      <span class="batchImg">Featured</span>
                      <div></div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div class="viewAllBtn text-center mtop-20">
              <a
                href="javascript:void(0)"
                class="comn-btn brderBtn rounded-pill"
              >
                {" "}
                View All
              </a>
            </div>
          </div>
        </section>

        <section class="wrapper getAcesBlk pd80">
          <div class="container">
            <div class="row">
              <div class="col-md-7">
                <div class="getAcesBox whitBg">
                  <div className="getAcesInr">
                    <h4>Get Access Over</h4>
                    <h2>
                      15033 <span>Property</span>
                    </h2>
                    <p>Get a Feature Rich Home</p>
                  </div>
                </div>
                <div class="getAcesBox blueBg">
                  <div className="getAcesInr">
                    <h4>Connect Over</h4>
                    <h2>3200 Agents</h2>
                    <p>to Help You Get a Property</p>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div class="getAcesRightBlk">
                  <div class="mainHdng">
                    <div class=" align-items-center">
                      <div class="mainHdngTitle">
                        <h2>
                          <b>
                            <span>
                              Get Access to the best
                              <br />
                            </span>
                            Property Around
                          </b>{" "}
                        </h2>
                        <p>
                          Listed Over <b>3000+ </b> Properties Around You
                        </p>
                      </div>
                    </div>
                    <div class="Mainhdingbtn">
                      <Link to="listing.html" class="comn-btn whiteBtn">
                        Browse Properties
                      </Link>
                      <Link to="contact.html" class="comn-btn blu">
                        <span>Contact us</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper latestProprtyBlk pd60">
          <div class="container">
            <div class="mainHdng pdbtm-60">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle">
                    <h2>
                      Latest <span>Properties</span>
                    </h2>
                  </div>
                </div>
                <div class="col">
                  <div class="hdngAviableRight pull-right">
                    <a href="javascript:void(0)">
                      <div class="hdngIcon  d-inline">
                        <img src="images/home.png" alt="Home Icon" />
                      </div>
                      <div class="hdngRigtTitle d-inline">
                        <span>280+ Cities</span>Available Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="latestPrortySlider swiperFullArrow">
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              navigation={true}
              pagination={true}
              clickable={true}
              className="mySwiper"
            >
              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property2.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property1.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property3.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property2.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property2.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property2.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property1.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property3.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div class="cardPropertyBox latestprtyBox">
                  <div class="row g-0 d-flex">
                    <div class="col-auto d-none d-lg-block">
                      <div class="cartBlkImg col-auto">
                        <img src="images/f-property2.jpg" />
                        <span class="batchImg whiteBatch">
                          <img src="images/photo.png" /> 5
                        </span>
                      </div>
                    </div>
                    <div class="cartBlkDes col">
                      <h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>
                      <p class="card-text mb-auto">
                        <span class="locationicon">
                          <img src="images/locationIcon.jpg" />
                        </span>
                        1680 Lincoln Ave, Montreal
                      </p>
                      <div class="prpertyTotal">
                        <h3 class="d-inline">
                          <small>$</small> 3200 <span>/ Monthly</span>
                        </h3>
                        <p class="readMrBtn ">
                          <a href="javascript:void(0)" class="">
                            <img src="images/arrow.png" />
                          </a>
                        </p>
                      </div>
                      <div class="featurePrprtyList">
                        <ul>
                          <li>
                            <span>
                              <img src="images/bed.png" />
                            </span>{" "}
                            4 Beds
                          </li>
                          <li>
                            <span>
                              <img src="images/baths.png" />
                            </span>{" "}
                            3 Baths
                          </li>
                          <li>
                            <span>
                              <img src="images/sqft.png" />
                            </span>{" "}
                            3600sq ft
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="viewAllBtn text-center mtop-20">
            <a href="javascript:void(0)" class="comn-btn brderBtn rounded-pill">
              {" "}
              View All
            </a>
          </div>
        </section>

        <section class="wrapper downloadAppBlk pd60">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="mainHdng ">
                  <div class="whiteHdng">
                    <h2>
                      Download the App to get <br />
                      Exciting Features Prime Content
                    </h2>
                  </div>
                </div>

                <div class="appFeature">
                  <div class="feature">
                    <div class="feature-icon ">
                      <img src="images/cyber.png" alt="cyber" />
                    </div>
                    <h2>Cyber Secured</h2>
                    <p>No more Loop Holes</p>
                  </div>
                  <div class="feature">
                    <div class="feature-icon ">
                      <img src="images/renting.png" alt="cyber" />
                    </div>
                    <h2>Easy Renting Process</h2>
                    <p>Move to your New Home in 10 Days</p>
                  </div>
                  <div class="feature">
                    <div class="feature-icon ">
                      <img src="images/better.png" alt="cyber" />
                    </div>
                    <h2>Better Notifications</h2>
                    <p>Get to be Notified First</p>
                  </div>
                </div>
                <div class="appBtnOnline">
                  <a href="javascript:void(0)">
                    <img
                      src="images/googleplaystore.png"
                      alt="Google Play Store"
                    />
                  </a>
                  <a href="javascript:void(0)">
                    <img src="images/appstore.png" alt="Apple App Store" />
                  </a>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mobileSlidBanr">
                  <Swiper
                    slidesPerView={"2"}
                    pagination={false}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <img src="images/mobile-slide1.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="images/mobile-slide2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="images/mobile-slide2.jpg" />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="images/mobile-slide2.jpg" />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper pd60 testiMonialBlk">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="testiMnl-cricle">
                  <div class="testiMnInrBox">
                    <div class="testIcon text-center">
                      <img src="images/client-arrow.png" alt="Icon" />
                    </div>
                    <div class="hapyClintHeading">
                      <p>Happy Clients</p>
                    </div>
                  </div>
                  <div className="testiImgIcon">
                    <ul>
                      <li>
                        <img src="images/testimonial1.jpg" />
                      </li>
                      <li>
                        <img src="images/testimonial2.jpg" />
                      </li>
                      <li>
                        <img src="images/testimonial3.jpg" />
                      </li>
                      <li>
                        <img src="images/testimonial4.jpg" />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="testiMnlSldr">
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={true}
                    clickable={true}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div class="testiMonialIner">
                        <div class="testiContent">
                          <h4>
                            “Vivamus mcorper laoreet orci libero et felis. Nam
                            augue sapien, tempor sit amet tellu s et, blandit
                            ultricies nulla.”
                          </h4>
                          <div class="testiRating">
                            <div class="ratings">
                              <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <div class="tstiAuthor">
                            <h3>Adam Smith</h3>
                            <p>Web Designer</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="testiMonialIner">
                        <div class="testiContent">
                          <h4>
                            “Vivamus mcorper laoreet orci libero et felis. Nam
                            augue sapien, tempor sit amet tellu s et, blandit
                            ultricies nulla.”
                          </h4>
                          <div class="testiRating">
                            <div class="ratings">
                              <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <div class="tstiAuthor">
                            <h3>Adam Smith</h3>
                            <p>Web Designer</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div class="testiMonialIner">
                        <div class="testiContent">
                          <h4>
                            “Vivamus mcorper laoreet orci libero et felis. Nam
                            augue sapien, tempor sit amet tellu s et, blandit
                            ultricies nulla.”
                          </h4>
                          <div class="testiRating">
                            <div class="ratings">
                              <div class="stars">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                              </div>
                            </div>
                          </div>
                          <div class="tstiAuthor">
                            <h3>Adam Smith</h3>
                            <p>Web Designer</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper pd60 clientBlk">
          <div class="container">
            <div class="row">
              <div class="mainHdng pdbtm-60">
                <div class="row align-items-center pull-right">
                  <div class="col">
                    <div class="mainHdngTitle ">
                      <h2>
                        rent<span>digi </span>.ca featured in{" "}
                        <span>Cities</span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4"></div>
              <div class="col-md-8">
                <div class="clientSlider">
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {this.state.sponsorData.map((l) => {
                      return (
                        <>
                          <SwiperSlide>
                            <img src={`${this.state.imgurl}${l.filename}`} />
                          </SwiperSlide>
                        </>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper pd60 latestBlogBlk">
          <div class="container">
            <div class="mainHdng pdbtm-60">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle text-center">
                    <h4>
                      Our <span>Blog Post</span>
                    </h4>
                    <h2>
                      Latest Blogs<span>& Articles </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div class="LatstBlogSlidr">
              <Swiper
                navigation={true}
                slidesPerView={4}
                spaceBetween={30}
                className="mySwiper"
              >
                {this.state.blogData.map((l) => {
                  return (
                    <>
                      <SwiperSlide>
                        <div class="cardPropertyBox blogListBox">
                          <div class="row g-0 ">
                            <div class="col-auto">
                              <a href="javascript:void(0)">
                                <div class="cartBlkImg">
                                  <img src="images/f-property2.jpg" />
                                  <span class="batchImg"> Dec 24, 2021</span>
                                  <div class="blogCat">
                                    <h4>
                                      <a href="javascript:void(0)">
                                        Home, Villa
                                      </a>
                                    </h4>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div class="col d-flex">
                              <h3 class="mb-0">
                                An Old Convent Compact Luxury Home
                              </h3>
                            </div>
                            <div class="blgRrdBtn">
                              <a href="javascript:void(0)">Read More</a>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </section>

        <section class="wrapper pd60 instaFedBlk lightBg">
          <div class="container">
            <div class="mainHdng pdbtm-60">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle text-center">
                    <h4>
                      We are in <span>Instagram</span>
                    </h4>
                    <h2>
                      Follow us to <span>stay inspired </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="instaFeedInr">
              <div class="row">
                <div class="col">
                  <div class="instaInrDiv">
                    <a href="javascript:void(0)">
                      <div class="instaImg">
                        <img src="images/property2.jpg" alt="Instagram" />
                      </div>
                      <div class="instaIcon">
                        <i class="fa fa-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col">
                  <div class="instaInrDiv">
                    <a href="javascript:void(0)">
                      <div class="instaImg">
                        <img src="images/property3.jpg" alt="Instagram" />
                      </div>
                      <div class="instaIcon">
                        <i class="fa fa-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col">
                  <div class="instaInrDiv">
                    <a href="javascript:void(0)">
                      <div class="instaImg">
                        <img src="images/property3.jpg" alt="Instagram" />
                      </div>
                      <div class="instaIcon">
                        <i class="fa fa-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col">
                  <div class="instaInrDiv">
                    <a href="javascript:void(0)">
                      <div class="instaImg">
                        <img src="images/f-property2.jpg" alt="Instagram" />
                      </div>
                      <div class="instaIcon">
                        <i class="fa fa-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col">
                  <div class="instaInrDiv">
                    <a href="javascript:void(0)">
                      <div class="instaImg">
                        <img src="images/f-property1.jpg" alt="Instagram" />
                      </div>
                      <div class="instaIcon">
                        <i class="fa fa-instagram"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
