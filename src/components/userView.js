import React from 'react';
import { Layout, Menu } from 'antd';
import ReactDOM from 'react-dom';
import Hotel from "../components/findHotel";
import Guide from "../components/tourguides";
import Map from '../pages/findDistance';
import Deleteaccount from '../components/deleteaccount';
import Poi from '../components/findPOIs';
import Changepass from '../components/changepass';
import SearchTransport from '../components/searchTransport';
import AddTransport from '../components/addTransport';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UserVehicles from '../components/uservehicles';
import { BrowserRouter as Router, Route } from "react-router-dom";
import BecomeGuide from '../components/becomeGuide';
import Plantrip from './Plantrip';

import {
  SearchOutlined,
  SettingFilled,
  OrderedListOutlined,
  LoginOutlined,
  ShopOutlined,
  CalendarOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  KeyOutlined,
  PlusCircleOutlined,
  CarOutlined,
  CarryOutOutlined,
  SnippetsOutlined,

} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;

function guideCheck() {
  ReactDOM.render(<Guide />, document.getElementById('content'));

}
function planTrip() {
  ReactDOM.render(<Plantrip/>, document.getElementById('content'));
}
function searchTransport() {
  ReactDOM.render(<SearchTransport />, document.getElementById('content'));
}
function routeCheck() {
  ReactDOM.render(<Map />, document.getElementById('content'));
}
function poiCheck() {
  ReactDOM.render(<Poi />, document.getElementById('content'));
}
function changePass() {
  ReactDOM.render(<Changepass />, document.getElementById('content'));
}
function deleteAccount() {
  ReactDOM.render(<Deleteaccount />, document.getElementById('content'));
}

function hotelCheck() {
  ReactDOM.render(<Hotel />, document.getElementById('content'));
}
function viewVehicles() {
  ReactDOM.render(<UserVehicles />, document.getElementById('content'));
}



class UserView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      collapsed: false,
      name: '',
      username: props.user.username,
      firstname: props.user.firstname,
      lastname: props.user.lastname,
      email: props.user.email,
      phone: props.user.phone,
      userid: props.user._id
    };

  }
 addTransport = () => {
    ReactDOM.render(<AddTransport username={this.state.userid} />, document.getElementById('content'));
  }
  addGuide = () => {
    ReactDOM.render(
      <BecomeGuide
        fullname={this.state.firstname+" "+this.state.lastname}
        email={this.state.email}
        phone={this.state.phone}
        username={this.state.username}
      />,
      document.getElementById('content')
    );
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    this.state.name = this.props.user.username;
    if (collapsed) {
      ReactDOM.render(<AccountCircleIcon />, document.getElementById('name'));
      document.getElementById('welcome').style.fontSize = '14px';

    }
    else {
      document.getElementById('welcome').style.visibility = 'visible';
      ReactDOM.render(this.state.name, document.getElementById('name'));
      document.getElementById('welcome').style.fontSize = '30px';

    }
  };
  async onSubmit(e) {
    localStorage.removeItem('token');
    window.location.reload();
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh', height: '100%' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <h3 id="welcome"
            style={{ textAlign: 'center', marginTop: '20px', color: 'white', textTransform: 'capitalize' }}
          >
            Welcome
          </h3>
          <h3 id="name"
            style={{ textAlign: 'center', marginTop: '20px', color: 'white', fontSize: '16px', textTransform: 'capitalize' }}
          >
            {this.state.username.toUpperCase()}
          </h3>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1"  onClick={planTrip} icon={<CarryOutOutlined/>}>
              Plan Trip
            </Menu.Item>
            <Menu.Item key="4" onClick={hotelCheck} icon={<ShopOutlined />}>
              Check Hotels
            </Menu.Item>
            <Menu.Item key="5" onClick={guideCheck} icon={<CompassOutlined />}>
              Find Guide
            </Menu.Item>
            <Menu.Item key="19" onClick={searchTransport} icon={<CarOutlined />}>
              Search Transport
            </Menu.Item>
            <Menu.Item key="6" onClick={routeCheck} icon={<EnvironmentOutlined />}>
              Search Route
            </Menu.Item>
            <Menu.Item key="12" onClick={poiCheck} icon={<OrderedListOutlined />}>
              POI's
            </Menu.Item>
            <SubMenu key="15" icon={<PlusCircleOutlined />} title="Provide Services">
              <Menu.Item key="16" onClick={this.addTransport} icon={<CarOutlined />}>Transport</Menu.Item>
              <Menu.Item key="17" onClick={this.addGuide} icon={<SearchOutlined />}>
                Become Guide
	              </Menu.Item>
            </SubMenu>
            <SubMenu SubMenu key="22" icon={<SnippetsOutlined />} title="View">
              <Menu.Item key="10" icon={<CalendarOutlined />} >My Tours</Menu.Item>
              <Menu.Item key="21" icon={<CarOutlined />} onClick={viewVehicles}>My Vehicles</Menu.Item>
            </SubMenu>
            <SubMenu key="7" icon={<SettingFilled />} title="Manage Account">
              <Menu.Item key="13" onClick={changePass} icon={<KeyOutlined />}>Password</Menu.Item>
              <Menu.Item key="14" onClick={deleteAccount} icon={<DeleteOutlined />}>Delete Account</Menu.Item>
            </SubMenu>
            <Menu.Item onClick={this.onSubmit} key="8" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{backgroundColor:'white'}} >
          <div id="content" style={{ backgroundColor: 'white' }}>
          </div>
        </Layout>
      </Layout>
    );
  }
}
export default UserView;
