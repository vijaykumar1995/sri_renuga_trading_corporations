import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../../actions/auth';
// import logo from '../../img/logo1.png';
import { Icon, Grid } from 'semantic-ui-react';
import '../css/navbar.css';
import decode from 'jwt-decode';
import _ from 'lodash';
import axios from 'axios';
// import EmployeeModal from '../../modal/Edit/EmployeeModal';

class VerticalNavbar extends React.Component {
  state = {
    slicedData: '',
    details: {
      name: ' ',
      email_id: ' ',
      role: ' ',
      employee_id: ' ',
      manager_email: ' ',
      manager_name: ' ',
      _id: ' ',
      updatedResponse: ''
    }
  };

  componentDidMount() {
    var localStorageData = localStorage.SRTJWT;
    var decodedData = decode(localStorageData);
    console.log('decoded email is ', decodedData);
    var slicedData = decodedData.ph_number;
    
    axios
      .get(`/api/employee/profile_details`, {
        params: { ph_number: decodedData.ph_number }
      })
      .then((response) => {
        if (!_.isEmpty(response.data.details)) {
          this.setState({
            slicedData: response.data.details.name.slice(0, 2),
            details: {
              name: response.data.details.name,
              email_id: response.data.details.email_id,
              role: response.data.details.role,
              _id: response.data.details._id,
              updatedResponse: 'no'
            }
          });
        } else {
          this.setState({ slicedData, details: { updatedResponse: 'no' } });
        }
      })
      .catch((e) => {
        console.log('error in update profile ', e.response);
      });
  }

  render() {
    const { slicedData, details } = this.state;
    const { isAuthenticated, logout } = this.props;
    // console.log('details is ', details);
    return (
      <div className="navbar" style={{marginBottom: '47px', overflow: 'hidden'}}>
        <nav>
          <ul>
            <li>
              <div id="logo" style={{position: 'relative'}}>
                <p style={{position: 'absolute', top: '50%', left: '50%', transform:'translate(-50%, -50%)', color: 'rgba(23, 34, 65, 1)', fontWeight: '1000'}}>SRT</p>
              </div>
            </li>
            <div className="systemView">
              <li className="list">
                <a style={{ textDecoration: 'none', color: 'white' }}>Dashboard</a>
              </li>
              {(this.state.details.role === 'Management' || this.state.details.role === 'Developer') && (
                <li className="list">
                  <a style={{ textDecoration: 'none', color: 'white' }} href='/view_employee'>Manage Users</a>
                </li>
              )}
             
              <li className="list">
                <a style={{ textDecoration: 'none', color: 'white' }} href='/categories'>Categories</a>
              </li>
              <li className="list">
                <a style={{ textDecoration: 'none', color: 'white' }} href='/weight'>Weight</a>
              </li>
              <li className="list">
                <a style={{ textDecoration: 'none', color: 'white' }} href='/products'>Product</a>
              </li>
              <li className="list">
                <a style={{ textDecoration: 'none', color: 'white' }} href='/purchase_company'>Purchase Company</a>
              </li>
            </div>
            <li className="dropdown" style={{ float: 'right' }}>
              <div>
                <div
                  className="dropbtn"
                  id="avatar"
                  style={{ fontWeight: '700', cursor: 'pointer' }}
                >
                  {slicedData.toUpperCase()}
                </div>
                <div className="dropdown-content" style={{ right: '0' }}>
                  <Grid padded>
                    <Grid.Row columns={2}>
                      <Grid.Column
                        only="mobile tablet computer"
                        computer={4}
                        mobile={4}
                        padded="horizontally"
                      >
                        <div
                          id="avatar"
                          className="profileBackground"
                          style={{
                            fontWeight: '700'
                          }}
                        >
                          {slicedData.toUpperCase()}
                        </div>
                      </Grid.Column>
                      <Grid.Column>
                        <div
                          style={{
                            width: '160px',
                           overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '23px',
                            height: '25px',
                            fontWeight: '900'
                          }}
                          title={details.name}
                        >
                          {details.name}
                        </div>
                        <div className="textColor" style={{marginTop: '4px'}}>Role: {details.role}</div>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  {/* <EmployeeModal userRecord={details} /> */}
                  <a href="change_password">
                    <Icon name="key" /> &nbsp; Change Password
                  </a>
                  {isAuthenticated ? (
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid
                    <a href="" onClick={() => logout()}>
                      <Icon name="shutdown" /> &nbsp; Logout
                    </a>
                  ) : (
                    <Redirect to="/" />
                  )}
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(
  VerticalNavbar
);
