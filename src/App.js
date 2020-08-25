import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { __RouterContext } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import UserDashboard from './pages/userDashboard';
import AdminLog from './pages/adminLog';
import AdminDashboard from './pages/adminDashboard';
import FindGuide from './pages/findGuides';
import WeatherCheck from './pages/findWeather';
import About from './pages/about';
import Contact from './pages/contact';
import Forgot from './components/forgot';
import Destination from './pages/topDestination';
import HeaderDestination from './components/destination';
import { createBrowserHistory } from 'history';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default class App extends React.Component {
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
        } else {
          this.setState({
            admin: res.data,
            authenticate: true,
            adminAuth: res.data.admin,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setUser = (user) => this.setState({ user: user });
  setAdmin = (admin) => this.setState({ admin: admin });
  render() {
    return (
      <div className="wrapper">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/login" component={Login} />
            {this.state.authenticate && this.state.adminAuth === false ? (
              <Route
                path="/dashboard"
                render={(props) => (
                  <UserDashboard {...props} user={this.state.user} />
                )}
              />
            ) : (
              <Route path="/dashboard" render={({ props }) => <Login />} />
            )}
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <UserDashboard {...props} user={this.state.user} />
              )}
            />
            {!this.state.authenticate && this.state.adminAuth === false ? (
              <Route exact path="/login" render={({ props }) => <Login />} />
            ) : (
              <Route
                exact
                path="/login"
                render={(props) => (
                  <UserDashboard {...props} user={this.state.user} />
                )}
              />
            )}
            <Route
              exact
              path="/dashboard"
              render={(props) => (
                <UserDashboard {...props} user={this.state.user} />
              )}
            />
            {this.state.authenticate && this.state.adminAuth === false ? (
              <Route
                exact
                path="/maketrip"
                render={(props) => (
                  <UserDashboard {...props} user={this.state.user} />
                )}
              />
            ) : (
              [
                <Route
                  exact
                  path="/maketrip"
                  render={(props) => (
                    <Login
                      {...props}
                      user={this.state.user}
                      setUser={this.setUser}
                    />
                  )}
                />,
                <Route
                  exact
                  path="/login"
                  render={(props) => (
                    <Login
                      {...props}
                      user={this.state.user}
                      setUser={this.setUser}
                    />
                  )}
                />,
                <Route
                  exact
                  path="/signup"
                  render={(props) => <Register {...props} />}
                />,
              ]
            )}
            {this.state.authenticate && this.state.adminAuth === true ? (
              <Route
                exact
                path="/adminDashboard"
                render={(props) => (
                  <AdminDashboard {...props} admin={this.state.admin} />
                )}
              />
            ) : (
              <Route exact path="/adminDashboard" render={() => <AdminLog />} />
            )}
            {this.state.authenticate && this.state.adminAuth === true ? (
              <Route
                exact
                path="/itc-admin"
                render={(props) => (
                  <AdminDashboard {...props} admin={this.state.admin} />
                )}
              />
            ) : (
              <Route exact path="/itc-admin" render={() => <AdminLog />} />
            )}

            {/* Test */}
            {this.state.authenticate && this.state.adminAuth === false ? (
              <Route
                exact
                path="/maketrip"
                render={(props) => (
                  <AdminDashboard {...props} admin={this.state.admin} />
                )}
              />
            ) : (
              <Route exact path="/maketrip" render={() => <Login />} />
            )}

            <Route exact path="/findguides" component={FindGuide} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/forgot" component={Forgot} />
            {/* <Route exact path="/map" component={Map} /> */}
            {/* <Route path="*" component={() => '404 Page Not Found'} /> */}
            <Route exact path="/destinations" component={Destination} />
            <Route exact path="/findWeather" component={WeatherCheck} />
          </Switch>
        </Router>
      </div>
    );
  }
}
