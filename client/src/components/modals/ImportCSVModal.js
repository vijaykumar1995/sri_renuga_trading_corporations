import React from 'react';
import { Button, Form, Icon, Message, Modal } from 'semantic-ui-react';
import Parse from 'papaparse';
import axios from 'axios';

class ImportCSVModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: '',
      message: '',
      csvFile: undefined,
      open: false
    }
  }

  onChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      csvFile: e.target.files[0]
    })
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(this.state.csvFile !== undefined) {
      Parse.parse(this.state.csvFile, {
        complete: this.onSubmit.bind(this),
        header: true
      })
    }
  }

  onSubmit = (e) => {
    if(e.meta.fields.length > 0) {
			var lines = e.data;
      console.log(lines);
      for (var i = 0; lines.length > i; i++) {
				var obj = lines[i];
				var keys = Object.keys(obj);
				var n = keys.length;
				while (n--) {
					var key = keys[n];
					if (key !== key.toLowerCase()) {
						obj[key.toLowerCase()] = obj[key];

						delete obj[key];
					}
				}
        axios.post('/api/products/csv_upload', { data: lines })
        .then(response => {
          window.location.reload()
        }).catch(err => {
          this.setState({
            ...this.state,
            message: err.response.data,
            success: false
          })
        })
			}
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
            message: '',
            success: ''
          })
        }} 
        open={this.state.open} 
        trigger={
          <Button 
            positive
            onClick={(e) => {
              this.setState({
                ...this.state,
                open: true
              })
            }}
            style={{position: 'absolute', right: '0', top: '0'}}>
              <Icon name='upload' />Upload Products
          </Button>
        }>
          
        <Modal.Header>
          Upload Products
        </Modal.Header>
        <Modal.Content>
          <Form>
          <Form.Field >
            <Form.Input
              type='file'
              name='file'
              onChange={(e) => this.onChange(e)}
            >
              
            </Form.Input>
          </Form.Field>
          </Form>
          {this.state.success === false && (
            <Message negative>{this.state.message}</Message>
          )}
          
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={(e) => {
              this.setState({
                open: false,
                message: '',
                success: ''
              })
            }}>Cancel</Button>
            <Button.Or />
            <Button
              primary
              type="submit" positive
              onClick={(e) => {this.onClickSubmit(e)}}
            >
              Upload
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ImportCSVModal;