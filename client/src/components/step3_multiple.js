import React from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import $ from "jquery";
export default class Step3_multiple extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    utilityDetails1: this.props.key5[2],

    smoking: this.props.key5[0],
    parking: this.props.key5[1],
    parking_fee: this.props.key5[2],
    dogs: this.props.key5[3],
    cats: this.props.key5[4],
    pet_fee: this.props.key5[5],

    sq_foot: this.props.key5[7],
    suitearr: this.props.key6,
    test: false,
  };
  componentDidMount() {
    console.log("tstwwwwww", this.props.key5);
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }

  removeSuite = (id) => {
    const newPeople = this.state.suitearr.filter((person) => person.key !== id);

    //console.log(newPeople);
    this.setState({ suitearr: newPeople });
    this.props.sendData("suitearr", newPeople);
    //this.setState({ suitearr: newPeople });
    /* var index = this.state.suitearr.indexOf(id);
    console.log("check index", index);

    if (index !== -1) {
      this.state.suitearr.splice(index, 1);
      console.log(this.state.suitearr);
      this.setState({ suitearr: this.state.suitearr });
    } */
  };
  setarr = (arr) => {
    this.setState({ suitearr: arr });
    console.log(this.state.suitearr);
  };
  addSuite = (e) => {
    let arr = this.state.suitearr;
    arr.push({
      valdationarr: [],
      categoryId: "",
      key: arr.length + 1,
      data: [],
      utilityArr: [],
    });
    this.setState({ suitearr: arr });
    console.log(this.state.suitearr);
    this.props.sendData("suitearr", this.state.suitearr);
    /*  var index = this.state.utilityDetails1.indexOf(e.target.id);
      if (index !== -1) {
        this.state.utilityDetails1.splice(index, 1);
        this.setState({ utilityDetails1: this.state.utilityDetails1 });
      } */
  };
  customtextchange = (e) => {
    this.props.sendData(e.target.name, e.target.checked);
    this.setState({ [e.target.name]: e.target.checked });
  };
  customtextdata = (e) => {
    //console.log(this.state.cats);
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  onchangeint = (e) => {
    var mval = parseInt(e.target.value);
    this.props.sendData(e.target.name, mval);
    this.setState({ [e.target.name]: mval });
    var newData = [...this.state.suitearr];

    if (newData[e.target.id].data.length === 1) {
      newData[e.target.id].data[0][e.target.name] = mval;
    } else {
      newData[e.target.id].data.push({ [e.target.name]: mval });
    }
    this.setState({ newData });
    this.props.sendData("suitearr", newData);
  };
  onchangetext = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
    var newData = [...this.state.suitearr];

    if (newData[e.target.id].data.length === 1) {
      newData[e.target.id].data[0][e.target.name] = e.target.value;
    } else {
      newData[e.target.id].data.push({ [e.target.name]: e.target.value });
    }
    this.setState({ newData });
    this.props.sendData("suitearr", newData);
  };
  handleLanguage = (e) => {
    this.props.sendData(e.target.name, e.target.checked);
    this.setState({ [e.target.name]: e.target.checked });
  };
  changeDisableCheckboxRadioButton = (e) => {
    var key = e.target.getAttribute("data-key");
    //alert(e.target.id);
    // console.log("id", e.target.id);
    /// console.log("checkbox status", e.target.checked);
    var newData = [...this.state.suitearr];
    var arr = [];
    console.log(newData[key].data[0]);
    if (e.target.checked) {
      newData[key].data[0].utilityDetails.push({ id: e.target.id });

      this.setState({ newData });
    } else {
      let new_obj = newData[key].data[0].utilityDetails;
      new_obj.splice(
        new_obj.findIndex((i) => i.id === e.target.id),
        1
      );

      this.setState({ newData });
      /* var index = newData[key].data[0].utilityDetails.indexOf(e.target.id);
      if (index !== -1) {
        newData[key].data[0].utilityDetails.splice(index, 1);
        this.setState({ newData });
      } */
    }
    this.props.sendData("suitearr", this.state.suitearr);
    /* if (e.target.checked) {
      let arr = this.state.utilityDetails1;
      arr.push(e.target.id);
      this.setState({ utilityDetails1: arr });
    } else {
      var index = this.state.utilityDetails1.indexOf(e.target.id);
      if (index !== -1) {
        this.state.utilityDetails1.splice(index, 1);
        this.setState({ utilityDetails1: this.state.utilityDetails1 });
      }
     
    }
    this.props.sendData("utilityDetails", this.state.utilityDetails1);
    console.log("inside option disabled", this.state.utilityDetails1); */
  };
  handlePropertytype = (l, value, arr) => {
    var val1 = [];
    $('select[name="categoryId[]"] option:selected').each(function () {
      val1.push($(this).val());
    });

    //console.log("catarr", val1);

    //var arr = this.state.suitearr;
    var specificValuesFromArray = this.state.category.filter(
      (obj) => obj._id === value
    );
    //console.log(arr);
    var newData = [...this.state.suitearr];
    newData[l].categoryId = value;
    newData[l].valdationarr = specificValuesFromArray[0].addressInfo;
    newData[l].utilityArr = specificValuesFromArray[0].utilityDetails;

    if (newData[l].data.length === 1) {
      newData[l].data[0].categoryId = value;
    } else {
      newData[l].data.push({ categoryId: value, utilityDetails: [] });
    }

    this.setState({ newData });
    this.props.sendData("suitearr", newData);
    /* this.state.suitearr[l].push({
      valdationarr: [],
      id: value,
    }); */
    //alert(e.target.value);
    //arr.push({ valdationarr: [], id: value, key: arr.length + 1 });
    //this.setState({ suitearr: arr });
    /*  console.log(this.state.suitearr);
    this.setState({
      categoryid: value,
      categorycheck: temparr,
    });
    console.log("tst", this.state.categorycheck); */
  };
  onchangetextrental = (e) => {
    if (this.state.unit_count <= 4 || this.state.backspace) {
      this.props.sendData(e.target.name, e.target.value);
      var name = e.target.name;
      this.setState({
        unitNumber: e.target.value,
        unit_count: e.target.value.length,
        backspace: false,
      });
    }

    var newData = [...this.state.suitearr];

    if (newData[e.target.id].data.length === 1) {
      newData[e.target.id].data[0].unitNumber = e.target.value;
    } else {
      newData[e.target.id].data.push({ unitNumber: e.target.value });
    }
    this.setState({ newData });
    this.props.sendData("suitearr", newData);
  };
  render() {
    var i = 1;
    var q = 1;
    var w = 0;
    console.log(this.state.suitearr);
    console.log("lease term", this.state.categorycheck[0].leaseTermDetails);
    return (
      <div className="about addProptryBlk pd50">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <form class="commonForm addPrptyForm brDrBg" id="loginfrm">
              {this.state.suitearr.map((el, l) => {
                var count = w++;
                return (
                  <>
                    <h3>Please enter information specific to suite {i++}</h3>
                    {q++ >= 2 ? (
                      <>
                        <div class="col-md-4">
                          <a
                            class="button-inline"
                            href="javascript:void(0)"
                            className="btn"
                            id={el.key}
                            onClick={() => this.removeSuite(el.key)}
                          >
                            <i class="fa fa-close"></i>
                          </a>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div class="row form-group align-items-top " style={{ width: "100%" }}>
                      <div class=" col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Property Type<span class="required">*</span>
                        </label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={(e) =>
                            this.handlePropertytype(
                              l,
                              e.target.value,
                              e.target[e.target.selectedIndex].getAttribute(
                                "data-addressArr"
                              )
                            )
                          }
                          name="categoryId[]"
                          value={el.categoryId}
                        >
                          <option selected>None Selected </option>
                          {this.state.category.map((lt) => {
                            return (
                              <>
                                <option
                                  data-addressArr={lt.addressInfo}
                                  value={lt._id}
                                >
                                  {lt.cat_name}
                                </option>
                              </>
                            );
                          })}
                        </select>
                      </div>
                      {el.valdationarr.monthly_rent == true ? (
                        <>
                          <div class="col-md-6">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Monthly Rent<span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              placeholder="$"
                              id={l}
                              onChange={this.onchangeint}
                              name="monthly_rent"
                              value={el.data[0].monthly_rent}
                            />
                            <small>
                              Numbers only - No special characters (. , $)
                            </small>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {el.valdationarr.sq_foot == true ? (
                        <>
                          <div class="form-group col-md-6">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Square Foot<span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id={l}
                              placeholder="Square Foot"
                              onChange={this.onchangetext}
                              value={el.data[0].sq_foot}
                              name="sq_foot"
                            />
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      {el.valdationarr.unit_number == true ? (
                        <>
                          <div class="form-group col-md-6">
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
                                id={l}
                                placeholder="Ex:1"
                                onChange={this.onchangetextrental}
                                name="unitNumber"
                                value={el.data[0].unitNumber}
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
                      {el.valdationarr.security_deposit == true ? (
                        <>
                          <div class="col-md-6">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Security Deposit<span class="required">*</span>
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              id={l}
                              onChange={this.onchangetext}
                              name="security_deposit"
                              value={el.data[0].security_deposit}
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
                    {el.valdationarr.utilities == true ? (
                      <>
                        <div class="row form-group align-items-center">
                          <div class="col-md-12">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Utility Included<span class="required">*</span>
                            </label>
                          </div>
                          {el.utilityArr.map((lm) => {
                            if (el.data[0].utilityDetails) {
                              var checkarr = el.data[0].utilityDetails.some(
                                (item) => lm._id === item.id
                              );
                            } else {
                              var checkarr = false;
                            }

                            return (
                              <>
                                <div class="col-md-4">
                                  <label class="control control--checkbox">
                                    {lm.utility_name}
                                    <input
                                      type="checkbox"
                                      id={lm._id}
                                      data-key={l}
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
                          })}
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div class="row form-group align-items-center">
                      {el.valdationarr.bedrooms == true ? (
                        <>
                          <div class="col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Bedrooms<span class="required">*</span>
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="bedroomsId"
                              id={l}
                              onChange={this.onchangetext}
                              value={el.data[0].bedroomsId}
                            >
                              <option value="">Select</option>
                              {this.state.categorycheck[0].bedroomDetails.map(
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
                      {el.valdationarr.bathrooms == true ? (
                        <>
                          <div class="col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Bathrooms<span class="required">*</span>
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="bathroomsId"
                              id={l}
                              onChange={this.onchangetext}
                              value={el.data[0].bathroomsId}
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
                      {el.valdationarr.furnishing == true ? (
                        <>
                          <div class="col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Furnishing<span class="required">*</span>
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="furnishingId"
                              value={el.data[0].furnishingId}
                              id={l}
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
                      {el.valdationarr.lease_term == true ? (
                        <>
                          <div class="col-md-3">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Lease Term<span class="required">*</span>
                            </label>
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              name="lease_termId"
                              value={el.data[0].lease_termId}
                              id={l}
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
                      {el.valdationarr.availability_date == true ? (
                        <>
                          <div class="col-md-6">
                            <div class="row">
                              <div class="col-md-12">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label"
                                >
                                  Avilability Date
                                  <span class="required">*</span>
                                </label>
                              </div>
                              <div class="col-md-6">
                                <select
                                  class="form-select"
                                  aria-label="Default select example"
                                  name="availability_date"
                                  value={el.data[0].availability_date}
                                  id={l}
                                  onChange={this.onchangetext}
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
                                  id={l}
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
                    </div>
                  </>
                );
              })}
              <div class="col-md-6">
                <a
                  class="button-inline"
                  href="javascript:void(0)"
                  className="btn"
                  onClick={this.addSuite}
                >
                  <i class="fa fa-plus"></i>Add Suite
                </a>
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
                        onChange={this.customtextdata}
                      >
                        <option value="">Select</option>
                        <option value="Non-Smoking">Non-Smoking</option>
                        <option value="Smoking-Allowed">Smoking Allowed</option>
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
                        onChange={this.customtextdata}
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
                        Parking Fee<span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="parking_fee"
                        value={this.state.parking_fee}
                        onChange={this.customtextdata}
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
                        Dogs*
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="dogs"
                        value={this.state.dogs}
                        onChange={this.customtextdata}
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
                        Cats*
                      </label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="cats"
                        value={this.state.cats}
                        onChange={this.customtextdata}
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
                        Pet Fee*
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="pet_fee"
                        value={this.state.pet_fee}
                        onChange={this.customtextdata}
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
