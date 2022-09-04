import React from "react";
import { Link, withRouter } from "react-router-dom";

export default class Step7 extends React.Component {
  state = {
    file: this.props.key5[0],
    buildingName: this.props.key5[1],
    address: this.props.key5[2],
    monthly_rent: this.props.key5[3],
    bedrooms: this.props.key5[4],
    bathrooms: this.props.key5[5],
    sq_foot: this.props.key5[6],
  };
  render() {
    return (
      <div className="about addProptryBlk pd50">
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
                  <div class="cartBlkImg col-auto">
                    <img src={this.state.file[0]} />
                    <span class="batchImg whiteBatch">
                      <img src="images/photo.png" /> {this.state.file.length}
                    </span>
                  </div>
                </div>
                <div class="cartBlkDes col">
                  <h3 class="mb-0">{this.state.buildingName}</h3>
                  <p class="card-text mb-auto">
                    <span class="locationicon">
                      <img src="images/locationIcon.jpg" />
                    </span>
                    {this.state.address}
                  </p>
                  <div class="prpertyTotal">
                    <h3 class="d-inline">
                      <small>$</small> {this.state.monthly_rent}{" "}
                      <span>/ Monthly</span>
                    </h3>
                  </div>
                  <div class="featurePrprtyList">
                    <ul>
                      <li>
                        <span>
                          <img src="images/bed.png" />
                        </span>{" "}
                        {this.state.bedrooms} Beds
                      </li>
                      <li>
                        <span>
                          <img src="images/baths.png" />
                        </span>{" "}
                        {this.state.bathrooms} Baths
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
                href="#"
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

              <Link class="comn-btn blu " to="/detailproperty.html">
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
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
