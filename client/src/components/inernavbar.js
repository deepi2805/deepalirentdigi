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
import { ToastContainer, toast } from "react-toastify";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal } from "react-responsive-modal";
const axios = require("axios");
class InerNavBar extends React.Component {
  state = {
    userData: [],
    pagestatus: false,
    img: "images/dummy.jpg",
    paymentStatus: false,
    src: null,
    crop: {
      unit: "%",
      width: 20,
      aspect: 16 / 9,
    },
    visible: false,
  };
  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    console.log("keytse", this.props.key1);
    this.setState({
      userData: this.props.key1,
      pagestatus: true,
      userId: decoded_id.Uid,
    });
  }
  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  handleChangeImage = (e) => {
    $("#imgPrew").attr("src", URL.createObjectURL(e.target.files[0]));
    const form = new FormData();
    form.append("file", e.target.files[0]);

    const config1 = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(
        config.googleAuth.backURL + "user/upload_property_image",
        form,
        config1
      )
      .then((data) => {
        console.log("check data ", data.data);

        this.setState({
          [e.target.name]:
            config.googleAuth.imgurl + data.data.data[0].filename,
        });
        let options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userImg: data.data.data[0].filename,
            id: this.state.userId,
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
            } else {
              toast(data.msg);
            }
          })
          .catch((err) => {
            console.log("error", err);
          });
        //window.location.reload();
      })
      .catch((error) => {});
  };

  onFileChange = (e) => {
    //alert("hdhd");
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result, visible: true })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };
  onCloseModal = (e) => {
    this.setState({ visible: false });
  };
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      //alert("test");
      this.setState({ baseImage: croppedImageUrl });
      console.log(croppedImageUrl);
      $("#imgPrew").attr("src", croppedImageUrl);
      this.setState({ croppedImageUrl });
      var wavefilefromblob = new File([croppedImageUrl], "filename.jpeg");
      const form = new FormData();
      form.append("file", wavefilefromblob);

      const config1 = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post(
          config.googleAuth.backURL + "user/upload_property_image",
          form,
          config1
        )
        .then((data) => {
          console.log("check data ", data.data);
          this.setState({
            img: config.googleAuth.imgurl + data.data.data[0].filename,
          });

          //window.location.reload();
        })
        .catch((error) => {});
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }

          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);

          var reader = new FileReader();
          reader.readAsDataURL(blob);

          reader.onloadend = function () {
            var base64data = reader.result;
            //console.log("check blob", base64data);
            resolve(base64data);
            return;
          };
        },
        "image/jpeg",
        1
      );
    });
  }
  saveCroped = (e) => {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userImg: this.state.baseImage,
        id: this.state.userId,
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
          this.setState({ visible: false });
          window.location.reload();
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <>
        {this.state.pagestatus ? (
          <>
            <ToastContainer />
            <section class="wrapper blueBg profileHdr py-4 mb-5">
              <div class="container">
                <div class="inrProfileBlk">
                  <div class="row">
                    <div class="col-auto">
                      <div class="proflUpload">
                        <div class="prflImg">
                          <img
                            id="imgPrew"
                            src={
                              this.state.userData.userImg
                                ? this.state.userData.userImg
                                : this.state.img
                            }
                          />
                          <input
                            class="form-control"
                            name="img"
                            type="file"
                            onChange={this.onFileChange}
                          />
                          <div class="profilEdit">
                            <a href="javascript:void(0)">
                              <i class="fa fa-edit"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="prflName">
                        <h2>
                          {this.Capitalize(this.state.userData.fname)}{" "}
                          {this.Capitalize(this.state.userData.lname)}
                        </h2>
                        <p>
                          {this.state.userData.userType == "1"
                            ? "Landlord"
                            : "Renter"}
                        </p>
                      </div>
                    </div>
                    <div class="col">
                      <div class="profileMenu">
                        {/* <MDBDropdown className="pr20 inrNavBarInr">
                          <MDBDropdownToggle tag="a" className="">
                            My Profile
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="accuser-menu inrNavBar">
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
                            {this.state.userData.userType == "2" ? (
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
                          </MDBDropdownMenu>
                        </MDBDropdown> */}

                        {this.state.userData.userType == "1" ? (
                          <>
                            <MDBDropdown className="pr20 inrNavBarInr">
                              <Link
                                to="enquirylist.html"
                                className="mainNavSngle"
                              >
                                {" "}
                                Enquiry List
                              </Link>
                            </MDBDropdown>
                          </>
                        ) : (
                          <>
                            <MDBDropdown className="pr20 inrNavBarInr">
                              <Link
                                to="enquirylistrenter.html"
                                className="mainNavSngle"
                              >
                                {" "}
                                Enquiry List
                              </Link>
                            </MDBDropdown>
                          </>
                        )}
                        {this.state.userData.userType == "1" ? (
                          <>
                            <MDBDropdown className="pr20 inrNavBarInr">
                              <Link to="propertylist.html" class="mainNavSngle">
                                Properties
                              </Link>
                            </MDBDropdown>
                            {this.state.paymentStatus ? (
                              <>
                                <MDBDropdown className="pr20 inrNavBarInr">
                                  <Link
                                    to="transaction.html"
                                    class="mainNavSngle"
                                  >
                                    Transactions{" "}
                                  </Link>
                                </MDBDropdown>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <>
                            <MDBDropdown className="pr20 inrNavBarInr">
                              <Link to="wishlist.html" class="mainNavSngle">
                                WishList
                              </Link>
                            </MDBDropdown>
                            <MDBDropdown className="pr20 inrNavBarInr">
                              <Link
                                to="savedsearchList.html"
                                class="mainNavSngle"
                              >
                                Saved Search List
                              </Link>
                            </MDBDropdown>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal open={this.state.visible} onClose={this.onCloseModal}>
              {src && (
                <ReactCrop
                  style={{ maxWidth: "100%" }}
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={this.onImageLoaded}
                  onComplete={this.onCropComplete}
                  onChange={this.onCropChange}
                />
              )}
              <button class="publishBtn" onClick={this.saveCroped}>
                Submit
              </button>
              {/* {croppedImageUrl && (
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedImageUrl}
                />
              )} */}
            </Modal>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default withRouter(InerNavBar);
