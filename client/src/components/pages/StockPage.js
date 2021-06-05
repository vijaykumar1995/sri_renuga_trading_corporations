import React from 'react';
import { Button, Form, Label, Loader, Segment, Table } from 'semantic-ui-react';
import api from '../../api';
import Navbar from '../navbar/navigation/navbar';
import moment from 'moment-timezone';
import DailyStockExpiryUpdateModal from '../modals/DailyStockExpiryUpdateModal';
import axios from 'axios';

class StockPage extends React.Component {
  state = {
    stockList: [],
    loader: true,
    open: false,
    purchase_start_date: '',
    purchase_end_date: '',
    invoice_number: '',
    product_name: ''
  }

  componentDidMount = () => {
    api.stock.get().then((res) => {
      api.stock_maintainance.get().then(stockMaintainanceRes => {
        if('Need to Update the Stock' === stockMaintainanceRes) {
          this.setState({
            ...this.state,
            stockList: res,
            open: true,
            loader: false
          })
        } else {
          this.setState({
            ...this.state,
            stockList: res,
            open: false,
            loader: false
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  generateRequest = (value) => {
    api.stock.get().then((res) => {
      api.stock_maintainance.updateStockDetails().then(stockMaintainanceRes => {
        console.log(stockMaintainanceRes);
        this.setState({
          ...this.state,
          stockList: res,
          open: false,
          loader: false
        })
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  onClickSubmit = (e, variable_name) => {
    e.preventDefault();
    if(variable_name === 'purchase date') {
      if(this.state.purchase_start_date !== '' && this.state.purchase_end_date !== '') {
        var data = {
          name: 'purchase date',
          purchase_start_date: this.state.purchase_start_date,
          purchase_end_date: this.state.purchase_end_date
        }
        axios.get('/api/stock', {params: {data: data}}).then(response => {
          this.setState({
            ...this.state,
            stockList: response.data
          })
        })
      }
    } else if(variable_name === 'invoice number') {
      console.log('in invoice number', this.state.invoice_number);
      if(this.state.invoice_number !== '') {
        var data = {
          name: 'invoice number',
          invoice_number: this.state.invoice_number
        }
        axios.get('/api/stock', { params: { data: data } }).then(response => {
          this.setState({
            ...this.state,
            stockList: response.data
          })
        })
      }
    } else if(variable_name === 'product name') {
      console.log('in invoice number', this.state.product_name);
      if(this.state.product_name !== '') {
        var data = {
          name: 'product name',
          product_name: this.state.product_name
        }
        axios.get('/api/stock', { params: { data: data } }).then(response => {
          this.setState({
            ...this.state,
            stockList: response.data
          })
        })
      }
    }
  }
  
  onChangePurchaseDate = (e, variable_name) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [variable_name]: e.target.value
    })
  }

  onClickCancel = (e, variable_name) => {
    e.preventDefault();
    if(variable_name === 'purchase date') {
      this.setState({
        ...this.state,
        purchase_start_date: '',
        purchase_end_date: ''
      })
    } else if(variable_name === 'invoice number') {
      console.log('inside the cancel of invoice')
      this.setState({
        ...this.state,
        invoice_number: ''
      })
    } else if(variable_name === 'product name') {
      this.setState({
        ...this.state,
        product_name: ''
      })
    }
    api.stock.get().then((res) => {
      this.setState({
        ...this.state,
        stockList: res
      })
    })
  }

  onChange = (e, variable_name) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [variable_name]: e.target.value
    })
  }

  render() {
    if(this.state.loader === false) {
      return(
        <div>
          <DailyStockExpiryUpdateModal open={this.state.open} onClick={(value) => {this.generateRequest(value)}}/>
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
                  window.location.assign('/create_stock')
                }} 
                primary
                style={{position: 'absolute', right: '10px'}}
              >Create Stock</Button>
              <Button color='orange' style={{position: 'absolute', right: '160px'}}>Return Stock</Button>
          </div>
          <Form>
            <Segment.Group horizontal style={{
                    width: '99%',
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}>
              <Segment>
                <Form.Group>
                <Form.Field>
                <label>Purchase Start Date</label>
                <input style={{width:'90%'}} type='date' onChange={(e) => {this.onChangePurchaseDate(e, 'purchase_start_date')}} value={this.state.purchase_start_date} />
              </Form.Field>
              <Form.Field>
                <label>Purchase End Date</label>
                <input style={{width:'90%'}} type='date' value={this.state.purchase_end_date} onChange={(e) => {this.onChangePurchaseDate(e, 'purchase_end_date')}} />
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e, 'purchase date')}>Search</Button>
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e, 'purchase date') }}>Clear</Button>
              </Form.Field>
                </Form.Group>
              
              </Segment>
              <Segment>
                <Form.Group>
                <Form.Field>
                <label>Invoice Number</label>
                <input type='text' value={this.state.invoice_number} placeholder='Enter the Invoice number' onChange={(e) => {this.onChange(e, 'invoice_number')}} />
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e, 'invoice number')}>Search</Button>
              </Form.Field>
              
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e, 'invoice number') }}>Clear</Button>
              </Form.Field>
                </Form.Group>
              </Segment>
              <Segment>
              <Form.Group>
              <Form.Field>
                <label>Product Name</label>
                <input type='text' placeholder='Enter the Product Name' value={this.state.product_name} onChange={(e) => {this.onChange(e, 'product_name')}} />
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e, 'product name')}>Search</Button>
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e, 'product name') }}>Clear</Button>
              </Form.Field>
          </Form.Group>
              </Segment>
            </Segment.Group>
           
            
          </Form>
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
                  }}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Invoice Number
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Type
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Purchase date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Company Name
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Quantity Purchased
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Quantity Available
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Actions
                </Table.HeaderCell>
              </Table.Row>
            
            </Table.Header>
            <Table.Body>
            {this.state.stockList.map((stock, index) => (
              <Table.Row key={index}>
              <Table.Cell>
                {stock.invoice_number}
              </Table.Cell>
              <Table.Cell>
                {stock.type === 'purchased' && (
                  <Label color='blue'>Purchased</Label>
                )}  
                {stock.type === 'partially_returned' &&(
                  <Label color='green'>Partially Returned</Label>
                )}
                {stock.type === 'returned' &&(
                  <Label color='grey'>Returned</Label>
                )}
              </Table.Cell>
              <Table.Cell>
                {moment(stock.purchase_date).utcOffset('+05:30').format('DD/MM/YYYY')}
              </Table.Cell>
              <Table.Cell>
                {stock.company_name}
              </Table.Cell>
              <Table.Cell>
                {stock.quantity}
              </Table.Cell>
              <Table.Cell>
                {stock.available_quantity}
              </Table.Cell>
              <Table.Cell>
                {/* <ViewStockModal stock={stock} /> */}
              <Button circular size='medium' icon='eye' onClick={(e) => {
                e.preventDefault();
                window.location.assign(`/view_stock/${stock.id}`)
              }} />
              </Table.Cell>
            </Table.Row>
            ))}
              
            </Table.Body>
            
          </Table>
        </div>
      )
    } else {
      return (
        <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
      )
    }
    
  }
}

export default StockPage;