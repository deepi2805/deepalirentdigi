import React from "react";
import { Link, withRouter ,useState} from "react-router-dom";
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
export default class SavedsearchList extends React.Component {
  state = {
    tru:true,
    userData: [],
    transData: [],
    pagestatus: false,
    loginUserid: "",
    visible: false,
    activePage: 0,
    countpage: 0,
    selectedDate:null,
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
        userId: decoded_id.Uid,
      }),
    };
    Promise.all([
      fetch(config.googleAuth.backURL + `user_detail`, getloginuser).then(
        (value) => value.json()
      ),
      fetch(
        config.googleAuth.backURL + `user/fetch_saved_search_filter_property`,
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
  deleteCommon(Id) {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Id,
      }),
    };
    fetch(config.googleAuth.backURL + `user/delete_saved_search`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          toast(data.msg);
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
  true =()=>{
    this.setState({tru:false})
  }
  false =()=>{
    this.setState({tru:true})
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
        userId: decoded_id.Uid,
        page: pageNumber,
      }),
    };
    fetch(
      config.googleAuth.backURL + `user/fetch_saved_search_filter_property`,
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

onChange=(date)=>{
this.setState({selectedDate:date.target.value}) 
}

  render() {
    var index = 11,
      length = 13;
    var i = 1;

    // console.log(momentDate(this.state.selectedDate, " MMM D YYYY"))
    // console.log(momentDate(this.state.selectedDate, "YYYY-MM-DD"))

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
                      <h2>Saved Search List</h2>
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
                        <div class="form-group">
                          
                        </div>
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
                  {this.state.transData.length > 0 ? (
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>S No</th>
                          <th>Id</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                          <>

                            {this.state.transData
                              .sort((b, a) => a.timestamp - b.timestamp)
                              .map((l) => {
                                return (
                                  <>
                                 
                                  {!this.state.selectedDate || momentDate(l.timestamp, "YYYY-MM-DD")===(this.state.selectedDate)?
                                  
                                    <tr>
                                      <td class="">{i++}</td>
                                      <td class="">
                                        <Link
                                          to={`/listproperty.html?sid=${l._id}`}
                                        >
                                          {trimeString(l._id, 9)}
                                        </Link>
                                      </td>
                                      <td class="">
                                        {momentDate(l.timestamp, " MMM D YYYY")}
                                      </td>
                                      <td class="">
                                        <div class="tbl-actn">
                                          <ul>
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
                                    
                                    :(<></>
                                    )
                               } 
                              </>
                                );
                              })}
                          </>
                        
                      </tbody>
                    </table>
                    ): (
                      <>
                      <tr>
                          No data found
                       </tr>
                      </>
                     
                   )}
                  </div>
                </div>
                <div class="row  align-items-center">
                  <div class="col"></div>
                  {this.state.transData.length >= 0 &&

                    <div class="col-auto">
                      <div class="paginationCustom">
                        <nav aria-label="Page navigation example">
                          <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={5}
                            totalItemsCount={this.state.countpage}
                            pageRangeDisplayed={2}
                            onChange={this.handlePageChange.bind(this)}
                          />
                        </nav>
                      </div>
                    </div>
                  }
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
              <button onClick={() => this.deleteCommon(this.state.delId)}>
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
