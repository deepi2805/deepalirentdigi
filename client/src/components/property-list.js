import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Switch from "react-switch";
import Header from "./headerinner";
import Header1 from "./header";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { ToastContainer, toast } from "react-toastify";
import queryString from "query-string";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Autocomplete from "react-google-autocomplete";
const AnyReactComponent = ({ text }) => (
  <div style={{ color: "red" }}>{text}</div>
);

export default class 
PropertyList extends React.Component {
  state = {
    open: false,
    checked: false,
    sliderValues: [],
    userData: [],
    pagestatus: false,
    checkUser: localStorage.getItem("Uid"),
    imgurl: config.googleAuth.imgurl,
    mapapikey: config.googleAuth.mapapikey,
    bedData: [],
    furnishingData: [],
    bathData: [],
    listData: [],
    latlangData: [],
    singleCategory: [],
    MultipleCategory: [],
    utiliteData: [],
    homeData: [],
    leaseTermArr: [],
    parkingData: [],
    homefeaturesData: [],
    primaryId: queryString.parse(this.props.location.search).id,
    searchId: queryString.parse(this.props.location.search).sid,
    center: {
      lat: 41,
      lng: -71
    },
    lat: 43.6532,
    lang: 79.3832,

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
    name: "",
    email: "",
    phone: "",
    message: "",
    landlordId: "",
    propertyId: "",
    usertype: localStorage.getItem("status"),
    address: "",
    bed: "",
    bath: "",
    price: "",
    homeSearch: false,
    sort: 3,
    minValue: "",
    maxValue: "",
    countCity: 0,
    activePage: 1,
    statusPage: 1,
  };
  static defaultProps = {
    zoom: 1,
  };

  componentDidMount() {
    //alert(this.state.searchId);
    //console.log("property_id", this.props.location.state[0]);
    var homeSearch = false;
    console.log("this.props.location.state", this.props.location.state)
    if (this.props.location.state) {
      homeSearch = true;
      //alert("done");
      console.log("test props", this.props.location.state);
      this.setState({ searchData: this.props.location.state })
    }
    //console.log(this.props.location.state);
    Geocode.setApiKey(this.state.mapapikey);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    var udId = "";
    if (this.state.checkUser) {
      const decoded_id = jwt.verify(
        localStorage.getItem("Uid"),
        config.login_secret_renter.key
      );
      udId = decoded_id.Uid;
    } else {
      udId = "";
    }
    console.log("test decode", udId);
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    var getList = {};
    if (this.state.primaryId) {
      getList = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_property_primary_id: this.state.primaryId,
        }),
      };
    } else if (this.state.searchId) {
      getList = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.searchId,
        }),
      };
    } else if (homeSearch === true) {
      getList = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.props.location.state[0]),
      };
    } else {
      getList = {
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
    }
    let getuseroption = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: udId,
      }),
    };
    Promise.all([
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
        this.state.primaryId
          ? config.googleAuth.backURL +
          `user/fetch_user_property_by_property_primary_id`
          : this.state.searchId
            ? config.googleAuth.backURL +
            `user/fetch_all_user_search_filter_property`
            : homeSearch === true
              ? config.googleAuth.backURL + `user/filter_property`
              : config.googleAuth.backURL +
              `user/fetch_home_user_property_by_user_id`,
        getList
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `user/find_property_lat_long`,
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
      fetch(config.googleAuth.backURL + `user_detail`, getuseroption).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_min_max_price`,
        options
      ).then((value) => value.json()),
      fetch(
        config.googleAuth.backURL + `user/fetch_city_property_count`,
        options
      ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test property", value[3]);
        this.setState({
          bedData: value[0].data,
          furnishingData: value[1].data,
          bathData: value[2].data,
          listData: value[3].data,
          latlangData: value[4].data,
          singleCategory: value[5].singlearray,
          MultipleCategory: value[5].mutiplearray,
          utiliteData: value[6].data,
          parkingData: value[7].data,
          leaseTermArr: value[8].data,
          homefeaturesData: value[9].data,
          userData: value[10].data,
          pagestatus: true,
          sliderValues: [value[11].min, value[11].max],
          minValue: value[11].min,
          maxValue: value[11].max,
          countCity: value[12].data.length,
        });
        var newData = [...this.state.searchData];
        newData[0].minRent = value[11].min;
        newData[0].maxRent = value[11].max;

        this.setState({ newData });
        //json response
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      let mypage = this.state.activePage + 1;
      this.setState({
        activePage: this.state.activePage + 1,
      });
      var homeSearch = false;
      if (this.props.location.state) {
        homeSearch = true;
        //alert("done");
        console.log("test props", this.props.location.state);

        this.props.location.state[0] = {
          ...this.props.location.state[0],
          minRent: this.state.sliderValues[0],
          maxRent: this.state.sliderValues[1],
          page: mypage,
        };

        console.log("mylistttttttt", this.props.location.state[0]);
      }
      // alert("bottom");
      var getList = {};
      if (this.state.primaryId) {
        getList = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_property_primary_id: this.state.primaryId,
          }),
        };
      } else if (this.state.searchId) {
        getList = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: this.state.searchId,
          }),
        };
      } else if (homeSearch === true) {
        getList = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.props.location.state[0]),
        };
      } else {
        getList = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property_unit_flag: 2, //0=single,multiple=1,2=both
            userId_flag: 1, //1 with out id,0=with id
            page: this.state.activePage,
          }),
        };
      }

      console.log("getlistssss", getList);
      fetch(
        this.state.primaryId
          ? config.googleAuth.backURL +
          `user/fetch_user_property_by_property_primary_id`
          : this.state.searchId
            ? config.googleAuth.backURL +
            `user/fetch_all_user_search_filter_property`
            : homeSearch === true
              ? config.googleAuth.backURL + `user/filter_property`
              : config.googleAuth.backURL +
              `user/fetch_home_user_property_by_user_id`,
        getList
      )
        .then((res) => {
          //console.log("response",res)
          return res.json();
        })
        .then((data) => {
          console.log("check serach", data);
          if (data.status == true) {
            if (data.data.length > 0) {
              console.log("activepppp", this.state.activePage);
              // alert(this.state.statusPage + 1);
              var newData = [...this.state.listData]; //
              data.data.forEach((element, i) => {
                console.log("element", element);

                if (!newData.includes(element)) {
                  newData.push(element);
                }
              });
              this.setState({
                listData: newData,
                statusPage: this.state.statusPage + 1,
              });

              //newData.push(data.data);
              console.log("pagenation data", this.state.listData);
            } else {
              // alert(this.state.statusPage);
              this.setState({
                activePage: this.state.statusPage,
              });
            }
            // this.setState({ newData });

            // toast(data.msg);
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  handleLanguage = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  loadMap = (map, maps, data) => {
    console.log("map", data);

    this.state.latlangData.forEach((element) => {
      console.log("testt map", element);
      var marker = new maps.Marker({
        position: { lat: element.addressLat, lng: element.addressLng },
        map,
        draggable: true,
        title: element.address,
      });

      marker.addListener("click", () => {
        $("body").find(".cardPropertyActive").removeClass("cardPropertyActive");
        $("#list" + element._id).addClass("cardPropertyActive");

        if ($("#list" + element._id).length) {
          $(".listView").animate(
            {
              scrollTop: $("#list" + element._id).offset().top,
            },
            2000
          );
        }

        let imgrul = this.state.imgurl + element.fileDetails[0].filename;
        new maps.InfoWindow({
          content:
            '<div  class="cardPropertyBox latestprtyBox mapSrchProprty position-absolute top-50 start-50 translate-middle">' +
            '<div class="col-auto d-none d-lg-block">' +
            '<div class="cartBlkImg col-auto" style="background-image:url(' +
            imgrul +
            ') " >' +
            '<span class="batchImg whiteBatch">' +
            '<img src="images/photo.png" /> ' +
            element.fileDetails.length +
            "" +
            "</span>" +
            "</div>" +
            "</div>" +
            '<div class="cartBlkDes col">' +
            '<h3 class="mb-0">' +
            element.address +
            "</h3>" +
            '<p class="card-text mb-auto">' +
            '<span class="locationicon">' +
            '<img src="images/locationIcon.jpg" />' +
            "</span>" +
            "1680 Lincoln Ave, Montreal" +
            "</p>" +
            '<div class="prpertyTotal">' +
            '<i class="d-inline">' +
            "<small>$</small> " +
            element.monthly_rent +
            " <span>/ Monthly</span>" +
            "</i>" +
            '<p class="readMrBtn ">' +
            '<a href="javascript:void(0)" class="" onclick=window.open("/detailproperty.html?id=' +
            element._id +
            "&uid=" +
            element.userId +
            '")>' +
            '<img src="images/arrow.png" />' +
            "</a>" +
            "</p>" +
            "</div>" +
            /* '<div class="featurePrprtyList">' +
            "<ul>" +
            " <li>" +
            "<span>" +
            '<img src="images/bed.png" />' +
            "</span>" +
            "" +
            element.bedroomDetails[0].type +
            " Beds" +
            "</li>" +
            "<li>" +
            "<span>" +
            '<img src="images/baths.png" />' +
            "</span>" +
            "" +
            element.bathroomDetails[0].type +
            " Baths" +
            "</li>" +
            "<li>" +
            "<span>" +
            ' <img src="images/sqft.png" />' +
            " </span>" +
            " " +
            element.sq_foot +
            "sq ft" +
            "</li>" +
            " </ul>" +
            "</div>" +*/
            " </div>" +
            "</div>",
        }).open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });
      /*  const infowindow = new maps.InfoWindow({
        content:
          '<div class="cardPropertyBox latestprtyBox mapSrchProprty position-absolute top-50 start-50 translate-middle">' +
          '<div class="col-auto d-none d-lg-block">' +
          '<div class="cartBlkImg col-auto">' +
          '<img src="images/f-property1.jpg" />' +
          '<span class="batchImg whiteBatch">' +
          '<img src="images/photo.png" /> 5' +
          "</span>" +
          "</div>" +
          "</div>" +
          '<div class="cartBlkDes col">' +
          '<h3 class="mb-0">7240C Agryle St. Lawndale, CA</h3>' +
          '<p class="card-text mb-auto">' +
          '<span class="locationicon">' +
          '<img src="images/locationIcon.jpg" />' +
          "</span>" +
          "1680 Lincoln Ave, Montreal" +
          "</p>" +
          '<div class="prpertyTotal">' +
          '<h3 class="d-inline">' +
          "<small>$</small> 3200 <span>/ Monthly</span>" +
          "</h3>" +
          '<p class="readMrBtn ">' +
          '<a href="javascript:void(0)" class="">' +
          '<img src="images/arrow.png" />' +
          "</a>" +
          "</p>" +
          "</div>" +
          '<div class="featurePrprtyList">' +
          "<ul>" +
          " <li>" +
          "<span>" +
          '<img src="images/bed.png" />' +
          '</span>{" "}' +
          "4 Beds" +
          "</li>" +
          "<li>" +
          "<span>" +
          '<img src="images/baths.png" />' +
          '</span>{" "}' +
          "3 Baths" +
          "</li>" +
          "<li>" +
          "<span>" +
          ' <img src="images/sqft.png" />' +
          " </span>" +
          " 3600sq ft" +
          "</li>" +
          " </ul>" +
          "</div>" +
          " </div>" +
          "</div>",
      }); */
    });
  };
  handleChange1 = (checked) => {
    console.log(checked);
    if (checked) {
      $(".prptyListMapDiv").css("display", "none");
      $(".listView").addClass("addgridItemFull");
    } else {
      $(".prptyListMapDiv").css("display", "block");
      $(".listView").removeClass("addgridItemFull");
    }
    this.setState({ checked });
  };
  listView = () => {
    $(".listView").addClass("addgridItem");
    $(".gridBtn").addClass("active");
    $(".listBtn").removeClass("active");
  };

  gridView = () => {
    $(".listView").removeClass("addgridItem");
    $(".listBtn").addClass("active");
    $(".gridBtn").removeClass("active");
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
  handleChange = (sliderValues) => {
    var newData = [...this.state.searchData];
    console.log("qwerty" , newData)
    newData[0].minRent = sliderValues[0];
    newData[0].maxRent = sliderValues[1];
    this.setState({ newData });
    console.log(sliderValues);
    this.setState({ sliderValues });
  };
  onchangetextsearch = (e) => {
    var newData = [...this.state.searchData];
    newData[0][e.target.name] = e.target.value;
    this.setState({ newData });
  };
  searchSubmit = () => {

    console.log(this.state.searchData[0]);

    /*  this.setState({
        activePage: 1,
      });

    this.props.location.state[0] = {
                  ...this.props.location.state[0],
                  minRent: this.state.sliderValues[0],
                  maxRent: this.state.sliderValues[1],
                  page: 1
              }; */

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.searchData[0]),
    };
    fetch(config.googleAuth.backURL + `user/filter_property`, options)
      .then((res) => {
        //console.log("response",res)
        return res.json();
      })
      .then((data) => {
        $(".filterPopupOuterDiv").css("display", "none");
        console.log("check serach", data.data);
        if (data.status == true) {
          this.setState({
            listData: data.data,
          });
          toast(data.msg);
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
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
  componentWillUpdate() {
    console.log(" checkupdate", this.state.searchData);
    console.log(" slider", this.state.sliderValues);
  }
  clearSearch = (e) => {
    e.preventDefault();

    this.setState({ sliderValues: [10,200], minValue: 10, maxValue: 200 });


    $("input[type='checkbox']").prop("checked", false);
    var newData = [...this.state.searchData];
    /* var newData1 = [...this.state.sliderValues];
    newData1 = [100, 3000]; */
    newData[0].categoryArr = [];
    newData[0].minRent = 10;
    newData[0].maxRent = 200;
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
    window.location.reload()
    $(".filterPopupOuterDiv").css("display", "none");
  };
  onOpenModal = (e, landlordId, propertyId) => {
    this.setState({
      open: true,
      landlordId: landlordId,
      propertyId: propertyId,
    });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  contactSubmit = (e) => {
    e.preventDefault();
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    //alert(decoded_id.Uid);
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const pattern = new RegExp(/^[0-9\b]+$/);
    if (this.state.name === "") {
      this.setState({ validname: "Name is required*" });
    } else {
      this.setState({ validname: "" });
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
    if (this.state.message === "") {
      this.setState({ validmessage: "Message is required*" });
    } else {
      this.setState({ validmessage: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.message === "" ||
      this.state.name === "" ||
      this.state.phone === "" ||
      this.state.email === "" ||
      reg.test(this.state.email) === false ||
      pattern.test(this.state.phone) === false
    ) {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          name: this.state.name,
          phone: this.state.phone,
          message: this.state.message,
          landlordId: this.state.landlordId,
          renterId: decoded_id.Uid,
          propertyId: this.state.propertyId,
        }),
      };
      fetch(config.googleAuth.backURL + `user/add_contact_landlord`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            this.setState({ open: false });
            toast(data.msg);
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  savedSearch = (e) => {
    e.preventDefault();
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: this.state.searchData[0],
        userId: decoded_id.Uid,
      }),
    };
    fetch(
      config.googleAuth.backURL + `user/save_search_filter_property`,
      options
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  relevanceData = (e) => {
    this.setState({ sort: e.target.value });
  };
  pageReload = (e) => {
    if (this.props.location.state && this.props.location.state.searchData) {
      let state = { ...this.props.location.state };
      delete state.state;
      // this.props.location.replace({ ...history.location, state });
    }
    this.setState({
      searchData: [{
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
      }]
    })

    
    setTimeout(() => {
      this.searchSubmit()
    }, 500)
    // window.location.reload();
  };
  smallSearch = (e) => {
    e.preventDefault();
  };
  render() {
    console.log("rajababu", this.state);
    const { sliderValues } = this.state;
    return (
      <div class="body">
        <ToastContainer />
        {this.state.checkUser ? (
          <>
            {this.state.pagestatus ? (
              <Header key1={this.state.userData} />
            ) : (
              <></>
            )}
          </>
        ) : (
          <Header1 />
        )}
        {/* {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>} */}
        {/* {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )} */}
        <section class="wrapper  propertyListMain blueBg">
          <div class="proprtListSrch">
            <div class="">
              <div class="productListAdvanceSrch d-flex justify-content-between align-items-center">
                <form
                  class="commonForm prtyLstAdvnSrh "
                  onSubmit={(e) => { e.preventDefault(); this.searchSubmit() }}
                >
                  <div class="form-group col-md-4">
                    <span>
                      <img src="images/locationIcon.jpg" />
                    </span>
                    <Autocomplete
                      apiKey={this.state.mapapikey}
                      onPlaceSelected={(place) => {
                        var newData = [...this.state.searchData];
                        newData[0].proximity = place.formatted_address;
                        this.setState({ newData });

                        console.log(this.state);
                      }}
                      class="form-control"
                      placeholder="Search by City or Address"
                      onChange={this.onchangetextsearch}
                      name="proximity"
                      value={this.state.searchData[0].proximity}
                    />
                    {/* <input
                      type="text"
                      name=""
                      placeholder=" Search by City or Address"
                      class="form-control"
                    /> */}
                  </div>
                  <div class="form-group">
                    <span>
                      <img src="images/bedicon.png" />
                    </span>
                    <select
                      class="form-select"
                      onChange={(e) =>
                        this.addTofiltertypenew(e, "bedroomArr", e.target.value)
                      }
                    >
                      <option value="">Beds</option>
                      {this.state.bedData.map((l) => {
                        return (
                          <>
                            <option value={l._id}>{l.type}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div class="form-group">
                    <span>
                      <img src="images/bath.png" />
                    </span>
                    <select
                      class="form-select"
                      onChange={(e) =>
                        this.addTofiltertypenew(
                          e,
                          "bathroomArr",
                          e.target.value
                        )
                      }
                    >
                      <option value="">Baths</option>
                      {this.state.bathData.map((l) => {
                        return (
                          <>
                            <option value={l._id}>{l.type}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  {/* <div class="form-group">
                    <span>
                      <img src="images/price.png" />
                    </span>
                   
                      <select
                      class="form-select"
                      onChange={this.handleLanguage}
                      value={this.state.price}
                    >
                      <option>Price</option>
                      <option>100</option>
                      <option>150</option>
                      <option>200</option>
                      <option>300</option>
                    </select>
                  </div> */}
                  <div class="form-group">
                    <button type="submit" class="btn lightBtn" >
                      Rent Now
                      
                    </button>
                  </div>
                </form>
                <div class="advansrchList">
                  <ul>
                    <li>
                      <a href="javascript:void(0)" onClick={this.pageReload}>
                        <span>
                          <img src="images/reset.png" />
                        </span>
                        Reset Search
                      </a>
                    </li>
                    {this.state.usertype == 1 ? (
                      <></>
                    ) : (
                      <>
                        <li>
                          <a
                            href="javascript:void(0)"
                            onClick={this.savedSearch}
                          >
                            <span>
                              <img src="images/save-search.png" />
                            </span>
                            Save
                          </a>
                        </li>
                      </>
                    )}
                    <li>
                      <a href="#">Hide/Show Map </a>
                      <label class={this.state.checked ? "mapChecked" : ""}>
                        <Switch
                          onChange={this.handleChange1}
                          checked={this.state.checked}
                          handleDiameter={24}
                          offColor="#fff"
                          onColor="#fff"
                          offHandleColor="#64a2d3"
                          onHandleColor="#64a2d3"
                          height={30}
                          width={62}
                          activeBoxShadow="0px 0px 1px 2px #fff"
                        />
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper container-fluid prptyDataBlk prptListPageBlk">
          <div class="row">
            <div class="col-md-7">
              <div class="prptyListMapDiv">
                <div class="mapFrameDiv">
                  <div class="mapFrameInr">
                    {this.state.pagestatus ? (
                      <>
                        <div
                          style={{
                            height: "920px",
                            width: "100%",
                            borderRadius: "15px!important",
                          }}
                        >
                          {console.log("222222" , this.state.latlangData)}
                          <GoogleMapReact
                            bootstrapURLKeys={{
                              key: this.state.mapapikey,
                            }}
                            defaultCenter={this.state.center}
                            defaultZoom={this.props.zoom}
                            yesIWantToUseGoogleMapApiInternals
                            onGoogleApiLoaded={({ map, maps }) =>
                              this.loadMap(map, maps, this.state.latlangData)
                            }
                          ></GoogleMapReact>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div class="mapUpdarData sideBarFiterDiv">
                    <a
                      href="javascript:void(0)"
                      class="btn comn-btn blu filterBtn"
                      onClick={this.filterMenuAnimation}
                    >
                      Show Filter
                      <span class="filterIcon">
                        <img src="images/filter.png" />
                      </span>
                    </a>
                  </div>
                  <div className="nav-links" ref={this.advanSrch}>
                    <div class="sideBarLogo">
                      <a href="javascript:void(0)">
                        <img src="images/ftr-logo.png" />
                      </a>
                    </div>
                    sddhdhfd ffdh fdhfdhfdh
                  </div>

                  <div
                    style={{ display: "none" }}
                    class="cardPropertyBox latestprtyBox mapSrchProprty position-absolute top-50 start-50 translate-middle"
                  >
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
              </div>
            </div>
            <div class={this.state.checked ? "col-md-12" : "col-md-5"}>
              <div class="prtyListRightBlk">
                <div class="py-20">
                  <div class="row align-items-center">
                    <div class="col">
                      <div class="mainHdng sideBarHdng">
                        <h3>Properties available for rent</h3>
                        <div class="hdngAviableRight">
                          <a href="javascript:void(0)">
                            <div class="hdngIcon d-inline">
                              <img src="images/home.png" alt="Home Icon" />
                            </div>
                            <div class="hdngRigtTitle d-inline">
                              <span>{this.state.listData.length}</span>
                              Available Properties
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col d-flex justify-content-end">
                      <div class="listGridBtn">
                        <button class="btn gridBtn" onClick={this.listView}>
                          <i class="fa fa-th" aria-hidden="true"></i>
                        </button>
                        <button
                          class="btn listBtn active"
                          onClick={this.gridView}
                        >
                          <i class="fa fa-list" aria-hidden="true"></i>
                        </button>
                      </div>
                      <div class="selectProptySide">
                        <div class="form-group">
                          <select
                            class="form-select"
                            onChange={this.relevanceData}
                          >
                            <option>Select</option>
                            <option value="2">Price (Low to high)</option>
                            <option value="1">Price (High to Low)</option>
                            <option value="3">Newest</option>
                            <option value="4">Oldest</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.listData.length > 0 ? (
                  <div class="listView" onScroll={this.handleScroll}>
                    {this.state.listData
                      .sort((b, a) =>
                        this.state.sort == 1
                          ? a.monthly_rent - b.monthly_rent
                          : this.state.sort == 2
                            ? b.monthly_rent - a.monthly_rent
                            : this.state.sort == 3
                              ? a.timestamp - b.timestamp
                              : b.timestamp - a.timestamp
                      )
                      .map((l) => {
                        return (
                          <>
                            <div id={`list${l._id}`}>
                              <div class="cardPropertyBox">
                                <Link
                                  to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}
                                >
                                  <div class="row g-0 d-flex">
                                    <div
                                      class="cartBlkImg col-auto"
                                    >
                                      <div
                                        class="cartImg"
                                        style={{
                                          backgroundImage: `url(${this.state.imgurl}${l.fileDetails[0].filename})`,
                                        }}
                                      ></div>
                                      {l.isfeatured ? (
                                        <>
                                          <span class="batchImg">Featured</span>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      <span class="batchImg whiteBatch">
                                        <img src="images/photo.png" />{" "}
                                        {l.fileDetails.length}
                                      </span>
                                      <div></div>
                                    </div>
                                    <div class="cartBlkDes col">
                                      <h3 class="mb-0">{l.property_heading}</h3>

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
                                            {l.bedroomDetails.length == 1
                                              ? l.bedroomDetails[0].type
                                              : ""}
                                            Beds
                                          </li>
                                          <li>
                                            <span>
                                              <img src="images/baths.png" />
                                            </span>{" "}
                                            {l.bathroomDetails.length == 1
                                              ? l.bathroomDetails[0].type
                                              : ""}
                                            Baths
                                          </li>
                                          <li>
                                            <span>
                                              <img src="images/sqft.png" />
                                            </span>{" "}
                                            {l.sq_foot} sq ft
                                          </li>
                                        </ul>
                                      </div>
                                      <div class="prpertyTotal">
                                        <i class="d-inline">
                                          <small>$</small> {l.monthly_rent}{" "}
                                          <span>/ Monthly</span>
                                        </i>

                                        {this.state.usertype == 1 ||
                                          this.state.checkUser != "" ? (
                                          <></>
                                        ) : (
                                          <>
                                            {" "}
                                            <p class="readMrBtn landLordBtn ">
                                              <a
                                                href="javascript:void(0)"
                                                class=""
                                                onClick={(e) =>
                                                  this.onOpenModal(
                                                    e,
                                                    l.userId,
                                                    l._id
                                                  )
                                                }
                                              >
                                                Contact Landloard
                                              </a>
                                            </p>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                ) : (
                  <>
                    <span>No data found!</span>
                  </>
                )}
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
              {this.state.singleCategory.length>0?
              
              <div class="filterPopupFilterItem">
                  <div class="filterPopupHdng">
                    <h4>Type of Property (Single)</h4>
                  </div>
                  {console.log("sliderValues", this.state.minValue, this.state.maxValue)}
                  {this.state.minValue &&
                    this.state.maxValue &&
                    sliderValues.length > 0 ? (
                    <>
                      Min ${sliderValues[0]} - Max ${sliderValues[1]}
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
                  ) : (
                    ""
                  )}

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

                {this.state.MultipleCategory.length>0?<div class="filterPopupFilterItem">
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
                </div>:(<></>)}

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
                  <div class="filterPopupFilterCol filterCheckboxCol petsColList">
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

                { this.addTofiltertype.length>0?<div class="filterPopupFilterItem">
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

                {this.addTofiltertype.length>0?<div class="filterPopupFilterItem ">
                  <div class="filterPopupHdng">
                    <h4>Availability Date</h4>
                  </div>
                  <div class="filterPopupFilterCol filterCheckboxCol avilabiltyDateCol">
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
                        onChange={this.onchangetextsearch}
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
                        onChange={this.onchangetextsearch}
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
              {this.state.usertype == 1 ? (
                <></>
              ) : (
                <>
                  <button class="comn-btn lightbtn" onClick={this.savedSearch}>
                    Save Search
                  </button>
                </>
              )}

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
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <div class="row">
            <div class="innerHdng pb-4">
              <h3>Contact Landload</h3>
            </div>

            <div class="col">
              <form
                class="commonForm addPrptyForm lndLodMdlFrm "
                id="adProperty"
                onSubmit={this.contactSubmit}
              >
                <div class="row">
                  <div class="form-group col">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onchangetext}
                    />
                  </div>
                  <span style={{ color: "red" }}> {this.state.validname}</span>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <input
                      class="form-control"
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onchangetext}
                    />
                  </div>
                  <span style={{ color: "red" }}> {this.state.validemail}</span>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="phone"
                      name="phone"
                      value={this.state.phone}
                      onChange={this.onchangetext}
                    />
                  </div>
                  <span style={{ color: "red" }}> {this.state.validphone}</span>
                </div>
                <div class="row">
                  <div class="form-group col">
                    <textarea
                      class="form-control"
                      name="message"
                      onChange={this.onchangetext}
                    >
                      {this.state.message}
                    </textarea>
                  </div>
                  <span style={{ color: "red" }}>
                    {" "}
                    {this.state.validmessage}
                  </span>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <button type="submit" class="btn pull-right m-0 ">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
