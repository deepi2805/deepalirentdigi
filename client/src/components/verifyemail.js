import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import queryString from "query-string";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class Resetpassword extends React.Component {
  state = {
    id: queryString.parse(this.props.location.search).id,
  };
  componentDidMount() {
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.id,
        verfiyType: "emailVerify",
      }),
    };
    fetch(config.googleAuth.backURL + `verify_user`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == true) {
          //console.log(data);
          this.props.history.push("/signup.html", { success: true });
        } else {
          toast(data.msg);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  render() {
    return (
      <body class="loginSignup">
        <ToastContainer />
      </body>
    );
  }
}
