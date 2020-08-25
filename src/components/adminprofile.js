import React from 'react';
import '../componentcss/admin.css';
import Adddestination from './addnewdestination';
import Edittopdestination from '../components/editnewdestination';
import Removedestination from '../components/removetopdestination';
import ViewUser from '../components/viewusers';
import { Layout, Menu } from 'antd';
import Viewrequests from '../components/viewrequests';
import ReactDOM from 'react-dom';
import SecurityIcon from '@material-ui/icons/Security';
import {
  HomeOutlined,
  PieChartOutlined,
  CheckCircleOutlined,
  SettingFilled,
  LoginOutlined,
  MailOutlined,
  CameraOutlined,
  PlusCircleOutlined,
  FormOutlined,
  ShopOutlined,
  EditOutlined,
  UserOutlined,
  BarChartOutlined,

} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

function addTopdestination() {
  ReactDOM.render(<Adddestination />, document.getElementById('content'));
}
function viewRequests() {
  ReactDOM.render(<Viewrequests />, document.getElementById('content'));
}
function editTopdestination() {
  ReactDOM.render(<Edittopdestination />, document.getElementById('content'));
} 
function removeTopdestination() {
  ReactDOM.render(<Removedestination />, document.getElementById('content'));
}
function viewUsers() {
  ReactDOM.render(<ViewUser />, document.getElementById('content'));
}

class AdminProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      collapsed: false,
      name: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
    if(collapsed) {
      ReactDOM.render(<SecurityIcon/>, document.getElementById('adminname'));
      document.getElementById('welcome').style.fontSize='14px';
      
    }
    else{
      document.getElementById('welcome').style.visibility='visible';
      document.getElementById('adminname').style.visibility='visible';
      ReactDOM.render( "Admin", document.getElementById('adminname'));
      document.getElementById('welcome').style.fontSize='20px';
      
    }
  };  
  onSubmit = (e) => {
    localStorage.removeItem('token');
    window.location.reload();
  };
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
          <h3 id="adminname"
            style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}
          >
           Admin
          </h3>
          <Menu id="sidebar" theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <SubMenu key="sub1" icon={<EditOutlined />} title="Edit">
              <SubMenu key="sub1-2" icon={<CameraOutlined />} title="Destinations">
                <Menu.Item key="6" onClick={addTopdestination} icon={<ShopOutlined />} >Add New</Menu.Item>
                <Menu.Item key="9" onClick={editTopdestination} icon={<FormOutlined />}>Update</Menu.Item>
                <Menu.Item key="8" onClick={removeTopdestination} icon={<PlusCircleOutlined />}>Remove</Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" icon={<CheckCircleOutlined />} title="View">
              <Menu.Item key="5" icon={<BarChartOutlined/>}>Tours</Menu.Item>
              <Menu.Item key="7" onClick={viewUsers} icon={<UserOutlined/>}>Users</Menu.Item>
              <Menu.Item key="11" icon={<MailOutlined/>} onClick={viewRequests}>Responses</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<SettingFilled />}>
              Manage Account
            </Menu.Item>
            <Menu.Item key="10" icon={<PieChartOutlined />}>
              Statistics
            </Menu.Item>
            <Menu.Item onClick={this.onSubmit} key="4" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <div id="content">

          </div>

        </Layout>
      </Layout>
    );
  }
}
export default AdminProfile;