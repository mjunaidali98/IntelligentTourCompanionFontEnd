/*global google*/
import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import PlaceIcon from '@material-ui/icons/Place';
import '../componentcss/hotel.css';
import '../componentcss/findguides.css';

import PlacesAutocomplete from 'react-places-autocomplete';

const { Option } = Select;

export class findguides extends Component {
  componentDidMount() {
    var inputori = document.getElementById('address');
    var options = {
      types: ['(cities)'],
      componentRestrictions: { country: 'pk' },
    };
    var autocomplete = new google.maps.places.Autocomplete(inputori, options);
  }

  render() {
    return (
      <div>
        <div className="canvasguide">
              <ToastContainer
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
        <h3 style={{ fontFamily: 'Titillium Web' }}>Find Guides</h3>
        <div>
          <form className="outlineboxhotel" onSubmit={this.clickme}>
            <input
              id="address"
              type="text"
              className="location-search-input"
              name="address"
              placeholder="Search Guides?"
              required="required"
              autoComplete="true"
              autoCorrect="true"
              style={{color: 'black', border:'solid 1px #001529'}}
            />
            <button className="searchHotel" id="searchpoi" type="submit" >
              &nbsp;&nbsp;Search
            </button>
          </form>
        </div>
      </div>
</div>
    );
  }
}

export default findguides;
