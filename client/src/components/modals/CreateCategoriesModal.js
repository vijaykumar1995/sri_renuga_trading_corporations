import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class CreateCategoriesModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        gst_percentage: '',
        hsn_code: ''
      },
      success: '',
      message: '',
      open: false
    }
  }

  onChangeName = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        name: e.target.value
      }
    });
  }

  onChangeGstPercentage = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        gst_percentage: e.target.value
      }
    });
    
  }

  onChangeHsnCode = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      success: '',
      data: {
        ...this.state.data,
        hsn_code: e.target.value
      }
    });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
      this.state.data.name === '' ||
      this.state.data.gst_percentage === '' ||
      this.state.data.hsn_code === ''
    ) {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'All the fields are required'
      })
    } else {
      api.categories.create(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Categories created successfully',
          success: 'true',
          open: false
        })
      }).catch(err => {
        console.log('inside the error');
        this.setState({
          ...this.state,
          message: err.response.data,
          success: 'false'
        })
      })
      window.location.reload();
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
              gst_percentage: '',
              hsn_code: ''
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
      >Create Category</Button>}>
        <Modal.Header>
          Create Categories
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Field error={this.state.success === 'false'}>
            <label>Category Name</label>
            <input 
              value={this.state.data.name}
              type='text' 
              placeholder='Enter the Category Name' 
              onChange={(e) => {this.onChangeName(e)}} 
            />
          </Form.Field>
          <Form.Group>
          <Form.Field style ={{ width: '50%' }} error={this.state.success === 'false'}>
            <label>GST Percentage</label>
            <input
             type='Number' 
             placeholder='Enter the GST Percentage'
             onChange={(e) => {this.onChangeGstPercentage(e)}}
            />
          </Form.Field>
          <Form.Field style ={{ width: '50%' }} error={this.state.success === 'false'}>
            <label>HSN Code</label>
            <input 
              type='Number' 
              placeholder='Enter the HSN code'
              onChange={(e) => {this.onChangeHsnCode(e)}}
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
                open: false
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

export default CreateCategoriesModal;