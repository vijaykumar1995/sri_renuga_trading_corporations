import React from 'react';
import { Button, Dropdown, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';
import emailValidator from 'email-validator';

class EditEmployeeModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        role: props.employee.role,
        ph_number: props.employee.ph_number,
        email_id: props.employee.email_id,
        name: props.employee.name,
        _id: props.employee._id
      },
      old_role: props.employee.role,
      old_ph_number: props.employee.ph_number,
      old_email_id: props.employee.email_id,
      old_name: props.employee.name,
      old_id: props.employee._id,
      success: '',
      message: '',
      open: false
    }
  }

  onChange = (e, field_name) => {
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
        [field_name]: e.target.value
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

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
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
      } else if(this.state.data.ph_number.length !== 10) {
        this.setState({
          ...this.state,
          phNumberError: 'Invalid',
          success: 'false',
          message: 'Phone number is invalid'
        })
      } else if(this.state.data.role === 'Management') {
        if(emailValidator.validate(this.state.data.email_id)) {
          api.user.update(this.state.data).then((res) => {
            this.setState({
              ...this.state,
              success: 'true'
            })
            window.location.reload();
          }).catch((err) => {
            console.log(err.response);
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
        console.log(this.state.data.email_id)
        if(this.state.data.email_id === '' || this.state.data.email_id === undefined || this.state.data.email_id === null) {
          api.user.update(this.state.data).then((res) => {
            this.setState({
              ...this.state,
              success: 'true'
            })
            window.location.reload();
          }).catch((err) => {
            console.log(err.response);
            this.setState({
              ...this.state,
              success: 'false',
              message: err.response.data
            })
          })
        } else {
          if(emailValidator.validate(this.state.data.email_id)) {
            api.user.update(this.state.data).then((res) => {
              this.setState({
                ...this.state,
                success: 'true'
              })
              window.location.reload();
            }).catch((err) => {
              console.log(err.response);
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
        }
      }
    }
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
      <Modal
        closeIcon
        onClose={(e) => {
          this.setState({
            ...this.state,
            open: false,
            success: '',
            message: '',
            roleError: '',
            passwordError: '',
            nameError: '',
            emailIdError: '',
            phNumberError: '',
            data: {
              ...this.state.data,
              name: this.state.old_name,
              role: this.state.old_role,
              email_id: this.state.old_email_id,
              ph_number: this.state.old_ph_number,
              _id: this.state.old_id
            },
          })
        }} 
        open={this.state.open} 
        trigger={<Button positive onClick={(e) => {
          this.setState({
            ...this.state,
            open: true
          })
        }}  circular size='medium' icon='edit' />
        }>
        <Modal.Header>
          Edit Employee
        </Modal.Header>
        <Modal.Content>
        <Form>
        <Form.Group>
          <Form.Field style={{width: '50%'}} required error={this.state.nameError === 'Invalid'}>
              <label>Name</label>
              <input 
                type='text' 
                placeholder='Name'
                value={this.state.data.name}
                onChange={(e) => this.onChange(e, 'name')}
              ></input>
            </Form.Field>

            <Form.Field style={{width: '50%'}} error={this.state.emailIdError === 'Invalid'}>
              <label>Email</label>
              <input 
                type='email' 
                placeholder='abc@email.com'
                value={this.state.data.email_id}
                onChange={(e) => this.onChange(e, 'email_id')}
              ></input>
            </Form.Field>
            </Form.Group>

            <Form.Group>
              <Form.Field required error={this.state.phNumberError === 'Invalid'} style={{width: '50%'}}>
                <label>Phone Number</label>
                <input 
                  type='number' 
                  pattern='[0-9]{10}' 
                  placeholder='1234567890' 
                  value={this.state.data.ph_number}
                  onChange={(e) => this.onChange(e, 'ph_number')}
                ></input>
              </Form.Field>

              <Form.Field  style={{width: '50%'}} required error={this.state.roleError === 'Invalid'} >
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
              {this.state.success === 'true' && (
                <Message positive style={{textAlign: 'center'}}>Employee updated successfully</Message>
              )}
              {this.state.success === 'false' && (
                <Message negative style={{textAlign: 'center'}}>{this.state.message}</Message>
              )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={(e) => {
              this.setState({
                ...this.state,
                open: false,
                success: '',
                message: '',
                roleError: '',
                passwordError: '',
                nameError: '',
                emailIdError: '',
                phNumberError: '',
                data: {
                  ...this.state.data,
                  name: this.state.old_name,
                  role: this.state.old_role,
                  email_id: this.state.old_email_id,
                  ph_number: this.state.old_ph_number,
                  _id: this.state.old_id
                },
              })
            }}>Cancel</Button>
            <Button.Or />
            <Button
              primary
              type="submit" positive
              onClick={(e) => {this.onClickSubmit(e)}}
            >
              Update
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditEmployeeModal;