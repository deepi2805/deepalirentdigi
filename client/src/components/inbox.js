import React from "react";
import { Link, withRouter } from "react-router-dom";
import $ from "jquery";
import Header from "./headerinner";
import InerNavBar from "./inernavbar";
import Footer from "./footer";
import config from "./config.js";
import jwt from "jsonwebtoken";
import DataTable from "react-data-table-component";
const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const columns = [
  {
    name: "Date",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Listing ID",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.year,
    sortable: true,
  },

  {
    name: "Phone",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Application",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Credit Report",
    selector: (row) => row.year,
    sortable: true,
  },
  {
    name: "Rating",
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 3,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
  },
  {
    id: 5,
    title: "Ghostbusters",
    year: "1984",
  },
];

export default class Inbox extends React.Component {
  state = {
    userData: [],
    pagestatus: false,
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
        {this.state.pagestatus ? <Header key1={this.state.userData} /> : <></>}
        {this.state.pagestatus ? (
          <InerNavBar key1={this.state.userData} />
        ) : (
          <></>
        )}
        {/* <Header />
        <InerNavBar /> */}

        <section class="wrapper py-5">
          <div class="container">
            <div class="row d-flex align-items-center justify-space-between pb-3">
              <div class="col-sm">
                <div class="mainHdngTitle pb-3">
                  <h2>Inbox</h2>
                </div>
              </div>
              <div class="col-sm-auto">
                <div class="sideFilterData d-flex">
                  <div class="checkInbox commonForm ">
                    <div class="form-group col-md-12">
                      <label class="control control--checkbox">
                        Show only active listings
                        <input type="checkbox" />
                        <div class="control__indicator"></div>
                      </label>
                      <label class="control control--checkbox">
                        Show old messages
                        <input type="checkbox" />
                        <div class="control__indicator"></div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <select class="form-select">
                      <option>All Listings</option>
                      <option>
                        475888 - this is a property heading (pending)
                      </option>
                      <option>475889 - property heading (pending)</option>
                      <option>476470 - property headline (pending)</option>
                      <option>476472 - SDSDG (pending)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="dataTableData">
              <DataTable columns={columns} data={data} selectableRows />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
}
