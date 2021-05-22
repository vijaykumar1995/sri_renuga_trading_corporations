import React from 'react';
import { Button, Divider, Dropdown, Form, Message, Table } from 'semantic-ui-react';
import api from '../../api';
import CreateStockModal from '../modals/CreateStockModal';
import DeleteStockModal from '../modals/DeleteStockModal';
import EditStockModal from '../modals/EditStockModal';
import ViewStockModal from '../modals/ViewStockModal';
import Navbar from '../navbar/navigation/navbar';

class CreateStockPage extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      data: {
        invoice_number:'',
        purchase_date: '',
        company_name: {
          display_value: '',
          actual_value: ''
        },
        gst_Number: '',
        stockList: [],
      },
      
    }
  }


  componentDidMount = () => {
    api.purchase_company.get().then(purchaseCompanyList => {
      let purchaseCompany = [];
      for(let i of purchaseCompanyList) {
        purchaseCompany.push({
          text: i.name,
          value: JSON.stringify(i)
        })
      }
      this.setState({
        ...this.state,
        purchaseCompanyList: purchaseCompany
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

  onClickHandle = (response) => {
    console.log(response);
    var stockList = [];
    stockList = this.state.data.stockList;
    stockList.push(response);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        stockList
      }
    })
  }

  onClickDeleteHandle = (key) => {
    var stockList = this.state.data.stockList;
    stockList.splice(key, 1);
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        stockList
      }
    })
  }

  onChangeCompanyName = (e, data) => {
    e.preventDefault();
    var company = JSON.parse(data.value);
    console.log(company)
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        gst_Number: company.gst_number,
        company_name: {
          display_value: data.value,
          actual_value: company._id
        },
        
      }
    })

  }

  onClickHandleEdit(product, index) {
    var stockList = this.state.data.stockList;
    stockList[index] = product;
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        stockList
      }
    })
  }

  onClickSave = (e) => {
    e.preventDefault();
    api.stock.create(this.state.data).then(res => {

    })
  }

  render() {
    return(
      <div>
        <Navbar/>
        <div style={{position: 'relative', top: '10px'}}>
          <p 
            style={{
              fontSize:"2rem",
              fontWeight: '900', 
              display: 'inline-block',
              position:'relative', 
              left: '50%', 
              transform: 'translateX(-50%)'
            }}>Stock</p>
            <Button onClick={(e) => {
                e.preventDefault()
                window.location.assign('/stock')
              }}
              style={{position: 'absolute', right: '10px'}}
            >Back</Button>
        </div>
        <Divider />
        <Form style={{marginLeft: '2%', marginRight: '2%'}} >
        
          <Form.Group>

          <Form.Field style={{width: '25%'}} error={this.state.success === 'false'}>
            <label>Invoice Number</label>
            <input 
              // value={this.state.data.name}
              type='text' 
              placeholder='Enter the Invoice Number' 
              onChange={(e) => {this.onChange(e, 'invoice_number')}}
              value={this.state.data.invoice_number}
            />
          </Form.Field>

          <Form.Field style={{width: '25%'}} error={this.state.success === 'false'}>
            <label>Purchase Date</label>
            <input 
              // value={this.state.data.name}
              type='Date' 
              placeholder='Enter the Invoice Number' 
              onChange={(e) => { this.onChange(e, 'purchase_date') }} 
              value={this.state.data.purchase_date}
            />
          </Form.Field>

          
            <Form.Field style={{width: '30%'}}>
              <label>Purchase Company</label>
              <Dropdown 
                placeholder='Select the Purchase Company'
                fluid
                search
                selection
                options={this.state.purchaseCompanyList}
                onChange={(e,data) => {this.onChangeCompanyName(e, data)}}
                value={this.state.data.company_name.display_value}
              />
            </Form.Field>
            <Form.Field style={{width: '23%'}}>
              <label>GSTN Number</label>
              <input
               type='text'
               readOnly
               placeholder='GSTN Number'
               value={this.state.data.gst_Number}
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
          
          <Divider />
            <div>
              <p 
                style={{
                  fontSize:"2rem",
                  fontWeight: '900', 
                  display: 'inline-block',
                  position:'relative', 
                  left: '50%', 
                  transform: 'translateX(-50%)'
                }}>Product</p>
                <CreateStockModal onClick={(data) => this.onClickHandle(data)} />
            </div>
          
            <Button style={{position: 'relative', left: '50%', transform: 'translateX(-50%)'}} primary onClick={(e) => this.onClickSave(e)}>Save</Button>
            <Table unstackable 
            structured 
            fixed 
            padded
            collapsing 
            style={{
                  width: '99%',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
            >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Product
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Batch Number
                </Table.HeaderCell>
                <Table.HeaderCell>
                  HSN Code
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Quantity Purchased
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Expiry Date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  GST Percentage
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Unit Price
                </Table.HeaderCell>
                <Table.HeaderCell>
                  CGST Amount
                </Table.HeaderCell>
                <Table.HeaderCell>
                  SGST Amount
                </Table.HeaderCell>
                <Table.HeaderCell width='2'>
                  Actions
                </Table.HeaderCell>
              </Table.Row>
            
            </Table.Header>
            <Table.Body>
              {this.state.data.stockList.length === 0 && (
                <Table.Row>
                  <Table.Cell colspan="10">
                    <div style={{ textAlign: 'center', fontSize: '20px' }}>
                      <p>Please click <b>'Add Product Details'</b> to see the Product Details</p>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
    
              {this.state.data.stockList.length > 0 && this.state.data.stockList.map((stock, index) => (
                <Table.Row key={index}>
                <Table.Cell>
                  {stock.product.display_value2}
                </Table.Cell>
                <Table.Cell>
                  {stock.batch_number}
                </Table.Cell>
                <Table.Cell>
                  {stock.hsn_code}
                </Table.Cell>
                <Table.Cell>
                  {stock.quantity}
                </Table.Cell>
                <Table.Cell>
                  {stock.expiry_date}
                </Table.Cell>
                <Table.Cell>
                  {stock.gst_percentage}
                </Table.Cell>
                <Table.Cell>
                  {stock.unit_price}
                </Table.Cell>
                <Table.Cell>
                  {stock.cgst_cost}
                </Table.Cell>
                <Table.Cell>
                  {stock.sgst_cost}
                </Table.Cell>
                <Table.Cell width='2'>
                  <ViewStockModal stock={stock} />
                  <DeleteStockModal stock={index} onClick={(key) => this.onClickDeleteHandle(key)} />
                  <EditStockModal 
                    stock={stock}
                    index={index}
                    onClickEdit={(product, index) => this.onClickHandleEdit(product, index)}
                  />
                </Table.Cell>
              </Table.Row>
              ))}
                
              </Table.Body>
            
            
          </Table>
          <Button
           style={{position: 'absolute', left: '50%', transform: 'translateX(-50%)'}} 
           primary
           onClick={(e) => this.onClickSave(e)}
          >Save</Button>
      </div>
        
    )
  }
}

export default CreateStockPage;