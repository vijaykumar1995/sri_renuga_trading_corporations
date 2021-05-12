import React from 'react';
import { Button, Checkbox, Dropdown, Form, Message, Modal } from 'semantic-ui-react';
import api from '../../api';

class CreateProductModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        gst_percentage: '',
        hsn_code: '',
        availability: 0,
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
        active: true
      },
      categoriesList: [],
      weightList: [],
      success: '',
      message: '',
      open: false
    }
  }

  componentDidMount = () => {
    api.categories.get().then((categoriesRes) => {
      let categories = [];
      for(let i of categoriesRes) {
        categories.push({
          text: i.name,
          value: JSON.stringify(i)
        })
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
      }

      this.setState({
        ...this.state,
        weightList: weights,
      })
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
        success: '',
        message: '',
        data: {
          ...this.state.data,
          active: value
        }
      })
    } else {
      this.setState({
        ...this.state,
        success: '',
        message: '',
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
        hsn_code: category.hsn_code,
      },
      success: '',
      message: ''
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
      },
      success: '',
      message: '',
      
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
      api.product.create(data).then((res) => {
        this.setState({
          ...this.state,
          message: 'Product created successfully',
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
            data: {
              name: '',
              gst_percentage: '',
              hsn_code: '',
              availability: 0,
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
              active: true
            },
            success: '',
            message: ''
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
      >Create Product</Button>}>
        <Modal.Header>
          Create Product
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
                data: {
                  name: '',
                  gst_percentage: '',
                  hsn_code: '',
                  availability: 0,
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
                  active: true
                },
                success: '',
                message: ''
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

export default CreateProductModal;