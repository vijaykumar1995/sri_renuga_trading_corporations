import React from 'react';
import {
  Button,
  Dropdown,
  Form,
  Loader,
  Message
} from 'semantic-ui-react';
import axios from 'axios';
import Navbar from '../navbar/navigation/navbar';
import decode from 'jwt-decode';
import emailValidator from 'email-validator';
import api from '../../api';
import DailyStockExpiryUpdateModal from '../modals/DailyStockExpiryUpdateModal';

class SignupPage extends React.Component {

  state = {
    data: {
      role: '',
      name: '',
      ph_number: '',
      email_id: '',
      password: ''
    },
    roleError: '',
    passwordError: '',
    nameError: '',
    emailIdError: '',
    phNumberError: '',
    success: '',
    message: '',
    role: '',
    loader: true,
    open: ''
  }

  componentDidMount = () => {
    var localStorageData = localStorage.SRTJWT;
    var decodedData = decode(localStorageData);
    axios
      .get(`/api/employee/profile_details`, {
        params: { ph_number: decodedData.ph_number }
      })
      .then((response) => {
        api.stock_maintainance.get().then(stockMaintainanceRes => {
          console.log(response.data);
          if('Need to Update the Stock' === stockMaintainanceRes) {
            this.setState({
              ...this.state,
              role: response.data.details.role,
              loader: false,
              open: true
            })
          } else {
            this.setState({
              ...this.state,
              role: response.data.details.role,
              loader: false,
              open: false
            })
          }
        })
      })
  }

