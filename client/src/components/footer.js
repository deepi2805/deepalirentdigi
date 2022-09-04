import React from "react";
import { Link, withRouter } from "react-router-dom";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
export default class Footer extends React.Component {
  state = {
    email: "",
  };
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  addnewletter = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email === "") {
      toast("Email is required*");
    } else {
      if (reg.test(this.state.email) === false) {
        toast("Invalid Email");
      } else {
      }
    }
    if (this.state.email === "" || reg.test(this.state.email) === false) {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
        }),
      };
      fetch(config.googleAuth.backURL + `add_newsletter`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            toast(data.msg);
            this.setState({ email: "" });
          } else {
            toast(data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };
  render() {
    return (
      <footer class="wrapper footrBlk">
        <div class="containerLg">
          <div class="row">
            <div class="col-lg">
              <div class="footerWidget">
                <div class="ftr-logo">
                  <Link to="">
                    <img src="images/ftr-logo.png" alt="Logo" />
                  </Link>
                </div>
                <div class="ftrParah">
                  <p>8500, Lorem Street, Edmonton, IL, 55030</p>
                  <p>
                    <a href="mailto:info@rentdigi.com">info@rentdigi.com</a>
                  </p>
                </div>
                <div class="ftrContact">
                  <div class="ftrContctImg">
                    <img src="images/ftr-phone.png" alt="Phone" />
                  </div>
                  <div class="ftrCall">
                    <small>1 (800) 123-4567</small>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg">
              <div class="footerWidget">
                <h2>Links</h2>
                <div class="ftrList">
                  <Link to="">Home</Link>
                  <Link to="listproperty.html">Property Listing</Link>
                  {/* <a href="#">New Complex</a>
                  <a href="#">Appartment Plans</a>
                  <a href="#">News</a> */}
                  <Link to="contact.html">Contact Us</Link>
                  <Link to="about.html">About Us</Link>
                </div>
              </div>
            </div>
            <div class="col-lg">
              <div class="footerWidget">
                <h2>Subscribe to Our Newsletter</h2>
                <div class="ftrSubcribe">
                  <form class="commonForm" onSubmit={this.addnewletter}>
                    <div class="form-group">
                      <input
                        type="text"
                        name="email"
                        class="form-control"
                        id="text"
                        value={this.state.email}
                        placeholder="Enter your email..."
                        onChange={this.onchangetext}
                      />
                      <button type="submit" class="comn-btn">
                        Subscribe
                      </button>
                    </div>
                    <div class="form-check">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="same-address"
                      />
                      <label class="form-check-label">
                        I have read and agree to the{" "}
                        <a href="#">Privacy Policy.</a>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="copyRight">
            <h5>
              rent<span>digi</span>| <small>the feeling of house.</small>
            </h5>
          </div>
        </div>
      </footer>
    );
  }
}
