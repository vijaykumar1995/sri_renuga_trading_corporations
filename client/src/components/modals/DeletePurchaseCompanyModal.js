import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import api from '../../api';

class DeletePurchasecompanyModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        _id: props.purchaseCompany._id
      },
      success: '',
      message: '',
      open: false
    }
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    api.purchase_company.delete(this.state.data).then((res) => {
      this.setState({
        ...this.state,
        message: 'Purchase Company details deleted successfully',
        success: 'true',
        open: false
      })
      window.location.reload()
    }).catch(err => {
      console.log('inside the error');
      this.setState({
        ...this.state,
        message: err.response.data,
        success: 'false'
      })
    })
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
        trigger={
        <Button 
          negative 
          circular
          onClick={(e) => {
            this.setState({
              ...this.state,
              open: true
            })
          }} 
          size='medium' 
          icon='trash alternate' 
        />
        }>
        <Modal.Header>
          Delete Purchase Company Details
        </Modal.Header>
        <Modal.Content>
          <p>Do you want to delete this record?</p>
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
              Delete
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DeletePurchasecompanyModal;