  onChangeName = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      roleError: '',
      passwordError: '',
      nameError: '',
      emailIdError: '',
      phNumberError: '',
      success: '',
      data: {
        ...this.state.data,
        name: e.target.value
      }
      
    });
  }

  onChangeRole = (e, data) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      roleError: '',
      passwordError: '',
      nameError: '',
      emailIdError: '',
      phNumberError: '',
      success: '',
      data: {
        ...this.state.data,
        role: data.value
      }
    });
  }


  onChangeEmail = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      roleError: '',
      passwordError: '',
      nameError: '',
      emailIdError: '',
      phNumberError: '',
      success: '',
      data: {
        ...this.state.data,
        email_id: e.target.value
      }
    });
  }

  onChangePhNumber = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      roleError: '',
      passwordError: '',
      nameError: '',
      emailIdError: '',
      phNumberError: '',
      success: '',
      data: {
        ...this.state.data,
        ph_number: e.target.value
      }
    });
  }

  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      roleError: '',
      passwordError: '',
      nameError: '',
      emailIdError: '',
      phNumberError: '',
      success: '',
      data: {
        ...this.state.data,
        password: e.target.value
      }
    });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
      this.state.data.password === '' || 
      this.state.data.name === '' ||
      this.state.data.role === '' ||
      this.state.data.ph_number=== ''
    ) {
      this.setState({
        ...this.state,
        roleError: 'Invalid',
        passwordError: 'Invalid',
        nameError: 'Invalid',
        phNumberError: 'Invalid',
        success: 'false',
        message: 'The above fields are required'
      })
    } else {
      if(this.state.data.role === 'Management' && this.state.data.email_id === '') {
        this.setState({
          ...this.state,
          emailIdError: 'Invalid',
          success: 'false',
          message: 'Email ID is required for the management'
        })
      } else if(this.state.data.password.length < 8) {
        this.setState({
          ...this.state,
          passwordError: 'Invalid',
          success: 'false',
          message: 'Password length should be more than 8 charcters'
        })
      } else if(this.state.data.ph_number.length !== 10) {
        this.setState({
          ...this.state,
          phNumberError: 'Invalid',
          success: 'false',
          message: 'Phone number is invalid'
        })
      } else if(this.state.data.role === 'Management') {
          if(emailValidator.validate(this.state.data.email_id)) {
            axios.post('/api/employee', {data: this.state.data}).then((res) => {
              if(res.status === 200) {
                this.setState({
                  ...this.state,
                  success: 'true'
                })
              }
            }).catch((err) => {
              this.setState({
                ...this.state,
                success: 'false',
                message: err.response.data
              })
            })
          } else {
            this.setState({
              ...this.state,
              emailIdError: 'Invalid',
              success: 'false',
              message: 'Email Id should be a proper value'
            })
          }
      } else {
        if(this.state.data.email_id !== '') {
          if(emailValidator.validate(this.state.data.email_id)) {
            axios.post('/api/employee', {data: this.state.data}).then((res) => {
              if(res.status === 200) {
                this.setState({
                  ...this.state,
                  success: 'true'
                })
              }
            }).catch((err) => {
              this.setState({
                ...this.state,
                success: 'false',
                message: err.response.data
              })
            })
          } else {
            this.setState({
              ...this.state,
              emailIdError: 'Invalid',
              success: 'false',
              message: 'Email Id should be a proper value'
            })
          }
        } else {
          axios.post('/api/employee', {data: this.state.data}).then((res) => {
            if(res.status === 200) {
              this.setState({
                ...this.state,
                success: 'true'
              })
            }
          }).catch((err) => {
            this.setState({
              ...this.state,
              success: 'false',
              message: err.response.data
            })
          })
        }
        
      }
    }
  }

  generateRequest = (value) => {
    var localStorageData = localStorage.SRTJWT;
    var decodedData = decode(localStorageData);
    axios
      .get(`/api/employee/profile_details`, {
        params: { ph_number: decodedData.ph_number }
      })
      .then((response) => {
        api.stock_maintainance.updateStockDetails().then(stockMaintainanceRes => {
          this.setState({
            ...this.state,
            role: response.data.details.role,
            loader: false,
            open: false
          })
        }) 
      })
  }

  render() {
    const  designation = [
      {
        key: 'Employee',
        text: 'Employee',
        value: 'Employee'
      },
      {
        key: 'Management',
        text: 'Management',
        value: 'Management'
      }
    ]
    return(
      <div>
        { this.state.loader === true && (
          <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
        )}
        {(this.state.role === 'Employee' && this.state.loader === false) &&
        (
          <div>
            <Navbar />
            <DailyStockExpiryUpdateModal open={this.state.open} onClick={(value) => {this.generateRequest(value)}}/>
            <p style={{position: 'absolute', left: '50%', top:'50%', transform: 'translate(-50%, -50%)', fontSize: '20px', fontWeight:'900'}}>Sorry you don't have access to this page</p>
          </div>
        )}
        {((this.state.role === 'Management' || this.state.role === 'Developer') && this.state.loader === false) && (
          <div>
            <Navbar />
            <DailyStockExpiryUpdateModal open={this.state.open} onClick={(value) => {this.generateRequest(value)}}/>
            <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
              <p style={{fontSize:"2.3rem",textAlign:"center"}}>Sri Renuga Trading Corporation</p>
              <p style={{marginTop:"-35px", textAlign:"center"}}>Enter the sign up details</p>
            
              <Form style={{fontSize: '15px'}}>
              <Form.Field required error={this.state.nameError === 'Invalid'}>
                  <label>Name</label>
                  <input 
                    type='text' 
                    placeholder='Name'
                    value={this.state.data.name}
                    onChange={(e) => this.onChangeName(e)}
                  ></input>
                </Form.Field>

                <Form.Field error={this.state.emailIdError === 'Invalid'}>
                  <label>Email</label>
                  <input 
                    type='email' 
                    placeholder='abc@email.com'
                    value={this.state.data.email_id}
                    onChange={(e) => this.onChangeEmail(e)}
                  ></input>
                </Form.Field>

                <Form.Group>
                  <Form.Field required error={this.state.phNumberError === 'Invalid'} style={{width: '100%'}}>
                    <label>Phone Number</label>
                    <input 
                      type='number' 
                      pattern='[0-9]{10}' 
                      placeholder='1234567890' 
                      value={this.state.data.ph_number}
                      onChange={(e) => this.onChangePhNumber(e)}
                    ></input>
                  </Form.Field>

                  <Form.Field required error={this.state.roleError === 'Invalid'} >
                    <label>Role</label>
                    <Dropdown
                          value= {this.state.data.role}
                          placeholder="Select"
                          selection
                          options={designation}
                          onChange={this.onChangeRole}
                        />
                  </Form.Field>
                </Form.Group>

                <Form.Field required error={this.state.passwordError === 'Invalid'}>
                  <label>Password</label>
                  <input 
                    type='password' 
                    placeholder='#######' 
                    value={this.state.data.password}
                    onChange={(e) => this.onChangePassword(e)}
                  ></input>
                </Form.Field>

                <Form.Field>
                    <Button
                      primary
                      type="submit"
                      style={{ width: '100%' }}
                      onClick={this.onClickSubmit}
                    >
                      Submit
                    </Button>
                  </Form.Field>
                  {this.state.success === 'true' && (
                    <Message positive style={{textAlign: 'center'}}>Employee created</Message>
                  )}
                  {this.state.success === 'false' && (
                    <Message negative style={{textAlign: 'center'}}>{this.state.message}</Message>
                  )}
              </Form>
            </div>
          </div>
          )}
      </div>
    )
  }
}

export default SignupPage;