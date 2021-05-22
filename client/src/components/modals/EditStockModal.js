/* eslint-disable no-redeclare */
import React from 'react';
import { Button, Dropdown, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class EditStockModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        type: 'purchased',
        reason_for_return: null,
        product: {
          display_value: '',
          actual_value: '',
          display_value2: ''
        },
        quantity: '',
        gst_percentage: '',
        hsn_code: '',
        unit_price: '',
        cgst_cost: 0.0,
        sgst_cost: 0.0,
        batch_number: '',
        expiry_date: '',
        available_quantity: '',
        active: true,
        weight: '',
        category: ''
      },
      productList: [],
      open:false,
      success: ''
      
    }
  }

  componentDidMount = () => {
    api.product.get().then(prodList => {
      let products = [];
      for(let i of prodList) {
        if(i.active === true) {
          products.push({
            text: i.name,
            value: JSON.stringify(i)
          })
        }
      }

      this.setState({
        ...this.state,
        productList: products
      })
    })
  }

  onChange = (e, fieldName) => {
    e.preventDefault();
    
    if(fieldName === 'unit_price') {
      var gst_amount = 0;
      gst_amount = (this.state.data.gst_percentage/200) * e.target.value * this.state.data.quantity;
      console.log(gst_amount);
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [fieldName]: e.target.value,
          cgst_cost: gst_amount,
          sgst_cost: gst_amount
        }
      })
    } else if(fieldName === 'quantity') {
      var gst_amount = 0;
      gst_amount = (this.state.data.gst_percentage/200) * this.state.data.unit_price * e.target.value;
      var available_quantity = 0;
      available_quantity = e.target.value
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [fieldName]: e.target.value,
          available_quantity,
          cgst_cost: gst_amount,
          sgst_cost: gst_amount
        }
      })
    } else if(
      fieldName === 'cgst_cost' ||
      fieldName === 'sgst_cost'
    ) {
      var gst_cost = e.target.value;
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          cgst_cost: gst_cost,
          sgst_cost: gst_cost
        }
      })
    } else {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          [fieldName]: e.target.value,
        }
      })
    }
    
  }

  onChangeProduct = (e, data) => {
    e.preventDefault();
    let product = JSON.parse(data.value);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        category: product.category,
        weight: product.weight,
        hsn_code: product.hsn_code,
        gst_percentage: product.gst_percentage,
        product: {
          ...this.state.data.product,
          display_value: data.value,
          display_value2: product.name,
          actual_value: product._id
        }
      }
    })
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    this.props.onClickEdit(this.state.data, this.props.index);
    this.setState({
      ...this.state,
      open: false
    })
  }

  onClickHandle = (e) => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        type: this.props.stock.type,
        reason_for_return: this.props.stock.reason_for_return,
        product: {
          display_value: this.props.stock.product.display_value,
          actual_value: this.props.stock.product.actual_value,
          display_value2: this.props.stock.product.display_value2
        },
        quantity: this.props.stock.quantity,
        gst_percentage: this.props.stock.gst_percentage,
        hsn_code: this.props.stock.hsn_code,
        unit_price: this.props.stock.unit_price,
        cgst_cost: this.props.stock.cgst_cost,
        sgst_cost: this.props.stock.sgst_cost,
        batch_number: this.props.stock.batch_number,
        expiry_date: this.props.stock.expiry_date,
        available_quantity: this.props.stock.available_quantity,
        active: this.props.stock.active,
        weight: this.props.stock.weight,
        category: this.props.stock.category
      },
      open: true
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
              name: this.state.old_name,
              _id: this.state.old_id
            },
          })
        }} 
        open={this.state.open} 
        trigger={<Button positive onClick={(e) => {
          this.onClickHandle(e)
        }}  circular size='medium' icon='edit' />
        }>
        <Modal.Header>
          Edit Product
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Group>
          <Form.Field style={{width: '25%'}}>
            <label>Product</label>
            <Dropdown
              placeholder='Select the product'
              fluid
              search
              selection
              options={this.state.productList}
              onChange={(e, data) => {this.onChangeProduct(e, data)}}
              value={this.state.data.product.display_value}
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

            <Form.Field style={{width: '25%'}}>
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
          <Form.Field style={{width: '25%'}}>
            <label>Expiry Date</label>
            <input
              type='Date'
              onChange = {(e) => {this.onChange(e, 'expiry_date')}}
              value={this.state.data.expiry_date}
            />
          </Form.Field>

          <Form.Field style={{width: '25%'}}>
              <label>Batch Number</label>
              <input
               type='text'
               placeholder='Enter the Batch Number'
               onChange={(e) => { this.onChange(e, 'batch_number') }}
               value={this.state.data.batch_number}
              />
            </Form.Field>
            <Form.Field style={{width: '25%'}}>
              <label>Product Quantity</label>
              <input
               type='number' 
               placeholder='Enter the product quantity'
               onChange={(e) => {this.onChange(e, 'quantity')}} 
               value={this.state.data.quantity}
              />
            </Form.Field>
            <Form.Field style={{width: '25%'}}>
              <label>Unit Price</label>
              <input 
                type='Number'
                placeholder='Enter the Unit price'
                onChange = {(e) => {this.onChange(e, 'unit_price')}}
                value={this.state.data.unit_price}
              />
            </Form.Field>                       
          </Form.Group>
          <Form.Group>
            <Form.Field style={{width: '25%'}}>
              <label>CGST amount</label>
              <input
               type='Number'
               placeholder='Enter the CGST amount'
               onChange = {(e) => {this.onChange(e, 'cgst_cost')}}
               value={this.state.data.cgst_cost}
              />
            </Form.Field>

            <Form.Field style={{width: '25%'}}>
              <label>SGST amount</label>
              <input
               type='Number'
               placeholder='Enter the SGST amount'
               onChange = {(e) => {this.onChange(e, 'sgst_cost')}}
               value={this.state.data.sgst_cost}
              />
            </Form.Field>

            
            <Form.Field style={{width: '25%'}}>
              <label>Total amount (With GST)</label>
              <input
               type='Number'
               placeholder='Total amount'
               readOnly
              //  onChange = {(e) => {this.onChange(e, 'sgst_cost')}}
               value={(this.state.data.quantity * this.state.data.unit_price) + (this.state.data.sgst_cost * this.state.data.quantity) + (this.state.data.cgst_cost * this.state.data.quantity)}
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

export default EditStockModal;