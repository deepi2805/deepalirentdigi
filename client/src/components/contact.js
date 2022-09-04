import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import Header from "./header";
import Footer from "./footer";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
export default class Contact extends React.Component {
  state = {
    fname: "",
    subject: "",
    email: "",
    message: "",
    phone: "",
  };
  onchangetext = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  contactSubmit = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const pattern = new RegExp(/^[0-9\b]+$/);
    if (this.state.fname === "") {
      this.setState({ validfname: "First name is required*" });
    } else {
      this.setState({ validfname: "" });
    }
    if (this.state.subject === "") {
      this.setState({ validsubject: "Subject is required*" });
    } else {
      this.setState({ validsubject: "" });
    }
    if (this.state.email === "") {
      this.setState({ validemail: "Email is required*" });
    } else {
      if (reg.test(this.state.email) === false) {
        this.setState({ validemail: "Invalid Email" });
      } else {
        this.setState({ validemail: "" });
      }
    }
    if (this.state.phone === "") {
      this.setState({ validphone: "Phone is required*" });
    } else {
      if (pattern.test(this.state.phone) === false) {
        this.setState({ validphone: "Please enter only number." });
      } else if (this.state.phone.length != 10) {
        this.setState({ validphone: "Please enter valid phone number." });
      } else {
        this.setState({ validphone: "" });
      }
    }

