import React, { useContext, Component } from 'react';
import axios from 'axios';

export default class Tourgenerator extends Component {
    // const inputdetails = useContext(Hotels);
    // const Names = useContext(Name)
    // console.log('inputdetails are: ' + inputdetails + 'route details ' );
    // console.log('PROPs are called');
    // const selectedHotels = useContext(SelectedHotels);
    // console.log('props are ' + JSON.stringify(props));
    // var Inputdetails=props.Inputdetails;
    // console.log(JSON.stringify(Inputdetails));
    // console.log('str '+(props.Inputdetails.travelDistance));
    // console.log('selected hotels are: ' + localStorage.getItem('selectedhotel'));

    // var pois=JSON.parse(localStorage.getItem('selectedpoi'));
    // console.log('selected pois are: ' + JSON.stringify(pois));
    // let result=pois.map(obj =>obj.name);
    // console.log('selectedpoi names are: '+result);
    // return(
    //     <>
    //     <h2>Start date : {props.Inputdetails.startdate}</h2>
    // <h1>Details are : {props.Inputdetails.stayCity}</h1>
    // </>
    constructor(props) {
        super(props);
        this.state = {
            locationTimeInterval: [],
        }
    }
    async componentDidMount() {
        const inputDetails = this.props.Inputdetails;
        console.log('Input det' + JSON.stringify(inputDetails));
        const selectedHotel = localStorage.getItem('selectedhotel');
        const selectedPois = JSON.parse(localStorage.getItem('selectedpoi'));
        console.log('selected hotel ' + selectedHotel);
        console.log('selected POIS ' + selectedPois);
        let selectedPoiPosition = selectedPois.map(postion => postion.latLng);
        console.log('selected poiss ' + JSON.stringify(selectedPoiPosition));
        var locationTimeIntervals = [this.directionRenderer(inputDetails.source,inputDetails.stayCity),this.directionRenderer(inputDetails.stayCity,inputDetails.destination)]
        console.log('LocationTImeinterval ' + locationTimeIntervals); 
    }   
    directionRenderer = async (start, end) => {
        await axios
            .get(
                `https://www.mapquestapi.com/directions/v2/route?key=VvkNzPWbou9Hy991bTTmJNfcbLGzv9Rs&from=${start}&to=${end}&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=false`,
                { redirect: true }
            )
            .then((res) => {
                console.log("response: " + JSON.stringify(res));
                if (res.status === 200) {
                    var travelTime = res.data.route.formattedTime;
                    console.log('Formatted time ' + travelTime);
                    this.setState({
                        locationTimeInterval: [...this.state.locationTimeInterval,travelTime],
                    })
                    console.log('time is ' + this.state.locationTimeInterval);
                }
                else {
                    console.log('Cannot find the time interval.')
                }
            })
    }


    render() {

        return (
            <div></div>
        )

    }
}