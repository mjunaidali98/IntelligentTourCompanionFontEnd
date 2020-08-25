import React from 'react';
import ModalMap from './ModalMap';
import pagenotfound from '../images/image-not-found.jpg';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
function RenderHotels({ hotels, clickHandler, hideModal, activeModal }) {
  if (hotels !== null) {
    return (
      <div className="containerhotel" style={{ marginLeft: '100px' }}>
        <div className="columnshotel">
          {hotels.map((hotel) => {
            return (
              <div id="entry" key={hotel.location_id}>
                <img
                  src={
                    hotel.photo === undefined
                      ? pagenotfound
                      : hotel.photo.images.large.url
                  }
                  alt={hotel.name}
                  className="img-fluid img-thumbnail"
                  style={{ width: '350px', height: '200px' }}
                />
                <div id="name_btn">
                  <Button
                    className="viewButton"
                    color="primary"
                    onClick={() => clickHandler(hotel.location_id)}
                  >
                    <span id="hname">{hotel.name}</span>
                  </Button>
                </div>
                <Modal
                  isOpen={activeModal === hotel.location_id}
                  toggle={hideModal}
                >
                  <ModalHeader>
                    <b style={{ color: 'black', fontSize: '23px' }}>Details:</b>
                  </ModalHeader>
                  <ModalBody>
                    <b style={{ color: '#001529' }}>Hotel Name:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue', textTransform: 'capitalize' }}>
                      {hotel.name}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Price range:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue' }}>
                      {hotel.price === undefined || ''
                        ? 'Prices not available'
                        : hotel.price}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Rating:&nbsp;&nbsp;</b>
                    <b style={{ color: 'blue' }}>
                      {hotel.rating === undefined || ''
                        ? 'Ratings not available'
                        : hotel.rating}
                    </b>
                    <br />
                    <b style={{ color: '#001529' }}>Location:</b>
                    <br />
                    <div id="map">
                      <ModalMap
                        Lat={parseFloat(hotel.latitude)}
                        Lng={parseFloat(hotel.longitude)}
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={hideModal}>
                      Close
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h3 style={{ textAlign: 'center', color: '#00000080' }}>
          "Sorry Cannot Find Any Hotels"
        </h3>
      </div>
    );
  }
}

const hotels = (props) => {
  if (props.Hotels !== null) {
    return (
      <div>
        <RenderHotels
          hotels={props.Hotels}
          activeModal={props.activeModal}
          hideModal={props.hideModal}
          clickHandler={props.clickHandler}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default hotels;
