/*global google*/
import React, { Component } from 'react';
import axios from 'axios';
import Hotels from './hotels';
import '../componentcss/hotel.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import ReactSpinner from 'react-bootstrap-spinner';
import Loader from 'react-loader-spinner';

export class findhotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      address: '',
      Lat: null,
      Lng: null,
      error: null,
      Hotels: null,
      loading: false,
    };
    this.clickme = this.clickme.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  clickHandler(id) {
    this.setState({ activeModal: id });
  }

  hideModal() {
    this.setState({ activeModal: null });
  }
  componentDidMount() {
    var inputori = document.getElementById('address');
    var options = {
      // types: ['(cities)'],
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
  }

  clickme = async (e) => {
    e.preventDefault();
    var geocoder = new google.maps.Geocoder();
    const address = document.getElementById('address').value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK') {
        console.log(results);
        try {
          this.setState({
            Lng: results[0].geometry.bounds.Va.j,
            Lat: results[0].geometry.bounds.Za.i,
          });
          this.setState({
            loading: true,
          });
          console.log(
            this.state.Lat.toPrecision(6),
            this.state.Lng.toPrecision(6)
          );
          axios
            .get(
              // `https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=PKR&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${this.state.Lat}%252C${this.state.Lng}&adults=1&checkin=3020-10-1&rooms=1&nights=2&maxResults=24`,
              `https://tripadvisor1.p.rapidapi.com/hotels/list?offset=0&currency=PKR&limit=30&order=asc&lang=en_US&sort=recommended&location_id=${this.state.Lat}%252C%20${this.state.Lng}&adults=0&checkin=-&rooms=0&nights=0`,

              {
                method: 'GET',
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                  'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                  'x-rapidapi-key':
                    '4b9bc97b37msh97a76aea744c532p1e8e09jsndbeae1f178a3',

                  // "x-rapidapi-key": "519ede5194msh14ab92df892f8a5p17cb66jsn7bee35f6cb2f"
                },
              }
            )
            .then((res) => {
              console.log(res);
              this.setState({
                Hotels: res.data.data,
                loading: true,
              });
              setTimeout(() => {
                this.setState({ loading: false });
              }, 100);
              // document.getElementById('canvashotel').style.height = '100%';
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (err) {
          toast.error("Sorry couldn't find this place, try another one.");
        }
      } else {
        toast.error("Sorry couldn't find this place, try another one.");
      }
    });
  };

  render() {
    const { loading } = this.state;
    return (
      <div className="canvashotel" id="hotelid">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h3 style={{ fontFamily: 'Titillium Web' }}>Search Hotels</h3>
        <div>
          <form className="outlineboxhotel" onSubmit={this.clickme}>
            <input
              id="address"
              type="text"
              className="location-search-input"
              name="address"
              placeholder="Enter a location?"
              required="required"
              autoComplete="true"
              autoCorrect="true"
              style={{ color: 'black', border: 'solid 1px #001529' }}
            />
            <button className="searchHotel" type="submit" disabled={loading}>
              {loading && <i className="fa fa-refresh fa-spin"></i>}
              &nbsp;&nbsp;Search
            </button>
          </form>

          <div id="hotelslistget">
            <Hotels
              Hotels={this.state.Hotels}
              activeModal={this.state.activeModal}
              hideModal={this.hideModal}
              clickHandler={this.clickHandler}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default findhotel;
