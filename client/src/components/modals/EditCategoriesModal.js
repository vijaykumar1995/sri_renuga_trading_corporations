import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class EditCategoriesModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: props.category.name,
        _id: props.category._id,
        gst_percentage: props.category.gst_percentage,
        hsn_code: props.category.hsn_code
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
    })
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
      this.state.data.gst_percentage === null ||
      this.state.data.hsn_code === '' ||
      this.state.data.hsn_code === null
    ) {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'All the fields are required'
      })
    } else {
      api.categories.update(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Categories updated successfully',
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
            open: false
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
          Edit Category
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Field error={this.state.success === 'false'}>
            <label style={{ fontSize: '15px', fontWeight: '55' }}>Category Name</label>
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
              Update
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditCategoriesModal;