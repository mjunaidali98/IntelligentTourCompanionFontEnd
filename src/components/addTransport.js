/*global google*/
import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Autocomplete from 'react-autocomplete';
import { Tabs } from 'antd';
import { Hidden } from '@material-ui/core';
const { TabPane } = Tabs;
function callback(key) {
    console.log(key);
}

export default class addTransport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            models: [],
            nicno: '',
            address: '',
            email: '',
            phone: '',
            city: '',
            color: '',
            companyname: '',
            modelyear: '',
            perdaycost: '',
            vehicleregno: '',
            modelname: '',
            userid: this.props.username,
            file: '',
            approved: false,
        };
        this.companyselect = this.companyselect.bind(this);
        this.modelselect = this.modelselect.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeNic = this.onChangeNic.bind(this);
        this.onChangeModelYear = this.onChangeModelYear.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeRegno = this.onChangeRegno.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeOthermodel = this.onChangeOthermodel.bind(this);
        this.onChangePerDayPrice = this.onChangePerDayPrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onClickVehicle = this.onClickVehicle.bind(this);
        this.onEditVehicle = this.onEditVehicle.bind(this);
        this.onDeleteUserDetails = this.onDeleteUserDetails.bind(this);
        //this.fetchUserData = this.fetchUserData(this);
        this.onSubmitEditDetails = this.onSubmitEditDetails.bind(this);
    }

    async onSubmit(e) {
        e.preventDefault();
        await this.setState({
            city: document.getElementById('location').value.toString()
        })
        if (document.getElementById('submitbtn').innerHTML = 'Save') {

        }
        const userdetails = ({
            nicno: this.state.nicno,
            address: this.state.address,
            city: this.state.city,
            email: this.state.email,
            phone: this.state.phone,
            userid: this.state.userid,
            approved: this.state.approved,
        })
        axios
            .post('http://localhost:3000/users/transport', userdetails)
            .then((res) => {
                toast.success("Please wait while we verify you.");
                this.fetchUserData();
            })
            .catch((error) => {
                toast.error('Cannot Proceed your request. Try a later.');
            });

    }
    onClickVehicle(e) {
        e.preventDefault();
        if (document.getElementById('othermodelname').value != '') {
            this.setState({ modelname: document.getElementById('othermodelname').value });
        }
        else {
            this.setState({ modelname: document.getElementById('modelname').value });
        }

        const vehicleObject = ({
            vehicles: [{ companyname: this.state.companyname, color: this.state.color, price: this.state.perdaycost, modelyear: this.state.modelyear, vehiclereg: this.state.vehicleregno, modelname: this.state.modelname, image: this.state.file }]
        })
        if (this.state.approved) {
            axios
                .post('http://localhost:3000/users/addvehicle', vehicleObject)
                .then((res) => {
                    toast.success("Vehicle has been added sucessfully!");
                    this.fetchUserData();
                })
                .catch((error) => {
                    toast.error('Cannot Process your request. Pleaese try again later. ');
                });
        }
        else {
            if(this.state.approved)
                toast.error('Please wait while we verify your details.');
            else if(this.state.nicno == '') 
                toast.error('Please enter user details first.');
        }
    }
    onEditVehicle(e) {
        e.preventDefault();
        document.getElementById('nicnumber').disabled = false;
        document.getElementById('phone').disabled = false;
        document.getElementById('location').disabled = false;
        document.getElementById('uaddress').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('submitbtn').innerHTML = 'Save';
        document.getElementById('submitbtn').type = "button";
        document.getElementById('submitbtn').onclick = this.onSubmitEditDetails;
    }


    onSubmitEditDetails() {
        var confirm = window.confirm('Are you sure, you want to save the changes?');
        if (confirm) {
            const userdetails = ({
                nicno: document.getElementById('nicnumber').value,
                address: document.getElementById('uaddress').value,
                city: document.getElementById('location').value.toLowerCase(),
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                userid: this.state.userid,
            })

            if (document.getElementById('submitbtn').innerHTML == 'Save') {
                axios
                    .post('http://localhost:3000/users/edittransportdetails', userdetails)
                    .then((res) => {
                        toast.success("Changes have been saved sucessfully.");
                        this.fetchUserData();
                    })
                    .catch((error) => {
                        toast.error('Cannot Proceed your request. Try a later.');
                    });
            }
        }
    }
    onDeleteUserDetails() {
        var confirm = window.confirm(this.state.userid);
        this.fetchUserData();
        if (confirm) {
            axios.delete(`http://localhost:3000/users/deleteuserdetails/` + this.state.userid).then((res) => {
                toast.success("Your details are deleted sucessfully.");
                document.getElementById('nicnumber').disabled = false;
                document.getElementById('phone').disabled = false;
                document.getElementById('location').disabled = false;
                document.getElementById('uaddress').disabled = false;
                document.getElementById('email').disabled = false;
                window.location.reload();
            })
                .catch((error) => {
                    toast.error('Cannot Proceed your request. Try a later.');
                });
        }
    }


    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        })
    }
    onChangeFile(e) {
        let file = e.target.files[0];
        console.log(file);
        this.toBase64(file)
            .then(base => this.setState({ file: base }))
            .catch(err => console.error(err));
    }
    onChangeOthermodel(e) {
        this.setState({ modelname: e.target.value });
    }
    toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        })
    }
    onChangeColor(e) {
        this.setState({ color: e.target.value });
    }
    onChangeRegno(e) {
        this.setState({ vehicleregno: e.target.value });
    }

    onChangeModelYear(e) {
        this.setState({ modelyear: e.target.value });
    }
    onChangeNic(e) {
        this.setState({
            nicno: e.target.value
        })
    }
    onChangePerDayPrice(e) {
        this.setState({
            perdaycost: e.target.value,
        })
    }

    fetchUserData() {
        axios.get(`http://localhost:3000/users/transportdetails`)
            .then(res => {
                console.log('fetch data is ' + res.data);
                if (res.data != '') {
                    console.log('chal raha hn ');
                    document.getElementById('nicnumber').value = res.data[0].nicno;
                    document.getElementById('phone').value = res.data[0].phone;
                    document.getElementById('location').value = res.data[0].city;
                    document.getElementById('uaddress').value = res.data[0].address;
                    document.getElementById('email').value = res.data[0].email;
                    document.getElementById('nicnumber').disabled = true;
                    document.getElementById('phone').disabled = true;
                    document.getElementById('location').disabled = true;
                    document.getElementById('uaddress').disabled = true;
                    document.getElementById('email').disabled = true;
                    document.getElementById('submitbtn').innerHTML = 'Edit';
                    document.getElementById('detailsForm').onsubmit = "return false";
                    document.getElementById('cancelbtn').innerHTML = "Delete";
                    document.getElementById('submitbtn').onclick = this.onEditVehicle;
                    document.getElementById('cancelbtn').onclick = this.onDeleteUserDetails;
                    this.setState({
                        approved: res.data[0].approved,
                        vehicleallow: true,
                    })
                    if (!this.state.approved) {
                        document.getElementById('submitbtn').style.visibility = "hidden";
                        document.getElementById('cancelbtn').style.visibility = "hidden";
                        document.getElementById('approvemsg').innerHTML = ' *Approval Pending*';
                    }
                }
                else {
                    document.getElementById('nicnumber').value = this.state.nicno;
                    document.getElementById('phone').value = this.state.phone;
                    document.getElementById('email').value = this.state.email;
                    document.getElementById('uaddress').value = this.state.address;
                    document.getElementById('location').value = this.state.city;

                }
            });

    }
    componentDidMount() {
        var options = {
            componentRestrictions: { country: 'pk' },
        };
        var location = document.getElementById('location');
        var autoComplete = new google.maps.places.Autocomplete(location, options);

        this.fetchUserData();

        fetch("https://gist.githubusercontent.com/zeeshansheray/e66c048a645862e30ff5b167f1406505/raw/e755ac6446396b80889d1d180ce5be5628db78aa/carcompanies.json")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let teamsFromApi = data.map(company => {
                    return { value: company.name, display: company.name }
                });
                this.setState({
                    companies: [{ value: '', display: 'Select your car company' }].concat(teamsFromApi)
                });
            }
            ).catch(error => {
                console.log(error);
            });

        fetch("https://gist.githubusercontent.com/zeeshansheray/91df3636250a921bd367b10da5059e99/raw/8dbc5c11a24666491e0215bc7886a52f97b13137/carmodels.json")
            .then((response) => {
                return response.json();
            })
            .then(data => {
                let modelsFromApi = data.map(model => {
                    return { value: model.model, display: model.model }
                });
                this.setState({
                    models: [{ value: '', display: 'Select your car model' }].concat(modelsFromApi),

                });
                console.log(data);

            }
            ).catch(error => {
                console.log(error);

            });
    }
    async companyselect() {
        await this.setState({ companyname: document.getElementById('brandname').value });
        document.getElementById('modelname').disabled = false;
    }

    async modelselect(e) {
        await this.setState({ modelname: document.getElementById('modelname').value });
        if (this.state.modelname != null) {
            document.getElementById('othermodelname').value = '';
            document.getElementById('othermodelname').disabled = true;
        }
        if (this.state.modelname == '') {
            document.getElementById('othermodelname').disabled = false;
        }
        console.log('zee1  ' + this.state.modelname);
        console.log("Images are :" + this.state.image);
    }
    render() {
        return (
            <div className="canvastransport" id="transportId">
                <h3 style={{ fontFamily: 'Titillium Web' }}>Add Transport</h3>
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
                <div className="TabHeading">
                    <Tabs defaultActiveKey="1" onChange={callback}>
                        <TabPane tab="Details" key="1">
                            <div className="login-form" id="signupForm" style={{ marginLeft: '180px', marginTop: '-100px', marginBottom: '-120px' }}>
                                <form onSubmit={this.onSubmit} id="detailsForm" style={{ height: '320px' }}>
                                    <div id="box">
                                        <label id="labels">NIC number:</label>
                                        <input
                                            type="text"
                                            name="nicnumber"
                                            id="nicnumber"
                                            placeholder="14 digit NIC"
                                            className="form-control"
                                            maxlength="14"
                                            onChange={this.onChangeNic}
                                            minLength="14"
                                            style={{ fontSize: '15px' }}
                                            required="required"
                                        />

                                    </div>

                                    <div id="box" style={{ marginLeft: '20px' }} >
                                        <label for="email" id="labels">
                                            Email:
                                            </label>
                                        <input
                                            type="email"
                                            id="email"
                                            // autocomplete="off"
                                            className="form-control"
                                            name="email"
                                            placeholder="Email"
                                            //required="required"
                                            onChange={this.onChangeEmail}
                                        />
                                    </div>
                                    <br />
                                    <div id="box">
                                        <label id="labels">Address:</label>
                                        <input
                                            type="text"
                                            minlength="8"
                                            className="form-control"
                                            name="address"
                                            placeholder="Address"
                                            //required="required"
                                            id="uaddress"
                                            onChange={this.onChangeAddress}
                                        />
                                    </div>



                                    <div id="box" style={{ marginLeft: '20px' }}>
                                        <label id="labels">Phone Number:</label>
                                        <input
                                            type="tel"
                                            placeholder="Format: 03xx-xxxxxxx"
                                            id="signup_Input"
                                            autocomplete="on"
                                            //required="required"
                                            className="form-control"
                                            maxLength='11'
                                            onChange={this.onChangePhone}
                                            id="phone"
                                        />
                                    </div>

                                    <div id="box" >
                                        <label id="labels"  >City:</label>
                                        <input
                                            type="text"
                                            name="location"
                                            id="location"
                                            placeholder="Enter city"
                                            autoComplete="true"
                                            autoCorrect="true"
                                            //required="required"
                                            // onChange={this.onChangeCity}
                                            className="form-control"

                                        />
                                    </div>

                                    <div className="subcan" id="subcanbtn">

                                        <button id="submitbtn"  >
                                            Save
             </button>
                                        <button
                                            type="reset"
                                            id="cancelbtn"
                                        >
                                            Cancel
             </button>

                                    </div> <p id='approvemsg' style={{ color: 'red', marginTop: '-10px', position: 'absolute', top: '77%', left: '52%', fontSize: '20px' }}></p>

                                </form>
                            </div>
                        </TabPane>
                        <TabPane id="addvehicles" tab="Add vehicles" key="2" onChange={callback}>
                            <div className="login-form" id="signupForm" style={{ marginLeft: '180px', marginTop: '-100px', marginBottom: '-120px' }}>
                                <form onSubmit={this.onClickVehicle} style={{ height: '390px', width: '100%' }}>

                                    <div id="box">
                                        <label id="labels" style={{ textAlign: 'left', color: 'black' }}>Registration number of vehicle:</label>
                                        <input
                                            type="text"
                                            maxlength="8"
                                            // autocomplete="off"
                                            name="regnumber"
                                            minlength="4"
                                            value={this.state.vehicleregno}
                                            id="regnumber"
                                            onChange={this.onChangeRegno}
                                            placeholder="Registration Number"
                                            required="required"
                                            className="form-control"
                                            style={{ width: '235px' }}
                                        />
                                    </div>


                                    <div id="box" style={{ marginLeft: '20px' }}>
                                        <label id="labels" style={{ color: 'black' }}>Brand Name:</label>
                                        <select
                                            type="text"
                                            name="brandname"
                                            id="brandname"
                                            value={this.state.companyname}
                                            placeholder="Select car company"
                                            className="form-control"
                                            //required="required"
                                            onChange={this.companyselect}
                                            style={{ textTransform: 'capitalize', fontSize: '15px', width: '235px' }}
                                        >  {this.state.companies.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                        </select>
                                    </div>
                                    <br />
                                    <div id="box">
                                        <label id="labels" style={{ color: 'black' }} className="Model" >
                                            Model:
                                         </label>
                                        <select
                                            type="text"
                                            className="form-control"
                                            value={this.state.modelname}
                                            name="model"
                                            placeholder="Model name"
                                            id="modelname"
                                            disabled={true}
                                            onChange={this.modelselect}
                                            style={{ width: '235px', fontSize: '15px' }}
                                        >
                                            {this.state.models.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                                        </select>
                                    </div>
                                    <div id="box" style={{ marginLeft: '20px' }}>
                                        <label id="labels" style={{ color: 'black' }}>Other model:</label>
                                        <input
                                            type="text"
                                            name="othermodelname"
                                            onChange={this.onChangeOthermodel}
                                            value={this.state.othermodel}
                                            maxLength='12'
                                            id="othermodelname"
                                            placeholder="Enter model name"
                                            className="form-control"
                                            style={{ width: '235px', fontSize: '15px' }}

                                        />

                                    </div>

                                    <div id="box" >
                                        <label id="labels" style={{ color: 'black' }}>Color:</label>
                                        <input
                                            type="text"
                                            minlength="3"
                                            maxLength="12"
                                            className="form-control"
                                            name="color"
                                            value={this.state.color}
                                            placeholder="Color"
                                            required="required"
                                            id="color"
                                            onChange={this.onChangeColor}
                                            style={{ width: '150px' }}
                                        />
                                    </div>
                                    <div id="box" style={{ marginLeft: '20px' }}>
                                        <label id="labels" style={{ color: 'black' }}>Model year:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            maxlength="4"
                                            minlength="4"
                                            value={this.state.modelyear}
                                            id="modelyear"
                                            name="modelyear"
                                            placeholder="Model year"
                                            required="required"
                                            onChange={this.onChangeModelYear}
                                            style={{ width: '150px', fontSize: '15px' }}
                                        />
                                    </div>
                                    <div id="box" style={{ marginLeft: '20px' }}>
                                        <label id="labels" style={{ color: 'black' }}>Rent&nbsp;<i style={{ fontSize: '12px' }}>
                                            (Per Day)
                      </i>:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            maxlength="7"
                                            minlength="2"
                                            value={this.state.perdaycost}
                                            id="perdaycost"
                                            name="perdaycost"
                                            placeholder="Price in PKR"
                                            required="required"
                                            onChange={this.onChangePerDayPrice}
                                            style={{ width: '150px', fontSize: '15px' }}
                                        />
                                    </div>
                                    <div id="box">
                                        <label id="labels" style={{ textAlign: 'left', color: 'black' }}>Picture upload:</label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            required="required"
                                            accept='.jpg , jpeg, .png'
                                            className="form-control"
                                            accept="image/*"
                                            onChange={this.onChangeFile}
                                            style={{ fontSize: '12px', width: '260px' }}
                                        />
                                        {console.log(this.state.file)}
                                    </div>
                                    <div className="subcan" >
                                        <button type="submit" id="submitbtn" >
                                            Add
                                        </button>
                                        <button
                                            type="reset"
                                            id="cancelbtn"
                                        >
                                            Cancel
                                            </button>
                                    </div>



                                </form>

                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
