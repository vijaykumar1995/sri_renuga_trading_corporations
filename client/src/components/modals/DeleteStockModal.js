import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

class DeleteStockModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        key: ''
      },
      open: false
    }
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    this.props.onClick(this.state.data.key);
    this.setState({
      ...this.state,
      open: false
    })
  }

  onclickHandle = (e) => {
    this.setState({
      ...this.state,
      open: true,
      data: {
        ...this.state.data,
        key: this.props.stock,
      }
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
            this.onclickHandle(e);
            
          }} 
          size='medium' 
          icon='trash alternate' 
        />
        }>
        <Modal.Header>
          Delete Stock
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

export default DeleteStockModal;