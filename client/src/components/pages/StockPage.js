import React from 'react';
import { Button, Form, Label, Loader, Segment, Table } from 'semantic-ui-react';
import api from '../../api';
import Navbar from '../navbar/navigation/navbar';
import moment from 'moment-timezone';
import ViewStockModal from '../modals/ViewStockModal';
import DailyStockExpiryUpdateModal from '../modals/DailyStockExpiryUpdateModal';

class StockPage extends React.Component {
  state = {
    stockList: [],
    loader: true,
    open: false
  }

  componentDidMount = () => {
    api.stock.get().then((res) => {
      api.stock_maintainance.get().then(stockMaintainanceRes => {
        console.log(stockMaintainanceRes);
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
                <input style={{width:'90%'}} type='date' />
              </Form.Field>
              <Form.Field>
                <label>Purchase End Date</label>
                <input style={{width:'90%'}} type='date' />
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e)}>Search</Button>
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e) }}>Clear</Button>
              </Form.Field>
                </Form.Group>
              
              </Segment>
              <Segment>
                <Form.Group>
                <Form.Field>
                <label>Invoice Number</label>
                <input type='text' placeholder='Enter the Invoice number' />
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e)}>Search</Button>
              </Form.Field>
              
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e) }}>Clear</Button>
              </Form.Field>
                </Form.Group>
              </Segment>
              <Segment>
              <Form.Group>
              <Form.Field>
                <label>Product Name</label>
                <input type='text' placeholder='Enter the Product Name' />
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary onClick={(e) => this.onClickSubmit(e)}>Search</Button>
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button onClick={(e) => { this.onClickCancel(e) }}>Clear</Button>
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
                  Product
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
                  Expiry Date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Status
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
                {stock.type === 'purchased' ? (
                  <Label color='blue'>Purchased</Label>
                ) : (
                  <Label color='green'>Return</Label>
                )}
              </Table.Cell>
              <Table.Cell>
                {moment(stock.purchase_date).utcOffset('+05:30').format('DD/MM/YYYY')}
              </Table.Cell>
              <Table.Cell>
                {stock.product}
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
                {moment(stock.expiry_date).utcOffset('+05:30').format('DD/MM/YYYY')}
              </Table.Cell>
              <Table.Cell>
                {stock.active === true ? (
                  <Label color='orange'>Active</Label>
                ) : (
                  <Label>Inactive</Label>
                )}
              </Table.Cell>
              <Table.Cell>
                <ViewStockModal stock={stock} />
              {/* <Button circular size='medium' icon='eye' /> */}
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