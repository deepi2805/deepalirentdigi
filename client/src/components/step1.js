import React from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Autocomplete from "react-google-autocomplete";
import GoogleMapReact from "google-map-react";
import state from "./states.json";
import city from "./city.json";
import config from "./config.js";
import Geocode from "react-geocode";
const AnyReactComponent = ({ text }) => (
  <div style={{ color: "red" }}>{text}</div>
);

export default class Step1 extends React.Component {
  state = {
    mapapikey: config.googleAuth.mapapikey,
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    lat: "",
    lang: "",
    map: false,
    address: this.props.key5[1],
    unitNumber: this.props.key5[2],
    province: this.props.key5[3],
    city: this.props.key5[4],
    community: this.props.key5[5],
    postalCode: this.props.key5[6],

    buildingName: this.props.key5[0],

    sq_foot: this.props.key5[7],
    year_built: this.props.key5[8],
    addressHide: this.props.key5[2],
    center: {
      lat: "",
      lng: "",
    },
    address_yes: true,
    address_no: false,
    status: true,
    unit_count: this.props.key5[2].length,
    backspace: false,
  };
  static defaultProps = {
    zoom: 13,
  };
  componentDidMount() {
    var zipcode = "";
    console.log("step1", this.state.categorycheck);
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
    /*  Geocode.fromLatLng("30.3752", "76.7821").then(
      (response) => {
       
        var address = response.results[0].address_components;
        for (
          let j = 0;
          j < response.results[0].address_components.length;
          j++
        ) {
          if (address[j].types.includes("postal_code")) {
            alert(address[j].short_name);
          }
        }
      },
      (error) => {
        console.error(error);
      }
    ); */
  }
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
  handleLanguage = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handlehideaddress = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    if (e.target.value == "1") {
      this.setState({ address_yes: true });
    } else {
      this.setState({ address_no: true });
    }
  };
  handlePropertytype = (e) => {
    //alert(e.target.value);
    this.props.sendData(e.target.name, e.target.value);
    var temparr = this.state.category.filter(
      (obj) => obj._id === e.target.value
    );

    //this.setState({ categorycheck: temparr });

    //console.log("tst", this.state.categorycheck[0].addressInfo.building_name);
    /*  this.props.sendData1(
      e.target[e.target.selectedIndex].getAttribute("data-buildingNamestatus"),
      e.target[e.target.selectedIndex].getAttribute("data-unitNumberstatus")
      ); */
    this.setState({
      categoryid: e.target.value,
      categorycheck: temparr,
    });
    console.log("tst", this.state.categorycheck);
  };
  onchangetextrental = (e) => {
    if (this.state.unit_count <= 4 || this.state.backspace) {
      this.props.sendData(e.target.name, e.target.value);

      this.setState({
        unitNumber: e.target.value,
        unit_count: e.target.value.length,
        backspace: false,
      });
    }
  };
  //console.log(this.state)
  render() {
    var tt = this.state.province;
    var matchingResults = city.filter(function (x) {
      return x.province_short == tt;
    });
    return (
      <div className="about addProptryBlk pd50">
        <form class="commonForm addPrptyForm brDrBg" id="adProperty">
          <div class="row">
            <div class="col-md-12 whiteBgShdw">
              <div class="innerHdng pb-4">
                <h3>Property Info</h3>
              </div>
              <div class="row">
                {this.state.categorycheck?.[0]?.unit_type == "single" ? (
                  <>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Property Type<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={this.handlePropertytype}
                        name="categoryId"
                        value={this.state.categoryid}
                      >
                        {this.state.category.map((l) => {
                          return (
                            <>
                              <option value={l._id}>{l.cat_name}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck?.[0]?.addressInfo?.building_name ==
                  true ? (
                  <>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Building Name<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.buildingName}
                        placeholder="Building Name"
                        onChange={this.handleLanguage}
                        name="buildingName"
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div class="row">
                {console.log(this.state.categorycheck)}
                {(this.state.categorycheck.length > 0) ? (
                  <>
                    <div class="form-group col-md">
                      <div class="">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Address<span class="required">*</span>
                        </label>
                        <Autocomplete
                          apiKey={this.state.mapapikey}
                          onPlaceSelected={(place) => {
                            console.log(place);
                            this.props.sendData(
                              "address",
                              place.formatted_address
                            );
                            this.setState({
                              map: false,
                              address: place.formatted_address,
                            });
                            this.props.sendData(
                              "addressLat",
                              place.geometry.location.lat()
                            );
                            this.props.sendData(
                              "addressLng",
                              place.geometry.location.lng()
                            );
                            Geocode.fromLatLng(
                              place.geometry.location.lat(),
                              place.geometry.location.lng()
                            ).then(
                              (response) => {
                                /*  const address = response.results[0].formatted_address;
        let city, state, country; */
                                var address =
                                  response.results[0].address_components;
                                for (
                                  let j = 0;
                                  j <
                                  response.results[0].address_components.length;
                                  j++
                                ) {
                                  if (
                                    address[j].types.includes("postal_code")
                                  ) {
                                    this.setState({
                                      postalCode: address[j].short_name,
                                    });
                                    this.props.sendData(
                                      "postalCode",
                                      address[j].short_name
                                    );
                                  }
                                }
                              },
                              (error) => {
                                console.error(error);
                              }
                            );
                            this.setState({
                              lat: place.geometry.location.lat(),
                              lang: place.geometry.location.lng(),

                              center: {
                                lat: parseFloat(
                                  place.geometry.location
                                    .lat()
                                    .toString()
                                    .substr(0, 5)
                                ),
                                lng: parseFloat(
                                  place.geometry.location
                                    .lng()
                                    .toString()
                                    .substr(0, 5)
                                ),
                              },
                              map: true,
                            });
                            console.log(this.state);
                          }}
                          class="form-control"
                          placeholder="Address"
                          onChange={this.handleLanguage}
                          name="address"
                          value={this.state.address}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck?.[0]?.addressInfo?.unit_number == true &&
                  this.state.categorycheck?.[0]?.unit_type == "single" ? (
                  <>
                    <div class="form-group col-auto">
                      <div class="">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Unit Number{" "}
                          <span class="unitNumbr">
                            {this.state.unit_count}/5
                          </span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="#"
                          placeholder="Ex:1"
                          onChange={this.onchangetextrental}
                          name="unitNumber"
                          value={this.state.unitNumber}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              this.setState({
                                backspace: true,
                              });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {this.state.categorycheck?.[0]?.addressInfo
                ?.province_city_community == true ? (
                <>
                  <div class="row">
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Province<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={this.handleLanguage}
                        name="province"
                        value={this.state.province}
                      >
                        <option value="">Select </option>

                        {state.map((l) => {
                          return (
                            <>
                              <option value={l.abbreviation}>{l.name}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        City<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={this.handleLanguage}
                        name="city"
                        value={this.state.city}
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
                    </div>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Community<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={this.handleLanguage}
                        name="community"
                        value={this.state.community}
                      >
                        <option selected>Select </option>
                        <option value="1">Academy</option>
                        <option value="2">Acadia</option>
                        <option value="3">Albert Park</option>
                        <option value="4">Altadore</option>
                        <option value="5">Applewood</option>
                        <option value="6">Arbour Lake</option>
                        <option value="7">Aspen Woods</option>
                        <option value="8">Auburn Bay</option>
                        <option value="9">Balmoral</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}
              <div class="row">
                {this.state.categorycheck?.[0]?.addressInfo?.postal_code == true ? (
                  <>
                    <div class="form-group col-md-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Postal Code<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.postalCode}
                        placeholder="Postal Code"
                        onChange={this.handleLanguage}
                        name="postalCode"
                        value={this.state.postalCode}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div class="form-group col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <label for="exampleFormControlInput1" class="form-label">
                        Hide Community<span class="required">*</span>
                      </label>
                    </div>
                  </div>

                  <div class="row align-items-center">
                    <div class="col-md-6">
                      <label for="f-option" class="radio">
                        <input
                          onChange={this.handlehideaddress}
                          type="radio"
                          id="f-option"
                          name="addressHide"
                          tabindex="1"
                          value="1"
                          defaultChecked={this.state.address_yes}
                        />
                        <span>Yes</span>
                      </label>
                      <label for="s-option" class="radio">
                        <input
                          onChange={this.handlehideaddress}
                          type="radio"
                          id="s-option"
                          name="addressHide"
                          tabindex="2"
                          value="2"
                          defaultChecked={this.state.address_no}
                        />
                        <span>No</span>
                      </label>
                    </div>
                    <div class="col-md-6">
                      <div class="textInput">
                        Selecting Yes will display the community name.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                {this.state.categorycheck?.[0]?.addressInfo?.sq_foot == true &&
                  this.state.categorycheck?.[0]?.unit_type == "single" ? (
                  <>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Square foot<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.sq_foot}
                        placeholder="Square Foot"
                        onChange={this.handleLanguage}
                        name="sq_foot"
                        value={this.state.sq_foot}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck?.[0]?.addressInfo?.year_built == true ? (
                  <>
                    <div class="form-group col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Year Built<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={this.state.year_built}
                        placeholder="Year Built"
                        onChange={this.handleLanguage}
                        name="year_built"
                        value={this.state.year_built}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div class="col">
              <div class="addProptyMap">
                {this.state.map ? (
                  <>
                    <div
                      style={{
                        height: "400px",
                        width: "100%",
                        borderRadius: "15px!important",
                      }}
                    >
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
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
