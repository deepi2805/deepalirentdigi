import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import { momentDate, trimeString } from "./helper.js";
import Pagination from "react-js-pagination";
export default class Enquirylistrenter extends React.Component {
  state = {
    userData: [],
    contactData: [],
    pagestatus: false,
    loginUserid: "",
    activePage: 0,
    countpage: 0,
    sortTimestamp: 1,
    start_timestamp: "",
    end_timestamp: "",
    name: "",
    typing: false,
    typingTimeout: 0,
  };

  changeName = (valuee) => {
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }

    self.setState({
      name: valuee,
      typing: false,
      typingTimeout: setTimeout(function () {
        console.log(self.state.name);
        self.handlePageChange(1);
      }, 1000),
    });
  };

  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );

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

    let getdetail;
    if (this.state.userData.userType == "1") {
      getdetail = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          landlordId: decoded_id.Uid,
        }),
      };
    } else {
      getdetail = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          renterId: decoded_id.Uid,
        }),
      };
    }

    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_contact_landlord`,
        getdetail
      ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          userData: value[0].data,
          contactData: value[1].data,
          countpage: value[1].totalCount,
          pagestatus: true,
          loginUserid: decoded_id.Uid,
        });
        //console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );

    let json = {
      renterId: decoded_id.Uid,
      page: pageNumber,
      sortTime: this.state.sortTimestamp,
    };

    if (this.state.start_timestamp) {
      json["start_timestamp"] = this.state.start_timestamp;
    }

    if (this.state.end_timestamp) {
      json["end_timestamp"] = this.state.end_timestamp;
    }

    if (this.state.name) {
      json["search"] = this.state.name;
    }

    var getdetail1 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    };
    fetch(config.googleAuth.backURL + `user/fetch_contact_landlord`, getdetail1)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("check pagenation", data);
        this.setState({
          contactData: data.data,
        });
        /*  if (data.status == true) {
          toast(data.msg);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          toast(data.msg);
        } */
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  fetchFeedbacks = (e) => {
    // alert(e.target.value);
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    var findData = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        renterId: decoded_id.Uid,
        page: this.state.activePage,
        sortTime: this.state.sortTimestamp,
        start_timestamp: Date.parse(e.target.value),
        end_timestamp: Date.parse(e.target.value),
      }),
    };

    fetch(config.googleAuth.backURL + `user/fetch_contact_landlord`, findData)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("res", data);
        this.setState({
          activePage: 0,
          contactData: data.data,
          countpage: data.totalCount,
          pagestatus: true,
          start_timestamp: Date.parse(e.target.value),
          end_timestamp: Date.parse(e.target.value),
        });
      })
      .catch((error) => {
        console.log("Error:" + error);
        this.setState({ loader_flag: false });
      });
  };
  pageReload() {
    window.location.reload();
  }
  render() {
    var i = 1;
    return (
      <div class="body">
        {this.state.pagestatus ? (
          <>
            <Header key1={this.state.userData} />
            <InerNavBar key1={this.state.userData} />
            <section class="wrapper py-5 ">
              <div class="container">
                <div class="row d-flex align-items-center justify-space-between pb-4">
                  <div class="col-sm">
                    <div class="mainHdngTitle">
                      <h2>Enquiry List</h2>
                    </div>
                  </div>
                  <div class="col-sm-auto mr-5 ">
                    <div class="commonForm sideFilterData  ">
                      <div class="prtyLstAdvnSrh  d-flex align-items-center ">
                        <div class="form-group mrr5">
                          <input
                            class="form-control "
                            type="date"
                            name="password"
                            placeholder=""
                            onChange={this.fetchFeedbacks}
                          />
                        </div>
                        <div class="form-group">
                          <span>
                            <i class="fa fa-search"></i>
                          </span>
                          <input
                            type="text"
                            name=""
                            placeholder="Search.."
                            class="form-control"
                            onChange={(e) => this.changeName(e.target.value)}
                          />
                        </div>
                        <div class="lstt-wsh-btns mr-5 ">
                          <a
                            href="javascript:void(0);"
                            onClick={this.pageReload}
                          >
                            <i class="fa fa-refresh"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="dataTableData">
                  <div class="common-table mybook-list-tbl table-responsive">
                    <table class="table table-bordered">
                      {this.state.contactData.length > 0 &&

                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>Property Address</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Create date</th>
                          </tr>
                        </thead>
                      }
                      <tbody>
                        {this.state.contactData.length > 0 ? (
                          <>
                            {this.state.contactData.map((l) => {
                              return (
                                <>
                                  <tr>
                                    <td class="">
                                      <a href="javascript:void(0)">{i++}</a>
                                    </td>
                                    <td class="">
                                      <Link
                                        to={`/detailproperty.html?id=${l.propertyId}&uid=${l.landlordId}`}
                                      >
                                        {l.propertyAddress}
                                      </Link>
                                    </td>
                                    <td class="">
                                      <a href="javascript:void(0)">{l.name}</a>
                                    </td>
                                    <td class="email">{l.email}</td>

                                    <td class="phone">{l.phone}</td>
                                    <td class="mesage">{l.message}</td>
                                    <td>
                                      {momentDate(l.timestamp, " MMM D YYYY")}
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </>
                        ) : (
                          <>
                            <tr>
                              <td>No data found</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {this.state.contactData >= 10 &&
                  <div class="row  align-items-center">
                    <div class="col"></div>
                    <div class="col-auto">
                      <div class="paginationCustom">
                        <nav aria-label="Page navigation example">
                          <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={this.state.countpage}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                          />
                        </nav>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
        <Footer />
      </div>
    );
  }
}
