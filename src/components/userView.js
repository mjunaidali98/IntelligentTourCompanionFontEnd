import React from 'react';
import { Layout, Menu } from 'antd';
import ReactDOM from 'react-dom';
import Hotel from "../components/findHotel";
import Guide from "../components/tourguides";
import Map from '../pages/findDistance';
import Deleteaccount from '../components/deleteaccount';
import Poi from '../components/findPOIs';
import Changepass from '../components/changepass';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  HomeOutlined,
  CheckCircleOutlined,
  SettingFilled,
  OrderedListOutlined,
  LoginOutlined,
  ShopOutlined,
  CalendarOutlined,
  CameraOutlined,
  CompassOutlined,
  EnvironmentOutlined,
  DeleteOutlined,
  KeyOutlined, 
  UserOutlined
} from '@ant-design/icons';
const { Sider } = Layout;
const { SubMenu } = Menu;

function guideCheck() {
  ReactDOM.render(<Guide />, document.getElementById('content'));
}
function topplacesCheck() {
  // ReactDOM.render(<Topplaces />, document.getElementById('content'));
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

class UserView extends React.Component {
  hotelCheck() {
    ReactDOM.render(<Hotel />, document.getElementById('content'));
  }

  state = {
    collapsed: false,
    name: '',
  };


  onCollapse = (collapsed) => {
    console.log("Zee"+ collapsed);
    this.setState({ collapsed });
    this.state.name=this.props.user.username;
    if(collapsed) {
      ReactDOM.render(<AccountCircleIcon/>, document.getElementById('name'));
      document.getElementById('welcome').style.fontSize='14px';
      
    }
    else{
      document.getElementById('welcome').style.visibility='visible';
      ReactDOM.render( this.state.name , document.getElementById('name'));
      document.getElementById('welcome').style.fontSize='14px';
      
    }
  };  
  async onSubmit(e) {
    localStorage.removeItem('token');
    window.location.reload();
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
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
            style={{ textAlign: 'center', marginTop: '20px', color: 'white', fontSize:'16px' }}
          >
          {this.props.user.username.charAt(0).toUpperCase()}{this.props.user.username.slice(1)}
          </h3>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> 
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="4" onClick={this.hotelCheck} icon={<ShopOutlined />}>
              Check Hotels
            </Menu.Item>
            <Menu.Item key="5" onClick={guideCheck} icon={<CompassOutlined />}>
              Find Guide
            </Menu.Item>
            <Menu.Item key="6" onClick={routeCheck} icon={<EnvironmentOutlined />}>
              Search Route
            </Menu.Item>
            <Menu.Item key="12" onClick={poiCheck} icon={<OrderedListOutlined />}>
              POI's
            </Menu.Item>
            <Menu.Item key="10" icon={<CalendarOutlined />}>My Tours</Menu.Item>
            <SubMenu key="7" icon={<SettingFilled />} title="Manage Account">
              <Menu.Item key="13" onClick={changePass} icon={<KeyOutlined />}>Password</Menu.Item>
              <Menu.Item key="14" onClick={deleteAccount} icon={<DeleteOutlined />}>Delete Account</Menu.Item>
            </SubMenu>
            <Menu.Item onClick={this.onSubmit} key="8" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          <div id="content">
          </div>
        </Layout>
      </Layout>
    );
  }
}
export default UserView;
