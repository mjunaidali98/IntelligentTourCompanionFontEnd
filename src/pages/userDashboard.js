import React, { Component } from 'react';
import Header from '../components/header';
import UserView from '../components/userView';
import Search from '../components/search';

import '../App.css';

class userDashboard extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Search/>
        <UserView user={this.props.user} />
      </div>
    );
  }
}

export default userDashboard;
