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
import queryString from "query-string";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

export default class Success extends React.Component {
  state = {
    userData: [],
    id: queryString.parse(this.props.location.search).id,
    userId: queryString.parse(this.props.location.search).uid,
    status: queryString.parse(this.props.location.search).status,
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

            <section class="wrapper py-5">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-md-5">
                    <div class="sucessCol bxshadow radius10 text-center ">
                      <div class="sucessImg">
                        <img src="images/successIcon.jpg" />
                      </div>
                      <div class="sucessContent">
                        <h2 class="py-4 ">Success</h2>
                        <p>
                          We received your purchase request; we'll be in touch
                          shortly!
                        </p>
                        <div class="btn successBtn py-5">
                          {this.state.status == "0" ? (
                            <>
                              <Link
                                to={`/detailproperty.html?id=${this.state.id}&uid=${this.state.userId}`}
                              >
                                View
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link
                                to={`/listproperty.html?id=${this.state.id}`}
                              >
                                View
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
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
