import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class LoginPage extends React.Component {
  state = {
    data: {
      ph_number: '',
      password: ''
    },
    errors: '',
    success: '',
  }

  onChangePassword = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        password: e.target.value
      }
    });
  }

  onChangePhNumber = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        ph_number: e.target.value
      }
    });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
      this.state.data.ph_number === '' ||
      this.state.data.password === '' 
    ) {
      this.setState({
        ...this.state,
        success: 'false',
        errors: 'Phone Number and Password must be filled'
      })
    } else {
      this.props.login(this.state.data)
      .then(() => this.props.history.push("/signup"))
      .catch(err=>{
        console.clear();
        this.setState({
          ...this.state,
          success: 'false',
          errors: "Either Phone number or password is incorrect"
        })
      })
    }
  }

  render() {
    return(
      <div>
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
          <p style={{fontSize:"2.3rem",textAlign:"center"}}>Sri Renuga Trading Corporation</p>
          <p style={{marginTop:"-35px", marginBottom:"30px", textAlign:"center"}}>Enter your credentials to login</p>
          <Form>
            <Form.Field error={this.state.success === 'false'}>
              <label>Phone Number</label>
              <input 
                type='number' 
                placeholder='1234567890' 
                value={this.state.data.ph_number}
                onChange={(e) => this.onChangePhNumber(e)} />
            </Form.Field>
            <Form.Field error={this.state.success === 'false'}>
              <label>Password</label>
              <input 
                type='Password' 
                placeholder='###########' 
                value={this.state.data.password}
                onChange={(e) => this.onChangePassword(e)} />
            </Form.Field>
            <Form.Field>
            <Button
              primary
              type="submit"
              style={{ width: '100%' }}
              onClick={(e) => {this.onClickSubmit(e)}}
            >
              Login
            </Button>
            </Form.Field>
            {this.state.success === 'false' && (
              <Message negative style={{textAlign: 'center'}}>{this.state.errors}</Message>
            )}
          </Form>
        </div>
        
      </div>
    )
  }
}

export default connect(
	null,
	{ login }
)(LoginPage);