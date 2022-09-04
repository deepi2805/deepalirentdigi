import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import Header from './header'
import Footer from "./footer";

export default class About extends React.Component {
  render() {
    return (
      <div class="body">
        <Header />
        <section class="wrapper breadcrumbInr pd40">
          <div class="container">
            <div class="mainHdng">
              <h2 class="py-4">About<span>Us</span></h2>
            </div>
          </div>
        </section>
        <section class="wrapper  py-5 ">
          <div class="container">
            <div class="row d-flex justify-space-between pb-4">
              <div class="col-md-5">
                <div class="abtImg">
                  <img src="images/aboutimg.jpg" />
                </div>
              </div>
              <div class="col-md-7">
                <div class="proprtyDiscription">
                  <div class="mainHdng pb-3">
                    <div class="at-title">
                      <h3>
                        <em>20</em>
                        <span>Years Of Rent Digi</span>
                      </h3>
                    </div>
                  </div>
                  <p>Nullam quis ante tiam sit amet orci eget eros faucibus tincidunt. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p><p>Nullam quis ante tiam sit amet orci eget eros faucibus tincidunt. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.
                    Nullam quis ante tiam sit amet orci.
                  </p>
                  <ul class="at-successinfo">
                    <li>
                      <figure><img src="images/excellent.jpg" alt="Image" /></figure>
                      <div class="at-successcontent"><h4>Excellent 24/7 Support</h4></div>
                    </li>
                    <li>
                      <figure><img src="images/quality-offer.jpg" alt="Image" /></figure>
                      <div class="at-successcontent"><h4>Premium Quality Offers</h4></div>
                    </li>
                    <li>
                      <figure><img src="images/easy.jpg" alt="Image" /></figure>
                      <div class="at-successcontent"><h4>Easy To Find Property</h4></div>
                    </li>
                    <li>
                      <figure><img src="images/posting.jpg" alt="Image" /></figure>
                      <div class="at-successcontent"><h4>Posting Ad Is Like Fun</h4></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="wrapper lightBg proprType pd80 pdb10 ">
          <div class="container">
            <div class="row">
              <div class="col-md-10">
                <div class="properTypeFeature">
                  <Swiper slidesPerView={5} spaceBetween={10} navigation={true} centeredSlides={true} loop={true}
                  breakpoints={{
                    1700: {
                      slidesPerView: 5,
                    },
                    991: {
                      slidesPerView: 3,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    480: {
                      slidesPerView: 1,
                    },
                  }}
                  className="mySwiper">
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/office-icon.png" alt="Office Icon" />
                          </div>
                          <i>Office</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox active text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/house-icon.png" alt="House Icon" />
                          </div>
                          <i>House</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/villa-icon.png" alt="Villa Icon" />
                          </div>
                          <i>Villa</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/appartment-icon.png" alt="Appartment Icon" />
                          </div>
                          <i>Appartment</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/office-icon.png" alt="Office Icon" />
                          </div>
                          <i>Office</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/house-icon.png" alt="House Icon" />
                          </div>
                          <i>House</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/villa-icon.png" alt="Villa Icon" />
                          </div>
                          <i>Villa</i>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div class="ExlprPrtyBox text-center">
                        <div class="feature">
                          <div class="feature-icon ">
                            <img src="images/appartment-icon.png" alt="Appartment Icon" />
                          </div>
                          <i>Appartment</i>
                        </div>
                      </div>
                    </SwiperSlide>

                  </Swiper>
                </div>
              </div>
              <div class="col-md-2">
                <div class="mainHdng">
                  <div class=" align-items-center">
                    <div class="mainHdngTitle">
                      <h2>Explore by <span>Property Type</span></h2>
                    </div>
                  </div>
                  <div class="Mainhdingbtn">
                    <a href="javascript:void(0)" class="comn-btn blu"><span>+2300 Available Properties</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section class="wrapper abotblkOuter ">
          <div class="container">
            <div class="row d-flex align-items-center">
              <div class="col-md-4 abotblkCol">
                <div class="abtColImg">
                  <img src="images/img3.jpg" />
                </div>
              </div>
              <div class="col py-5">
                <div class="abtColContent">
                  <small class="py-4">About Us <span></span>Data</small>
                  <p>Nullam quis ante tiam sit amet orci eget eros faucibus tincidunt. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>
                </div>
              </div>
            </div>
            <div class="row py-5 d-flex align-items-center">
              <div class="col">
                <div class="abtColContent">
                  <small class="py-4">About Us <span></span>Data</small>
                  <p>Nullam quis ante tiam sit amet orci eget eros faucibus tincidunt. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut imperdiet venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>
                </div>
              </div>
              <div class="col-md-4">
                <div class="abtColImg">
                  <img src="images/img3.jpg" />
                </div>
              </div>

            </div>
          </div>
        </section>

        <section class="wrapper pb-4">
          <div class="container">
            <div class="prptyVideoBlk pt-5">
              <div class="mainHdng pb-3">
                <div class="mainHdngTitle">
                  <h3>Property Video</h3>
                </div>
              </div>
              <div class="prtyVidoDiv">
                <div class="row">
                  <div class="col-md-3">
                    <div class="videoDiv">
                      <a href="#">
                        <div class="videoImg">
                          <img src="images/video.jpg" />
                        </div>
                        <div class="videoHdng">
                          <h4>Breathtaking Iconic Residence</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="videoDiv active">
                      <a href="#">
                        <div class="videoImg">
                          <img src="images/video.jpg" />
                        </div>
                        <div class="videoHdng">
                          <h4>Breathtaking Iconic Residence</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="videoDiv ">
                      <a href="#">
                        <div class="videoImg">
                          <img src="images/video.jpg" />
                        </div>
                        <div class="videoHdng">
                          <h4>Breathtaking Iconic Residence</h4>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="videoDiv">
                      <a href="#">
                        <div class="videoImg">
                          <img src="images/video.jpg" />
                        </div>
                        <div class="videoHdng">
                          <h4>Breathtaking Iconic Residence</h4>
                        </div>
                      </a>
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