    if (this.state.message === "") {
      this.setState({ validmessage: "Message is required*" });
    } else {
      this.setState({ validmessage: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.message === "" ||
      this.state.fname === "" ||
      this.state.subject === "" ||
      this.state.phone === "" ||
      this.state.phone.length != 10 ||
      this.state.email === "" ||
      reg.test(this.state.email) === false ||
      pattern.test(this.state.phone) === false
    ) {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          fname: this.state.fname,
          subject: this.state.subject,
          phone: this.state.phone,
          message: this.state.message,
        }),
      };
      fetch(config.googleAuth.backURL + `add_feedback`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            //console.log(data);
            toast(data.msg);
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
      <div class="body">
        <Header />
        <section class="wrapper breadcrumbInr pd40">
          <div class="container">
            <div class="mainHdng">
              <h1 class="py-4">
                Get In<span>Touch</span>
              </h1>
            </div>
          </div>
        </section>

        <section class="wrapper contactBlk  py-5 ">
          <div class="container">
            <div class="row d-flex justify-space-between">
              <div class="col-md-7">
                <div class="homeCntctMainDiv">
                  <div class="homeCntctInfoRow">
                    <div class="row">
                      <div class="col-sm-4">
                        <div class="homeCntctInfoCol">
                          <span>
                            <img src="images/conttLocIcon.png" />
                          </span>
                          <h4>Rent Digi</h4>
                          <p>230, Forth Bork, ZDR Town Grown, UK</p>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="homeCntctInfoCol homeCntctCall">
                          <span>
                            <img src="images/conttCallIcon.png" />
                          </span>
                          <h4>Talk to us</h4>
                          <p>
                            <a href="tel:+14034575502">+1800 150 150</a>
                          </p>
                        </div>
                      </div>
                      <div class="col-sm-4">
                        <div class="homeCntctInfoCol">
                          <span>
                            <img src="images/conttMailIcon.png" />
                          </span>
                          <h4>Mail us @</h4>
                          <p>
                            <a href="mailto:+14034575502">
                              feedback@rendigicare.uk
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="testiMnlSldr contctTestiSlider">
                    <Swiper
                      slidesPerView={1}
                      spaceBetween={30}
                      centeredSlides={true}
                      pagination={true}
                      clickable={true}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <div class="testiMonialIner">
                          <div class="testiContent">
                            <p>
                              “Vivamus mcorper laoreet orci libero et felis. Nam
                              augue sapien, tempor sit amet tellu s et, blandit
                              ultricies nulla.”
                            </p>
                            <div class="testiRating">
                              <div class="ratings">
                                <div class="stars">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                </div>
                              </div>
                            </div>
                            <div class="tstiAuthor">
                              <h5>Adam Smith</h5>
                              <p>Web Designer</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div class="testiMonialIner">
                          <div class="testiContent">
                            <p>
                              “Vivamus mcorper laoreet orci libero et felis. Nam
                              augue sapien, tempor sit amet tellu s et, blandit
                              ultricies nulla.”
                            </p>
                            <div class="testiRating">
                              <div class="ratings">
                                <div class="stars">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                </div>
                              </div>
                            </div>
                            <div class="tstiAuthor">
                              <h5>Adam Smith</h5>
                              <p>Web Designer</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>

                      <SwiperSlide>
                        <div class="testiMonialIner">
                          <div class="testiContent">
                            <p>
                              “Vivamus mcorper laoreet orci libero et felis. Nam
                              augue sapien, tempor sit amet tellu s et, blandit
                              ultricies nulla.”
                            </p>
                            <div class="testiRating">
                              <div class="ratings">
                                <div class="stars">
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                  <i class="fa fa-star"></i>
                                </div>
                              </div>
                            </div>
                            <div class="tstiAuthor">
                              <h5>Adam Smith</h5>
                              <p>Web Designer</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
              <div class="col-md-5">
                <div className="about addProptryBlk pd50">
                  <form
                    class="commonForm contactForm"
                    id="adProperty"
                    onSubmit={this.contactSubmit}
                  >
                    <div class="whtBg bxshadow radius10  py-5 px-5">
                      <div class="row">
                        <div class="col-md-12">
                          <div class="mainHdng ">
                            <div class="pb-4">
                              <h2>
                                Provide Us <span> Your Feed Back</span>
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {this.state.validfname}
                      </span>
                      <div class="row form-group">
                        <div class="col-md-12">
                          <input
                            type="text"
                            class="form-control"
                            id="#"
                            placeholder="Name"
                            value={this.state.fname}
                            name="fname"
                            onChange={this.onchangetext}
                          />
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {this.state.validphone}
                      </span>
                      <div class="row form-group">
                        <div class="col-md-12">
                          <input
                            type="text"
                            class="form-control"
                            id="#"
                            placeholder="Mobile"
                            value={this.state.phone}
                            name="phone"
                            onChange={this.onchangetext}
                          />
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {this.state.validemail}
                      </span>
                      <div class="row form-group align-items-center">
                        <div class="col-md-12">
                          <input
                            type="email"
                            class="form-control"
                            id="#"
                            placeholder="Contact Email"
                            value={this.state.email}
                            name="email"
                            onChange={this.onchangetext}
                          />
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {this.state.validsubject}
                      </span>
                      <div class="row form-group align-items-center">
                        <div class="col-md-12">
                          <input
                            type="text"
                            class="form-control"
                            id="#"
                            placeholder="Subject"
                            value={this.state.subject}
                            name="subject"
                            onChange={this.onchangetext}
                          />
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                        {" "}
                        {this.state.validmessage}
                      </span>
                      <div class="row form-group align-items-center">
                        <div class="col-md-12">
                          <textarea
                            class="form-control"
                            placeholder="Message"
                            name="message"
                            onChange={this.onchangetext}
                          >
                            {this.state.message}
                          </textarea>
                        </div>
                      </div>
                      <div class="row align-items-center">
                        <div class="col-md-12">
                          <button type="submit" class="btn">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="wrapper pdbtm-60 latestBlogBlk">
          <div class="container">
            <div class="mainHdng pdbtm-60">
              <div class="row align-items-center">
                <div class="col">
                  <div class="mainHdngTitle text-center">
                    <h4>
                      Our <span>Blog Post</span>
                    </h4>
                    <h1>
                      Latest Blogs<span>& Articles </span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div class="LatstBlogSlidr">
              <Swiper
                navigation={true}
                slidesPerView={4}
                spaceBetween={30}
                className="mySwiper"
              >
                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property2.jpg" />
                            <span class="batchImg"> Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property1.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property3.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property2.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property1.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property3.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property2.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property1.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property3.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div class="cardPropertyBox blogListBox">
                    <div class="row g-0 ">
                      <div class="col-auto">
                        <a href="javascript:void(0)">
                          <div class="cartBlkImg">
                            <img src="images/f-property2.jpg" />
                            <span class="batchImg">Dec 24, 2021</span>
                            <div class="blogCat">
                              <h4>
                                <a href="javascript:void(0)">Home, Villa</a>
                              </h4>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div class="col d-flex">
                        <h3 class="mb-0">An Old Convent Compact Luxury Home</h3>
                      </div>
                      <div class="blgRrdBtn">
                        <a href="javascript:void(0)">Read More</a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </section>

          <section class="wrapper pd60 instaFedBlk lightBg">
          <div class="ftrInstaBg">
            <div class="container">
              <div class="mainHdng pdbtm-60">
                <div class="row align-items-center">
                  <div class="col">
                    <div class="mainHdngTitle text-center">
                      <h4>
                        We are in <span>Instagram</span>
                      </h4>
                      <h2>
                        Follow us to <span>stay inspired </span>
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              <div class="instaFeedInr">
                <div class="row">
                  <div class="col">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property2.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property3.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property1.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property2.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div class="col">
                    <div class="instaInrDiv">
                      <Link to="/">
                        <div
                          class="instaImg"
                          style={{
                            backgroundImage: `url("images/property3.jpg")`,
                          }}
                        ></div>
                        <div class="instaIcon">
                          <i class="fa fa-instagram"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
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
