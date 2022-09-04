import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
class CloseAcount extends React.Component {
  state = {
    userData: [],
    pagestatus: false,
    loginUserid: "",
    comment: "",
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
  deactivateSubmit = (e) => {
    e.preventDefault();
    if (this.state.comment === "") {
      this.setState({ validcomment: "Reason.. is required*" });
    } else {
      this.setState({ validcomment: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (this.state.comment === "") {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deactivaComment: this.state.comment,
          deleteStatus: 1,
          id: this.state.loginUserid,
        }),
      };
      fetch(config.googleAuth.backURL + `enable_disable_user`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
            localStorage.removeItem("Uid");
            localStorage.removeItem("status");

            this.props.history.push("/");
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
    return (
      <div class="body">
        <ToastContainer />
        {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>}
        {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )}
        <section class="wrapper py-4 pb7 ">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-md-7">
                <div class="about addProptryBlk ">
                  <form
                    class="commonForm addPrptyForm brDrBg"
                    id="adProperty"
                    onSubmit={this.deactivateSubmit}
                  >
                    <div class="row">
                      <div class="innerHdng pb-4">
                        <h3>Close Account</h3>
                      </div>
                      <h2>
                        Account <span>Deactivation</span>
                      </h2>
                      <p class="py-3">
                        Are you sure, you want to Deactivate your account?
                      </p>
                    </div>
                    <div class="row">
                      <div class="form-group col">
                        <textarea
                          class="form-control"
                          placeholder="Reason..."
                          name="comment"
                          onChange={this.onchangetext}
                        >
                          {this.state.comment}
                        </textarea>
                        <span style={{ color: "red" }}>
                          {" "}
                          {this.state.validcomment}
                        </span>
                      </div>
                    </div>
                    <div class="row pb-6">
                      <div class="col-md-12">
                        <button type="submit" class="btn lightBtn ">
                          Deactivate
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
    );
  }
}
export default withRouter(CloseAcount);
