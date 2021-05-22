import React from 'react';
import { Button, Form, Modal, TextArea } from 'semantic-ui-react';

class ViewStockModal extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      data: {
        invoice_number:'',
        type: '',
        reason_for_return: '',
        purchase_date: '',
        product: '',
        quantity: '',
        company_name: '',
        gst_Number: '',
        gst_percentage: '',
        hsn_code: '',
        unit_price: '',
        cgst_cost: '',
        sgst_cost: '',
        batch_number: '',
        expiry_date: '',
        available_quantity: '',
        active: '',
        weight: '',
        category: '',
      },
      open:false,
      
    }
  }

  handleModalOpen = (e) => {
    let status = ''
    if(this.props.stock.active) {
      status = 'Active'
    } else {
      status = 'Inactive'
    }
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        invoice_number: this.props.stock.invoice_number,
        type: this.props.stock.type,
        reason_for_return: this.props.stock.reason_for_return,
        purchase_date: this.props.stock.purchase_date,
        product: this.props.stock.product.display_value2,
        quantity: this.props.stock.quantity,
        company_name: this.props.stock.company_name,
        gst_Number: this.props.stock.gst_Number,
        gst_percentage: this.props.stock.gst_percentage,
        hsn_code: this.props.stock.hsn_code,
        unit_price: this.props.stock.unit_price,
        cgst_cost: this.props.stock.cgst_cost,
        sgst_cost: this.props.stock.sgst_cost,
        batch_number: this.props.stock.batch_number,
        expiry_date: this.props.stock.expiry_date,
        available_quantity: this.props.stock.available_quantity,
        active: status,
        weight: this.props.stock.weight,
        category: this.props.stock.category,
        _id: this.props.stock._id
      },
      open: true
    })
  }

  onChange = (e, name) => {
    e.preventDefault();
    if(name === 'active') {
      let value = true;
      if(this.state.data.active === true) {
        value = false;
      }
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          active: value
        }
      })
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [name]: e.target.value
        }
      })
    }
  }

  onChangeCategory = (e,data) => {
    e.preventDefault();
    let category = JSON.parse(data.value);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        category: {
          display_value: data.value,
          actual_value: category.name
        },
        gst_percentage: category.gst_percentage,
        hsn_code: category.hsn_code
      }
    })
  }

  onChangeWeight = (e, data) => {
    e.preventDefault();
    let weight = JSON.parse(data.value);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        weight: {
          display_value: data.value,
          actual_value: weight.name
        }
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
            open: false,
            success: '',
            message: '',
            data: {
              ...this.state.data,
              _id: this.state.old_id,
              name: this.state.old_name,
              gst_percentage: this.state.old_gst_percentage,
              hsn_code: this.state.old_hsn_code,
              availability: this.state.old_availability,
              minimum_threshold: this.state.old_minimum_threshold,
              profit_percentage: this.state.old_profit_percentage,
              active: this.state.old_active
            }
          })
        }} 
        open={this.state.open} 
        trigger={<Button onClick={(e) => { this.handleModalOpen(e) }}  circular size='medium' icon='eye' />}>
        <Modal.Header>
          View Stock
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Group>
            <Form.Field style={{width: '25%'}}>
              <label>Product</label>
              <input
                type='text'
                readOnly
                placeholder='Product'
                value={this.state.data.product}
              />
            </Form.Field>

            <Form.Field style={{width: '25%'}}>
              <label>Weight</label>
              <input
              type='text'
              readOnly
              placeholder='Weight'
              value={this.state.data.weight}
              />
            </Form.Field>

            <Form.Field style={{width: '26%'}}>
              <label>Category</label>
              <input
              type='text'
              readOnly
              placeholder='Category'
              value={this.state.data.category}
              />
            </Form.Field>
          
            <Form.Field style={{width: '25%'}}>
              <label>GST Percentage</label>
              <input 
                type='Number'
                readOnly
                placeholder='GST Percentage'
                value={this.state.data.gst_percentage}
              />
            </Form.Field>
            <Form.Field style={{width: '25%'}}>
            <label>HSN Code</label>
            <input 
              type='Number'
              readOnly
              placeholder='HSN Code'
              value={this.state.data.hsn_code}
            />
            </Form.Field>          
          </Form.Group> 
          <Form.Group>
          
            
          </Form.Group> 
          <Form.Group>
          <Form.Field style={{width: '25%'}}>
            <label>Expiry Date</label>
            <input
              type='text'
              readOnly
              placeholder='Expiry Date'
              value={this.state.data.expiry_date}
            />
          </Form.Field>

          <Form.Field style={{width: '25%'}}>
              <label>Batch Number</label>
              <input
              type='text'
              readOnly
              placeholder='Batch Number'
              value={this.state.data.batch_number}
            />
            </Form.Field>
           
            <Form.Field style={{width: '26%'}}>
              <label>Product Quantity</label>
              <input
                type='text'
                readOnly
                placeholder='Product Quantity'
                value={this.state.data.quantity}
              />
            </Form.Field>
            <Form.Field style={{width: '21%'}}>
              <label>Unit Price</label>
              <input
                type='text'
                readOnly
                placeholder='Unit Price'
                value={this.state.data.unit_price}
              />
            </Form.Field>                       
          </Form.Group>
          <Form.Group>
            <Form.Field style={{width: '20%'}}>
              <label>CGST amount</label>
              <input
                type='text'
                readOnly
                placeholder='CGST Amount'
                value={this.state.data.cgst_cost}
              />
            </Form.Field>

            <Form.Field style={{width: '20%'}}>
              <label>SGST amount</label>
              <input
                type='text'
                readOnly
                placeholder='SGST Amount'
                value={this.state.data.sgst_cost}
              />
            </Form.Field>

            
            <Form.Field style={{width: '20%'}}>
              <label>Type</label>
              <input
               type='text'
               placeholder='Type'
               readOnly
              //  onChange = {(e) => {this.onChange(e, 'sgst_cost')}}
               value={this.state.data.type}
              />
            </Form.Field>

            <Form.Field style={{width: '20%'}}>
              <label>Status</label>
              <input
               type='text'
               placeholder='Status'
               readOnly
              //  onChange = {(e) => {this.onChange(e, 'sgst_cost')}}
               value={this.state.data.active}
              />
            </Form.Field>
            <Form.Field style={{width: '20%'}}>
              <label>Available Quantity</label>
              <input
               type='text'
               placeholder='Available Quantity'
               readOnly
               value={this.state.data.available_quantity}
              />
            </Form.Field>
          </Form.Group>
          <Form.Field style={{width: '100%'}}
            control={TextArea}
            label="Reason for return"
            placeholder="Reason for return"
            value={this.state.data.reason_for_return}
            readOnly
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={(e) => {
              this.setState({
                ...this.state,
                open: false
              })
            }}>Close</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ViewStockModal;