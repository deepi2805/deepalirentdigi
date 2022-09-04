import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AWS from "aws-sdk";
import $ from "jquery";
import { uploadFile } from "react-s3";
const S3_BUCKET = "rentdigi";
const REGION = "ap-south-1";
const ACCESS_KEY = "AKIAIXLXD3J3CXVBU2ZA";
const SECRET_ACCESS_KEY = "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";

const config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export default class Step5 extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    homeFeaturesDetails: this.props.key5[0],
    buildingFeaturesDetails: this.props.key5[1],
    communityFeaturesDetails: this.props.key5[2],
    IMAGE: [],
    file: [],
    setFile: [],
  };
  onchangetext = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  addUrl = (e) => {
    var html = $(".gethtml").html();
    $(".appendurl").last().append(html);
    $(".trashenable").css("display", "block");
    var values = $.map($('input[name="videourl[]"]'), function (el) {
      if (el.value != "") {
        return el.value;
      }
    });

    this.props.sendData("videourl", values);
    console.log(values);
  };
  removeUrl = (e) => {
    //alert($(".appendurl").children().length);
    if ($(".appendurl").children().length == 2) {
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
    console.log(values);
  };


  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }


  onchangetexturl = (e) => {
    var values = $.map($('input[name="videourl[]"]'), function (el) {
      if (el.value != "") {
        return el.value;
      }
    });

    this.props.sendData("videourl", values);
    console.log(values);
  };
  changeDisableCheckboxRadioButton = (e) => {
    // console.log("id", e.target.id);
    /// console.log("checkbox status", e.target.checked);

    if (e.target.checked) {
      let arr = this.state.homeFeaturesDetails;
      arr.push({ id: e.target.id });
      this.setState({ homeFeaturesDetails: arr });
    } else {
      /* var index = this.state.homeFeaturesDetails.indexOf(e.target.id);
      if (index !== -1) {
        this.state.homeFeaturesDetails.splice(index, 1);
        this.setState({ homeFeaturesDetails: this.state.homeFeaturesDetails });
      } */

      let new_obj = this.state.homeFeaturesDetails;
      new_obj.splice(
        new_obj.findIndex((i) => i.id === e.target.id),
        1
      );

      this.setState({ homeFeaturesDetails: new_obj });
    }
    this.props.sendData(
      "homeFeaturesDetailsarr",
      this.state.homeFeaturesDetails
    );
  };
  changeDisableCheckboxRadioButton1 = (e) => {
    // console.log("id", e.target.id);
    /// console.log("checkbox status", e.target.checked);

    if (e.target.checked) {
      let arr = this.state.buildingFeaturesDetails;
      arr.push({ id: e.target.id });
      this.setState({ buildingFeaturesDetails: arr });
    } else {
      /* var index = this.state.buildingFeaturesDetails.indexOf(e.target.id);
      if (index !== -1) {
        this.state.buildingFeaturesDetails.splice(index, 1);
        this.setState({
          buildingFeaturesDetails: this.state.buildingFeaturesDetails,
        });
      } */
      let new_obj = this.state.buildingFeaturesDetails;
      new_obj.splice(
        new_obj.findIndex((i) => i.id === e.target.id),
        1
      );

      this.setState({ buildingFeaturesDetails: new_obj });
    }
    this.props.sendData(
      "buildingFeaturesDetailsarr",
      this.state.buildingFeaturesDetails
    );
  };
  changeDisableCheckboxRadioButton2 = (e) => {
    // console.log("id", e.target.id);
    /// console.log("checkbox status", e.target.checked);

    if (e.target.checked) {
      let arr = this.state.communityFeaturesDetails;
      arr.push({ id: e.target.id });
      this.setState({ communityFeaturesDetails: arr });
    } else {
      /* var index = this.state.communityFeaturesDetails.indexOf(e.target.id);
      if (index !== -1) {
        this.state.communityFeaturesDetails.splice(index, 1);
        this.setState({
          communityFeaturesDetails: this.state.communityFeaturesDetails,
        });
      } */
      let new_obj = this.state.communityFeaturesDetails;
      new_obj.splice(
        new_obj.findIndex((i) => i.id === e.target.id),
        1
      );

      this.setState({ communityFeaturesDetails: new_obj });
    }
    this.props.sendData(
      "communityFeaturesDetailsarr",
      this.state.communityFeaturesDetails
    );
    console.log("inside option disabled", this.state.communityFeaturesDetails);
  };
  uploadFiles = (e) => {
    this.props.sendData("IMAGE", e.target.files);
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
    var arr = this.state.file;
    for (var i = 0; i < e.target.files.length; i++) {
      arr.push(URL.createObjectURL(e.target.files[i]));
    }
    this.setState({ file: arr });
    console.log("file", this.state.file);
  };

  upload = (e) => {
    e.preventDefault();
    console.log(this.state.file);
  };

  deleteFile = (e) => {
    const s = this.state.file.filter((item, index) => index !== e);
    this.setState({ file: s });
    console.log(s);
  };

  render() {
    return (
      <div className="about addProptryBlk pd50">
        <div class="row">
          <div class="">
            <form class="commonForm addPrptyForm brDrBg" id="loginfrm">
              <div class="featureBlk">
                <div class="innerHdng pb-4">
                  <h3>Add Features</h3>
                </div>
                {this.state.categorycheck[0].homeFeaturesDetails ? (
                  <>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Home Features <span class="required">*</span>
                        </label>
                      </div>
                    </div>
                    <div class="row form-group">
                      {this.state.categorycheck[0].homeFeaturesDetails.map(
                        (l) => {
                          var checkarr = this.state.homeFeaturesDetails.some(
                            (item) => l._id === item.id
                          );

                          return (
                            <>
                              <div class="col-md-4">
                                <label class="control control--checkbox">
                                  {l.feature_name}
                                  <input
                                    type="checkbox"
                                    id={l._id}
                                    onChange={
                                      this.changeDisableCheckboxRadioButton
                                    }
                                    defaultChecked={checkarr}
                                  />
                                  <div class="control__indicator"></div>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].buildingFeaturesDetails ? (
                  <>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Building Features <span class="required">*</span>
                        </label>
                      </div>
                    </div>
                    <div class="row form-group">
                      {this.state.categorycheck[0].buildingFeaturesDetails.map(
                        (l) => {
                          var checkarr =
                            this.state.buildingFeaturesDetails.some(
                              (item) => l._id === item.id
                            );
                          return (
                            <>
                              <div class="col-md-4">
                                <label class="control control--checkbox">
                                  {l.feature_name}
                                  <input
                                    type="checkbox"
                                    id={l._id}
                                    onChange={
                                      this.changeDisableCheckboxRadioButton1
                                    }
                                    defaultChecked={checkarr}
                                  />
                                  <div class="control__indicator"></div>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].communityFeaturesDetails ? (
                  <>
                    <div class="row form-group">
                      <div class="col-md-12">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Community Features <span class="required">*</span>
                        </label>
                      </div>
                    </div>
                    <div class="row form-group">
                      {this.state.categorycheck[0].communityFeaturesDetails.map(
                        (l) => {
                          var checkarr =
                            this.state.communityFeaturesDetails.some(
                              (item) => l._id === item.id
                            );
                          return (
                            <>
                              <div class="col-md-4">
                                <label class="control control--checkbox">
                                  {l.feature_name}
                                  <input
                                    type="checkbox"
                                    id={l._id}
                                    onChange={
                                      this.changeDisableCheckboxRadioButton2
                                    }
                                    defaultChecked={checkarr}
                                  />
                                  <div class="control__indicator"></div>
                                </label>
                              </div>
                            </>
                          );
                        }
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
        <div class="gethtml" style={{ display: "none" }}>
          <div class="row form-group align-items-center">
            <div class="col-md-8">
              <input
                placeholder="Enter Url"
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
