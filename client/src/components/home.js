import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
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
import Autocomplete from "react-google-autocomplete";
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from "swiper";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import $ from "jquery";
import { momentDate, trimeString } from "./helper.js";
import Select from "react-select";

/* const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]; */
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
    sliderValues: [100, 3000],
    imgurl: config.googleAuth.imgurl,
    checkUser: localStorage.getItem("Uid"),
    mapapikey: config.googleAuth.mapapikey,
    userData: [],
    pagestatus: false,
    loginuserId: "",
    citiesData: [],
    featuresData: [],
    singleCategory: [],
    MultipleCategory: [],
    utiliteData: [],
    homeData: [],
    leaseTermArr: [],
    parkingData: [],
    homefeaturesData: [],
    bedData: [],
    furnishingData: [],
    bathData: [],
    latestData: [],
    testimonialData: [],
    options: [],
    selectedOption: null,
    searchData: [
      {
        categoryArr: [],
        minRent: 0,
        maxRent: 0,
        bedroomArr: [],
        bathroomArr: [],
        furnishingArr: [],
        leaseTermArr: [],
        utilityArr: [],
        parkingArr: [],
        homeFeaturesArr: [],
        availabilityDatesArr: [],
        dogs: "",
        cats: "",
        smokingArr: [],
        proximity: "",
        keyword: "",
      },
    ],
    searchStatus: false,
    minValue: 0,
    maxValue: 0,
    countCity: "0",
    countPro: "0",
    statusPro: false,
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
    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_unit_flag: 2, //0=single,multiple=1,2=both
        userId_flag: 1, //1 with out id,0=with id
      }),
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
      fetch(
        config.googleAuth.backURL + `user/fetch_cities_properties`,
        options
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `user/fetch_featured_properties`,
        options
      ).then((value) => value.json()),
      fetch(config.googleAuth.backURL + `fetch_all_category`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_utility`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_parking`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_lease_term`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_home_features`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_bedroom`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_furnishing`, options).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `fetch_all_bathroom`, options).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_home_user_property_by_user_id`,
        getList
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `settings/fetch_all_testimonials`,
        getList
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `user/fetch_min_max_price`,
        options
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `user/fetch_city_property_count`,
        options
      ).then((value) => value.json()),
      // fetch(
      //   config.googleAuth.backURL + `user/fetch_all_instafeed`,
      //   options
      // ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test feartyre", value[4].data);
        this.setState({
          bannerData: value[0].data.bannerDetails,
          blogData: value[1].data,
          sponsorData: value[2].data.sponsorDetails,
          citiesData: value[3].data,
          featuresData: value[4].data,
          singleCategory: value[5].singlearray,
          MultipleCategory: value[5].mutiplearray,
          utiliteData: value[6].data,
          parkingData: value[7].data,
          leaseTermArr: value[8].data,
          homefeaturesData: value[9].data,
          bedData: value[10].data,
          furnishingData: value[11].data,
          bathData: value[12].data,
          latestData: value[13].data,
          testimonialData: value[14].data,
          sliderValues: [value[15].min, value[15].max],
          minValue: value[15].min,
          maxValue: value[15].max,
          countCity: value[16].data ? value[16].data.length : 0,
          // countPro:
          //   value[16].data.lenght != 0
          //     ? value[16].propertyCount[0].passing_scores
          //     : 0,
          statusPro: true,
        });
        var newData = [...this.state.searchData];
        newData[0].minRent = value[15].min;
        newData[0].maxRent = value[15].max;
        this.setState({ newData });
        //json response

        var newData1 = [];
        value[5].singlearray.forEach((element) => {
          console.log(element.cat_name);
          newData1.push({ value: element._id, label: element.cat_name });
        });
        console.log("options", newData1);
        this.setState({ options: newData1 });
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
    //alert("test");
    this.setState({ searchStatus: true });
  };
  filterMenuAnimation = () => {
    $(".filterPopupOuterDiv").css("display", "block");
  };
  closefilter = () => {
    $(".filterPopupOuterDiv").css("display", "none");
  };
  addTofilterstring(e, name, id) {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);

    if (e.target.checked) {
      newData[0][name] = id;
      this.setState({ newData });
    } else {
      newData[0][name] = "";
      this.setState({ newData });
    }
    console.log("test", newData);
  }

  addTofiltertype(e, name, id) {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);

    if (e.target.checked) {
      newData[0][name].push({ type: id });
      this.setState({ newData });
    } else {
      let new_obj = newData[0][name];
      new_obj.splice(
        new_obj.findIndex((i) => i.type === id),
        1
      );

      this.setState({ newData });
    }
    console.log("test", newData[0]);
  }
  addTofilter(e, name, id) {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);

    if (e.target.checked) {
      newData[0][name].push({ id: id });
      this.setState({ newData });
    } else {
      let new_obj = newData[0][name];
      new_obj.splice(
        new_obj.findIndex((i) => i.id === id),
        1
      );

      this.setState({ newData });
    }
    console.log("test", newData[0]);
  }
  addTofiltertypenew(e, name, id) {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);
    /* if (e.target.checked) { */
    newData[0][name].push({ id: id });
    this.setState({ newData });
    this.setState({ type: id });
    /*  } else {
      let new_obj = newData[0][name];
      new_obj.splice(
        new_obj.findIndex((i) => i.id === id),
        1
      );

      this.setState({ newData });
    } */
    console.log("test", newData[0]);
  }
  handleChange = (sliderValues) => {
    var newData = [...this.state.searchData];
    newData[0].minRent = sliderValues[0];
    newData[0].maxRent = sliderValues[1];
    this.setState({ newData });
    this.setState({ sliderValues });
  };
  onchangetext = (e) => {
    var newData = [...this.state.searchData];
    newData[0][e.target.name] = e.target.value;
    this.setState({ newData });
    console.log(this.state);
  };

  searchList = (e, name, value) => {
    var newData = [...this.state.searchData];
    newData[0][name] = value;
    this.setState({ newData });
    //console.log(this.state);
    this.setState({ searchStatus: true });
  };
  searchListfortype(e, name, id) {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);

    newData[0][name].push({ id: id });
    this.setState({ newData });
    this.setState({ searchStatus: true });
  }
  clearSearch = (e) => {
    e.preventDefault();
    $("input[type='checkbox']").prop("checked", false);
    var newData = [...this.state.searchData];
    /* var newData1 = [...this.state.sliderValues];
    newData1 = [100, 3000]; */
    newData[0].categoryArr = [];
    newData[0].minRent = 100;
    newData[0].maxRent = 3000;
    newData[0].bedroomArr = [];
    newData[0].bathroomArr = [];
    newData[0].furnishingArr = [];
    newData[0].leaseTermArr = [];
    newData[0].utilityArr = [];
    newData[0].parkingArr = [];
    newData[0].homeFeaturesArr = [];
    newData[0].availabilityDatesArr = [];
    newData[0].dogs = "";
    newData[0].cats = "";
    newData[0].smokingArr = [];
    newData[0].proximity = "";
    newData[0].keyword = "";

    this.setState({ newData });
    this.setState({ sliderValues: [100, 3000] });
  };
  handleChange1 = (selectedOption) => {
    var newData = [...this.state.searchData];
    //console.log(e.target.checked);
    /* if (e.target.checked) { */
    newData[0]["categoryArr"].push({ id: selectedOption.value });
    this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    );
    this.setState({ newData });
    //this.setState({ type: selectedOption.value });
    /*  } else {
      let new_obj = newData[0][name];
      new_obj.splice(
        new_obj.findIndex((i) => i.id === id),
        1
      );

      this.setState({ newData });
    } */
    console.log("test", newData[0]);
    /*  this.setState({ selectedOption }, () =>
      console.log(`Option selected:`, this.state.selectedOption)
    ); */
  };
  render() {
    const { selectedOption } = this.state;
    const { sliderValues } = this.state;
    const params = {
      spaceBetween: 30,
      navigation: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1700: {
          slidesPerView: 6,
        },
        1500: {
          width: 1500,
          slidesPerView: 4,
        },

        1100: {
          width: 1100,
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        380: {
          slidesPerView: 1,
        },
      },
      className: "mySwiper",
    };
    const paramsBanner = {
      spaceBetween: 50,
      slidesPerView: 1,
    };
    const paramsPropertytype = {
      spaceBetween: 30,
      navigation: true,
      centeredSlides: true,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        1700: {
          slidesPerView: 5,
        },
        991: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 1,
        },
      },

      className: "mySwiper",
    };
    const paramsfeature = {
      navigation: true,
      spaceBetween: 10,
      breakpoints: {
        1200: {
          width: 1200,
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 1,
        },
      },
      className: "mySwiper",
    };
    const paramsLatestproperty = {
      spaceBetween: 20,
      navigation: true,
      pagination: false,
      clickable: true,
      breakpoints: {
        1700: {
          width: 1200,
          slidesPerView: 3,
        },
        1500: {
          width: 1200,
          slidesPerView: 3,
        },

        767: {
          width: 1000,
          slidesPerView: 3,
        },
        480: {

          slidesPerView: 1,
        },
      },
      className: "mySwiper",
    };
    const Explorecity = () => {
      return (
        <Swiper {...params}>
          {this.state.citiesData.map((l) => {
            return (
              <>
                <SwiperSlide>
                  <div class="explrCityItem">
                    <a
                      href="javascript:void(0)"
                      onClick={(e) => this.searchList(e, "proximity", l.city)}
                    >
                      <div
                        className="explrCityImg"
                        style={{
                          backgroundImage: `url(${this.state.imgurl}${l.fileDetails[0].filename})`,
                        }}
                      >
                        <div className="explrCityOverlay"></div>
                      </div>

                      <div class="expleItmDiv">
                        <p>{l.count} Properties</p>
                        <i>{l.city}</i>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      );
    };
    const Banner = () => {

      { console.log("helllo", this.state.bannerData) }

      return (
        <Swiper {...paramsBanner}>
          {this.state.bannerData.map((l) => {
            return (
              <>
                <SwiperSlide>
                  {l.filename != "" ? (
                    <>
                      <img src={`http://13.232.50.109:8081/${l.filename}`} />
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
        </Swiper>
      );
    };
    const Propertytype = () => {
      return (
        <Swiper {...paramsPropertytype}>
          {this.state.singleCategory.map((l) => {
            return (
              <>
                <SwiperSlide>
                  <div
                    class="ExlprPrtyBox active text-center"
                    onClick={(e) =>
                      this.searchListfortype(e, "categoryArr", l._id)
                    }
                  >
                    <div class="feature">
                      <div class="feature-icon ">
                        <img src={`${this.state.imgurl}${l.cat_img}`} alt="House Icon" />
                      </div>
                      <i>{l.cat_name}</i>
                    </div>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      );
    };
    const FeatureProperty = () => {
      return (
        <Swiper {...paramsfeature}>
          {this.state.featuresData.map((l) => {
            return (
              <>
                <SwiperSlide>
                  <Link to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}>
                    <div class="cardPropertyBox">
                      <div class="row g-0 d-flex">
                        <div class="cartBlkImg col-auto">
                          <span class="batchImg">Featured</span>
                          <div className="cartImg" style={{ backgroundImage: `url(${this.state.imgurl}${l.fileDetails[0].filename})`, }}></div>
                        </div>
                        <div class="cartBlkDes col">
                          <div>
                            <h3 class="mb-0">{l.address}</h3>
                            <p class="card-text mb-auto">
                              <span class="locationicon">
                                <img src="images/locationIcon.jpg" />
                              </span>
                              {l.address}
                            </p>
                            <div class="featurePrprtyList">
                              <ul>
                                <li>
                                  <span>
                                    <img src="images/bed.png" />
                                  </span>{" "}
                                  {l.bedroomCount} Beds
                                </li>
                                <li>
                                  <span>
                                    <img src="images/baths.png" />
                                  </span>{" "}
                                  {l.bathroomCount} Baths
                                </li>
                                <li>
                                  <span>
                                    <img src="images/sqft.png" />
                                  </span>{" "}
                                  {l.sq_foot}sq ft
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="prpertyTotal d-flex justify-content-between align-items-center">
                            <i class="">
                              <small>$</small> {l.monthly_rent}{" "}
                              <span>/ Monthly</span>
                            </i>
                            <p class="readMrBtn ">
                              <a href="javascript:void(0)" class="">
                                <span className="arrowBlue"><img src="images/arrow.png" /></span>
                                <span className="arrowWhite"><img src="images/arrowWhite.png" /></span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      );
    };
    const Latestproperty = () => {
      return (
        <Swiper {...paramsLatestproperty}>
          {this.state.latestData.map((l) => {
            return (
              <>
                <SwiperSlide>
                  <div class="cardPropertyBox latestprtyBox">
                    <Link
                      to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}
                    >
                      <div class="row g-0 d-flex">
                        <div class="">
                          <div class="cartBlkImg col-12">
                            <div
                              class="cartImg"
                              style={{
                                backgroundImage: `url(${this.state.imgurl}${l.fileDetails[0].filename})`,
                              }}
                            ></div>
                            <span class="batchImg whiteBatch">
                              <img src="images/photo.png" /> 5
                            </span>
                          </div>
                        </div>
                        <div class="cartBlkDes col-12">
                          <div class="ltsprptyh3">
                            <h3 class="mb-0">{l.property_heading}</h3>
                            <p class="card-text mb-auto">
                              <span class="locationicon">
                                <img src="images/locationIcon.jpg" />
                              </span>
                              {l.address}
                            </p>

                            <div class="prpertyTotal d-flex justify-content-between align-items-center">
                              <i class="">
                                <small>$</small> {l.monthly_rent}{" "}
                                <span>/ Monthly</span>
                              </i>
                              <p class="readMrBtn">
                                <a href="javascript:void(0)" class="">
                                  <span className="arrowBlue"><img src="images/arrow.png" /></span>
                                  <span className="arrowWhite"><img src="images/arrowWhite.png" /></span>
                                </a>
                              </p>
                            </div>
                          </div>
                          <div class="featurePrprtyList">
                            <ul>
                              <li>
                                <span>
                                  <img src="images/bed.png" />
                                </span>{" "}
                                {l.bedroomDetails.length == 1
                                  ? l.bedroomDetails[0].type
                                  : ""}{" "}
                                Beds
                              </li>
                              <li>
                                <span>
                                  <img src="images/baths.png" />
                                </span>{" "}
                                {l.bathroomDetails.length == 1
                                  ? l.bathroomDetails[0].type
                                  : ""}{" "}
                                Baths
                              </li>
                              <li>
                                <span>
                                  <img src="images/sqft.png" />
                                </span>{" "}
                                {l.sq_foot}sq ft
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      );
    };

    return (
      <div class="body">
        {this.state.searchStatus ? (
          <Redirect
            to={{
              pathname: "listproperty.html",
              state: this.state.searchData,
            }}
          />
        ) : (
          <></>
        )}

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
          <Banner />
        </section>

        <section class="wrapper  advanceSrchBlk">
          <div class="container">
            <div class="advanceSrchDiv">
              <form
                class="commonForm advanceSrchForm"
                onSubmit={this.searchSubmit}
              >
                <div class="row align-items-center">
                  <div class="form-group col-md">
                    <div class="srchCity">
                      {/* <input
                        type="text"
                        class="form-control d-inline "
                        placeholder="Seach by city or address"
                        name="address"
                        value={this.state.address}
                        onChange={this.changedata}
                      /> */}
                      <Autocomplete
                        apiKey={this.state.mapapikey}
                        onPlaceSelected={(place) => {
                          var newData = [...this.state.searchData];
                          newData[0].proximity = place.formatted_address;
                          this.setState({ newData });

                          console.log(this.state);
                        }}
                        class="form-control d-inline "
                        placeholder="Search by City or Address"
                        onChange={this.onchangetext}
                        name="proximity"
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
                    <div className="selectTypeCol">
                      <Select
                        options={this.state.options}
                        value={selectedOption}
                        onChange={this.handleChange1}
                      />
                    </div>
                    {/*  <select
                      class="form-select"
                      aria-label="Default select example"
                      name="type"
                      value={this.state.type}
                      onChange={(e) =>
                        this.addTofiltertypenew(
                          e,
                          "categoryArr",
                          e.target.value
                        )
                      }
                    >
                      <option selected>Type</option>
                      {this.state.singleCategory.map((l) => {
                        return (
                          <>
                            <option value={l._id}>{l.cat_name}</option>
                          </>
                        );
                      })}
                    </select> */}
                    <span
                      class="errormsgforgotemail"
                      style={{
                        color: "red",
                      }}
                    >
                      {this.state.validType}
                    </span>
                  </div>
                  <div class="form-group col-md-auto">
                    <div class="advanceSrchTogle">
                      <a
                        href="javascript:void(0)"
                        onClick={this.filterMenuAnimation}
                      >
                        <p class="d-inline">Advance Search</p>
                        <div class="advanceSrchIcon d-inline ">
                          <i class="fa fa-plus"> </i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="form-group col-md-auto">
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
            <div class="mainHdng pdbtm-40">
              <div class="row align-items-center">
                <div class="col col-xs">
                  <div class="mainHdngTitle">
                    <h2>
                      Explore the <span>Cities</span>
                    </h2>
                  </div>
                </div>
                <div class="col col-xs">
                  <div class="hdngAviableRight pull-right">
                    <a href="javascript:void(0)">
                      <div class="hdngIcon d-inline">
                        <img src="images/home.png" alt="Home Icon" />
                      </div>
                      <div class="hdngRigtTitle d-inline">
                        <span>{this.state.countCity}+ Cities</span>Available
                        Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="explorcitySlider swiperFullArrow">
            <Explorecity />
          </div>
        </section>

        <section class="wrapper lightBg proprType pd80">
          <div class="container">
            <div class="row align-items-center d-flex">
              <div class="col-md-10">
                <div class="properTypeFeature">
                  <Propertytype />
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
                      <span>+{4} Available Properties</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper featrdPrprtyBlk pd60">
          <div class="container">
            <div class="mainHdng pdbtm-40 ">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle ">
                    <h2>
                      Featured <span>Propeties</span>
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
                        <span>{this.state.countCity}+ Cities</span>Available
                        Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="featureProprtyBlk swiperFullArrow pdtop-60">
            <FeatureProperty />
            <div class="viewAllBtn text-center mtop-50">
              <Link
                to="listproperty.html"
                class="comn-btn brderBtn rounded-pill"
              >
                {" "}
                View All
              </Link>
            </div>
          </div>
        </section>

        <section class="wrapper getAcesBlk pd80">
          <div class="container">
            <div class="row align-items-center d-flex ">
              <div class="col-md-7">
                <div class="getAcesBox whitBg">
                  <div className="getAcesInr">
                    <h5>Get Access Over</h5>
                    <h4>
                      15033 <span>Property</span>
                    </h4>
                    <p>Get a Feature Rich Home</p>
                  </div>
                </div>
                <div class="getAcesBox blueBg">
                  <div className="getAcesInr">
                    <h5>Connect Over</h5>
                    <h4>3200 Agents</h4>
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
                          Listed Over <b>{this.state.countPro}+ </b> Properties
                          Around You
                        </p>
                      </div>
                    </div>
                    <div class="Mainhdingbtn">
                      <Link to="listproperty.html" class="comn-btn whiteBtn">
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
                        <span>{this.state.countCity}+ Cities</span>Available
                        Properties
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="latestPrortySlider swiperFullArrow">
            <Latestproperty />
          </div>
          <div class="viewAllBtn text-center mtop-50 ">
            <Link
              to="/listproperty.html"
              class="comn-btn brderBtn rounded-pill"
            >
              {" "}
              View All
            </Link>
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
                    <div>
                      <h5>Cyber Secured</h5>
                      <p>No more Loop Holes</p>
                    </div>
                  </div>
                  <div class="feature">
                    <div class="feature-icon ">
                      <img src="images/renting.png" alt="cyber" />
                    </div>
                    <div>
                      <h5>Easy Renting Process</h5>
                      <p>Move to your New Home in 10 Days</p>
                    </div>
                  </div>
                  <div class="feature">
                    <div class="feature-icon ">
                      <img src="images/better.png" alt="cyber" />
                    </div>
                    <div>
                      <h5>Better Notifications</h5>
                      <p>Get to be Notified First</p>
                    </div>
                  </div>
                </div>
                <div class="appBtnOnline">
                  <a href="https://play.google.com/store/" target="_blank">
                    <img
                      src="images/googleplaystore.png"
                      alt="Google Play Store"
                    />
                  </a>
                  <a href="https://www.apple.com/in/app-store/" target="_blank">
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
                    pagination={false}
                    clickable={true}
                    className="mySwiper"
                  >
                    {this.state.testimonialData.map((l) => {
                      return (
                        <>
                          <SwiperSlide>
                            <div class="testiMonialIner">
                              <div class="testiContent">
                                <p>{l.description}</p>
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
                                  <h5>{l.name}</h5>
                                  <p>{l.designation}</p>
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

        {/* <section class="wrapper pd60 latestBlogBlk">
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
                              <a
                                href="javascript:void(0)"
                                onClick={(e) =>
                                  this.searchListfortype(
                                    e,
                                    "categoryArr",
                                    l.categoryId
                                  )
                                }
                              >
                                <div class="cartBlkImg">
                                  <img
                                    src={`${this.state.imgurl}${l.filename}`}
                                  />
                                  <span class="batchImg">
                                    {momentDate(l.timestamp, " MMM D YYYY")}
                                  </span>
                                  <div class="blogCat">
                                    <h4>
                                      <a href="javascript:void(0)">
                                        {l.categoryDetails.cat_name}
                                      </a>
                                    </h4>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div class="col d-flex">
                              <h3 class="mb-0">{l.title}</h3>
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
        </section> */}

        <section class="wrapper pd60 instaFedBlk lightBg">
          <div class="ftrInstaBg">
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
                  <div class="col-lg">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property2.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property3.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property1.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property2.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col-lg">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property3.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="filterPopupOuterDiv" style={{ display: "none" }}>
          <div class="filterOverlay"></div>
          <div class="filterPopupCntOuterDiv">
            <div class="filterPopupCloseDiv">
              <h4>More Filters</h4>
              <a href="javascript:void(0);" onClick={this.closefilter}>
                x
              </a>
            </div>

            <div class="filterPopupInnerDiv">
              <div class="filterPopupCntDiv">
              {this.state.singleCategory.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Type of Property (Single)</h4>
                  </div>
                  <>
                    Min {sliderValues[0]} - Max {sliderValues[1]}
                    <Range
                      min={this.state.minValue}
                      max={this.state.maxValue}
                      onChange={this.handleChange}
                      defaultValue={sliderValues}
                      tipFormatter={(value) => (
                        <span className="tooltip">{value}€</span>
                      )}
                    />
                  </>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.singleCategory.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    class="checkbox"
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "categoryArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.cat_name}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.MultipleCategory.length>0?(<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Type of Property (Multiple)</h4>
                    
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.MultipleCategory.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "categoryArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.cat_name}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>):(<></>)}

                {this.state.bedData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Bedrooms</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol filterCheckboxSmallCol">
                    <ul>
                      {this.state.bedData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "bedroomArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.bathData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Bathrooms</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol filterCheckboxSmallCol">
                    <ul>
                      {this.state.bathData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "bathroomArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.utiliteData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Utilities Included</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.utiliteData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "utilityArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.furnishingData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Furnishing</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.furnishingData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(
                                        e,
                                        "furnishingArr",
                                        l._id
                                      )
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.addTofilterstring.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Pets</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofilterstring(e, "cats", "true")
                              }
                            />
                            <div class="filterCheckboxText">Cats</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofilterstring(e, "dogs", "true")
                              }
                            />
                            <div class="filterCheckboxText">Dogs</div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.addTofiltertype.length?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Smoking</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "smokingArr",
                                  "Non-Smoking"
                                )
                              }
                            />
                            <div class="filterCheckboxText">Non-Smoking</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "smokingArr",
                                  "Smoking Allowed"
                                )
                              }
                            />
                            <div class="filterCheckboxText">
                              Smoking Allowed
                            </div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "smokingArr",
                                  "Negotiable"
                                )
                              }
                            />
                            <div class="filterCheckboxText">Negotiable</div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.parkingData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Parking</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.parkingData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "parkingArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.homefeaturesData.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Home Features</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.homefeaturesData.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(
                                        e,
                                        "homeFeaturesArr",
                                        l._id
                                      )
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.feature_name}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.addTofiltertype.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Availability Date</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "Immediate"
                                )
                              }
                            />
                            <div class="filterCheckboxText">Immediate</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "February"
                                )
                              }
                            />
                            <div class="filterCheckboxText">February</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "March"
                                )
                              }
                            />
                            <div class="filterCheckboxText">March</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "April"
                                )
                              }
                            />
                            <div class="filterCheckboxText">April</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "May"
                                )
                              }
                            />
                            <div class="filterCheckboxText">May</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "June"
                                )
                              }
                            />
                            <div class="filterCheckboxText">June</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "July"
                                )
                              }
                            />
                            <div class="filterCheckboxText">July</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "August"
                                )
                              }
                            />
                            <div class="filterCheckboxText">August</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "September"
                                )
                              }
                            />
                            <div class="filterCheckboxText">September</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "September"
                                )
                              }
                            />
                            <div class="filterCheckboxText">October</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "November"
                                )
                              }
                            />
                            <div class="filterCheckboxText">November</div>
                          </label>
                        </div>
                      </li>
                      <li>
                        <div class="filterCheckboxGroup">
                          <label class="filterCheckboxInput">
                            <input
                              type="checkbox"
                              onChange={(e) =>
                                this.addTofiltertype(
                                  e,
                                  "availabilityDatesArr",
                                  "December"
                                )
                              }
                            />
                            <div class="filterCheckboxText">December</div>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>:(<></>)}

                {this.state.leaseTermArr.length>0?<div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Term of Lease</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol">
                    <ul>
                      {this.state.leaseTermArr.map((l) => {
                        return (
                          <>
                            <li>
                              <div class="filterCheckboxGroup">
                                <label class="filterCheckboxInput">
                                  <input
                                    type="checkbox"
                                    onChange={(e) =>
                                      this.addTofilter(e, "leaseTermArr", l._id)
                                    }
                                  />
                                  <div class="filterCheckboxText">
                                    {l.metadata}
                                  </div>
                                </label>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                </div>:(<></>)}

                <div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Proximity</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxInputCol">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter Address, Landmark or Postal Code"
                        onChange={this.onchangetext}
                        name="proximity"
                      />
                    </div>
                  </div>
                </div>
                {/* <div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Community</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxInputCol">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Type or Select Communities"
                        onChange={this.handleLanguage}
                      />
                    </div>
                  </div>
                </div> */}
                <div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Keyword</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxInputCol">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Listing ID, Phone or Landmark"
                        onChange={this.onchangetext}
                        name="keyword"
                      />
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-12 commonForm pt-3">
                  <div class="row">
                    <div class="col-md-12">
                      <label class="control control--checkbox">
                        DON'T SHOW LISTINGS MARKED RENTED/NO VACANCY
                        <input type="checkbox" />
                        <div class="control__indicator"></div>
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label class="control control--checkbox">
                        INCLUDE CLOSE MATCHES
                        <input type="checkbox" />
                        <div class="control__indicator"></div>
                      </label>
                    </div>
                    <div class="col-md-12">
                      <label class="control control--checkbox">
                        INCLUDE PREVIOUSLY HIDDEN LISTINGS
                        <input type="checkbox" />
                        <div class="control__indicator"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="filterPopupBtmButtons">
              <button class="comn-btn whiteBtn" onClick={this.clearSearch}>
                Clear
              </button>
              <button class="comn-btn blu" onClick={this.searchSubmit}>
                Search
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
