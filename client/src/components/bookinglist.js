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

export default class BookingList extends React.Component {
  state = {
    userData: [],

    pagestatus: false,
    loginUserid: "",
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

    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
    ])
      .then((value) => {
        console.log("test", value);

        this.setState({
          userData: value[0].data,

          pagestatus: true,
          loginUserid: decoded_id.Uid,
        });
        //console.log(this.state.userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
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
                      <h2>Booking List</h2>
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
                        <div class="form-group">
                          <span>
                            <i class="fa fa-search"></i>
                          </span>
                          <input
                            type="text"
                            name=""
                            placeholder="Search.."
                            class="form-control"
                          />
                        </div>
                        <div class="lstt-wsh-btns mr-5 ">
                          <a href="javascript:void(0);">
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
                          <th>Name</th>
                          <th> Date </th>
                          <th>Property name</th>
                          <th>Property Manager</th>
                          <th>Email</th>
                          <th>Appointment Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">1</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Pankaj joshi</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="cancel" class="cancel">
                                <i class="fa fa-times" aria-hidden="true"></i>{" "}
                                Pending
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">2</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="confirmed">
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Confirmed
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">3</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" className="reshudle">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                                Rescheduled
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">4</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="success-light">
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Completed
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">4</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="cancel">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>{" "}
                                Cancelled
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">1</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Pankaj joshi</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="cancel" class="cancel">
                                <i class="fa fa-times" aria-hidden="true"></i>{" "}
                                Pending
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">2</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="confirmed">
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Confirmed
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">3</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" className="reshudle">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>{" "}
                                Rescheduled
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">4</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="success-light">
                                <i class="fa fa-check" aria-hidden="true"></i>{" "}
                                Completed
                              </a>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td class="">
                            <a href="javascript:void(0)">4</a>
                          </td>
                          <td class="">
                            <a href="javascript:void(0)">Deepak Taneja</a>
                          </td>
                          <td class="date">16-04-2022</td>
                          <td class="prptryName">Property Name</td>
                          <td class="prptryMangr">Property Manager</td>
                          <td class="email">joshi1309@gmail.com</td>
                          <td class="date">13-05-2022 (11:30am)</td>
                          <td class="status">
                            <div>
                              <a href="#" class="cancel">
                                <i class="fa fa-trash-o" aria-hidden="true"></i>{" "}
                                Cancelled
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div class="row  align-items-center">
                  <div class="col"></div>
                  <div class="col-auto">
                    <div class="paginationCustom">
                      <nav aria-label="Page navigation example">
                        <ul class="pagination">
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
