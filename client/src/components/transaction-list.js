import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { momentDate, trimeString } from "./helper.js";
import ReadMoreReact from "read-more-react";
import Pagination from "react-js-pagination";
export default class PaymentHistory extends React.Component {
  state = {
    userData: [],
    transData: [],
    pagestatus: false,
    loginUserid: "",
    activePage: 0,
    countpage: 0,
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
    let getloginusertrans = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: decoded_id.Uid,
      }),
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_all_transactions`,
        getloginusertrans
      ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          userData: value[0].data,
          transData: value[1].data,
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
  getorderid(str) {
    return str.slice(-6);
  }
  print() {
    window.print();
  }
  pageReload() {
    window.location.reload();
  }
  findsubstr(str, index, length) {
    var substring = str.substr(index, length);
    return substring;
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.loginUserid,
        page: pageNumber,
      }),
    };
    fetch(config.googleAuth.backURL + `user/fetch_all_transactions`, getList)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("check pagenation", data);
        this.setState({
          transData: data.data,
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
  render() {
    var index = 11,
      length = 13;
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
                      <h2>Payment History</h2>
                    </div>
                  </div>
                  <div class="col-sm-auto mr-5 ">
                    <div class="commonForm sideFilterData  ">
                      <div class="prtyLstAdvnSrh  d-flex align-items-center ">
                        <div class="form-group mrr5">
                          <input
                            class="form-control dateInput"
                            type="date"
                            name="password"
                            placeholder=""
                          />
                        </div>
                        {/* <div class="form-group">
                          <span>
                            <i class="fa fa-envelope"></i>
                          </span>
                          <input
                            type="text"
                            name=""
                            placeholder=" jasminecheema81@gmail.com"
                            class="form-control"
                          />
                        </div> */}
                        <div class="lstt-wsh-btns mr-5 ">
                          <a href="javascript:void(0);" onClick={this.print}>
                            <img src="images/print.png" />
                          </a>
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
                      <thead>
                        <tr>
                          <th>S No</th>
                          <th>Reference ID </th>
                          <th>Date</th>
                          <th>Service</th>
                          <th>City</th>
                          <th>Price</th>
                          <th width="200">Payment Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.transData.length > 0 ? (
                          <>
                            {this.state.transData
                              .sort((b, a) => a.payment_date - b.payment_date)
                              .map((l) => {
                                return (
                                  <>
                                    <tr>
                                      <td class="">
                                        <a href="javascript:void(0)">{i++}</a>
                                      </td>
                                      <td class="">
                                        <a href="javascript:void(0)">
                                          {trimeString(
                                            "payment_id" in l
                                              ? l.payment_id
                                              : "",
                                            6
                                          )}
                                        </a>
                                      </td>
                                      <td class="">
                                        {momentDate(
                                          l.payment_date,
                                          " MMM D YYYY"
                                        )}
                                      </td>

                                      <td class="serviceName">Add property</td>
                                      <td class="prov">{l.city}</td>
                                      <td class="price">${l.price}</td>
                                      <td class="activependngBtn">
                                        {l.payment_status == 0 ? (
                                          <>
                                            <a
                                              href="javascript:void(0)"
                                              class="btn comn-btn red"
                                            >
                                              {" "}
                                              Pending
                                            </a>
                                          </>
                                        ) : (
                                          <>
                                            <a
                                              href="javascript:void(0)"
                                              class="btn comn-btn green"
                                            >
                                              {" "}
                                              Active
                                            </a>
                                          </>
                                        )}
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
                <div class="row d-flex  align-items-center justify-content-between">
                  <div class="col-6">
                    <div className="sendSumryBlk">
                      <div className="sumaryCol">
                        {" "}
                        <h5 class="sendSumryHdng">Send Summary</h5>
                      </div>
                      <div class="commonForm sideFilterData">
                        <div class="paymtHistryBtn  prtyLstAdvnSrh ">
                          <div class="form-group">
                            <span>
                              <i class="fa fa-envelope"></i>
                            </span>
                            <input
                              type="text"
                              name=""
                              placeholder=" jasminecheema81@gmail.com"
                              class="form-control"
                            />
                          </div>
                        </div>
                        {/* <button class="comn-btn blu">
                              <i class="fa fa-paper-plane-o" aria-hidden="true"></i>{" "}
                              Send Summary
                            </button> */}
                      </div>
                      <button class="comn-btn blu">
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>{" "}
                      </button>
                    </div>
                  </div>
                  <div class="col-auto">
                    <div class="paginationCustom">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
                          <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={2}
                            totalItemsCount={this.state.countpage}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                          />
                          {/*  <li class="page-item">
                            <a class="page-link" href="#" aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                            </a>
                          </li>
                          <li class="page-item active">
                            <a class="page-link" href="#">
                              1
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              2
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              3
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#">
                              4
                            </a>
                          </li>
                          <li class="page-item">
                            <a class="page-link" href="#" aria-label="Next">
                              <span aria-hidden="true">&raquo;</span>
                            </a>
                          </li> */}
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
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
