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
export default class MyListing extends React.Component {
  state = {
    userData: [],
    listData: [],
    pagestatus: false,
    loginUserid: "",
    imgurl: config.googleAuth.imgurl,
    featureStatus: 0,
    visible: false,
    activePage: 0,
    countpage: 0,
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
        //self.handlePageChange(1)
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

    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: decoded_id.Uid,
        property_unit_flag: 2, //0=single,multiple=1,2=both
        userId_flag: 0, //1 with out id,0=with id
      }),
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_user_property_by_user_id`,
        getList
      ).then((value) => value.json()),
    ])
      .then((value) => {
        console.log("test", value[1]);

        this.setState({
          userData: value[0].data,
          listData: value[1].data,
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

  featureSettings(status, propertyId) {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: propertyId,

        status: status, //1->removed,0->added
      }),
    };
    fetch(
      config.googleAuth.backURL + `user/enable_disable_featured_user_property`,
      options
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  disbleEnable(status, propertyId) {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: propertyId,
        data: { enable: status }, //false->removed,ture->added
      }),
    };
    fetch(config.googleAuth.backURL + `user/update_user_property`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  deleteProperty(propertyId) {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        property_id: propertyId,
      }),
    };
    fetch(config.googleAuth.backURL + `user/delete_property`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
          setTimeout(function () {
            window.location.reload();
          }, 100);
        } else {
          toast(data.msg);
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
    let getList = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.loginUserid,
        property_unit_flag: 2, //0=single,multiple=1,2=both
        userId_flag: 0, //1 with out id,0=with id
        page: pageNumber,
      }),
    };
    fetch(
      config.googleAuth.backURL + `user/fetch_user_property_by_user_id`,
      getList
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("check pagenation", data);
        this.setState({
          listData: data.data,
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
  pageReload() {
    window.location.reload();
  }
  render() {
    return (
      <div class="body">
        {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>}
        {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )}

        <section class="wrapper py-5  myListingBlk">
          <div class="container">
            <div class="row d-flex align-items-center justify-space-between pb-3">
              <div class="col-sm">
                <div class="mainHdngTitle pb-3">
                  <h2>Properties List</h2>
                </div>
              </div>
              <div class="col-sm-auto mr-5 ">
                <div class="commonForm sideFilterData srchCheck">
                  <div class="prtyLstAdvnSrh  d-flex align-items-center ">
                    {/*  <div class="checkInbox commonForm ">
                      <div class="form-group col-md-12">
                        <label class="control control--checkbox mb-0">
                          Show only active listings
                          <input type="checkbox" />
                          <div class="control__indicator"></div>
                        </label>
                      </div>
                    </div> */}
                    <div class="form-group mrr5">
                      <span>
                        <span>
                          <i class="fa fa-search"></i>
                        </span>
                      </span>
                      <input
                        type="text"
                        name=""
                        placeholder=" Search by: Keyword, Name.."
                        class="form-control"
                        onChange={(e) => this.changeName(e.target.value)}
                      />
                    </div>
                    <div class="form-group">
                      <select class="form-select px-3">
                        <option>Sort By</option>
                        <option>Title</option>
                        <option>Community Name</option>
                        <option>Most Recently Active</option>
                        <option>Expiration Date</option>
                        <option>Address</option>
                        <option>City Date</option>
                        <option>Province</option>
                        <option>Status</option>
                      </select>
                    </div>

                    <div class="lstt-wsh-btns mr-5 ">
                      <a href="javascript:void(0);">
                        <i class="fa fa-search"> </i>
                      </a>
                      <a href="javascript:void(0);" onClick={this.pageReload}>
                        <i class="fa fa-refresh"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="common-table mybook-list-tbl table-responsive">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Detail</th>
                    <th>Category</th>
                    <th width="250">Address</th>
                    <th>Publish</th>
                    <th>Status</th>
                    <th>Expiry Date</th>
                    <th align="center">Featured</th>
                    <th class="action-width">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listData.length > 0 ? (
                    <>
                      {this.state.listData
                        .sort((b, a) => a.timestamp - b.timestamp)
                        .map((l) => {
                          return (
                            <>
                              <tr>
                                <td class="">
                                  <a href="javascript:void(0)">
                                    {trimeString(l._id, 6)}
                                  </a>
                                </td>
                                <td class="discription">
                                  <div class="row">
                                    <div class="col-auto">
                                      <div class="proprTablImg">
                                        <Link
                                          to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}
                                        >
                                          <img
                                            src={`${this.state.imgurl}${l.fileDetails[0].filename}`}
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                    <div class="col">
                                      <div class="prpryData">
                                        <Link
                                          to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}
                                        >
                                          {l.property_heading}
                                        </Link>
                                        <div class="propryviewList">
                                          <a href="#">
                                            <i class="fa fa-eye"></i>
                                            <span>
                                              {"views" in l ? l.views : "0"}
                                            </span>
                                          </a>
                                          <a href="#">
                                            <i class="fa fa-heart"></i>
                                            <span>
                                              {"wishlistCount" in l
                                                ? l.wishlistCount
                                                : ""}
                                            </span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                <td>
                                  <div class="category">{l.category_name}</div>
                                </td>
                                <td class="address">{l.address}</td>
                                <td class="">
                                  {l.enable == true ? (
                                    <>
                                      <button
                                        class="unpublishBtn"
                                        onClick={() =>
                                          this.disbleEnable(false, l._id)
                                        }
                                      >
                                        Un-Publish
                                      </button>
                                      {/* <input
                                    type="checkbox"
                                    onChange={() =>
                                      this.disbleEnable(false, l._id)
                                    }
                                    checked
                                  /> */}
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        class="publishBtn"
                                        onClick={() =>
                                          this.disbleEnable(true, l._id)
                                        }
                                      >
                                        Publish
                                      </button>
                                      {/* <input
                                    type="checkbox"
                                    onChange={() =>
                                      this.disbleEnable(true, l._id)
                                    }
                                  /> */}
                                    </>
                                  )}
                                </td>
                                <td class="activependngBtn">
                                  {"payment_status" in l ? (
                                    l.payment_status == 0 ? (
                                      <p class="text-center btn comn-btn red">
                                        {" "}
                                        Pending
                                      </p>
                                    ) : (
                                      <p class="text-center btn comn-btn green">
                                        {" "}
                                        Activate
                                      </p>
                                    )
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td class="activependngBtn">{l.expirydate}</td>
                                <td class="featureRating">
                                  {l.isfeatured ? (
                                    <>
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() =>
                                          this.featureSettings(0, l._id)
                                        }
                                      >
                                        <i
                                          class="fa fa-star"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </>
                                  ) : (
                                    <>
                                      <a
                                        href="javascript:void(0)"
                                        onClick={() =>
                                          this.featureSettings(1, l._id)
                                        }
                                      >
                                        <i
                                          class="fa fa-star-o"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </>
                                  )}
                                </td>

                                <td class="">
                                  <div class="tbl-actn">
                                    <ul>
                                      <li class="view-btn">
                                        <div class="">
                                          <Link
                                            to={`/detailproperty.html?id=${l._id}&uid=${l.userId}`}
                                          >
                                            <img src="images/view-icon.png" />
                                            <span>
                                              <img src="images/view-white-icon.png" />
                                            </span>
                                          </Link>
                                        </div>
                                      </li>
                                      <li class="edit-btn">
                                        <div class="">
                                          <Link
                                            to={`/editproperty.html?id=${l._id}&uid=${l.userId}`}
                                          >
                                            <img src="images/edit-icon.png" />
                                            <span>
                                              <img src="images/edit-white-icon.png" />
                                            </span>
                                          </Link>
                                        </div>
                                      </li>
                                      <li class="delete-btn">
                                        <div class="">
                                          <a
                                            href="javascript:void(0);"
                                            onClick={() =>
                                              this.openModal(l._id)
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
            <div class="paginationCustom pull-right">
              <nav aria-label="Page navigation example">
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.countpage}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                />
                {/* <ul class="pagination">
                  <li class="page-item">
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
                  </li>
                </ul> */}
              </nav>
            </div>
          </div>
        </section>

        <Footer />
        <Modal open={this.state.visible} onClose={this.onCloseModal}>
          <div class="row">
            <div class="innerHdng pb-4">
              <h3>Are you confirm </h3>
            </div>
            <div class="col">
              <button onClick={() => this.deleteProperty(this.state.delId)}>
                Delete
              </button>
              <button onClick={this.onCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
