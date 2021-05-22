import React from 'react';
import { Button, Form, Label, Segment, Table } from 'semantic-ui-react';
import api from '../../api';
import CreateStockModal from '../modals/CreateStockModal';
import Navbar from '../navbar/navigation/navbar';
import moment from 'moment-timezone';
import ViewStockModal from '../modals/ViewStockModal';

class StockPage extends React.Component {
  state = {
    stockList: []
  }

  componentDidMount = () => {
    api.stock.get().then((res) => {
      this.setState({
        ...this.state,
        stockList: res
      })
    }).catch(err => {
      console.log(err)
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
  }
}

export default StockPage;