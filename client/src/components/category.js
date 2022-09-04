import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from './headerinner'
import Footer from './footer'
const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default class Category extends React.Component { 

   
render() { 
  
    return (  
    <div class="body">
    <Header/>

    <section class="wrapper py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
            </div>
               <div class="row justify-content-center my-4">
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
            </div>
               <div class="row justify-content-center my-4">
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
                <div class="col">
                    <div class="categoryCol">
                        <a href="#">
                            <div class="catgryBox text-center">
                                <div class="feature">
                                    <div class="feature-icon ">
                                        <img src="images/house-icon.png" alt="House Icon"/>
                                    </div>
                                    <h2>House</h2>
                                </div>
                            </div>
                        </a>
                    </div>                 
                </div>
            </div>

        </div>
    </section>


    
    
    <Footer/>
    </div>
 );
  }
}

