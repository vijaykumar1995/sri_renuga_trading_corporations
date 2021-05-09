import React from 'react';
import { Button, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class CreateWeightModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: ''
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

  onClickSubmit = (e) => {
    e.preventDefault();
    if(this.state.data.name === '') {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'Weight is required'
      })
    } else {
      api.weight.create(this.state.data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Weight created successfully',
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
    }
    window.location.reload();
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
        trigger={<Button onClick={(e) => {
          e.preventDefault()
          this.setState({
            ...this.state,
            open: true
          })
        }} 
        primary
        style={{position: 'absolute', right: '0'}}
      >Create Weight</Button>}>
        <Modal.Header>
          Create Weight
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
              Create
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreateWeightModal;