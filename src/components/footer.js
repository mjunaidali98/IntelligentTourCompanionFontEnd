import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-md-6 col-lg-4 ">
                <div className="footer_widget">
                  <div className="footer_logo">
                    <Link to="/">
                      <img src="img/footer_logo.png" alt="" />
                    </Link>
                  </div>
                  <div>
                    <p id="unitag">
                      A Final Year Project of <br /> COMSATS University,
                      Islamabad. <br />
                    </p>
                    <a href="wwww.gmail.com">itourcompanion@gmail.com</a>
                  </div>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <Link to="https://www.facebook.com/m.junaidali.110">
                          <i className="ti-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link to="https://www.twitter.com/mjas110">
                          <i className="ti-twitter-alt" />
                        </Link>
                      </li>
                      <li>
                        <Link to="https://www.instagram.com/junaid_110/">
                          <i className="fa fa-instagram" />
                        </Link>
                      </li>

                      <li>
                        <Link to="">
                          <i className="fa fa-youtube-play" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div className="footer_widget">
                  <h3 className="footer_title">Company</h3>
                  <ul className="links">
                    <li>
                      <Link to="/about">Our Services</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/findweather">Find Weather</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div className="footer_widget">
                  <h3 className="footer_title">Popular destination</h3>
                  <ul className="links double_links">
                    <li>
                      <Link to="/">Neelum Valley</Link>
                    </li>
                    <li>
                      <Link to="/">Hunza</Link>
                    </li>
                    <li>
                      <Link to="/">Swat</Link>
                    </li>
                    <li>
                      <Link to="/">Kalash Valley</Link>
                    </li>
                    <li>
                      <Link to="/">Kaghan</Link>
                    </li>
                    <li>
                      <Link to="/">Murree Hills</Link>
                    </li>
                    <li>
                      <Link to="/">Shandur Pas</Link>
                    </li>
                    <li>
                      <Link to="/">Rawalakot</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copy-right_text">
          <div className="container">
            <div className="footer_border" />
            <div className="row">
              <div className="col-xl-12">
                <p className="copy_right text-center">
                  Copyright © All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default footer;
