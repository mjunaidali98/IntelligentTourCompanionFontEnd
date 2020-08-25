import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {browserHistory } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../componentcss/about.css';
import Hotel from "../components/findHotel";
import Guide from "../components/tourguides";
import Login from '../pages/login';
import UserDashboard from '../pages/userDashboard';
import Map from '../pages/findDistance';
import axios from 'axios';
import Poi from '../components/findPOIs';
import {
    EditOutlined,
    CloudOutlined,
    ShopOutlined,
    CompassOutlined,
    EnvironmentOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

var check = false;

export default class about extends Component {
    constructor() {
        super();
        this.state = { user: {}, admin: {}, adminAuth: false, authenticate: false };
    }
    componentDidMount = () => {
        axios
            .get('http://localhost:3000/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((res) => {
                console.log(res);
                if (res.data.admin === false) {
                    this.setState({
                        user: res.data,
                        authenticate: true,
                        adminAuth: res.data.admin,
                    });
                    check = true;
                    console.log("mai chal raha" + this.state.authenticate)
                } else {
                    this.setState({
                        admin: res.data,
                        authenticate: true,
                        adminAuth: res.data.admin,
                    });
                    check = true;
                    console.log(" nhi mai chal raha")
                }
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("zee is " + this.state.authenticate);
    };

    setUser = (user) => this.setState({ user: user });
    setAdmin = (admin) => this.setState({ admin: admin });


    goTofunction() {


    }


    render() {
        return (
            <div className="services">
                <h1>Our Services</h1>

                <div className="cen">
                    <div className="service" onClick={this.goTofunction}>
                        <SettingOutlined id="icons" className="icon_automated" style={{ fontSize: '40px', marginTop: '-20px', color: 'white' }} />
                        <h2>Automated Tour</h2>
                        <p>Let our system to design an exciting tour for you.</p>
                    </div>
                    <div className="service">
                        <EditOutlined id="icons" className="icon_manual" style={{ fontSize: '40px', marginTop: '-20px', color: 'white' }} />
                        <h2>Manual Tour</h2>
                        <p>Design your tour, with your own considerations.</p>
                    </div>

                    <div className="service">
                        <EnvironmentOutlined id="icons" className="icon_route" style={{ fontSize: '40px', marginTop: '-20px', color: 'white' }} />
                        <h2>Route Search</h2>
                        <p>You can check the best route for a every place.</p>

                    </div>

                    <div className="service">
                        <CloudOutlined id="icons" className="icon_weather" style={{ fontSize: '40px', marginTop: '-20px', color: 'white' }} />
                        <h2>Weather Check</h2>
                        <p>Find out the weather after planning your tours.</p>
                    </div>

                    <div className="service">
                    <ShopOutlined id="icons" className="icon_hotel1" style={{ fontSize: '40px', marginTop: '-20px', color: 'white', visibility:'hidden' }} />
                    <ShopOutlined id="icons" className="icon_hotel" style={{ fontSize: '40px', marginTop: '-20px', color: 'white'}} />
                        <ShopOutlined id="icons" className="icon_hotel1" style={{ fontSize: '40px', marginTop: '-20px', color: 'white', visibility:'hidden'  }} />
                        <h2>Hotel Search</h2>
                        <p>Checkout the best hotels/stayinn for your tour.</p>
                    </div>

                    <div className="service">
                        <CompassOutlined id="icons" className="icon_guide" style={{ fontSize: '40px', marginTop: '-20px', color: 'white' }} />
                        <h2>Guide Search</h2>
                        <p>Make your trip more directive and hire a guide.</p>
                    </div>
                </div>
            </div>
        )
    }
}
