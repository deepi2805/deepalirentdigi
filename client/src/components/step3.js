import React from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import $ from "jquery";
export default class Step3 extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    utilityDetails1: this.props.key5[2],
    monthly_rent: this.props.key5[0],
    security_deposit: this.props.key5[1],
    utilityDetails: this.props.key5[2],
    bedrooms: this.props.key5[3],
    bathrooms: this.props.key5[4],
    furnishing: this.props.key5[5],
    lease_term: this.props.key5[6],
    availability_date: this.props.key5[7],
    day: this.props.key5[8],
    smoking: this.props.key5[9],
    parking: this.props.key5[10],
    parking_fee: this.props.key5[11],
    dogs: this.props.key5[12],
    cats: this.props.key5[13],
    pet_fee: this.props.key5[14],
  };
  componentDidMount() {
    // console.log("tst", this.state.utilityDetails);

    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)

    if (this.state.availability_date == "Negotiable") {
      $(".avalDate").parent().next().css("display", "none");
    } else {
      $(".avalDate").parent().next().css("display", "block");
    }



  }
  onchangetext = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  onchangetextAvlabilty = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value == "Negotiable") {
      $(e.target).parent().next().css("display", "none");
    } else {
      $(e.target).parent().next().css("display", "block");
    }
  };
  onchangeint = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLanguage = (e) => {
    this.props.sendData(e.target.name, e.target.checked);
    this.setState({ [e.target.name]: e.target.checked });
  };
  changeDisableCheckboxRadioButton = (e) => {
    // console.log("id", e.target.id);
    /// console.log("checkbox status", e.target.checked);

    if (e.target.checked) {
      let arr = this.state.utilityDetails1;
      arr.push({ id: e.target.id });
      this.setState({ utilityDetails1: arr });
      //console.log(arr);
    } else {
      /* var index = this.state.utilityDetails1.indexOf(e.target.id);
      if (index !== -1) {
        this.state.utilityDetails1.splice(index, 1);
        this.setState({ utilityDetails1: this.state.utilityDetails1 });
      } */
      let new_obj = this.state.utilityDetails1;
      new_obj.splice(
        new_obj.findIndex((i) => i.id === e.target.id),
        1
      );

      this.setState({ utilityDetails1: new_obj });
    }
    this.props.sendData("utilityDetails", this.state.utilityDetails1);
    console.log("inside option disabled", this.state.utilityDetails1);
  };
  render() {
    //console.log(this.state.categorycheck);
    return (
      <div className="about addProptryBlk pd50">
        <div class="row">
          <div class="">
            <form class="commonForm addPrptyForm brDrBg" id="loginfrm">
              <div class="row form-group align-items-top ">
                <div class="innerHdng pb-4">
                  <h3>Rent Info</h3>
                </div>
                {this.state.categorycheck[0].addressInfo.monthly_rent ==
                  true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Monthly rent in $
                        <span class="required">*</span>
                      </label>
                      <input
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        class="form-control"
                        placeholder="$"
                        onChange={this.onchangeint}
                        name="monthly_rent"
                        value={this.state.monthly_rent}
                      />
                      <small>
                        Numbers only - No special characters (. , $)
                      </small>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.security_deposit ==
                  true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Security Deposit<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        onChange={this.onchangetext}
                        name="security_deposit"
                        value={this.state.security_deposit}
                      >
                        <option value="">Select</option>
                        <option value="1">1 Month Rent </option>
                        <option value="2">1/2 Month Rent</option>
                        <option value="3">Other</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              {this.state.categorycheck[0].addressInfo.utilities == true ? (
                <>
                  <div class="row form-group align-items-center">
                    <div class="col-md-12">
                      <label for="exampleFormControlInput1" class="form-label">
                        Utility Included<span class="required">*</span>
                      </label>
                    </div>
                    {this.state.categorycheck[0].utilityDetails.map((l) => {
                      var checkarr = this.state.utilityDetails.some(
                        (item) => l._id === item.id
                      );

                      return (
                        <>
                          <div class="col-md-4">
                            <label class="control control--checkbox">
                              {l.utility_name}
                              <input
                                type="checkbox"
                                id={l._id}
                                onChange={this.changeDisableCheckboxRadioButton}
                                defaultChecked={checkarr}
                              />
                              <div class="control__indicator"></div>
                            </label>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <></>
              )}
              <div class="row form-group align-items-center">
                {this.state.categorycheck[0].addressInfo.bedrooms == true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Bedrooms<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="bedrooms"
                        value={this.state.bedrooms}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        {this.state.categorycheck[0].bedroomDetails.map((l) => {
                          return (
                            <>
                              <option value={l._id}>{l.type}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.bathrooms == true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Bathrooms<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="bathrooms"
                        value={this.state.bathrooms}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        {this.state.categorycheck[0].bathroomDetails.map(
                          (l) => {
                            return (
                              <>
                                <option value={l._id}>{l.type}</option>
                              </>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.furnishing == true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Furnishing<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="furnishing"
                        value={this.state.furnishing}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        {this.state.categorycheck[0].furnishingDetails.map(
                          (l) => {
                            return (
                              <>
                                <option value={l._id}>{l.type}</option>
                              </>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.lease_term == true ? (
                  <>
                    <div class="col-md">
                      <label for="exampleFormControlInput1" class="form-label">
                        Lease Term<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="lease_term"
                        value={this.state.lease_term}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        {this.state.categorycheck[0].leaseTermDetails.map(
                          (l) => {
                            return (
                              <>
                                <option value={l._id}>{l.type}</option>
                              </>
                            );
                          }
                        )}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div class="row form-group align-items-center">
                {this.state.categorycheck[0].addressInfo.availability_date ==
                  true ? (
                  <>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-12">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Avilability Date<span class="required">*</span>
                          </label>
                        </div>
                        <div class="col-md-6">
                          <select
                            class="form-select avalDate"
                            aria-label="Default select example"
                            name="availability_date"
                            value={this.state.availability_date}
                            onChange={this.onchangetextAvlabilty}
                          >
                            <option value="">Select</option>
                            <option value="Immediate">Immediate</option>
                            <option value="Negotiable">Negotiable</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            name="day"
                            value={this.state.day}
                            onChange={this.onchangetext}
                          >
                            <option value="">Select</option>
                            <option selected value="01">
                              1
                            </option>
                            <option value="02">2</option>
                            <option value="03">3</option>
                            <option value="04">4</option>
                            <option value="05">5</option>
                            <option value="06">6</option>
                            <option value="07">7</option>
                            <option value="08">8</option>
                            <option value="09">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.smoking == true ? (
                  <>
                    <div class="col-md-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Smoking<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="smoking"
                        value={this.state.smoking}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        <option value="Not-Allowed">Not-Allowed</option>
                        <option value="Allowed">Allowed</option>
                        <option value="Negotiable">Negotiable</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div class="row form-group align-items-center">
                {this.state.categorycheck[0].addressInfo.parking == true ? (
                  <>
                    <div class="col-md-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Parking<span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="parking"
                        value={this.state.parking}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>

                        {this.state.categorycheck[0].parkingDetails.map((l) => {
                          return (
                            <>
                              <option value={l._id}>{l.type}</option>
                            </>
                          );
                        })}
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.parking_fee == true ? (
                  <>
                    <div class="col-md-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Pet Fee in $<span class="required">*</span>
                      </label>
                      <input
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        class="form-control"
                        name="parking_fee"
                        value={this.state.parking_fee}
                        onChange={this.onchangetext}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div class="row form-group align-items-center">
                {this.state.categorycheck[0].addressInfo.dogs == true ? (
                  <>
                    <div class="col-md-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Dogs <span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="dogs"
                        value={this.state.dogs}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        <option value={false}>Not Allowed</option>
                        <option value={true}>Negotiable</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.cats == true ? (
                  <>
                    <div class="col-md-3">
                      <label for="exampleFormControlInput1" class="form-label">
                        Cats <span class="required">*</span>
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="cats"
                        value={this.state.cats}
                        onChange={this.onchangetext}
                      >
                        <option value="">Select</option>
                        <option value={false}>Not Allowed</option>
                        <option value={true}>Negotiable</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {this.state.categorycheck[0].addressInfo.pet_fee == true ? (
                  <>
                    <div class="col-md-6">
                      <label for="exampleFormControlInput1" class="form-label">
                        Pet Fee <span class="required">*</span>
                      </label>
                      <input
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        type="text"
                        class="form-control"
                        name="pet_fee"
                        value={this.state.pet_fee}
                        onChange={this.onchangetext}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
