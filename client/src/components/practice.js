import React from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./headerinner";
import Footer from "./footer";
import { Form, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Stepper } from "@progress/kendo-react-layout";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import Step7 from "./step7";
import Step3_multiple from "./step3_multiple";
import Stripe from "./StripeContainer";
import $ from "jquery";
import jwt from "jsonwebtoken";
import config from "./config.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Geocode from "react-geocode";
/* import Modal from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css"; */
/* const ObjectId = require("mongodb").ObjectID;
let a = new ObjectId(); */
/* function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
let a = makeid(24); */
const axios = require("axios");
const AnyReactComponent = ({ text }) => (
  <div style={{ color: "red" }}>{text}</div>
);
const stepPages = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];

export default class AddProperty extends React.Component {
  state = {
    userData: [],
    pagestatus: false,
    singleProperty: false,
    multipleProperty: false,
    categoryProperty: false,
    mapapikey: config.googleAuth.mapapikey,
    imgurl: config.googleAuth.imgurl,
    singleCategory: [],
    MultipleCategory: [],
    categoryId: "",
    buildingName: "",
    address: "",
    unitNumber: "",
    province: "",
    city: "",
    community: "",
    postalCode: "",
    sq_foot: "",
    year_built: "",
    addressHide: "1",
    email: true,
    phone: true,
    text: true,
    addPhone: true,
    addEmail: true,
    phone1: "",
    phone2: "",
    extension1: "",
    extension2: "",
    email1: "",
    email2: "",
    address_yes: true,
    address_no: false,

    monthly_rent: 0,
    security_deposit: "",
    utilityDetails: [],
    bedrooms: "",
    bathrooms: "",
    furnishing: "",
    lease_term: "",
    availability_date: "",
    day: "",
    smoking: "",
    parking: "",
    parking_fee: "",
    dogs: "",
    cats: "",
    pet_fee: "",

    property_heading: "",
    rental_incentives: "",
    hidden_notes: "",
    full_description: "",

    homeFeaturesDetailsarr: [],
    buildingFeaturesDetailsarr: [],
    communityFeaturesDetailsarr: [],
    file: [],
    videourl: [],
    userid: "",
    suitearr: [],
    step1status: { buildingNamestatus: false, unitNumberstatus: false },
    step: 0,
    paymentStatus: false,
    visible: false,
    price: 300,
    formState: {},
    singleArray: {},
    customsuitarr: [],
    fileDetails: [],
    fileDetailsurl: [],
    addressLat: "",
    addressLng: "",
    obId: "",
    virtualtoururl: "",
    center: {
      lat: "",
      lng: "",
    },
    step1: {
      bulding: false,
      unit: false,
    },
    suitearr: [
      {
        valdationarr: [],
        utilityArr: [],
        categoryId: "",
        key: 1,
        data: [{ categoryId: "", utilityDetails: [] }],
      },
    ],
    arrUrl: [{ video: "", title: "", key: 1 }],
    steps: [
      {
        label: "Property Info",
        isValid: undefined,
      },
      {
        label: "Contact Info",
        isValid: undefined,
      },
      {
        label: "Rent Info",
        isValid: undefined,
      },
      {
        label: "Add Info",
        isValid: undefined,
      },
      {
        label: "Add Features",
        isValid: undefined,
      },
      {
        label: "Images/Video",
        isValid: undefined,
      },
      {
        label: "Preview",
        isValid: undefined,
      },
    ],
  };
  static defaultProps = {
    zoom: 13,
  };
  componentDidMount() {
    Geocode.setApiKey(this.state.mapapikey);
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();

    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    console.log(decoded_id.Uid);
    this.setState({ userid: decoded_id.Uid });
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
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(config.googleAuth.backURL + `get_object_id`, options).then(
        (value) => value.json()
      ),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          userData: value[0].data,
          obId: value[1].data,
          pagestatus: true,
        });
        //console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
    let getcategorys = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch(config.googleAuth.backURL + "fetch_all_category", getcategorys)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          singleCategory: responseJson.singlearray,
          MultipleCategory: responseJson.mutiplearray,
        });
        //toast("Time-Zone successfully updated!");
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(this.state);
  }
  lastStepIndex = this.state.steps.length - 1;
  isLastStep = this.lastStepIndex === this.state.step;

  onStepSubmit = (event) => {
    // alert('test');
    if (this.state.steps == 0) {
      return false;
    }
    const { isValid, values } = event;
    const currentSteps = this.state.steps.map((currentStep, index) => ({
      ...currentStep,
      isValid: index === this.state.step ? isValid : currentStep.isValid,
    }));
    this.setState({
      steps: currentSteps,
    });

    if (!isValid) {
      return false;
    }
    if (this.state.singleProperty) {
      var specificValuesFromArray = this.state.singleCategory.filter(
        (obj) => obj._id === this.state.categoryId
      );
    } else {
      var specificValuesFromArray = this.state.MultipleCategory.filter(
        (obj) => obj._id === this.state.categoryId
      );
    }
    //console.log(specificValuesFromArray);

    if (this.state.singleProperty) {
      if (this.state.step == 0) {
        if (
          this.state.buildingName == "" &&
          specificValuesFromArray[0].addressInfo.building_name
        ) {
          toast("Enter Building name!");
        } else if (
          this.state.address == "" &&
          specificValuesFromArray[0].addressInfo.address
        ) {
          toast("Enter Address!");
        } else if (
          this.state.unitNumber == "" &&
          specificValuesFromArray[0].addressInfo.unit_number
        ) {
          toast("Enter Unit number!");
        } else if (
          this.state.province == "" &&
          this.state.city == "" &&
          this.state.community == "" &&
          specificValuesFromArray[0].addressInfo.province_city_community
        ) {
          toast("Select Province,City,Community!");
        } else if (
          this.state.postalCode == "" &&
          specificValuesFromArray[0].addressInfo.postal_code
        ) {
          toast("Enter Postal code!");
        } else if (
          this.state.sq_foot == "" &&
          specificValuesFromArray[0].addressInfo.sq_foot
        ) {
          toast("Enter Square foot!");
        } else if (
          this.state.year_built == "" &&
          specificValuesFromArray[0].addressInfo.year_built
        ) {
          toast("Enter Year built!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 1) {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const pattern = new RegExp(/^[0-9\b]+$/);
        if (
          this.state.email === false &&
          this.state.phone === false &&
          this.state.text === false
        ) {
          toast("Select Contact method!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          this.state.phone1 == ""
        ) {
          toast("Enter Phone!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          pattern.test(this.state.phone1) === false
        ) {
          toast("Please enter only number.!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          this.state.phone1.length != 10
        ) {
          toast("Please enter valid phone number of 10 digits.!");
        } else if (this.state.email === true && this.state.email1 == "") {
          toast("Enter Email!");
        } else if (
          this.state.email === true &&
          reg.test(this.state.email1) === false
        ) {
          toast("Invalid Email!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 2) {
        console.log("check status", this.state.utilityDetails);
        if (
          this.state.monthly_rent == "" &&
          specificValuesFromArray[0].addressInfo.monthly_rent
        ) {
          toast("Enter monthly rent!");
        } else if (
          this.state.security_deposit == "" &&
          specificValuesFromArray[0].addressInfo.security_deposit
        ) {
          toast("Enter security deposit!");
        } else if (
          specificValuesFromArray[0].addressInfo.utilities === true &&
          this.state.utilityDetails.length == 0
        ) {
          toast("Select utility Details!");
        } else if (
          specificValuesFromArray[0].addressInfo.bedrooms === true &&
          this.state.bedrooms == ""
        ) {
          toast("Select bedrooms!");
        } else if (
          specificValuesFromArray[0].addressInfo.bathrooms === true &&
          this.state.bathrooms == ""
        ) {
          toast("Select bathrooms!");
        } else if (
          specificValuesFromArray[0].addressInfo.furnishing === true &&
          this.state.furnishing == ""
        ) {
          toast("Select furnishing!");
        } else if (
          specificValuesFromArray[0].addressInfo.lease_term === true &&
          this.state.lease_term == ""
        ) {
          toast("Select lease_term!");
        } else if (
          specificValuesFromArray[0].addressInfo.availability_date === true &&
          this.state.availability_date == ""
        ) {
          toast("Select availability_date!");
        } else if (
          specificValuesFromArray[0].addressInfo.day === true &&
          this.state.day == ""
        ) {
          toast("Select day!");
        } else if (
          specificValuesFromArray[0].addressInfo.smoking === true &&
          this.state.smoking == ""
        ) {
          toast("Select smoking!");
        } else if (
          specificValuesFromArray[0].addressInfo.parking === true &&
          this.state.parking == ""
        ) {
          toast("Select parking!");
        } else if (
          specificValuesFromArray[0].addressInfo.parking_fee === true &&
          this.state.parking_fee == ""
        ) {
          toast("Enter parking fee!");
        } else if (
          specificValuesFromArray[0].addressInfo.dogs === true &&
          this.state.dogs == ""
        ) {
          toast("Select dogs!");
        } else if (
          specificValuesFromArray[0].addressInfo.cats === true &&
          this.state.cats == ""
        ) {
          toast("Select cats!");
        } else if (
          specificValuesFromArray[0].addressInfo.pet_fee === true &&
          this.state.pet_fee == "" && this.state.cats == "Negotiable" || this.state.dogs == "Negotiable"
        ) {
          toast("Select pet_fee!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 3) {
        console.log(this.state.full_description.length)
        if (
          specificValuesFromArray[0].addressInfo.property_heading === true &&
          this.state.property_heading == ""
        ) {
          toast("Enter property heading!");
        } else if (
          specificValuesFromArray[0].addressInfo.rental_incentives === true &&
          this.state.rental_incentives == ""
        ) {
          toast("Enter rental incentives!");
        } else if (
          specificValuesFromArray[0].addressInfo.hidden_notes === true &&
          this.state.hidden_notes == ""
        ) {
          toast("Enter hidden notes!");
        } else if (
          specificValuesFromArray[0].addressInfo.full_description === true &&
          this.state.full_description == ""
        ) {
          toast("Enter full description!");
        } else if (
          this.state.full_description.length < 100 || this.state.full_description.length > 400
        ) {
          toast("Enter full description with minimum 100 characters and maximum 400 characters!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 4) {
        if (
          specificValuesFromArray[0].homeFeaturesDetails.length != 0 &&
          this.state.homeFeaturesDetailsarr.length == 0
        ) {
          toast("Select home feature!");
        } else if (
          specificValuesFromArray[0].buildingFeaturesDetails.length != 0 &&
          this.state.buildingFeaturesDetailsarr.length == 0
        ) {
          toast("Select building feature!");
        } else if (
          specificValuesFromArray[0].communityFeaturesDetails.length != 0 &&
          this.state.communityFeaturesDetailsarr.length == 0
        ) {
          toast("Select community feature!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 5) {
        console.log("image", this.state.file);
        if (
          this.state.arrUrl.length == 0 || !this.state.arrUrl?.[0]?.video || !this.state.arrUrl?.[0]?.video.includes("https")
        ) {
          toast("Enter Youtube Video url!");
        } else if (
          specificValuesFromArray[0].addressInfo.images === true &&
          this.state.file.length < 5
        ) {
          toast("Select atleast 5 Image!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 6) {
        Geocode.fromAddress(this.state.address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({ addressLat: lat, addressLng: lng });
          },
          (error) => {
            console.error(error);
          }
        );
        this.setState({
          singleArray: {
            primaryId: this.state.obId,
            price: this.state.price,
            propertyType: this.state.singleProperty ? 0 : 1,
            categoryId: this.state.categoryId,
            buildingName: this.state.buildingName,
            address: this.state.address,
            unitNumber: this.state.unitNumber,
            province: this.state.province,
            city: this.state.city,
            community: this.state.community,
            postalCode: this.state.postalCode,
            sq_foot: this.state.sq_foot,
            year_built: this.state.year_built,
            addressHide: this.state.addressHide,
            email: this.state.email,
            phone: this.state.phone,
            text: this.state.text,
            addPhone: this.state.addPhone,
            addEmail: this.state.addEmail,
            phone1: this.state.phone1,
            phone2: this.state.phone2,
            extension1: this.state.extension1,
            extension2: this.state.extension2,
            email1: this.state.email1,
            email2: this.state.email2,
            address_yes: this.state.address_yes,
            address_no: this.state.address_no,

            monthly_rent: parseInt(this.state.monthly_rent),
            security_deposit: this.state.security_deposit,
            utilityDetails: this.state.utilityDetails,
            bedroomsId: this.state.bedrooms,
            bathroomsId: this.state.bathrooms,
            furnishingId: this.state.furnishing,
            lease_termId: this.state.lease_term,
            availability_date: this.state.availability_date,
            day: this.state.day,
            smoking: this.state.smoking,
            parkingId: this.state.parking,
            parking_fee: this.state.parking_fee,
            dogs: this.state.dogs,
            cats: this.state.cats,
            pet_fee: this.state.pet_fee,

            property_heading: this.state.property_heading,
            rental_incentives: this.state.rental_incentives,
            hidden_notes: this.state.hidden_notes,
            full_description: this.state.full_description,

            homeFeaturesDetailsArr: this.state.homeFeaturesDetailsarr,
            buildingFeaturesDetailsArr: this.state.buildingFeaturesDetailsarr,
            communityFeaturesDetailsArr: this.state.communityFeaturesDetailsarr,
            fileDetails: this.state.fileDetailsurl,
            videoURlDetails: this.state.arrUrl,
            userId: this.state.userid,
            addressLat: this.state.addressLat,
            addressLng: this.state.addressLng,
            virtualtoururl: this.state.virtualtoururl,
            enable: false,
          },
        });
        if (this.state.paymentStatus === false) {
          let options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              primaryId: this.state.obId,
              categoryId: this.state.categoryId,
              propertyType: this.state.singleProperty ? 0 : 1,
              buildingName: this.state.buildingName,
              address: this.state.address,
              unitNumber: this.state.unitNumber,
              province: this.state.province,
              city: this.state.city,
              community: this.state.community,
              postalCode: this.state.postalCode,
              sq_foot: this.state.sq_foot,
              year_built: this.state.year_built,
              addressHide: this.state.addressHide,
              email: this.state.email,
              phone: this.state.phone,
              text: this.state.text,
              addPhone: this.state.addPhone,
              addEmail: this.state.addEmail,
              phone1: this.state.phone1,
              phone2: this.state.phone2,
              extension1: this.state.extension1,
              extension2: this.state.extension2,
              email1: this.state.email1,
              email2: this.state.email2,
              address_yes: this.state.address_yes,
              address_no: this.state.address_no,

              monthly_rent: parseInt(this.state.monthly_rent),
              security_deposit: this.state.security_deposit,
              utilityDetails: this.state.utilityDetails,
              bedroomsId: this.state.bedrooms,
              bathroomsId: this.state.bathrooms,
              furnishingId: this.state.furnishing,
              lease_termId: this.state.lease_term,
              availability_date: this.state.availability_date,
              day: this.state.day,
              smoking: this.state.smoking,
              parkingId: this.state.parking,
              parking_fee: this.state.parking_fee,
              dogs: this.state.dogs,
              cats: this.state.cats,
              pet_fee: this.state.pet_fee,

              property_heading: this.state.property_heading,
              rental_incentives: this.state.rental_incentives,
              hidden_notes: this.state.hidden_notes,
              full_description: this.state.full_description,

              homeFeaturesDetailsArr: this.state.homeFeaturesDetailsarr,
              buildingFeaturesDetailsArr: this.state.buildingFeaturesDetailsarr,
              communityFeaturesDetailsArr:
                this.state.communityFeaturesDetailsarr,
              fileDetails: this.state.fileDetailsurl,
              videoURLDetails: this.state.arrUrl,
              userId: this.state.userid,
              addressLat: this.state.addressLat,
              addressLng: this.state.addressLng,
              virtualtoururl: this.state.virtualtoururl,
              enable: false,
            }),
          };
          fetch(config.googleAuth.backURL + `user/add_user_property`, options)
            .then((res) => {
              //console.log("response",res)
              return res.json();
            })
            .then((data) => {
              if (data.status == true) {
                //toast(data.msg);
                toast("Property Added");
                setTimeout(() => {
                  this.props.history.push(
                    "detailproperty.html?id=" +
                    data.data +
                    "&uid=" +
                    this.state.userid +
                    ""
                  );
                }, 2000);
              } else {
                toast(data.msg);
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else {
          this.setState({
            visible: true,
          });
          //toast("payment");
        }
      }
    } else {
      console.log("manish", this.state.videourl);
      if (this.state.step == 0) {
        if (
          this.state.buildingName == "" &&
          specificValuesFromArray[0].addressInfo.building_name
        ) {
          toast("Enter Building name !");
        } else if (
          this.state.address == "" &&
          specificValuesFromArray[0].addressInfo.address
        ) {
          toast("Enter Address!");
        } /* else if (
          this.state.unitNumber == "" &&
          specificValuesFromArray[0].addressInfo.unit_number
        ) {
          toast("Enter Unit number!");
        }  */ else if (
          this.state.province == "" ||
          this.state.city == "" ||
          this.state.community == ""
          // specificValuesFromArray[0].addressInfo.province_city_community
        ) {
          toast("Select Province,City,Community!");
        } else if (
          this.state.postalCode == "" &&
          specificValuesFromArray[0].addressInfo.postal_code
        ) {
          toast("Enter Postal code!");
        } /* else if (
          this.state.sq_foot == "" &&
          specificValuesFromArray[0].addressInfo.sq_foot
        ) {
          toast("Enter Square footage!");
        } */else if (
          this.state.year_built == "" &&
          specificValuesFromArray[0].addressInfo.year_built
        ) {
          toast("Enter Year built!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 1) {
        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        const pattern = new RegExp(/^[0-9\b]+$/);
        if (
          this.state.email === false &&
          this.state.phone === false &&
          this.state.text === false
        ) {
          toast("Select Contact method!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          this.state.phone1 == ""
        ) {
          toast("Enter Phone!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          pattern.test(this.state.phone1) === false
        ) {
          toast("Please enter only number.!");
        } else if (
          (this.state.phone === true || this.state.text === true) &&
          this.state.phone1.length != 10
        ) {
          toast("Please enter valid phone number of 10 digits.!");
        } else if (this.state.email === true && this.state.email1 == "") {
          toast("Enter Email!");
        } else if (
          this.state.email === true &&
          reg.test(this.state.email1) === false
        ) {
          toast("Invalid Email!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 2) {
        console.log("this.state.suitearr.length", this.state.suitearr)

        let error = false

        if (this.state.suitearr.length == 0) {
          toast("Add Suites!");
          error = true
        } else {
          for (let i = 0; i < this.state.suitearr.length; i++) {
            if (
              !this.state.suitearr?.[i].data?.[0]?.categoryId
            ) {
              toast("Select Property Type!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.monthly_rent
            ) {
              toast("Please enter Monthly Rent!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.sq_foot
            ) {
              toast("Please enter Square Foot!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.unitNumber
            ) {
              toast("Please enter Unit Number!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.security_deposit
            ) {
              toast("Select Security Deposit!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.utilityDetails.length > 0
            ) {
              toast("Select atleast 1 utitlity!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.bedroomsId
            ) {
              toast("Select Bedroom!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.bathroomsId
            ) {
              toast("Select Bathrooms!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.furnishingId
            ) {
              toast("Select Furnishing!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.lease_termId
            ) {
              toast("Select Lease term!");
              error = true

            } else if (
              !this.state.suitearr?.[i].data?.[0]?.availability_date
            ) {
              toast("Select Availability Month!");
              error = true

            }
            // else if (
            //   !this.state.suitearr?.[i].data?.[0]?.day
            // ) {
            //   toast("Select Availability Date!");
            //   error = true
            // }
          }
        }



        if (!error) {
          if (
            specificValuesFromArray[0].addressInfo.smoking === true &&
            this.state.smoking == ""
          ) {
            toast("Select smoking!");
          } else if (
            specificValuesFromArray[0].addressInfo.parking === true &&
            this.state.parking == ""
          ) {
            toast("Select parking!");
          } else if (
            specificValuesFromArray[0].addressInfo.parking_fee === true &&
            this.state.parking_fee == ""
          ) {
            toast("Enter parking fee!");
          } else if (
            specificValuesFromArray[0].addressInfo.dogs === true &&
            this.state.dogs == ""
          ) {
            toast("Select dogs!");
          } else if (
            specificValuesFromArray[0].addressInfo.cats === true &&
            this.state.cats == ""
          ) {
            toast("Select cats!");
          } else if (
            specificValuesFromArray[0].addressInfo.pet_fee === true &&
            this.state.pet_fee == ""
          ) {
            toast("Select pet_fee!");
          } else {
            this.setState({
              step: Math.min(this.state.step + 1, this.lastStepIndex),
              formState: values,
            });
          }
        }

      }
      if (this.state.step == 3) {
        if (
          specificValuesFromArray[0].addressInfo.property_heading === true &&
          this.state.property_heading == ""
        ) {
          toast("Enter property heading!");
        } else if (
          specificValuesFromArray[0].addressInfo.rental_incentives === true &&
          this.state.rental_incentives == ""
        ) {
          toast("Enter rental incentives!");
        } else if (
          specificValuesFromArray[0].addressInfo.hidden_notes === true &&
          this.state.hidden_notes == ""
        ) {
          toast("Enter hidden notes!");
        } else if (
          specificValuesFromArray[0].addressInfo.full_description === true &&
          this.state.full_description == ""
        ) {
          toast("Enter full description!");
        } else if (
          this.state.full_description.length < 100 || this.state.full_description.length > 400
        ) {
          toast("Enter full description with minimum 100 characters and maximum 400 characters!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 4) {
        if (
          specificValuesFromArray[0].homeFeaturesDetails.length != 0 &&
          this.state.homeFeaturesDetailsarr.length == 0
        ) {
          toast("Select home feature!");
        } else if (
          specificValuesFromArray[0].buildingFeaturesDetails.length != 0 &&
          this.state.buildingFeaturesDetailsarr.length == 0
        ) {
          toast("Select building feature!");
        } else if (
          specificValuesFromArray[0].communityFeaturesDetails.length != 0 &&
          this.state.communityFeaturesDetailsarr.length == 0
        ) {
          toast("Select community feature!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 5) {
        console.log("image", this.state.file);
        if (
          this.state.arrUrl.length == 0 || !this.state.arrUrl?.[0]?.video || !this.state.arrUrl?.[0]?.video.includes("https")
        ) {
          toast("Enter Youtube Video url!");
        } else if (
          specificValuesFromArray[0].addressInfo.images === true &&
          this.state.file.length < 5
        ) {
          toast("Select Image!");
        } else {
          this.setState({
            step: Math.min(this.state.step + 1, this.lastStepIndex),
            formState: values,
          });
        }
      }
      if (this.state.step == 6) {
        Geocode.fromAddress(this.state.address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            this.setState({ addressLat: lat, addressLng: lng });
          },
          (error) => {
            console.error(error);
          }
        );
        this.setState({
          singleArray: {
            primaryId: this.state.obId,
            price: this.state.price,
            propertyType: this.state.singleProperty ? 0 : 1,

            buildingName: this.state.buildingName,
            address: this.state.address,
            unitNumber: this.state.unitNumber,
            province: this.state.province,
            city: this.state.city,
            community: this.state.community,
            postalCode: this.state.postalCode,
            sq_foot: this.state.sq_foot,
            year_built: this.state.year_built,
            addressHide: this.state.addressHide,
            email: this.state.email,
            phone: this.state.phone,
            text: this.state.text,
            addPhone: this.state.addPhone,
            addEmail: this.state.addEmail,
            phone1: this.state.phone1,
            phone2: this.state.phone2,
            extension1: this.state.extension1,
            extension2: this.state.extension2,
            email1: this.state.email1,
            email2: this.state.email2,
            address_yes: this.state.address_yes,
            address_no: this.state.address_no,
            suitearr: this.state.suitearr,

            smoking: this.state.smoking,
            parkingId: this.state.parking,
            parking_fee: this.state.parking_fee,
            dogs: this.state.dogs,
            cats: this.state.cats,
            pet_fee: this.state.pet_fee,

            property_heading: this.state.property_heading,
            rental_incentives: this.state.rental_incentives,
            hidden_notes: this.state.hidden_notes,
            full_description: this.state.full_description,

            homeFeaturesDetailsArr: this.state.homeFeaturesDetailsarr,
            buildingFeaturesDetailsArr: this.state.buildingFeaturesDetailsarr,
            communityFeaturesDetailAarr: this.state.communityFeaturesDetailsarr,
            fileDetails: this.state.fileDetailsurl,
            videoURLDetails: this.state.arrUrl,
            userId: this.state.userid,
            addressLat: this.state.addressLat,
            addressLng: this.state.addressLng,
            virtualtoururl: this.state.virtualtoururl,
            enable: false,
          },
        });
        if (this.state.paymentStatus === false) {
          let options = {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              primaryId: this.state.obId,
              propertyType: this.state.singleProperty ? 0 : 1,
              buildingName: this.state.buildingName,
              address: this.state.address,
              unitNumber: this.state.unitNumber,
              province: this.state.province,
              city: this.state.city,
              community: this.state.community,
              postalCode: this.state.postalCode,
              sq_foot: this.state.sq_foot,
              year_built: this.state.year_built,
              addressHide: this.state.addressHide,
              email: this.state.email,
              phone: this.state.phone,
              text: this.state.text,
              addPhone: this.state.addPhone,
              addEmail: this.state.addEmail,
              phone1: this.state.phone1,
              phone2: this.state.phone2,
              extension1: this.state.extension1,
              extension2: this.state.extension2,
              email1: this.state.email1,
              email2: this.state.email2,
              address_yes: this.state.address_yes,
              address_no: this.state.address_no,

              suitearr: this.state.suitearr,
              smoking: this.state.smoking,
              parkingId: this.state.parking,
              parking_fee: this.state.parking_fee,
              dogs: this.state.dogs,
              cats: this.state.cats,
              pet_fee: this.state.pet_fee,

              property_heading: this.state.property_heading,
              rental_incentives: this.state.rental_incentives,
              hidden_notes: this.state.hidden_notes,
              full_description: this.state.full_description,

              homeFeaturesDetailsArr: this.state.homeFeaturesDetailsarr,
              buildingFeaturesDetailsArr: this.state.buildingFeaturesDetailsarr,
              communityFeaturesDetailsArr:
                this.state.communityFeaturesDetailsarr,
              //fileDetails: this.state.fileDetails,
              fileDetails: this.state.fileDetailsurl,
              videoURLDetails: this.state.arrUrl,
              userId: this.state.userid,
              addressLat: this.state.addressLat,
              addressLng: this.state.addressLng,
              virtualtoururl: this.state.virtualtoururl,
              enable: false,
            }),
          };
          fetch(config.googleAuth.backURL + `user/add_user_property`, options)
            .then((res) => {
              //console.log("response",res)
              return res.json();
            })
            .then((data) => {
              if (data.status == true) {
                toast(data.msg);
                this.props.history.push(
                  "listproperty.html?id=" + this.state.obId + ""
                );
              } else {
                toast(data.msg);
              }
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else {
          this.setState({
            visible: true,
          });
          //toast("payment");
        }
      }
    }
    /* if (this.lastStepIndex === this.state.step) {
      alert(JSON.stringify(values));
    } */
  };
  onPrevClick = (event) => {
    event.preventDefault();
    this.setState({
      step: Math.max(this.state.step - 1, 0),
    });
  };
  changeunit(id) {
    // param is the argument you passed to the function
    if (id == "single") {
      this.setState({
        singleProperty: true,
        multipleProperty: false,
      });
    } else {
      this.setState({
        singleProperty: false,
        multipleProperty: true,
      });
    }
  }
  changecategory(catid, buildingName, unitNumber) {
    // param is the argument you passed to the function

    this.setState({
      categoryProperty: true,
      categoryId: catid,
      step1status: {
        buildingNamestatus: buildingName,
        unitNumberstatus: unitNumber,
      },
    });
  }
  getData = (name, value) => {
    console.log(name, value);
    this.setState({ [name]: value });
  };

  handlePropertytype = (e) => {
    console.log("categoryid: ", e.target.value)
    if (
      e.target[e.target.selectedIndex].getAttribute(
        "data-buildingNamestatus"
      ) == false ||
      e.target[e.target.selectedIndex].getAttribute(
        "data-buildingNamestatus"
      ) == "false"
    ) {
      this.setState({
        buildingName: "",
      });
    }
    if (
      e.target[e.target.selectedIndex].getAttribute("data-unitNumberstatus") ==
      false ||
      e.target[e.target.selectedIndex].getAttribute("data-unitNumberstatus") ==
      "false"
    ) {
      this.setState({
        unitNumber: "",
      });
    }
    this.setState({
      step1status: {
        buildingNamestatus:
          e.target[e.target.selectedIndex].getAttribute(
            "data-buildingNamestatus"
          ) == "true"
            ? true
            : false,
        unitNumberstatus:
          e.target[e.target.selectedIndex].getAttribute(
            "data-unitNumberstatus"
          ) == "true"
            ? true
            : false,
      },
      categoryid: e.target.value,
    });
  };
  onchangeinput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlehideaddress = (e) => {
    if (e.target.value == "1") {
      this.setState({ address_yes: true });
    } else {
      this.setState({ address_no: true });
    }
  };
  addphone = (e) => {
    this.setState({ addPhone: false });
  };
  addemail = (e) => {
    this.setState({ addEmail: false });
  };
  handlestep2 = (e) => {
    this.setState({ [e.target.name]: e.target.checked });
    if (!this.state.phone && !this.state.text) {
      this.setState({
        addPhone: true,
        phone1: "",
        phone2: "",
        extension1: "",
        extension2: "",
      });
    }
    if (!this.state.email) {
      this.setState({ addEmail: true });
    }
  };
  onCloseModal = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    let closeModal = () => this.setState({ imageprepop: false });
    return (
      <div class="body">
        <ToastContainer />
        {this.state.pagestatus ? (
          <>
            <Header key1={this.state.userData} />
          </>
        ) : (
          <></>
        )}
        {this.state.singleProperty || this.state.multipleProperty ? (
          <></>
        ) : (
          <>
            <section class="wrapper addListingBlk pd60">
              <div class="container">
                <div class="addListRow">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="choseListing">
                        <div class="choseIner">
                          <a
                            href="javascript:void(0)"
                            onClick={() => this.changeunit("single")}
                          >
                            <div class="choseImg">
                              <img src="images/villa-icon.png" />
                            </div>
                            <div class="choseText">
                              <h3>SINGLE UNIT</h3>
                              <p>
                                House, basement, condo, main floor, shared, etc.
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="choseListing">
                        <div class="choseIner">
                          <a
                            href="javascript:void(0)"
                            onClick={() => this.changeunit("multiple")}
                          >
                            <div class="choseImg">
                              <img src="images/appartment-icon.png" />
                            </div>
                            <div class="choseText">
                              <h3>MULTIPLE UNITS</h3>
                              <p>
                                House, basement, condo, main floor, shared, etc.
                              </p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {this.state.singleProperty ? (
          <>
            {!this.state.categoryId ? (
              <>
                <section class="wrapper prtyTypeList pt60">
                  <div class="container">
                    <div class="row">
                      {this.state.singleCategory && this.state.singleCategory.map((l) => {
                        return (
                          <>
                            <div class="col-md-2">
                              <div class="h-cat-item">
                                <a
                                  href="javascript:void(0)"
                                  onClick={() =>
                                    this.changecategory(
                                      l._id,
                                      l.addressInfo.building_name,
                                      l.addressInfo.unit_number
                                    )
                                  }
                                >
                                  <div class="h-cat-icon">
                                    <img
                                      src={`${this.state.imgurl}${l.cat_img}`}
                                    />
                                  </div>
                                  <div class="h-cat-des">
                                    <i>{l.cat_name}</i>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}

        {this.state.multipleProperty ? (
          <>
            {!this.state.categoryId ? (
              <>
                <section class="wrapper prtyTypeList pt60 ">
                  <div class="container">
                    <div class="row">
                      {this.state.MultipleCategory.map((l) => {
                        return (
                          <>
                            <div class="col-md-2">
                              <div class="h-cat-item">
                                <a
                                  href="javascript:void(0)"
                                  onClick={() =>
                                    this.changecategory(
                                      l._id,
                                      l.addressInfo.building_name,
                                      l.addressInfo.unit_number
                                    )
                                  }
                                >
                                  <div class="h-cat-icon">
                                    <img
                                      src={`${this.state.imgurl}${l.cat_img}`}
                                    />
                                  </div>
                                  <div class="h-cat-des">
                                    <i>{l.cat_name}</i>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {this.state.categoryProperty ? (
          <>
            <section class="wrapper steperSingle pd60">
              <div class="container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Stepper value={this.state.step} items={this.state.steps} />
                  <Form
                    initialValues={this.state.formState}
                    onSubmitClick={this.onStepSubmit}
                    render={(formRenderProps) => (
                      <div
                        style={{
                          alignSelf: "center",
                        }}
                      >
                        <FormElement
                          style={{
                            width: 750,
                          }}
                        >
                          {" "}
                          <div>
                            {this.state.singleProperty ? (
                              <>
                                {this.state.step == 0 ? (
                                  <Step1
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.singleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.buildingName,
                                      this.state.address,
                                      this.state.unitNumber,
                                      this.state.province,
                                      this.state.city,
                                      this.state.community,
                                      this.state.postalCode,
                                      this.state.sq_foot,
                                      this.state.year_built,
                                    ]}
                                    sendData={this.getData}
                                    sendData1={this.getDatastep1}
                                  />
                                ) : this.state.step == 1 ? (
                                  <Step2
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={[
                                      this.state.phone1,
                                      this.state.email1,
                                      this.state.phone,
                                      this.state.email,
                                      this.state.text,
                                      this.state.extension1,
                                      this.state.extension2,
                                      this.state.phone2,
                                      this.state.email2,
                                      this.state.addPhone,
                                      this.state.addEmail,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 2 ? (
                                  <Step3
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.singleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.monthly_rent,
                                      this.state.security_deposit,
                                      this.state.utilityDetails,
                                      this.state.bedrooms,
                                      this.state.bathrooms,
                                      this.state.furnishing,
                                      this.state.lease_term,
                                      this.state.availability_date,
                                      this.state.day,
                                      this.state.smoking,
                                      this.state.parking,
                                      this.state.parking_fee,
                                      this.state.dogs,
                                      this.state.cats,
                                      this.state.pet_fee,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 3 ? (
                                  <Step4
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.singleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.property_heading,
                                      this.state.rental_incentives,
                                      this.state.hidden_notes,
                                      this.state.full_description,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 4 ? (
                                  <Step5
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.singleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.homeFeaturesDetailsarr,
                                      this.state.buildingFeaturesDetailsarr,
                                      this.state.communityFeaturesDetailsarr,
                                      this.state.IMAGE,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 5 ? (
                                  <Step6
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.singleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.file,
                                      this.state.fileDetails,
                                      this.state.arrUrl,
                                      this.state.virtualtoururl,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 6 ? (
                                  <Step7
                                    key5={[
                                      this.state.file,
                                      this.state.buildingName,
                                      this.state.address,
                                      this.state.monthly_rent,
                                      this.state.bedrooms,
                                      this.state.bathrooms,
                                      this.state.sq_foot,
                                    ]}
                                    key6={this.state.suitearr}
                                    sendData={this.getData}
                                  />
                                ) : (
                                  "Error"
                                )}
                              </>
                            ) : (
                              <>
                                {this.state.step == 0 ? (
                                  <Step1
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.MultipleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.buildingName,
                                      this.state.address,
                                      this.state.unitNumber,
                                      this.state.province,
                                      this.state.city,
                                      this.state.community,
                                      this.state.postalCode,
                                      this.state.sq_foot,
                                      this.state.year_built,
                                    ]}
                                    sendData={this.getData}
                                    sendData1={this.getDatastep1}
                                  />
                                ) : this.state.step == 1 ? (
                                  <Step2
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={[
                                      this.state.phone1,
                                      this.state.email1,
                                      this.state.phone,
                                      this.state.email,
                                      this.state.text,
                                      this.state.extension1,
                                      this.state.extension2,
                                      this.state.phone2,
                                      this.state.email2,
                                      this.state.addPhone,
                                      this.state.addEmail,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 2 ? (
                                  <Step3_multiple
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.MultipleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.smoking,
                                      this.state.parking,
                                      this.state.parking_fee,
                                      this.state.dogs,
                                      this.state.cats,
                                      this.state.pet_fee,

                                      this.state.sq_foot,
                                    ]}
                                    key6={this.state.suitearr}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 3 ? (
                                  <Step4
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.MultipleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.property_heading,
                                      this.state.rental_incentives,
                                      this.state.hidden_notes,
                                      this.state.full_description,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 4 ? (
                                  <Step5
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.MultipleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.homeFeaturesDetailsarr,
                                      this.state.buildingFeaturesDetailsarr,
                                      this.state.communityFeaturesDetailsarr,
                                      this.state.IMAGE,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 5 ? (
                                  <Step6
                                    key1={this.state.categoryId}
                                    key2={
                                      this.state.singleProperty
                                        ? this.state.singleCategory
                                        : this.state.MultipleCategory
                                    }
                                    key3={this.state.step1status}
                                    key4={this.state.MultipleCategory.filter(
                                      (obj) => obj._id === this.state.categoryId
                                    )}
                                    key5={[
                                      this.state.file,
                                      this.state.fileDetails,
                                      this.state.arrUrl,
                                      this.state.virtualtoururl,
                                    ]}
                                    sendData={this.getData}
                                  />
                                ) : this.state.step == 6 ? (
                                  <Step7
                                    key5={[
                                      this.state.file,
                                      this.state.buildingName,
                                      this.state.address,
                                      this.state.monthly_rent,
                                      this.state.bedrooms,
                                      this.state.bathrooms,
                                      this.state.sq_foot,
                                    ]}
                                    key6={this.state.suitearr}
                                    sendData={this.getData}
                                  />
                                ) : (
                                  "Error"
                                )}
                              </>
                            )}
                          </div>
                          <span
                            style={{
                              marginTop: "40px",
                            }}
                            className={"k-form-separator"}
                          />
                          <div
                            style={{
                              justifyContent: "space-between",
                              alignContent: "center",
                            }}
                            className={"k-form-buttons k-buttons-end"}
                          >
                            <span
                              style={{
                                alignSelf: "center",
                              }}
                            >
                              Step {this.state.step + 1} of 7
                            </span>
                            <div>
                              {this.state.step !== 0 ? (
                                <Button
                                  style={{
                                    marginRight: "16px",
                                  }}
                                  onClick={this.onPrevClick}
                                >
                                  Previous
                                </Button>
                              ) : undefined}

                              <Button
                                primary={true}
                                onClick={formRenderProps.onSubmit}
                              >
                                {this.state.step == 6 ? "Submit" : "Next"}
                              </Button>
                            </div>
                          </div>
                        </FormElement>
                      </div>
                    )}
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
        {/* <Link
          class="comn-btn blu "
          to={{
            pathname: "/detailproperty.html",
            state: this.state,
          }}
        >
          sss
        </Link> */}
        <Footer />

        <Modal open={this.state.visible} onClose={this.onCloseModal}>
          <div class="row">
            <div class="innerHdng pb-4">
              <h3>Contact Landload</h3>
            </div>
            <div class="col">
              <Stripe key={this.state.price} key1={this.state.singleArray} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
