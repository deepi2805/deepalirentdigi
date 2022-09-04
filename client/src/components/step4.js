import React from "react";
import { Link, withRouter } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Step4 extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    categoryid: this.props.key1,
    category: this.props.key2,
    step1status: this.props.key3,
    categorycheck: this.props.key4,
    property_heading: this.props.key5[0],
    rental_incentives: this.props.key5[1],
    hidden_notes: this.props.key5[2],
    full_description: this.props.key5[3],
    property_heading_count: this.props.key5[0].length,
    rental_incentives_count: this.props.key5[1].length,
    backspace: false,
  };

  componentDidMount() {
    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)
  }


  onchangetextprophead = (e) => {
    if (this.state.property_heading_count <= 79 || this.state.backspace) {
      console.log("testttttttttt", this.state.property_heading_count);
      this.props.sendData(e.target.name, e.target.value);
      this.setState({
        property_heading: e.target.value,
        property_heading_count: e.target.value.length,
        backspace: false,
      });
    } else {
    }
  };
  onchangetextrental = (e) => {
    if (this.state.rental_incentives_count <= 79 || this.state.backspace) {
      console.log("testttttttttt", this.state.rental_incentives_count);
      this.props.sendData(e.target.name, e.target.value);

      this.setState({
        rental_incentives: e.target.value,
        rental_incentives_count: e.target.value.length,
        backspace: false,
      });
    }
  };
  onchangetext = (e) => {
    this.props.sendData(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <div className="about addProptryBlk pd50">
        <ToastContainer />
        <div class="row">
          <div class="">
            <form class="commonForm addPrptyForm brDrBg" id="loginfrm">
              <div class="innerHdng pb-4"><h3>Add Info</h3></div>
              <div class="fourBlk">
                <div class="row form-group align-items-center ">
                  {this.state.categorycheck[0].addressInfo.property_heading ==
                    true ? (
                    <>
                      <div class="col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Property Heading <span class="required">*</span>
                          <span class="unitNumbr">
                            {this.state.property_heading_count}/80
                          </span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder="e.g. Cozy 1 Bedroom Downtown Condo"
                          onChange={this.onchangetextprophead}
                          id="check"
                          name="property_heading"
                          value={this.state.property_heading}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              this.setState({
                                backspace: true,
                              });
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {this.state.categorycheck[0].addressInfo.rental_incentives ==
                    true ? (
                    <>
                      <div class="col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Rental Incentives<span class="required">*</span>
                          <span class="unitNumbr">
                            {this.state.rental_incentives_count}/80
                          </span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder=""
                          onChange={this.onchangetextrental}
                          name="rental_incentives"
                          value={this.state.rental_incentives}
                          id="80"
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              this.setState({
                                backspace: true,
                              });
                            }
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div class="row form-group align-items-center ">
                  <div class="col-md-6">
                    <label for="exampleFormControlInput1" class="form-label">
                      Quick Share Link
                    </label>
                    <p>
                      <small>
                        Once your property is posted, a permanent link to your
                        listing will be displayed here for quick sharing.{" "}
                      </small>
                    </p>
                  </div>
                  {this.state.categorycheck[0].addressInfo.hidden_notes ==
                    true ? (
                    <>
                      <div class="col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Hidden Notes*
                          <span class="unitNumbr">
                            Not visible to renters, displays on invoice
                          </span>
                        </label>
                        <input
                          class="form-control"
                          type="text"
                          placeholder=""
                          onChange={this.onchangetext}
                          name="hidden_notes"
                          value={this.state.hidden_notes}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {this.state.categorycheck[0].addressInfo.full_description ==
                  true ? (
                  <>
                    <div class="row form-group align-items-center">
                      <div class="col-md-12">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Full Description
                          <span>
                            {" "}
                            Please do not put email addresses in description
                            field - it will lead to spam and potentially scams
                          </span>
                        </label>
                        <div className="ckEditor">
                          <CKEditor
                            editor={ClassicEditor}
                            data={this.state.full_description}
                            name="full_description"
                            onReady={(editor) => {
                              console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              console.log("master", data);
                              this.props.sendData("full_description", data);
                              this.setState({
                                full_description: data,
                              });
                            }}
                            onBlur={(event, editor) => {
                              console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                              console.log("Focus.", editor);
                            }}
                          />
                        </div>
                      </div>
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
