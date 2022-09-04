import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import config from "./config.js";
export default class Step7 extends React.Component {
  state = {
    file: this.props.key5[0],
    buildingName: this.props.key5[1],
    address: this.props.key5[2],
    monthly_rent: this.props.key5[3],
    bedrooms: this.props.key5[4],
    bathrooms: this.props.key5[5],
    sq_foot: this.props.key5[6],
    flag: false,
    bathroom_text: "",
    bedrooms_text: "",
    suitarr: this.props.key6,
  };
  componentDidMount() {

    setTimeout(() => {
      document.body.scrollTop = document.documentElement.scrollTop = 0;

    }, 300)

    var mtarr = [];
    this.state.suitarr.map((a) => {
      const arr = a.data[0];
      mtarr.push(arr);
    });
    this.props.sendData("customsuitarr", mtarr);
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bathroom_id: this.props.key5[5],
      }),
    };
    fetch(config.googleAuth.backURL + `fetch_single_bathroom`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("sssdsdsssd", data);
        if (data.status == true) {
          this.setState({ bathroom_text: data.data.type });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    let options1 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bedroom_id: this.props.key5[4],
      }),
    };
    fetch(config.googleAuth.backURL + `fetch_single_bedroom`, options1)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("sssdsdsssd", data);
        if (data.status == true) {
          this.setState({ bedrooms_text: data.data.type });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  goback = (e) => {
    this.props.sendData("step", 0);
  };
  gopreview = (e) => {
    this.setState({ flag: true });
  };
  render() {
    return (
      <div className="about addProptryBlk pd50">
        {this.state.flag ? (
          <Redirect to="/detailproperty.html" target="_blank" />
        ) : (
          ""
        )}
        <form class="commonForm addPrptyForm brDrBg" id="adProperty">
          <div class="innerHdng pt-4 pb-4">
            <h3>Congratulations 🎉</h3>
            <p class="pt-4">
              Excellent, congratulations on completing the listing, it is
              waiting to be reviewed for publication
            </p>
          </div>

          <div class="addprprtyView">
            <div class="cardPropertyBox latestprtyBox">
              <div class="row g-0 d-flex">
                <div class="col-auto d-none d-lg-block">
                  <div
                    class="cartBlkImg col-auto"
                    style={{
                      backgroundImage: `url(${this.state.file[0]})`,
                    }}
                  >
                    {/*  <img src={this.state.file[0]} /> */}
                    <span class="batchImg whiteBatch">
                      <img src="images/photo.png" /> {this.state.file.length}
                    </span>
                  </div>
                </div>
                <div class="cartBlkDes col">
                  <div>
                    <h3 class="mb-0">{this.state.buildingName}</h3>
                    <p class="card-text mb-auto">
                      <span class="locationicon">
                        <img src="images/locationIcon.jpg" />
                      </span>
                      {this.state.address}
                    </p>
                  </div>
                  <div class="prpertyTotal d-flex justify-content-between align-items-center">
                    <i>
                      <small>$</small> {this.state.monthly_rent}{" "}
                      <span>/ Monthly</span>
                    </i>
                  </div>
                  <div class="featurePrprtyList">
                    <ul>
                      <li>
                        <span>
                          <img src="images/bed.png" />
                        </span>{" "}
                        {this.state.bedrooms_text} Beds
                      </li>
                      <li>
                        <span>
                          <img src="images/baths.png" />
                        </span>{" "}
                        {this.state.bathroom_text} Baths
                      </li>
                      <li>
                        <span>
                          <img src="images/sqft.png" />
                        </span>{" "}
                        {this.state.sq_foot}sq ft
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex items-center space-x-5 mt-4 mt-8 btnEditView ">
              <a
                class="comn-btn lightbtn pr-2"
                rel="noopener noreferrer"
                href="javascript:void(0)"
                onClick={this.goback}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <span class="ml-3">Edit</span>
              </a>

              {/*  <Link
                class="comn-btn blu "
                target="_blank"
                to={{
                  pathname: "/detailproperty.html",
                  state: [{ id: 1, name: "Ford", color: "red" }],
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <span class="ml-3"> Preview</span>
              </Link> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
