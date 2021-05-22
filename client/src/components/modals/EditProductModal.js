import React from 'react';
import { Button, Checkbox, Dropdown, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class EditProductModal extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      data: {
        _id: '',
        name: '',
        gst_percentage: '',
        hsn_code: '',
        availability: '',
        minimum_threshold: '',
        profit_percentage: '',
        category: {
          display_value: '',
          actual_value: ''
        },
        weight: {
          display_value: '',
          actual_value: ''
        },
        active: ''
      },
      old_id: '',
      old_name: '',
      old_gst_percentage: '',
      old_hsn_code: '',
      old_availability: '',
      old_minimum_threshold: '',
      old_profit_percentage: '',
      old_category: {
        display_value: '',
        actual_value: ''
      },
      old_weight: {
        display_value: '',
        actual_value: ''
      },
      old_active: '',
      categoriesList: [],
      weightList: [],
      success: '',
      message: '',
      open: false
    }

    this.componentDidMount = () => {
      api.categories.get().then((categoriesRes) => {
        let categories = [];
        for(let i of categoriesRes) {
          categories.push({
            text: i.name,
            value: JSON.stringify(i)
          })

          if(i.name === props.product.category) {
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                category :{
                  display_value: JSON.stringify(i),
                  actual_value: i.name 
                },
                old_category :{
                  display_value: JSON.stringify(i),
                  actual_value: i.name 
                } 
              }
            })
          }
        }
        this.setState({
          ...this.state,
          categoriesList: categories
        })
      });
  
      api.weight.get().then((weightRes) => {
        let weights = [];
        for(let i of weightRes) {
          weights.push({
            text: i.name,
            value: JSON.stringify(i)
          })

          if(i.name === props.product.weight) {
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                weight :{
                  display_value: JSON.stringify(i),
                  actual_value: i.name 
                },
                old_weight :{
                  display_value: JSON.stringify(i),
                  actual_value: i.name 
                }
              }
            })
          }
        }
  
        this.setState({
          ...this.state,
          weightList: weights,
        })
      })
    }
  }

  handleModalOpen = (e) => {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          _id: this.props.product._id,
          name: this.props.product.name,
          gst_percentage: this.props.product.gst_percentage,
          hsn_code: this.props.product.hsn_code,
          availability: this.props.product.availability,
          minimum_threshold: this.props.product.minimum_threshold,
          profit_percentage: this.props.product.profit_percentage,
          active: this.props.product.active
        },
        old_id: this.props.product._id,
        old_name: this.props.product.name,
        old_gst_percentage: this.props.product.gst_percentage,
        old_hsn_code: this.props.product.hsn_code,
        old_availability: this.props.product.availability,
        old_minimum_threshold: this.props.product.minimum_threshold,
        old_profit_percentage: this.props.product.profit_percentage,
        old_active: this.props.product.active,
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

  onClickSubmit = (e) => {
    e.preventDefault();
    if(
      this.state.data.name === '' ||
      this.state.data.gst_percentage === '' ||
      this.state.data.hsn_code === '' ||
      this.state.data.category.actual_value === '' ||
      this.state.data.minimum_threshold === '' ||
      this.state.data.weight === '' ||
      this.state.data.profit_percentage === ''
    ) {
      this.setState({
        ...this.state,
        success: 'false',
        message: 'All the fields are required'
      })
    } else {
      let data = {
        _id: this.state.data._id,
        name: this.state.data.name,
        gst_percentage: this.state.data.gst_percentage,
        hsn_code: this.state.data.hsn_code,
        availability: this.state.data.availability,
        minimum_threshold: this.state.data.minimum_threshold,
        category: this.state.data.category.actual_value,
        weight: this.state.data.weight.actual_value,
        active: this.state.data.active,
        profit_percentage: this.state.data.profit_percentage
      }
    
      api.product.update(data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Product updated successfully',
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
        trigger={<Button positive onClick={(e) => { this.handleModalOpen(e) }}  circular size='medium' icon='edit' />}>
        <Modal.Header>
          Edit Product
        </Modal.Header>
        <Modal.Content>
        <Form >
          <Form.Group>
            <Form.Field style ={{ width: '35%' }} error={this.state.success === 'false'}>
              <label>Product Name</label>
              <input 
                value={this.state.data.name}
                type='text' 
                placeholder='Enter the Product Name' 
                onChange={(e) => {this.onChange(e, 'name')}} 
              />
            </Form.Field>
            <Form.Field style ={{ width: '37%' }} error={this.state.success === 'false'}>
              <label>Minimum Availability</label>
              <input 
                type='Number' 
                placeholder='Enter the number of minimum availablility'
                value={this.state.data.minimum_threshold}
                onChange={(e) => {this.onChange(e, 'minimum_threshold')}} 
              />
            </Form.Field>
            <Form.Field style ={{ width: '28%' }} error={this.state.success === 'false'}>
              <label>Profit Percentage</label>
              <input 
                type='Number' 
                placeholder='Enter the Profit Percentage'
                value={this.state.data.profit_percentage}
                onChange={(e) => {this.onChange(e, 'profit_percentage')}} 
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
          <Form.Field style={{width: '25%'}} error={this.state.success === 'false'}>
            <label>Category</label>
            <Dropdown
              placeholder='Select Category'
              fluid
              search
              selection
              options={this.state.categoriesList}
              onChange={(e, data) => {this.onChangeCategory(e, data)}}
              value={this.state.data.category.display_value}
            />
          </Form.Field>

          <Form.Field style={{width: '25%'}} error={this.state.success === 'false'}>
            <label>Weight</label>
            <Dropdown
              placeholder='Select Weight'
              fluid
              search
              selection
              options={this.state.weightList}
              onChange={(e,data) => {this.onChangeWeight(e, data)}}
              value={this.state.data.weight.display_value}
            />
          </Form.Field>

          <Form.Field style ={{ width: '22%' }} error={this.state.success === 'false'}>
            <label>GST Percentage</label>
            <input
             type='Number' 
             placeholder='GST Percentage'
             value={this.state.data.gst_percentage}
             readOnly
            />
          </Form.Field>
          <Form.Field style ={{ width: '22%' }} error={this.state.success === 'false'}>
            <label>HSN Code</label>
            <input 
              type='Number' 
              placeholder='HSN code'
              value={this.state.data.hsn_code}
              readOnly
            />
          </Form.Field>
          <Form.Field error={this.state.success === 'false'}>
            <label>Active ?</label>
            <Checkbox 
              toggle 
              onChange={(e) => {this.onChange(e, 'active')}} 
              checked={this.state.data.active} 
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

export default EditProductModal;