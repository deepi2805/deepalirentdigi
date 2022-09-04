import React from "react";
import { Link, withRouter, Redirect, useLocation } from "react-router-dom";
import $ from "jquery";
import ReadMoreReact from "read-more-react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Lightbox from "react-image-lightbox";
import Accordion from "react-bootstrap/Accordion";
import "react-image-lightbox/style.css";
import Header from "./headerinner";
import Header1 from "./header";
import Footer from "./footer";
import InerNavBar from "./inernavbar";
import queryString from "query-string";
import config from "./config.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import GoogleMapReact from "google-map-react";
import { ToastContainer, toast } from "react-toastify";


import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  PinterestIcon,
  InstapaperIcon,
  WhatsappIcon,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  InstapaperShareButton,
} from "react-share";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const images = [
  "images/gallery1.jpg",
  "images/f-property1.jpg",
  "images/f-property2.jpg",
  "images/f-property3.jpg",
  "images/f-property4.jpg",
];

const longText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere. Vivamus fermentum venenatis pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum venenatis pulvinar. Proin vitae lectus urna. Sed erat ipsum, maximus a elit nec, condimentum placerat ex. Ut tincidunt mi eget condimentum mollis. Pellentesque aliquam velit quis est varius, sed molestie dolor ultrices. Pellentesque eget dapibus eros, at blandit arcu. Duis id purus quis mi porttitor viverra vel tempus elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos posuere.";

export default class PropertyDetail extends React.Component {
  state = {
    fname:"",
    lname:"",
    email:"",
    mapapikey: config.googleAuth.mapapikey,
    id: queryString.parse(this.props.location.search).id,
    userId: queryString.parse(this.props.location.search).uid,
    loginuserId: "",
    propertyData: [],
    loginuserData: [],
    photoIndex: 0,
    isOpen: "",
    status: false,
    checkUser: localStorage.getItem("Uid"),
    imgurl: config.googleAuth.imgurl,
    siteURL: config.googleAuth.siteURL,
    image: [],
    wishStatus: 0,
    center: {
      lat: "",
      lng: "",
    },
    lat: "",
    lang: "",
    open: false,
    userData: [],
    pagestatus: false,
    name: "",
    email: "",
    phone: "",
    message: "",
    usertype: localStorage.getItem("status"),
    visible: false,
  };
  static defaultProps = {
    zoom: 13,
  };

