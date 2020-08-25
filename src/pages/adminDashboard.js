import React, { Component } from 'react';
import AdminDashboard from '../components/adminprofile';

class admindashboard extends Component {
  render() {
    return (
      <div className="wrapper">
        <AdminDashboard admin={this.props.admin} />
      </div>
    );
  }
}
export default admindashboard;
