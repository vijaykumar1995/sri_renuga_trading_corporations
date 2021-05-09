import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class EditWeightModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: props.weight.name,
        _id: props.weight._id
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

  onClickSubmit = (e) => {
    e.preventDefault();
    if(this.state.data.name === '') {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'Weight name is required'
      })
    } else {
      
      api.weight.update(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Weight updated successfully',
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
          Edit Weight
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Field error={this.state.success === 'false'}>
            <label style={{ fontSize: '15px', fontWeight: '55' }}>Weight</label>
            <input 
              value={this.state.data.name}
              type='text' 
              placeholder='Enter the Weight' 
              onChange={(e) => {this.onChangeName(e)}} 
            />
          </Form.Field>
            
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

export default EditWeightModal;