import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import city from "./city.json";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { ToastContainer, toast } from "react-toastify";

const axios = require("axios");


export default class MyProfile extends React.Component {
  state = {
    userData: [],
    pagestatus: false,
    country: "",
    region: "",
    city: "",
    fname: "",
    lname: "",
    email: "",
    address: "",
    phone: "",
    loginUserid: "",
    url: "",
    file: [],
    setFile: [],
    fileDetails: [],
    isShowing: false,
    fileDetailsurl: []

  };

  getLoginUser = () => {
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    console.log(CountryRegionData);

    let getloginuser = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: decoded_id.Uid,
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
          loginUserid: decoded_id.Uid,
          fname: value[0].data.fname,
          lname: value[0].data.lname,
          email: value[0].data.email,
          phone: value[0].data.phoneNo,
          country: value[0].data.country ? value[0].data.country : "",
          region: value[0].data.region ? value[0].data.region : "",
          city: value[0].data.city ? value[0].data.city : "",
          address: value[0].data.address ? value[0].data.address : "",
          facebook: value[0].data.facebook ? value[0].data.facebook : "",
          twitter: value[0].data.twitter ? value[0].data.twitter : "",
          linkedin: value[0].data.linkedin ? value[0].data.linkedin : "",
          instagram: value[0].data.instagram ? value[0].data.instagram : "",
          url: value[0].data.bookingUrl ? value[0].data.bookingUrl : "",
          // fileDetailsurl: value[0].data.fileDetails ? value[0].data.fileDetails : [],
          // file: value[0].data?.fileDetails?.[0]?.filename ? [`${config.googleAuth.imgurl}/profile-picture/${value[0].data.fileDetails[0].filename}`] : []

        });
        //console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getLoginUser()



  }



  selectCountry(val) {
    //alert(val)
    this.setState({ country: val, region: "", city: "" });
  }
  selectRegion(val) {
    //alert(val)
    this.setState({ region: val, city: "" });
  }
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadSingleFile = (e) => {
    console.log(this.state.file.length);
    var arr = this.state.file;
    var arr1 = this.state.fileDetails;
    //alert(this.state.fileDetails.length);
    if (
      this.state.fileDetails.length + e.target.files.length > 1 ||
      e.target.files.length > 1
    ) {
      toast("You cannot upload more than 1 images");
      return false;
    }
    for (var i = 0; i < e.target.files.length; i++) {
      arr.push(URL.createObjectURL(e.target.files[i]));
      arr1.push(e.target.files[i]);
    }
    this.setState({ file: arr, fileDetails: arr1, isShowing: true });
    const form = new FormData();
    for (const key of Object.keys(e.target.files)) {
      form.append("file", e.target.files[key]);
    }
    const config1 = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        config.googleAuth.backURL + "user_upload_profile",
        form,
        config1
      )
      .then((data) => {
        console.log("check data ", data.data);
        this.setState({ isShowing: false, fileDetailsurl: data.data.data });

        // this.props.sendData("fileDetailsurl", data.data.data);
        //window.location.reload();
      })
      .catch((error) => { });
  };


  deleteFile = (e) => {
    const s = this.state.file.filter((item, index) => index !== e);
    const r = this.state.fileDetails.filter((item, index) => index !== e);
    this.setState({ file: s, fileDetails: r });

    //this.props.sendData("fileDetails", r);
    console.log("check remove", r);

    const form = new FormData();
    for (const key of Object.keys(r)) {
      form.append("file", r[key]);
    }
    const config1 = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        config.googleAuth.backURL + "user_upload_profile",
        form,
        config1
      )
      .then((data) => {
        console.log("check data ", data.data.data);
        this.setState({ isShowing: false, fileDetailsurl: data.data.data });
        // this.props.sendData("fileDetailsurl", data.data.data);
      })
      .catch((error) => { });
  };



  myprofileSubmit = (e) => {
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
    if (this.state.country === "") {
      this.setState({ validcountry: "Country is required*" });
    } else {
      this.setState({ validcountry: "" });
    }
    if (this.state.region === "") {
      this.setState({ validregion: "Region is required*" });
    } else {
      this.setState({ validregion: "" });
    }
    if (this.state.city === "") {
      this.setState({ validcity: "City is required*" });
    } else {
      this.setState({ validcity: "" });
    }
    if (this.state.address === "") {
      this.setState({ validaddress: "Address is required*" });
    } else {
      this.setState({ validaddress: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.country === "" ||
      this.state.region === "" ||
      this.state.city === "" ||
      this.state.address === "" ||
      this.state.fname === "" ||
      this.state.lname === "" ||
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
          fname: this.state.fname,
          lname: this.state.lname,
          phoneNo: this.state.phone,
          address: this.state.address,
          country: this.state.country,
          region: this.state.region,
          city: this.state.city,
          id: this.state.loginUserid,
          facebook: this.state.facebook,
          twitter: this.state.twitter,
          linkedin: this.state.linkedin,
          instagram: this.state.instagram,
          bookingUrl: this.state.url,
          // fileDetails: this.state.fileDetailsurl

        }),
      };
      fetch(config.googleAuth.backURL + `update_user_info`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);

            toast(data.msg);
            window.location.reload()

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
    var tt = this.state.region;
    var matchingResults = city.filter(function (x) {
      return x.province_name == tt;
    });
    return (
      <div class="body">
        <ToastContainer />
        {this.state.pagestatus ? (
          <>
            <Header key1={this.state.userData} />
            <InerNavBar key1={this.state.userData} />
            <section class="wrapper py-4 pb7">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-md-7">
                    <div class="about addProptryBlk ">
                      <form
                        class="commonForm addPrptyForm brDrBg"
                        id="adProperty"
                        onSubmit={this.myprofileSubmit}
                      >
                        <div class="row">
                          <div class="innerHdng pb-4">
                            <h3>My Account</h3>
                          </div>
                          <div class="form-group col">
                            {this.state.validfname ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validfname}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  First Name <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label>
                              First Name <span class="required">*</span>
                            </label> */}
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Enter first name"
                              value={this.state.fname}
                              name="fname"
                              onChange={this.onchangetext}
                            />
                            {/* <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validfname}
                            </span> */}
                          </div>
                          <div class="form-group col">
                            {this.state.validlname ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validlname}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  Last Name <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/*  <label>
                              Last Name <span class="required">*</span>
                            </label> */}
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Enter last name"
                              value={this.state.lname}
                              name="lname"
                              onChange={this.onchangetext}
                            />
                            {/* <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validlname}
                            </span> */}
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col">
                            {this.state.validemail ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validemail}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  Email <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label>
                              Email <span class="required">*</span>
                            </label> */}
                            <input
                              class="form-control"
                              type="email"
                              placeholder="Enter email"
                              value={this.state.email}
                              name="email"
                              onChange={this.onchangetext}
                              readOnly
                            />
                            {/*  <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validemail}
                            </span> */}
                          </div>
                          <div class="form-group col">
                            {this.state.validphone ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validphone}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  Phone Number <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label>Phone Number</label> */}
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Enter phone number"
                              value={this.state.phone}
                              name="phone"
                              onChange={this.onchangetext}
                            />
                            {/* <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validphone}
                            </span> */}
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col">
                            {this.state.validcountry ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validcountry}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  Country <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Country<span class="required">*</span>
                            </label> */}
                            <CountryDropdown
                              value={this.state.country}
                              onChange={(val) => this.selectCountry(val)}
                              classes="form-select"
                            />
                            {/*  <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validcountry}
                            </span> */}
                          </div>
                          <div class="form-group col">
                            {this.state.validregion ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validregion}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  State <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              State<span class="required">*</span>
                            </label> */}
                            <RegionDropdown
                              country={this.state.country}
                              value={this.state.region}
                              onChange={(val) => this.selectRegion(val)}
                              classes="form-select"
                            />
                            {/* <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validregion}
                            </span> */}
                          </div>
                          <div class="form-group col">
                            {this.state.validcity ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validcity}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  City <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/* <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              City
                              <span class="required">*</span>
                            </label> */}
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="city"
                              value={this.state.city}
                              onChange={this.onchangetext}
                            >
                              <option value="">Select </option>
                              {matchingResults.map((l) => {
                                return (
                                  <>
                                    <option value={l.name}>{l.name}</option>
                                  </>
                                );
                              })}
                            </select>
                            {/* <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validcity}
                            </span> */}
                          </div>
                        </div>
                        <div class="row">
                          <div class="form-group col">
                            {this.state.validaddress ? (
                              <>
                                <label for="emailFld" class="form-label red">
                                  {this.state.validaddress}
                                </label>
                              </>
                            ) : (
                              <>
                                <label for="emailFld" class="form-label">
                                  Address <span class="required">*</span>
                                </label>
                              </>
                            )}
                            {/*  <label>
                              Address <span class="required">*</span>
                            </label> */}
                            <textarea
                              class="form-control"
                              placeholder="Enter Address..."
                              onChange={this.onchangetext}
                              name="address"
                            >
                              {this.state.address}
                            </textarea>
                            {/*  <span style={{ color: "red" }}>
                              {" "}
                              {this.state.validaddress}
                            </span> */}
                          </div>
                        </div>
                        {this.state.userData.userType == 1 ? (
                          <>
                            <div class="row">
                              <div class="form-group col">
                                <label>Facebook</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  placeholder="Enter facebook link"
                                  value={this.state.facebook}
                                  name="facebook"
                                  onChange={this.onchangetext}
                                />
                              </div>
                              <div class="form-group col">
                                <label>Twitter</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  placeholder="Enter twitter link"
                                  value={this.state.twitter}
                                  name="twitter"
                                  onChange={this.onchangetext}
                                />
                              </div>
                            </div>
                            <div class="row">
                              <div class="form-group col">
                                <label>Linkedin</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  placeholder="Enter linkedin link"
                                  value={this.state.linkedin}
                                  name="linkedin"
                                  onChange={this.onchangetext}
                                />
                              </div>
                              <div class="form-group col">
                                <label>Instagram</label>
                                <input
                                  class="form-control"
                                  type="text"
                                  placeholder="Enter instagram link"
                                  value={this.state.instagram}
                                  name="instagram"
                                  onChange={this.onchangetext}
                                />
                              </div>
                            </div>
                            <div class="form-group col">
                              <label>Booking Url</label>
                              <input
                                class="form-control"
                                type="text"
                                placeholder="Enter Url"
                                value={this.state.url}
                                name="url"
                                onChange={this.onchangetext}
                              />
                            </div>
                          </>
                        ) : (
                          <></>
                        )}

                        {/* <div class="row ">
                          <div class="col-md-12">
                            <label for="exampleFormControlInput1" class="form-label">
                              PROFILE PICTURE
                            </label>
                          </div>
                        </div>

                        <div className="form-group">
                          <div class="uplogInrDiv">
                            <input
                              type="file"
                              multiple
                              disabled={this.state.file.length === 20}
                              className="form-control fileUpload  form-control-lg"
                              onChange={this.uploadSingleFile}
                              accept="image/jpeg"
                            />

                            <div class="uploadBlkInr">
                              <div class="uplogImg">
                                <img src="images/fileupload.png" />
                              </div>
                              <div class="uploadFileCnt">
                                <p>
                                  <a href="javascript:void(0)">Upload a file </a> file
                                  chosen or drag and drop
                                </p>
                                <p>
                                  <span>Only JPEG,JPG images</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row form-group preview">
                          {this.state.file.length > 0 &&
                            this.state.file.map((item, index) => {
                              return (
                                <div
                                  class="col-md-3 col-sm-3 pt-4 col-xs-6 removebannerpreview"
                                  key={item}
                                >
                                  <div class="addPhotoItem">
                                    <div class="addPhotoItemMedia imgClose">
                                      <img
                                        src={item}
                                        alt=""
                                        class="rounded img-responsive"
                                      />
                                      <div class="mediaClose">
                                        <a
                                          href="javascript:void(0)"
                                          onClick={() => this.deleteFile(index)}
                                        >
                                          <i class="fa fa-close"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                               
                              );
                            })}
                        </div> */}
                        <div class="row">
                          <div class="col-md-12">
                            <button type="submit" class="btn pull-right">
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Footer />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
