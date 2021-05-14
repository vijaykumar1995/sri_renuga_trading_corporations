import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class EditPurchaseCompanyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: props.purchaseCompany.name,
        gst_number: props.purchaseCompany.gst_number,
        _id: props.purchaseCompany._id
      },
      old_name: props.purchaseCompany.name,
      old_gst_number: props.purchaseCompany.gst_number,
      old_id: props.purchaseCompany._id,
      success: '',
      message: '',
      open: false
    }
  }

  onChange = (e, field) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        [field]: e.target.value
      }
    })
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
      
      api.purchase_company.update(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Purchase Company Details updated successfully',
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
            success: '',
            message: '',
            data: {
              ...this.state.data,
              name: this.state.old_name,
              gst_number: this.state.old_gst_number,
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
          Edit Purchase Company Details
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Group>
            <Form.Field style ={{ width: '50%' }} error={this.state.success === 'false'}>
              <label>Company Name</label>
              <input 
                value={this.state.data.name}
                type='text' 
                placeholder='Enter the Purchase Company name' 
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
                ...this.state,
                open: false,
                success: '',
                message: '',
                data: {
                  ...this.state.data,
                  name: this.state.old_name,
                  gst_number: this.state.old_gst_number,
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

export default EditPurchaseCompanyModal;