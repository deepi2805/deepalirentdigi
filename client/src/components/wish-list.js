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
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Pagination from "react-js-pagination";
export default class WishList extends React.Component {
  state = {
    userData: [],
    transData: [],
    pagestatus: false,
    loginUserid: "",
    visible: false,
    delId: "",
    activePage: 0,
    countpage: 0,
    imgurl: config.googleAuth.imgurl,
    selectedDate: null,
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
        wishlist_flag: 0,
      }),
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_wishlist_property_properties`,
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
  deleteCommon(status) {
    //alert(status);
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );
    this.setState({ wishStatus: status });
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: this.state.delId,
        user_id: decoded_id.Uid,
        wishlist_flag: status, //1->removed,0->added
      }),
    };
    fetch(config.googleAuth.backURL + `user/wishlist_user_property`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
          window.location.reload();
          /*  setTimeout(function () {
            window.location.reload();
          }, 1000); */
        } else {
          toast(data.msg);
          this.onCloseModal();
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  onCloseModal = (e) => {
    this.setState({
      visible: false,
    });
  };
  openModal(id) {
    this.setState({
      visible: true,
      delId: id,
    });
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    const decoded_id = jwt.verify(
      localStorage.getItem("Uid"),
      config.login_secret_renter.key
    );

    var getdetail1 = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: decoded_id.Uid,
        wishlist_flag: 0,
      }),
    };
    fetch(
      config.googleAuth.backURL + `user/fetch_wishlist_property_properties`,
      getdetail1
    )
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

  onChange = (date) => {
    this.setState({ selectedDate: date.target.value });
  };

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
                      <h2>Wish List</h2>
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
                            onChange={this.onChange}
                          />
                        </div>
                        <div class="form-group"></div>
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
                      {this.state.transData.length > 0 && (
                        <thead>
                          <tr>
                            <th>S No</th>
                            <th>Property Id</th>
                            <th>Property Image</th>
                            <th>Address</th>
                            <th>Date</th>

                            <th width="200">Monthly rent</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                      )}
                      <tbody>
                        {this.state.transData.length > 0 ? (
                          <>
                            {this.state.transData
                              .sort((b, a) => a.payment_date - b.payment_date)
                              .map((l) => {
                                return (
                                  <>
                                    {!this.state.selectedDate || momentDate(l.timestamp, "YYYY-MM-DD") === this.state.selectedDate ? (
                                      <tr>
                                        <td class="">{i++}</td>
                                        <td class="">
                                          <Link
                                            to={`/detailproperty.html?id=${l.propertyId}&uid=${l.landlordId}`}
                                          >
                                            {trimeString(
                                              "propertyId" in l
                                                ? l.propertyId
                                                : "",
                                              6
                                            )}
                                          </Link>
                                        </td>
                                        <td>
                                          {"fileDetails" in l ? (
                                            <>
                                              <div class="col-auto">
                                                <div class="proprTablImg">
                                                  <Link
                                                    to={`/detailproperty.html?id=${l.propertyId}&uid=${l.landlordId}`}
                                                  >
                                                    <img
                                                      src={`${this.state.imgurl}${l.fileDetails[0].filename}`}
                                                    />
                                                  </Link>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </td>
                                        <td class="">
                                          <Link
                                            to={`/detailproperty.html?id=${l.propertyId}&uid=${l.landlordId}`}
                                          >
                                            {l.address}
                                          </Link>
                                        </td>
                                        <td class="">
                                          {momentDate(
                                            l.timestamp,
                                            " MMM D YYYY"
                                          )}
                                        </td>
                                        <td class="">{l.monthlyRent}</td>
                                        <td class="">
                                          <div class="tbl-actn">
                                            <ul>
                                              <li class="delete-btn">
                                                <div class="">
                                                  <a
                                                    href="javascript:void(0);"
                                                    onClick={() =>
                                                      this.openModal(
                                                        l.propertyId
                                                      )
                                                    }
                                                  >
                                                    <img src="images/delete-icon.png" />
                                                    <span>
                                                      <img src="images/delete-white-icon.png" />
                                                    </span>
                                                  </a>
                                                </div>
                                              </li>
                                            </ul>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      <></>
                                    )}
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
                <div class="row  align-items-center">
                  <div class="col"></div>
                  {this.state.transData.length >= 5 && (
                    <div class="col-auto">
                      <div class="paginationCustom">
                        <nav aria-label="Page navigation example">
                          <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={2}
                            totalItemsCount={this.state.countpage}
                            pageRangeDisplayed={5}
                            onChange={this.handlePageChange.bind(this)}
                          />
                        </nav>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <></>
        )}
        <Footer />
        <Modal open={this.state.visible} onClose={this.onCloseModal}>
          <div class="row">
            <div class="innerHdng pb-4">
              <h3>Are you confirm </h3>
            </div>
            <div class="col">
              <button onClick={() => this.deleteCommon(1)}>Delete</button>
              <button onClick={this.onCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
