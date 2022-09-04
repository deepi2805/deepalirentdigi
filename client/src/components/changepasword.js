import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
export default class ChangePasword extends React.Component {
  state = {
    open: false,
    userData: [],
    pagestatus: false,
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
    loginUserid: "",
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
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
  changepasswordSubmit = (e) => {
    e.preventDefault();
    if (this.state.oldpassword === "") {
      this.setState({ validoldpassword: "Old password is required*" });
    } else {
      this.setState({ validnewpassword: "" });
    }
    if (this.state.newpassword === "") {
      this.setState({ validnewpassword: "New password is required*" });
    } else {
      this.setState({ validnewpassword: "" });
    }
    if (this.state.confirmpassword === "") {
      this.setState({ validconfirmpassword: "Confirm password is required*" });
    } else {
      this.setState({ validconfirmpassword: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.newpassword === "" ||
      this.state.confirmpassword === "" ||
      this.state.oldpassword === ""
    ) {
    } else if (this.state.newpassword != this.state.confirmpassword) {
      toast("New password & Confirm password not matched!");
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_password: this.state.newpassword,
          old_password: this.state.oldpassword,
          id: this.state.loginUserid,
        }),
      };
      fetch(config.googleAuth.backURL + `update_user_pwd`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
            this.setState(this.initall);
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { open } = this.state;
    return (
      <>
        {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>}
        {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )}

        <div class="body">
          <ToastContainer />
          <section class="wrapper py-4 pb7">
            <div class="container">
              {/* <div>
                <h2>react-responsive-modal</h2>
                <button onClick={this.onOpenModal}>Open modal</button>
                <Modal open={open} onClose={this.onCloseModal}>
                  <h2>Simple centered modal</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </Modal>
              </div> */}
              <div class="row justify-content-center">
                <div class="col-md-7">
                  <div class="about addProptryBlk ">
                    <form
                      class="commonForm addPrptyForm brDrBg"
                      id="adProperty"
                      onSubmit={this.changepasswordSubmit}
                    >
                      <div class="row">
                        <div class="innerHdng pb-4">
                          <h3>Change Password</h3>
                        </div>
                        <div class="form-group col">
                          {/* <label>Current Password</label> */}
                          {this.state.validoldpassword ? (
                            <>
                              <label for="emailFld" class="form-label red">
                                {this.state.validoldpassword}
                              </label>
                            </>
                          ) : (
                            <>
                              <label for="emailFld" class="form-label">
                                Current Password <span class="required">*</span>
                              </label>
                            </>
                          )}
                          <input
                            class="form-control"
                            type="password"
                            placeholder="******"
                            value={this.state.oldpassword}
                            name="oldpassword"
                            onChange={this.onchangetext}
                          />
                          {/* <span style={{ color: "red" }}>
                            {" "}
                            {this.state.validoldpassword}
                          </span> */}
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col">
                          {this.state.validnewpassword ? (
                            <>
                              <label for="emailFld" class="form-label red">
                                {this.state.validnewpassword}
                              </label>
                            </>
                          ) : (
                            <>
                              <label for="emailFld" class="form-label">
                                New Password <span class="required">*</span>
                              </label>
                            </>
                          )}
                          {/*  <label>
                            New Password <span class="required">*</span>
                          </label> */}
                          <input
                            class="form-control"
                            type="password"
                            placeholder="*****"
                            value={this.state.newpassword}
                            name="newpassword"
                            onChange={this.onchangetext}
                          />
                          {/*  <span style={{ color: "red" }}>
                            {" "}
                            {this.state.validnewpassword}
                          </span> */}
                        </div>
                      </div>
                      <div class="row">
                        <div class="form-group col">
                          {this.state.validconfirmpassword ? (
                            <>
                              <label for="emailFld" class="form-label red">
                                {this.state.validconfirmpassword}
                              </label>
                            </>
                          ) : (
                            <>
                              <label for="emailFld" class="form-label">
                                Re-enter Password{" "}
                                <span class="required">*</span>
                              </label>
                            </>
                          )}
                          {/* <label>
                            Re-enter Password <span class="required">*</span>
                          </label> */}
                          <input
                            class="form-control"
                            type="password"
                            placeholder="*****"
                            value={this.state.confirmpassword}
                            name="confirmpassword"
                            onChange={this.onchangetext}
                          />
                          {/* <span style={{ color: "red" }}>
                            {" "}
                            {this.state.validconfirmpassword}
                          </span> */}
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <button type="submit" class="btn pull-right">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }
}
