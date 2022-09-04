import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AWS from "aws-sdk";
import $ from "jquery";
import { uploadFile } from "react-s3";
import config from "./config.js";
import { toast } from "react-toastify";
const axios = require("axios");
const S3_BUCKET = "rentdigi";
const REGION = "ap-south-1";
const ACCESS_KEY = "AKIAIXLXD3J3CXVBU2ZA";
const SECRET_ACCESS_KEY = "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";

/* const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
}; */

export default class Step6 extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    file: this.props.key5[0],
    setFile: [],
    fileDetails: this.props.key5[1],
    arrUrl: this.props.key5[2],
    virtualtoururl: this.props.key5[3],
    isShowing: false,
  };
  onchangetext = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addUrl = (e) => {
    let arr = this.state.arrUrl;
    arr.push({
      video: "",
      title: "",
      key: arr.length + 1,
    });
    this.setState({ arrUrl: arr });
    this.props.sendData("arrUrl", this.state.arrUrl);
    console.log(this.state.arrUrl);
    /* var html = $(".gethtml").html();
    $(".appendurl").last().append(html);
    $(".trashenable").css("display", "block");
    var values = $.map($('input[name="videourl[]"]'), function (el) {
      if (el.value != "") {
        return el.value;
      }
    });

    this.props.sendData("videourl", values);
    console.log(values); */
  };
  removeUrl = (iid, id) => {
    //alert(iid);
    var newData = [...this.state.arrUrl];
    const newPeople = newData.filter((person) => person.key !== parseInt(id));

    //console.log(newPeople);

    this.props.sendData("arrUrl", newPeople);
    //this.props.sendData("suitearr", this.state.suitearr);
    this.setState({ arrUrl: newPeople });
    console.log(this.state.arrUrl);
    //alert($(".appendurl").children().length);
    /* if ($(".appendurl").children().length == 2) {
      $(".appendurl").children().last().remove();
      $(".trashenable").css("display", "none");
    } else {
      $(".appendurl").children().last().remove();
    }

    var values = $.map($('input[name="videourl[]"]'), function (el) {
      if (el.value != "") {
        return el.value;
      }
    });

    this.props.sendData("videourl", values);
    console.log(values); */
  };
  onchangetexturl = (e) => {
    var newData = [...this.state.arrUrl];
    newData[e.target.id][e.target.name] = e.target.value;
    this.props.sendData("arrUrl", newData);
    /* var values = $.map($('input[name="videourl[]"]'), function (el) {
      if (el.value != "") {
        return el.value;
      }
    });

    this.props.sendData("videourl", values);
    console.log(values); */
  };

  uploadFiles = (e) => {
    var arr = this.state.file;
    for (var i = 0; i < e.target.files.length; i++) {
      arr.push(URL.createObjectURL(e.target.files[i]));
    }
    this.setState({ file: arr });
    this.props.sendData("file", arr);
    uploadFile(e.target.files[0], config)
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };
  bannerChangedHandler = (event) => {
    event.preventDefault();
    console.log("helo", event.target.files[0]);
    $(".maligleft").css("display", "none");

    //alert(currentbanner);

    var arr = this.state.IMAGE;
    /*  for (let index = 0; index < currentbanner; index++) { */
    arr.push(event.target.files[0]);
    this.setState({ IMAGE: arr });
    var reader = new FileReader();
    /* var reader = new FileReader();

    reader.onload = function (e) {
      $(".coachBannerappend").last()
        .append(`<div class="col-md-4 col-sm-4 col-xs-6 removebannerpreview" id="" >
         <div class="coachCoverPhotoItem">
         <div class="coachCoverPhotoMedia">
         <img width="107" height="110" src='${e.target.result}'  />
         </div>
         </div>
         </div>`);
    }; */

    for (var i = 0; i < event.target.files.length; i++) {
      var file = event.target.files[i];
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        // update the array instead of replacing the entire value of preview

        $(".coachBannerappend").last()
          .append(`<div class="col-md-3 col-sm-3 col-xs-6 removebannerpreview" id="" >
         <div class="addPhotoItem">
         <div class="addPhotoItemMedia">
         <img  class="rounded img-responsive" height="200" src='${event.target.result}'  />
         <div class="mediaClose">
         <a href="#"><i class="fa fa-close"></i></a></div>
         </div>
         </div>
         </div>`);
      };
    }
    console.log(this.state.IMAGE);
    //reader.readAsDataURL(event.target.files[0]);
  };

  uploadSingleFile = (e) => {
    console.log(this.state.file.length);
    var arr = this.state.file;
    var arr1 = this.state.fileDetails;
    //alert(this.state.fileDetails.length);
    if (
      this.state.fileDetails.length + e.target.files.length > 20 ||
      e.target.files.length > 20
    ) {
      toast("You cannot upload more than 20 images");
      return false;
    }
    for (var i = 0; i < e.target.files.length; i++) {
      arr.push(URL.createObjectURL(e.target.files[i]));
      arr1.push(e.target.files[i]);
    }
    this.setState({ file: arr, fileDetails: arr1, isShowing: true });
    this.props.sendData("file", this.state.file);
    console.log(this.state.fileDetails);
    //this.props.sendData("fileDetails", this.state.fileDetails);
    console.log("filddddde", this.state.fileDetails);
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
        config.googleAuth.backURL + "user/upload_property_image",
        form,
        config1
      )
      .then((data) => {
        console.log("check data ", data.data);
        this.setState({ isShowing: false });
        this.props.sendData("fileDetailsurl", data.data.data);
        //window.location.reload();
      })
      .catch((error) => { });
  };

  upload = (e) => {
    e.preventDefault();

    console.log(this.state.file);
  };


  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }

  deleteFile = (e) => {
    const s = this.state.file.filter((item, index) => index !== e);
    const r = this.state.fileDetails.filter((item, index) => index !== e);
    this.setState({ file: s, fileDetails: r });

    this.props.sendData("file", s);
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
        config.googleAuth.backURL + "user/upload_property_image",
        form,
        config1
      )
      .then((data) => {
        console.log("check data ", data.data.data);
        //this.setState({ isShowing: false });
        this.props.sendData("fileDetailsurl", data.data.data);
        //window.location.reload();
      })
      .catch((error) => { });
  };

  render() {
    return (
      <div className="about addProptryBlk pd50">
        <div
          class="loader"
          style={{ display: this.state.isShowing ? "block" : "none" }}
        >
          <img src="images/loading.gif" />
        </div>
        <div class="row">
          <div class="">
            <form class="commonForm addPrptyForm brDrBg" id="loginfrm">
              <div class="innerHdng pb-4">
                <h3>Images/Video</h3>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    Youtube video <span class="required">*</span>
                  </label>
                </div>
              </div>

              {this.state.categorycheck[0].addressInfo.video == true ? (
                <>
                  <div class="appendurl">
                    {this.state.arrUrl.map((el, l) => {
                      return (
                        <>
                          <div class="row form-group align-items-center">
                            <div class="col-sm">
                              <input
                                placeholder="https://www.youtube.com/watch?v=OT0lAsLX9hE"
                                class="form-control "
                                type="text"
                                name="video"
                                onChange={this.onchangetexturl}
                                id={l}
                                value={el.video}
                              />
                            </div>
                            <div class="col-sm">
                              <input
                                placeholder="Enter title"
                                class="form-control "
                                type="text"
                                name="title"
                                onChange={this.onchangetexturl}
                                id={l}
                                value={el.title}
                              />
                            </div>
                            {l == 0 ? (
                              <>
                                <div class="col-sm">
                                  <a
                                    href="javascript:void(0)"
                                    class="btn mt-0"
                                    onClick={this.addUrl}
                                  >
                                    <i class="fa fa-plus "></i>
                                  </a>
                                </div>
                              </>
                            ) : (
                              <>
                                <div class="col-sm trashenable">
                                  <a
                                    href="javascript:void(0)"
                                    class="btn mt-0"
                                    id={l}
                                    onClick={(e) =>
                                      this.removeUrl(e.target.id, el.key)
                                    }
                                  >
                                    <i class="fa fa-trash"></i>
                                  </a>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}

              <div class="row form-group">
                <div class="col-md-12">
                  <label for="exampleFormControlInput1" class="form-label">
                    Virtual Tour
                  </label>
                </div>
              </div>
              <div class="row form-group">
                <div class="col-md-12">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="https://example.com/video.mp4"
                    name="virtualtoururl"
                    value={this.state.virtualtoururl}
                    onChange={this.onchangetext}
                  />
                </div>
              </div>

              {this.state.categorycheck[0].addressInfo.images == true ? (
                <>
                  <div class="row ">
                    <div class="col-md-12">
                      <label for="exampleFormControlInput1" class="form-label">
                        Images Upload <span class="required">*</span>
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
                          /*   <div key={item}>
                        <img src={item} alt="" />
                        <button
                          type="button"
                          onClick={() => this.deleteFile(index)}
                        >
                          delete
                        </button>
                      </div> */
                        );
                      })}
                  </div>
                </>
              ) : (
                <></>
              )}
            </form>
          </div>
        </div>
        <div class="gethtml" style={{ display: "none" }}>
          <div class="row form-group align-items-center">
            <div class="col-md-8">
              <input
                placeholder="https://example.com/video.mp4"
                class="form-control "
                type="text"
                name="videourl[]"
                onChange={this.onchangetexturl}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
