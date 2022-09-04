import React from "react";
import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

export default class Step2 extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    phone: this.props.key4[2],
    text: this.props.key4[4],
    email: this.props.key4[3],
    addPhone: this.props.key4[9],
    addEmail: this.props.key4[10],

    phone1: this.props.key4[0],
    phone2: this.props.key4[7],
    extension1: this.props.key4[5],
    extension2: this.props.key4[6],
    email1: this.props.key4[1],
    email2: this.props.key4[8],

    validphone: "",
    validExtension: ""
  };


  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }



  onchangetext = (e) => {

    const numberpattern = new RegExp(/^[0-9\b]+$/);

    this.setState({ validphone: "", validExtension: "" });


    if (e.target.name == 'phone1' && !numberpattern.test(e.target.value) && e.target.value != "") {
      return this.setState({ validphone: "Please enter only number" });

    }
    else if (e.target.name == 'extension1' && !numberpattern.test(e.target.value) && e.target.value != "") {
      return this.setState({ validExtension: "Please enter only number" });

    }


    this.props.sendData(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLanguage = (e) => {
    this.props.sendData(e.target.name, e.target.checked);
    this.setState({ [e.target.name]: e.target.checked });
    if (!this.state.phone && !this.state.text) {
      this.setState({
        addPhone: this.state.addPhone,
        phone1: "",
        phone2: "",
        extension1: "",
        extension2: "",
      });
    }
    if (!this.state.email) {
      this.setState({ addEmail: this.state.addEmail });
    }
  };
  addphone = (e) => {
    this.setState({ addPhone: false });
    this.props.sendData("addPhone", false);
  };
  addemail = (e) => {
    this.setState({ addEmail: false });
    this.props.sendData("addEmail", false);
  };
  render() {
    return (
      <div className="about addProptryBlk pd50">
        <form class="commonForm addPrptyForm" id="adProperty">
          <div class="row">
            <div class="col-md-12">
              <div class="brDrBg">
                <div class="row">
                  <div class="col-md-12">
                    <div class="innerHdng pb-4">
                      <h3>Contact Info</h3>
                    </div>
                    <label for="exampleFormControlInput1" class="form-label">
                      Select Contact Method<span class="required">*</span>
                    </label>
                  </div>
                  <div class="form-group col-md-12">
                    <label class="control control--checkbox">
                      Phone
                      <input
                        type="checkbox"
                        defaultChecked={this.state.phone}
                        onChange={this.handleLanguage}
                        name="phone"
                      />
                      <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">
                      Text
                      <input
                        type="checkbox"
                        defaultChecked={this.state.text}
                        onChange={this.handleLanguage}
                        name="text"
                      />
                      <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox">
                      Email
                      <input
                        type="checkbox"
                        defaultChecked={this.state.email}
                        onChange={this.handleLanguage}
                        name="email"
                      />
                      <div class="control__indicator"></div>
                    </label>
                  </div>
                </div>
                {this.state.phone == true || this.state.text == true ? (
                  <>
                    <div class="row form-group align-items-center">
                      <div class="col-sm">
                        {this.state.validphone ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validphone}
                            </label>
                          </>
                        ) : (
                          <>
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Phone Number <span class="required">*</span>
                            </label>
                          </>
                        )}

                        <input
                          type="text"
                          class="form-control"
                          value={this.state.phone1}
                          placeholder="Phone"
                          onChange={this.onchangetext}
                          name="phone1"
                        />
                      </div>
                      <div class="col-sm">
                        {this.state.validExtension ? (
                          <>
                            <label for="emailFld" class="form-label red">
                              {this.state.validExtension}
                            </label>
                          </>
                        ) : (
                          <>
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Extension
                            </label>
                          </>
                        )}

                        <input
                          type="text"
                          class="form-control"
                          id="#"
                          placeholder="Extension"
                          onChange={this.onchangetext}
                          name="extension1"
                          value={this.state.extension1}
                        />
                      </div>
                      {this.state.addPhone ? (
                        <>
                          <div class="col-auto">
                            <a
                              class="button-inline"
                              href="javascript:void(0)"
                              class="btn"
                              onClick={this.addphone}
                            >
                              <i class="fa fa-plus"></i> add phone
                            </a>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {!this.state.addPhone ? (
                      <>
                        <div class="row form-group align-items-center">
                          <div class="col">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Optional Phone Number
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="#"
                              placeholder="Phone"
                              onChange={this.onchangetext}
                              name="phone2"
                              value={this.state.phone2}
                            />
                          </div>
                          <div class="col">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Extension
                            </label>
                            <input
                              type="number"
                              class="form-control"
                              id="#"
                              placeholder="Extension"
                              onChange={this.onchangetext}
                              name="extension2"
                              value={this.state.extension2}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <></>
                )}
                {this.state.email ? (
                  <>
                    <div class="row form-group align-items-center">
                      <div class="col">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Contact Email <span class="required">*</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          value={this.state.email1}
                          placeholder="Contact Email"
                          onChange={this.onchangetext}
                          name="email1"
                        />
                      </div>
                      {this.state.addEmail ? (
                        <>
                          <div class="col-auto">
                            <a
                              class="button-inline"
                              href="javascript:void(0)"
                              class="btn"
                              onClick={this.addemail}
                            >
                              <i class="fa fa-plus"></i> add email
                            </a>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {!this.state.addEmail ? (
                      <>
                        <div class="row form-group align-items-center">
                          <div class="col">
                            <label
                              for="exampleFormControlInput1"
                              class="form-label"
                            >
                              Optional Email
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="#"
                              placeholder="Contact Email"
                              onChange={this.onchangetext}
                              name="email2"
                              value={this.state.email2}
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
