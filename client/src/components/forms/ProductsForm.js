import React from 'react';
import { Table, Loader, Checkbox, Dropdown, Form, Button, Icon } from 'semantic-ui-react';
import api from '../../api'
import CreateProductModal from '../modals/CreateProductModal';
import EditProductModal from '../modals/EditProductModal';
import DeleteProductModal from '../modals/DeleteProductModal';
import ImportCSVModal from '../modals/ImportCSVModal';
import axios from 'axios';


class Products extends React.Component {
  state = {
    productsList: [],
    categoriesList: [],
    weightList: [],
    loader: true,
    productsOptions: [],
    productSearch: '',
    message: ''
  }
  componentDidMount = () => {
    api.product.get().then((productRes) => {
      let products = [];
      for(let i of productRes) {
        products.push({
          text: i.name,
          value: i.name
        })
      }
      
      let uniqueProductArray = [];
      for(let i of products) {
        let flag=0;
        for(let j of uniqueProductArray) {
          if(j.text === i.text) {
            flag = 1;
          }
        }
        if(flag === 0) {
          uniqueProductArray.push(i);
        }
      }
      this.setState({
        ...this.state,
        productsList: productRes,
        loader: false,
        productsOptions: uniqueProductArray
      })
    });
    
    
    
  }

  onChangeProduct = (e, data) => {
    // console.log(data.value, e.target.value);
    e.preventDefault();
    this.setState({
      ...this.state,
      productSearch: data.value
    })
  }

  onClickCancel = (e) => {
    e.preventDefault();
    api.product.get().then((productRes) => {
      let products = [];
      for(let i of productRes) {
        products.push({
          text: i.name,
          value: i.name
        })
      }

      let uniqueProductArray = [];
      for(let i of products) {
        let flag=0;
        for(let j of uniqueProductArray) {
          if(j.text === i.text) {
            flag = 1;
          }
        }
        if(flag === 0) {
          uniqueProductArray.push(i);
        }
      }
      this.setState({
        ...this.state,
        productsList: productRes,
        loader: false,
        productsOptions: uniqueProductArray,
        productSearch: ''
      })
    });
  }

  onClickSubmit = (e) => {
    e.preventDefault();
    if(this.state.productSearch === '') {
      api.product.get().then((productRes) => {
        let products = [];
        for(let i of productRes) {
          products.push({
            text: i.name,
            value: i.name
          })
        }
        let uniqueProductArray = [];
        for(let i of products) {
          let flag=0;
          for(let j of uniqueProductArray) {
            if(j.text === i.text) {
              flag = 1;
            }
          }
          if(flag === 0) {
            uniqueProductArray.push(i);
          }
        }
        this.setState({
          ...this.state,
          productsList: productRes,
          loader: false,
          productsOptions: uniqueProductArray
        })
      });
    } else {
      axios.get('/api/products', { params: { data:  { name: this.state.productSearch }} } ).then((res) =>{
        this.setState({
          ...this.state,
          productsList: res.data
        })
      })
    }
  }

  onClickDownloadButton = (e) => {
    e.preventDefault();
    axios.get('/api/products/csv_download').then((res) => {
      console.log(res.data.products_url);
      window.location.assign(res.data.products_url)
    }).catch(err => {
      console.log(err);
      this.setState({
        ...this.state,
        message: "error in downloading csv"
      });
    })
  }

  render() {
    return(
      <div>
        <div>
          <div style={{position: 'relative', top: '10px'}}>
            <p 
              style={{
                fontSize:"2rem",
                fontWeight: '900', 
                display: 'inline-block',
                position:'relative', 
                left: '50%', 
                transform: 'translateX(-50%)'
              }}>Products</p>
            <CreateProductModal categoriesList={this.state.categoriesList} weightList={this.state.weightList} />
          </div>
          {this.state.loader === true && (
            <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
          )}
          {this.state.loader === false && (
            <div>
              <div>
                <Form>
                  <Form.Group>
                    <Form.Field style={{width: '20%', position: 'relative', left: '1%'}}>
                      <label>Product Name</label>
                      <Dropdown
                        fluid
                        search
                        selection
                        placeholder='Enter the product name'
                        options={this.state.productsOptions}
                        value={this.state.productSearch}
                        onChange={(e, data) => this.onChangeProduct(e, data)}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label style={{visibility: 'hidden'}}>Msg</label>
                      <Button primary style={{position:'relative', left: '5%'}} onClick={(e) => this.onClickSubmit(e)}>Search</Button>
                    </Form.Field>
                    <Form.Field>
                      <label style={{visibility: 'hidden'}}>Msg</label>
                      <Button style={{position:'relative', left: '5%'}} onClick={(e) => { this.onClickCancel(e) }}>Clear</Button>
                    </Form.Field>
                  </Form.Group>
                  <Button onClick={(e) => { this.onClickDownloadButton(e) }} color='green' style={{position: 'absolute', top: '0', right: '185px'}}><Icon name='download' />Download Products</Button>
                  
                  <ImportCSVModal name='products'/>
                  
                </Form>
                
              </div>
              
              
              <Table
                unstackable 
                structured 
                fixed 
                padded
                collapsing 
                style={{
                      width: '98%',
                      position: 'relative',
                      left: '50%',
                      transform: 'translateX(-50%)'
                    }}>
                <Table.Header>
                  <Table.Row> 
                    <Table.HeaderCell width='3'>Product Name</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Category</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Weight</Table.HeaderCell>
                    <Table.HeaderCell width='2'>HSN Code</Table.HeaderCell>
                    <Table.HeaderCell width='2'>GST Percentage</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Availability</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Minimum Availability</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Profit Percentage</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Active</Table.HeaderCell>
                    <Table.HeaderCell width='2'>Actions</Table.HeaderCell>
                </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.productsList.map((product, index) => (
                    <Table.Row key={index}>
                    <Table.Cell width='3'>
                      {product.name}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.category}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.weight}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.hsn_code}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.gst_percentage}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.availability}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.minimum_threshold}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      {product.profit_percentage}
                    </Table.Cell>
                    <Table.Cell width='2'>
                      <Checkbox 
                        toggle
                        checked={product.active}
                      />
                    </Table.Cell>
                    
                    <Table.Cell width='2'>
                      <EditProductModal product={product} />
                      <DeleteProductModal product={product} />
                    </Table.Cell>
                  </Table.Row>
                  )) }
                </Table.Body>
              </Table>
            </div>
            
          )}
          
        </div>
      </div>
    )
  }
}

export default Products;