  dataa = async () =>{
    const response = await axios.post(config.googleAuth.backURL + `user_detail`,{
      userId :this.state.userId
    })
    this.setState ({
      fname:response.data.data.fname,
      lname:response.data.data.lname,
      email:response.data.data.email,
      // phonee:response.data.data.phoneNo
    })
    console.log("qqqqqqqqqq", response)
  }
  componentDidMount() {
    this.dataa()
    console.log(this.state.id);
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
    // alert(decoded_id.Uid);
    //this.setState({ loginuserId: decoded_id.Uid });
    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_property_id: this.state.id,
      }),
    };
    let getloginuser = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: this.state.userId,
      }),
    };
    let getwishlist = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: udId,
        property_id: this.state.id,
        wishlist_flag: 2, //0->by userId,1->by property_id,2->wishlist property status
      }),
    };
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

    let updateView = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //user_id: udId,
        property_id: this.state.id,
        //data: 2, //0->by userId,1->by property_id,2->wishlist property status
      }),
    };

    Promise.all([
      fetch(
        config.googleAuth.backURL + `user/fetch_user_property_by_property_id`,
        getList
      ).then((value) => value.json()),
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_wishlist_properties`,
        getwishlist
      ).then((value) => value.json()),
      fetch(config.googleAuth.backURL + `user_detail`, getuseroption).then(
        (value) => value.json()
      ),
      // fetch(config.googleAuth.backURL + `update_views`, updateView).then(
      //   (value) => value.json()
      // ),
    ])
      .then((value) => {
        console.log("test pro", value[0].data, value[3]);
        //console.log(this.state.id);
        console.log("check", value[1]);
        var mtlat = value[0].data[0].addressLat
          ? value[0].data[0].addressLat
          : "000000000";
        var mtlang = value[0].data[0].addressLng
          ? value[0].data[0].addressLng
          : "000000000";
        this.setState({
          propertyData: value[0].data,
          lat: mtlat,
          lang: mtlang,
          status: true,
          image: value[0].data[0].fileDetails,
          userId: value[0].data[0].userId,
          center: {
            lat: parseFloat(mtlat.toString().substr(0, 5)),
            lng: parseFloat(mtlang.toString().substr(0, 5)),
          },
          loginuserData: value[3],
          name: value[3]?.data?.fname,
          email: value[3]?.data?.email,
          phone: value[3]?.data?.phoneNo,
          wishStatus: value[2].status
            ? value[2].data.length == 1
              ? value[2].data[0].status
              : 1
            : [],
          userData: value[3].data,
          pagestatus: true,
          loginuserId: udId,
        });
        //json response
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
  loadMap = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: this.state.lat, lng: this.state.lang },
      map,
      draggable: true,
    });
    marker.addListener("dragend", () => {
      console.log(marker.getPosition().lat());
      console.log(marker.getPosition().lng());
    });
  };
  print() {
    //alert("hff");
    window.print();
    /*  const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0, 0, 10);
      // pdf.output("dataurlnewwindow");
      pdf.save("download.pdf");
    }); */
    /* const input = document.querySelector("#divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      //const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, 200);
      pdf.save("download.pdf");
    }); */
    /* const input = document.getElementById("divToPrint");
    const pdf = new jsPDF({ unit: "px", format: "letter", userUnit: "px" });
    pdf.html(input, { html2canvas: { scale: 0.58 } }).then(() => {
      pdf.save("test.pdf");
    }); */
  }

  wishlistSettings(status) {
    //alert(status);
    this.setState({ wishStatus: status });
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: this.state.id,
        user_id: this.state.loginuserId,
        wishlist_flag: status, //1->removed,0->added
      }),
    };
    fetch(config.googleAuth.backURL + `user/wishlist_user_property`, options)
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
  }
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
          landlordId: this.state.userId,
          renterId: decoded_id.Uid,
          propertyId: this.state.id,
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
  reportProperty = (e) => {
    e.preventDefault();
    toast("Sent Report Request to Admin");
    this.setState({ visible: false });
  };
  openreport = (e) => {
    this.setState({ visible: true });
  };
  closereport = (e) => {
    this.setState({ visible: false });
  };
  shareSettings = () => {
    $("#sharepop").toggle();
  };
  render() {
    var e = 1;
    var q = 1;
    var w = 1;
    const dynamicData = escape(
      `<div class="heading">This text needs to display along with the <span> html tags </span> surrounded </div>`
    );
    return (
      <div class="body" id="divToPrint">
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
        {/*  {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>} */}
        {/* {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )} */}
        {this.state.status ? (
          <>
            <section id="">
              <section class="wrapper proprtyDtl blueBg pd30">
                <div class="container">
                  <div class="row d-flax align-items-center">
                    <div class="col">
                      <div class="postData">
                        <div class="postOn">
                          Posted:
                          {moment
                            .utc(this.state.propertyData[0].timestamp)
                            .local()
                            .startOf("seconds")
                            .fromNow()}{" "}
                        </div>
                        <div class="postAddress">
                          <small> {this.state.propertyData[0].property_heading}</small>
                          <h5>
                            <span>
                              <img src="images/location-white.png" />
                            </span>{" "}
                            {this.state.propertyData[0].address}
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div class="col text-right">
                      <div class="lstt-wsh-btns">
                        <a href="javascript:void(0);" onClick={this.print}>
                          <img src="images/print.png" />
                        </a>
                        {this.state.usertype == 2 ? (
                          <>
                            {this.state.wishStatus == 1 &&
                              this.state.usertype == 2 ? (
                              <>
                                <a
                                  class="wishlist"
                                  href="javascript:void(0);"
                                  onClick={() => this.wishlistSettings(0)}
                                >
                                  <img src="images/wish.svg" />
                                </a>
                              </>
                            ) : (
                              <>
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => this.wishlistSettings(1)}
                                >
                                  <i class="fa fa-heart" aria-hidden="true"></i>
                                </a>
                              </>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        <a
                          href="javascript:void(0);"
                          onClick={() => this.shareSettings()}
                        >
                          <img src="images/share-icon-white.png" />
                        </a>
                        <div id="sharepop" style={{ display: "none" }}>
                          <FacebookShareButton
                            url={this.state.siteURL}
                            quote={
                              "Rentdigi - this.state.propertyData[0].address"
                            }
                            hashtag="#Rentdigi"
                          >
                            <FacebookIcon size={32} round={true} />
                          </FacebookShareButton>
                          <LinkedinShareButton
                            url={window.location.href}
                            quote={
                              "Rentdigi - this.state.propertyData[0].address"
                            }
                            hashtag="#Rentdigi"
                          >
                            <LinkedinIcon size={32} round={true} />
                          </LinkedinShareButton>
                          {console.log("Hellllllllll", this.state.siteURL)}
                          <TwitterShareButton
                            url={this.state.siteURL}
                            quote={
                              "Rentdigi - this.state.propertyData[0].address"
                            }
                            hashtag="#Rentdigi"
                          >
                            <TwitterIcon size={32} round={true} />
                          </TwitterShareButton>

                          <WhatsappShareButton
                            url={window.location.href}
                            quote={
                              "Rentdigi - this.state.propertyData[0].address"
                            }
                            hashtag="#Rentdigi"
                          >
                            <WhatsappIcon size={32} round={true} />
                          </WhatsappShareButton>
                          {/*<InstapaperShareButton
                          url={this.state.siteURL}
                          quote={
                            "Rentdigi - this.state.propertyData[0].address"
                          }
                          hashtag="#Rentdigi"
                        >
                          <InstapaperIcon size={32} round={true} />
                        </InstapaperShareButton> */}
                        </div>
                      </div>

                      <div class="prptyDtlPrice">
                        <h3>
                          <small>$</small>
                          {this.state.propertyData[0].monthly_rent}
                          {/*  <del>
                          <small>$</small>{" "}
                          {this.state.propertyData[0].monthly_rent}
                        </del> */}
                          <span>/Monthly</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </section>
            <section class="wrapper proprtyDtlGlry pd40">
              <div class="container">
                <div class="row">
                  <div class="col-md-7">
                    <div
                      onClick={() =>
                        this.setState({ isOpen: true, photoIndex: 0 })
                      }
                      class="galryImg1"
                      style={{
                        backgroundImage: `url(${this.state.imgurl}${this.state.propertyData[0].fileDetails[0].filename})`,
                      }}
                    ></div>
                  </div>
                  <div class="col-md-5">
                    <div class="row pb-3">
                      {[...Array(3)].map((x, i) => (
                        <>
                          {this.state.propertyData[0].fileDetails[q++] ? (
                            <>
                              <div class="col-md-6">
                                <div
                                  onClick={() =>
                                    this.setState({
                                      isOpen: true,
                                      photoIndex: i + 1,
                                    })
                                  }
                                  class="galryImg"
                                  style={{
                                    backgroundImage: `url(${this.state.imgurl}${this.state.propertyData[0].fileDetails[
                                      e++
                                    ].filename
                                      })`,
                                  }}
                                ></div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                      {this.state.propertyData[0].fileDetails.length > 4 ? (
                        <>
                          <div class="col-md-6">
                            <div
                              onClick={() =>
                                this.setState({ isOpen: true, photoIndex: 4 })
                              }
                              class="galryImg "
                              style={{
                                backgroundImage: `url(${this.state.imgurl}${this.state.propertyData[0].fileDetails[4].filename})`,
                              }}
                            >
                              {/* <a
                                href="javascript:void(0)"
                                onClick={() =>
                                  this.setState({ isOpen: true, photoIndex: 4 })
                                }
                              >
                                <img
                                  src={`${this.state.imgurl}${this.state.propertyData[0].fileDetails[4].filename}`}
                                /> */}
                              <div class="glrImgHvr position-absolute top-50 start-50 translate-middle">
                                <h4 class="position-absolute top-50 start-50 translate-middle">
                                  +
                                  {this.state.propertyData[0].fileDetails
                                    .length - 4}{" "}
                                  <span>View More</span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div>
                      {this.state.isOpen && (
                        <Lightbox
                          mainSrc={`${this.state.imgurl}${this.state.image[this.state.photoIndex].filename
                            }`}
                          nextSrc={`${this.state.imgurl}${this.state.image[
                            (this.state.photoIndex + 1) %
                            this.state.image.length
                          ]
                            }`}
                          prevSrc={`${this.state.imgurl}${this.state.image[
                            (this.state.photoIndex +
                              this.state.image.length -
                              1) %
                            this.state.image.length
                          ]
                            }`}
                          onCloseRequest={() =>
                            this.setState({ isOpen: false })
                          }
                          onMovePrevRequest={() =>
                            this.setState({
                              photoIndex:
                                (this.state.photoIndex +
                                  this.state.image.length -
                                  1) %
                                this.state.image.length,
                            })
                          }
                          onMoveNextRequest={() =>
                            this.setState({
                              photoIndex:
                                (this.state.photoIndex + 1) % images.length,
                            })
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="wrapper proprtyDrctnBlk lightBg pd30">
              <div class="container">
                <div class="row d-flax align-items-center">
                  <div class="col">
                    <div class="dtlTopFeatr">
                      <div class="prptyListIcon">
                        <ul>
                          <li>
                            <div class="listIconImg">
                              <img src="images/bedicon.png" />
                            </div>
                            <div class="listIconText">
                              {this.state.propertyData[0].bedroomDetails
                                .length == 1
                                ? this.state.propertyData[0].bedroomDetails[0]
                                  .type
                                : ""}{" "}
                              Beds
                            </div>
                          </li>
                          <li>
                            <div class="listIconImg">
                              <img src="images/bath.png" />
                            </div>
                            <div class="listIconText">
                              {" "}
                              {this.state.propertyData[0].bathroomDetails
                                .length == 1
                                ? this.state.propertyData[0].bathroomDetails[0]
                                  .type
                                : ""}{" "}
                              Baths
                            </div>
                          </li>
                          <li>
                            <div class="listIconImg">
                              <img src="images/sqr-icon.png" />
                            </div>
                            <div class="listIconText">
                              {this.state.propertyData[0].sq_foot} sq ft
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="col text-right">
                    <div class="getDirction">
                      <a href="#mapload" class="btn comn-btn blu">
                        Get Direction
                        <span class="directIcon">
                          <img src="images/direction-white.png" />
                        </span>
                      </a>
                    </div>
                    <div class="reprtPrpty">
                      <a href="javascript:void(0)" onClick={this.openreport}>
                        <img src="images/report-icon.png" />
                        Report Property
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="wrapper pd80 proPrtyContntBlk">
              <div class="container">
                <div class="propertyDtlRow">
                  <div class="row">
                    <div class="col-md-8">
                      <div class="proprtyDiscription">
                        <div class="mainHdng pb-3">
                          <div class="mainHdngTitle">
                            <h3>Property Description</h3>
                          </div>
                        </div>
                        <div className="propertyDtlParah pb-4">
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                this.state.propertyData[0].full_description,
                            }}
                          ></div>
                          {/* <ReadMoreReact
                            text={this.state.propertyData[0].full_description}
                            min={80}
                            ideal={100}
                            max={200}
                            readMoreText="Read More"
                          /> */}
                        </div>
                      </div>

                      <div class="factsFeatr">
                        <div class="row">
                          <div class="col-md-3">
                            <div class="factFtrBg">
                              <h3 class="position-absolute top-50 start-50 translate-middle">
                                Fact & Features
                              </h3>
                            </div>
                          </div>
                          <div class="col-md-9">
                            <div class="factFeatrList">
                              <ul>
                                {"unitNumber" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/unit.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Units</p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .unitNumber
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"year_built" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/year-build.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Year Build</p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .year_built
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"furnishingDetails" in
                                  this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/furnishing.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Furnishing</p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .furnishingDetails[0].type
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"leaseTermDetails" in
                                  this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/lease-term.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Lease Term</p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .leaseTermDetails[0].type
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"smoking" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/smoking.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Smoking</p>
                                        <h4>
                                          {this.state.propertyData[0].smoking}
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"parkingDetails" in
                                  this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/parking.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Parking </p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .parkingDetails[0].type
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"parking_fee" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/parking-fee.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Parking Fee</p>
                                        <h4>
                                          {
                                            this.state.propertyData[0]
                                              .parking_fee
                                          }
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"dogs" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/dogs.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Dogs</p>
                                        <h4>
                                          {this.state.propertyData[0].dogs}
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"cats" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/cats.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Cats</p>
                                        <h4>
                                          {this.state.propertyData[0].cats}
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {"pet_fee" in this.state.propertyData[0] ? (
                                  <>
                                    <li class="d-flax align-items-center">
                                      <div class="factIcon">
                                        <img src="images/icons/pets-fee.png" />
                                      </div>
                                      <div class="factText">
                                        <p>Pet Fee</p>
                                        <h4>
                                          {this.state.propertyData[0].pet_fee}
                                        </h4>
                                      </div>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {"utilityDetails" in this.state.propertyData[0] ? (
                        <>
                          <div class="amenitiesRow pt-5">
                            <div class="mainHdng">
                              <div class="mainHdngTitle">
                                <h3>Utility Details</h3>
                              </div>
                            </div>
                            <div class="amenitiesInr lightBg mt-3">
                              <div class="amenitsList">
                                <ul>
                                  {this.state.propertyData[0].utilityDetails.map(
                                    (l) => {
                                      return (
                                        <>
                                          <li>{l.utility_name}</li>
                                        </>
                                      );
                                    }
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}

                      <div class="amenitiesRow pt-5">
                        <div class="mainHdng">
                          <div class="mainHdngTitle">
                            <h3>Home Features</h3>
                          </div>
                        </div>
                        <div class="amenitiesInr lightBg mt-3">
                          <div class="amenitsList">
                            <ul>
                              {this.state.propertyData[0].homeDetails.map(
                                (l) => {
                                  return (
                                    <>
                                      <li>{l.feature_name}</li>
                                    </>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="amenitiesRow pt-5">
                        <div class="mainHdng">
                          <div class="mainHdngTitle">
                            <h3>Community Features</h3>
                          </div>
                        </div>
                        <div class="amenitiesInr lightBg mt-3">
                          <div class="amenitsList">
                            <ul>
                              {this.state.propertyData[0].communityDetails.map(
                                (l) => {
                                  return (
                                    <>
                                      <li>{l.feature_name}</li>
                                    </>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div class="amenitiesRow pt-5">
                        <div class="mainHdng">
                          <div class="mainHdngTitle">
                            <h3>Building Features</h3>
                          </div>
                        </div>
                        <div class="amenitiesInr lightBg mt-3">
                          <div class="amenitsList">
                            <ul>
                              {this.state.propertyData[0].buildingDetails.map(
                                (l) => {
                                  return (
                                    <>
                                      <li>{l.feature_name}</li>
                                    </>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </div> */}
                      <div class="acordnRow">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header class="acordnTitle">
                              Utility Details
                            </Accordion.Header>
                            <Accordion.Body>
                              {"utilityDetails" in
                                this.state.propertyData[0] ? (
                                <>
                                  <div class="amenitiesInr lightBg mt-3">
                                    <div class="amenitsList">
                                      <ul>
                                        {this.state.propertyData[0].utilityDetails.map(
                                          (l) => {
                                            return (
                                              <>
                                                <li>{l.utility_name}</li>
                                              </>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <span>No data found</span>
                                </>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>Home Features</Accordion.Header>
                            <Accordion.Body>
                              <div class="amenitiesInr lightBg mt-3">
                                <div class="amenitsList">
                                  <ul>
                                    {this.state.propertyData[0].homeDetails.map(
                                      (l) => {
                                        return (
                                          <>
                                            <li>{l.feature_name}</li>
                                          </>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="2">
                            <Accordion.Header>
                              Community Features
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="amenitiesInr lightBg mt-3">
                                <div class="amenitsList">
                                  <ul>
                                    {this.state.propertyData[0].communityDetails.map(
                                      (l) => {
                                        return (
                                          <>
                                            <li>{l.feature_name}</li>
                                          </>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="3">
                            <Accordion.Header>
                              Building Features
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="amenitiesInr lightBg mt-3">
                                <div class="amenitsList">
                                  <ul>
                                    {this.state.propertyData[0].buildingDetails.map(
                                      (l) => {
                                        return (
                                          <>
                                            <li>{l.feature_name}</li>
                                          </>
                                        );
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>

                      {this.state.propertyData[0].videoURLDetails.length != 0 ||
                        "videoURLDetails" in this.state.propertyData[0] ? (
                        <>
                          <div class="prptyVideoBlk pt-5">
                            <div class="mainHdng pb-3">
                              <div class="mainHdngTitle">
                                <h3>Property Video</h3>
                              </div>
                            </div>
                            <div class="prtyVidoDiv">
                              <div class="row">
                                {this.state.status ? (
                                  <>
                                    {this.state.propertyData[0].videoURLDetails.map(
                                      (l) => {
                                        const myArray = l.video.split("=");
                                        //alert(myArray[1]);
                                        return (
                                          <>
                                            <div class="col-sm-4">
                                              <div class="videoDiv">
                                                <a href="#">
                                                  <iframe
                                                    src={`https://www.youtube.com/embed/${myArray[1]}`}
                                                  ></iframe>
                                                  {/*   <video
                                                    src={l.video}
                                                    width="100"
                                                    height="100"
                                                    controls
                                                  >
                                                    {" "}
                                                  </video> */}
                                                  {l.title!=""?
                                                  <div class="videoHdng">
                                                    <h4>{l.title}</h4>
                                                  </div>:(<></>)}
                                                </a>
                                              </div>
                                            </div>
                                          </>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {"virtualtoururl" in this.state.propertyData[0] ? (
                        <>
                          {this.state.propertyData[0].virtualtoururl != "" ? (
                            <>
                              <div class="virtualTourBlk pt-4">
                                <div class="mainHdng pb-3">
                                  <div class="mainHdngTitle">
                                    <h3>Virtual Tour</h3>
                                  </div>
                                </div>
                                <div class="virtuTourDiv">
                                  <iframe
                                    src={
                                      this.state.propertyData[0].virtualtoururl
                                    }
                                    controls
                                  ></iframe>
                                  {/* <video
                                    src={
                                      this.state.propertyData[0].virtualtoururl
                                    }
                                    width="800"
                                    height="800"
                                    controls
                                  >
                                    {" "}
                                  </video> */}
                                  {/*  <img src="images/virtual-tour.jpg" /> */}
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}

                      <div class="proprtyLoctnBlk pt-5" id="mapload">
                        <div class="mainHdng pb-3">
                          <div class="mainHdngTitle d-flex align-items-center">
                            <div class="col">
                              <h3>Property Location</h3>
                            </div>
                            <div class="col">
                              <span class="pull-right hdngLctnIcon">
                                <img src="images/locatn-blue.png" />
                                {this.state.propertyData[0].address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div class="prptryLoctnMap">
                          <div
                            style={{
                              height: "400px",
                              width: "100%",
                              borderRadius: "15px!important",
                            }}
                          >
                            {console.log("dddddddddd",this.state)}
                            <GoogleMapReact
                              bootstrapURLKeys={{
                                key: this.state.mapapikey,
                              }}
                              defaultCenter={this.state.center}
                              defaultZoom={this.props.zoom}
                              yesIWantToUseGoogleMapApiInternals
                              onGoogleApiLoaded={({ map, maps }) =>
                                this.loadMap(map, maps)
                              }
                            ></GoogleMapReact>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="prpDtlRightBlk">
                        <div class="contctlndBlk">
                          <div class="mainHdng pb-2">
                            <div class="mainHdngTitle">
                              <h3>Contact Landlord</h3>
                            </div>
                          </div>
                          <div class="landloadProfile mb-4 ">
                            <div class="row g-0 d-flex">

                              <div
                                class="lndlrdImg col-auto"
                                style={
                                  this.state?.loginuserData?.data?.userImg
                                    ? {
                                      backgroundImage: `url(${this.state.loginuserData.data.userImg})`,
                                    }
                                    : {
                                      backgroundImage: `url(${this.state.imgurl}images/dummy.jpg)`,
                                    }
                                }
                              >
                                <img
                                                  src={
                                                    this.state?.loginuserData?.data?.userImg
                                                      ? config.googleAuth
                                                          .imgurl +
                                                        this.state.loginuserData
                                                          .data.userImg
                                                      : "images/dummy.jpg"
                                                  }
                                                />
                              </div>
                              <div class="landPrfl col">
                                <h3>
                                {this.state.fname} {" "}
                                {this.state.lname}
                                  {/* {this.state?.loginuserData?.data?.fname}{" "}
                                  {this.state?.loginuserData?.data?.lname} */}
                                </h3>
                                <div class="lndLordadres">
                                  <ul>
                                    {this.state?.loginuserData?.data?.address ? (
                                      <>
                                        {" "}
                                        <li>
                                          <a href="#" target="_blank">
                                            <i class="fa fa-map-marker"></i>{" "}
                                            {
                                              this.state.loginuserData.data
                                                .address
                                            }
                                          </a>
                                        </li>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {/* <li>
                                  <a href="http://example.com" target="_blank">
                                    <i class="fa fa-globe"></i>{" "}
                                    http://example.com
                                  </a>
                                </li> */}
                                  </ul>
                                </div>

                                {/*  <h5>
                                  {this.state.loginuserData.data.phoneNo}
                                  
                                </h5> */}
                              </div>
                            </div>
                            <div class="landLodContactBlk">
                              <ul>
                                {this.state.propertyData[0].phone1 ? (
                                  <>
                                    <li>
                                      <a href={`tel:${this.state.propertyData[0].phone1}`}>
                                        <i class="fa fa-phone"></i>{" "}
                                        {this.state.propertyData[0].phone1}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {this.state.propertyData[0].email1 ? (
                                  <>
                                    <li>
                                      <a href={`mailto:${this.state.propertyData[0].email1}`}>
                                        <i class="fa fa-envelope-o"></i>{" "}
                                        {this.state.propertyData[0].email1}
                                      </a>
                                    </li>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </ul>
                            </div>

                            <div class="landLoadSocial">
                              <ul>
                                {this.state?.loginuserData?.data?.facebook &&

                                  <li>
                                    <a
                                      href={
                                        this.state?.loginuserData?.data?.facebook
                                      }
                                      target="_blank"
                                    >
                                      <i
                                        class="fa fa-facebook"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </li>
                                }
                                {this.state?.loginuserData?.data?.twitter &&

                                  <li>
                                    <a
                                      href={this.state?.loginuserData.data.twitter}
                                      target="_blank"
                                    >
                                      <i class="fa fa-twitter"></i>
                                    </a>
                                  </li>
                                }
                                {this.state?.loginuserData?.data?.instagram &&

                                  <li>
                                    <a
                                      href={
                                        this.state.loginuserData.data.instagram
                                      }
                                      target="_blank"
                                    >
                                      <i
                                        class="fa fa-instagram"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </li>
                                }
                                {this.state?.loginuserData?.data?.linkedin &&

                                  <li>
                                    <a
                                      href={
                                        this.state.loginuserData.data.linkedin
                                      }
                                      target="_blank"
                                    >
                                      <i
                                        class="fa fa-linkedin"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                  </li>
                                }
                              </ul>
                            </div>
                            {console.log("this.state.usertype", this.state.usertype)}

                            {
                              (!this.state.usertype) &&
                              <div class="landLoadBtns pt-4" style={{ color: "red" }}>
                                Please Login to contact Landload
                              </div>
                            }

                          
                            {this.state.usertype == 2 ? (
                              <>
                                <div class="landLoadBtns pt-4">
                                  <a
                                    href="javascript:void(0);"
                                    onClick={this.onOpenModal}
                                    class="btn comn-btn blu mb-4"
                                  >
                                    Contact Landload
                                  </a>
                                  <div class="landLoadModal">
                                    <Modal
                                      open={this.state.open}
                                      onClose={this.onCloseModal}
                                    >
                                      <div class="row">
                                        <div class="innerHdng pb-4">
                                          <h3>Contact Landload</h3>
                                        </div>
                                        <div class="col">
                                          <div class="landloadProfile mb-4 landLoadModal ">
                                            <div class="d-flex">
                                              <div

                                                class="lndlrdImg"
                                                style={
                                                  this.state?.loginuserData.data
                                                    
                                                    ? {
                                                      backgroundImage: `url(${this.state.loginuserData.data.userImg})`,
                                                    }
                                                    : {
                                                      backgroundImage: `url(${this.state.imgurl}images/dummy.jpg)`,
                                                    }
                                                }
                                              >
                                                {/* <img
                                                  src={
                                                    this.state.loginuserData
                                                      .data.userImg
                                                      ? config.googleAuth
                                                          .imgurl +
                                                        this.state.loginuserData
                                                          .data.userImgContact Landload
                                                      : "images/dummy.jpg"
                                                  }
                                                /> */}
                                              </div>
                                              <div class="landPrfl">
                                                <h3>
                                                  {
                                                    this.state.fname
                                                  }
                                                  {
                                                    this.state.lname
                                                  }
                                                </h3>
                                                {/* <p>Professional Agent</p> */}
                                                {/* <h5>
                                                  {
                                                    this.state.loginuserData
                                                      .data.phoneNo
                                                  }
                                                </h5> */}
                                              </div>
                                            </div>
                                            <div class="lndLordadres">
                                              <ul>
                                                {this.state.loginuserData.data
                                                  .address ? (
                                                  <>
                                                    <li>
                                                      <a
                                                        href="#"
                                                        target="_blank"
                                                      >
                                                        <i class="fa fa-map-marker"></i>{" "}
                                                        {
                                                          this.state
                                                            .loginuserData.data
                                                            .address
                                                        }
                                                      </a>
                                                    </li>
                                                  </>
                                                ) : (
                                                  <></>
                                                )}

                                                {/* <li>
                                                  <a
                                                    href="mailto:agent_3@example.com"
                                                    target="_blank"
                                                  >
                                                    <i class="fa fa-envelope-o"></i>{" "}
                                                    {
                                                      this.state.loginuserData
                                                        .data.email
                                                    }
                                                  </a>
                                                </li> */}
                                                {this.state.loginuserData
                                                  .data.bookingUrl &&
                                                  <li>
                                                    <a
                                                      href={
                                                        this.state.loginuserData
                                                          .data.bookingUrl
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i class="fa fa-globe"></i>{" "}
                                                      {
                                                        this.state.loginuserData
                                                          .data.bookingUrl
                                                      }
                                                    </a>
                                                  </li>
                                                }
                                              </ul>
                                            </div>

                                            <div class="landLoadSocial pt-3">
                                              <ul>
                                                {this.state.loginuserData
                                                  .data.facebook &&
                                                  <li>
                                                    <a
                                                      href={
                                                        this.state.loginuserData
                                                          .data.facebook
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        class="fa fa-facebook"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </a>
                                                  </li>
                                                }
                                                {this.state.loginuserData
                                                  .data.twitter &&
                                                  <li>
                                                    <a
                                                      href={
                                                        this.state.loginuserData
                                                          .data.twitter
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i class="fa fa-twitter"></i>
                                                    </a>
                                                  </li>
                                                }
                                                {this.state.loginuserData
                                                  .data.instagram &&
                                                  <li>
                                                    <a
                                                      href={
                                                        this.state.loginuserData
                                                          .data.instagram
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        class="fa fa-instagram"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </a>
                                                  </li>
                                                }
                                                {this.state.loginuserData
                                                  .data.linkedin &&
                                                  <li>
                                                    <a
                                                      href={
                                                        this.state.loginuserData
                                                          .data.linkedin
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        class="fa fa-linkedin"
                                                        aria-hidden="true"
                                                      ></i>
                                                    </a>
                                                  </li>
                                                }
                                              </ul>
                                            </div>
                                          </div>
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
                                              <span style={{ color: "red" }}>
                                                {" "}
                                                {this.state.validname}
                                              </span>
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
                                              <span style={{ color: "red" }}>
                                                {" "}
                                                {this.state.validemail}
                                              </span>
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
                                              <span style={{ color: "red" }}>
                                                {" "}
                                                {this.state.validphone}
                                              </span>
                                            </div>
                                            <div class="row">
                                              <div class="form-group col">
                                                <textarea
                                                  class="form-control"
                                                  name="message"
                                                  placeholder="message"
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
                                                <button
                                                  type="submit"
                                                  class="btn pull-right m-0 "
                                                >
                                                  Submit
                                                </button>
                                              </div>
                                            </div>
                                          </form>
                                        </div>
                                      </div>
                                    </Modal>
                                  </div>
                                  {this.state.loginuserData.data.bookingUrl ? (
                                    <>
                                      <a
                                        href={
                                          this.state.loginuserData.data
                                            .bookingUrl
                                        }
                                        target="_blank"
                                        class="btn comn-btn green"
                                      >
                                        Book Appointment
                                      </a>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        {/* <div class="sideFtrPrty mb-4">
                          <div class="cartBlkImg">
                            <img src="images/f-property1.jpg" />
                            <span class="batchImg">Featured</span>
                            <span class="batchImg whiteBatch">
                              <img src="images/photo.png" /> 5
                            </span>
                            <div class="sidFtrPrtyTxt">
                              <h3>7240C Argyle St. Lawndale, CA</h3>
                              <p>
                                <img src="images/location-white.png" /> 1680
                                Lincoln Ave, Montreal
                              </p>
                              <h5>
                                <small>$</small> 3200 <span> / Monthly</span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div class="SidebarBnr">
                          <img src="images/sidebanner.jpg" />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal open={this.state.visible} onClose={this.closereport}>
              <div class="row">
                <div class="innerHdng pb-4"><h3>Report Property</h3></div>
                <div class="reportForm">
                  <form onSubmit={this.reportProperty} class="commonForm contactForm">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        required
                        placeholder="Enter Email"
                      />
                    </div>
                    <div class="text-center">
                      <button class="publishBtn btn" type="submit">Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </Modal>
          </>
        ) : (
          <></>
        )}
        <Footer />
      </div>
    );
  }
}
