import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class CreatePurchaseCompanyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        gst_number: ''
      },
      success: '',
      message: '',
      open: false
    }
  }

  onChange = (e, type) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        [type]: e.target.value
      }
    });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
      this.state.data.name === '' ||
      this.state.data.gst_number === ''
    ) {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'All the fields are required'
      })
    } else {
      api.purchase_company.create(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Purchase Company details created successfully',
          success: 'true',
          open: false
        })
        window.location.reload();
      }).catch(err => {
        console.log('inside the error');
        this.setState({
          ...this.state,
          message: err.response.data,
          success: 'false'
        })
      })
      
    }
  }

  render() {
    return(
      <Modal
        closeIcon
        onClose={(e) => {
          this.setState({
            ...this.state,
            open: false,
            data: {
              ...this.state.data,
              name: '',
              gst_number: ''
            },
            success: '',
            message: '',
          })
        }} 
        open={this.state.open} 
        trigger={<Button onClick={(e) => {
          e.preventDefault()
          this.setState({
            ...this.state,
            open: true
          })
        }} 
        primary
        style={{position: 'absolute', right: '0'}}
      >Create Purchase Company</Button>}>
        <Modal.Header>
          Create Purchase Company Details
        </Modal.Header>
        <Modal.Content>
        <Form >
        <Form.Group>
          <Form.Field style ={{ width: '50%' }} error={this.state.success === 'false'}>
            <label>Company Name</label>
            <input 
              value={this.state.data.name}
              type='text' 
              placeholder='Enter the Company Name' 
              onChange={(e) => {this.onChange(e, 'name')}} 
            />
          </Form.Field>
          
          <Form.Field style ={{ width: '50%' }} error={this.state.success === 'false'}>
            <label>GSTN Number</label>
            <input
             type='text' 
             placeholder='Enter the GSTN Number'
             onChange={(e) => {this.onChange(e, 'gst_number')}}
             value={this.state.data.gst_number}
            />
          </Form.Field>
          </Form.Group>
            
            {this.state.success === 'false' && (
              <Message negative style={{textAlign: 'center'}}>{this.state.message}</Message>
            )}
            {this.state.success === 'true' && (
              <Message positive style={{textAlign: 'center'}}>{this.state.message}</Message>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={(e) => {
              this.setState({
                open: false,
                data: {
                  ...this.state.data,
                  name: '',
                  gst_number: ''
                },
                success: '',
                message: '',
              })
            }}>Cancel</Button>
            <Button.Or />
            <Button
              primary
              type="submit" positive
              onClick={(e) => {this.onClickSubmit(e)}}
            >
              Create
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreatePurchaseCompanyModal;