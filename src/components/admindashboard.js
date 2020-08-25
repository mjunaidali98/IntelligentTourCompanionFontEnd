import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  HomeOutlined,
  PieChartOutlined,
  LoginOutlined,
  EditOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class AdminDashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
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
          <h3
            style={{ textAlign: 'center', marginTop: '20px', color: 'white' }}
          >
            Dashboard
          </h3>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <SubMenu key="sub1" icon={<EditOutlined />} title="Edit">
              <Menu.Item key="6">Destinations</Menu.Item>
              <Menu.Item key="8">Hotels</Menu.Item>
              <Menu.Item key="8">Tour Guides</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<CheckCircleOutlined />} title="View">
              <Menu.Item key="3">Destinations</Menu.Item>
              <Menu.Item key="5">Tours</Menu.Item>
              <Menu.Item key="6">Users</Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<SettingFilled />}>
              Manage Account
            </Menu.Item>
            <Menu.Item key="3" icon={<PieChartOutlined />}>
              Statistics
            </Menu.Item>
            <Menu.Item key="4" icon={<LoginOutlined />}>
              Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <img
                  style={{
                    display: 'block',
                    margin: 'auto',
                    width: '100px',
                    height: '100px',
                  }}
                  src="/assets/img/admin2.png"
                  alt="Avatar"
                />
                <h1 style={{ textAlign: 'center' }}>Welcome Admin</h1>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}></Footer>
        </Layout>
      </Layout>
    );
  }
}

export default AdminDashboard;
