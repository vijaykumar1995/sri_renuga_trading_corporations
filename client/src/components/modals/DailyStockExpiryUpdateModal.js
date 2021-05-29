import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

class DailyStockExpiryUpdateModal extends React.Component {
  render() {
    return(
      <Modal
        open={this.props.open}
      >
        <Modal.Header>
          Update Stock Details
        </Modal.Header>
        <Modal.Content>
          Need to update the stock details for Today
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={(e) => {
            e.preventDefault();
            this.props.onClick('Send');
            }} positive>Update</Button> 
        </Modal.Actions>
      </Modal>
    )
  }
}

export default DailyStockExpiryUpdateModal