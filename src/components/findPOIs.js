/*global google*/
import React, { Component } from 'react';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import PointOfInterests from './pointOfInterests';
import 'react-toastify/dist/ReactToastify.css';
import '../componentcss/poi.css';
import { ToastContainer, toast } from 'react-toastify';
export class findPOIs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeModal: null,
      address: '',
      Lat: null,
      Lng: null,
      error: null,
      POIs: null,
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
      types: ['(cities)'],
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
        console.log(
          this.state.Lat.toPrecision(7),
          this.state.Lng.toPrecision(7)
        );
        this.setState({
          loading: true
        });
        axios
          .get(
            `https://tripadvisor1.p.rapidapi.com/attractions/list?lang=en_US&currency=PKR&sort=recommended&lunit=km&limit=30&location_id=${this.state.Lat}%252C${this.state.Lng}`,
            {
              redirect: true,
              method: 'GET',
              headers: {
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Origin-Allow': '*',
                'x-rapidapi-host': 'tripadvisor1.p.rapidapi.com',
                'x-rapidapi-key':
                  '4b9bc97b37msh97a76aea744c532p1e8e09jsndbeae1f178a3',
              },
            }
          )
          .then((response) => {
            this.setState({
              POIs: response.data.data,
              loading: true
            });
            setTimeout(() => {
              this.setState({ loading: false });
            }, 100);
            document.getElementById('canvasss').style.height='100%';
          })
          .catch((err) => {
            console.log(err);
          });}
          catch (err) {
            toast.error("Sorry, Couldn't find this place. Try another!");
          }
      } else {
        toast.error("Sorry couldn't find this place, try another one.")
      }
    });
  };
  render() {
    const { loading } = this.state;
    return (
      <div>
        <div className="canvasss">
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
          <h3 style={{ fontFamily: 'Titillium Web' }}>Find POI's</h3>
          <div>
            <form className="outlineboxhotel" onSubmit={this.clickme}>
              <input
                id="address"
                type="text"
                className="location-search-input"
                name="address"
                placeholder="Search POIs?"
                required="required"
                autoComplete="true"
                autoCorrect="true"
                style={{color: 'black', border:'solid 1px #001529'}}
              />
              <button className="searchHotel" id="searchpoi" type="submit" disabled={loading} >
              {loading && <i className="fa fa-refresh fa-spin"></i>}
              &nbsp;&nbsp;Search
              </button>
            </form>
          </div>
          <div >
          <PointOfInterests
            POIs={this.state.POIs}
            activeModal={this.state.activeModal}
            hideModal={this.hideModal}
            clickHandler={this.clickHandler}
          />
        </div></div>
      </div>
    );
  }
}

export default findPOIs;
