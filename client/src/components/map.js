import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import queryString from "query-string";
import config from "./config.js";
import { trimeString } from "./helper.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleMapReact, { Marker } from "google-map-react";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
const axios = require("axios");
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export default class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.75,
      lng: -73.95,
    },
    zoom: 16,
  };
  state = {
    latg: "",
    lang: "",
    address: "",
    file: [],
  };
  componentDidMount() {
    //alert("dhd");
    console.log(trimeString("dfsdfsdfb sdhsdf sfdjh", 3));
    Geocode.setApiKey("AIzaSyC8fAreSesb5aow6dXU9IVDcarAsTBi6hs");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    Geocode.fromLatLng(this.state.latg, this.state.lang).then(
      (response) => {
        const address = response.results[0].formatted_address;
        this.setState({
          address: address,
        });
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadMap = (map, maps) => {
    const cityCircle = new maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: { lat: 40.756795, lng: -73.954298 },
      radius: 10000,
      draggable: true,
    });

    let marker = new maps.Marker({
      position: { lat: 40.856795, lng: -73.954298 },
      map,
      draggable: true,
    });
    marker.addListener("dragend", () => {
      console.log(marker.getPosition().lat());
      console.log(marker.getPosition().lng());
    });

    cityCircle.addListener("dragend", () => {
      this.setState({
        latg: cityCircle.getCenter().lat(),
        lang: cityCircle.getCenter().lng(),
      });
    });
  };
  /* uploadSingleFile = (e) => {
    this.setState({ file: e.target.files });

    console.log("filddddde", this.state.file);
  }; */
  uploadSingleFile = (e) => {
    e.preventDefault();
    //this.setState({ file: e.target.files[0] });
    const form = new FormData();
    /* console.log("filddddde", e.target.files);

    for (const key of Object.keys(e.target.files)) {
      //alert(key)
      form.append("file", e.target.files[key]);
    } */
    //form.append("file", e.target.files[0]);
    form.append("title", "about us");
    form.append("description", "dummy description");
    const config1 = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post(config.googleAuth.backURL + "settings/add_about_us", form, config1)
      .then((data) => {
        console.log(data);

        //window.location.reload();
      })
      .catch((error) => {});
  };
  render() {
    return (
      <body class="loginSignup">
        <ToastContainer />
        <h2>{this.state.address}</h2>
        <input
          type="file"
          multiple
          className="form-control fileUpload  form-control-lg"
          onChange={this.uploadSingleFile}
        />
        <button type="button" onClick={this.submitimage}>
          Send
        </button>
        {/* <Autocomplete
          apiKey="AIzaSyCr6WNpnNrRDTrsqLiwIRG1i6nuQYYtmUs"
          onPlaceSelected={(place) => {
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lang());
          }}
        /> */}

        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyC8fAreSesb5aow6dXU9IVDcarAsTBi6hs",
            }}
            defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => this.loadMap(map, maps)}
          ></GoogleMapReact>
        </div>
      </body>
    );
  }
}
