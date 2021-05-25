import React from 'react';
import { Button, Divider, Form, Icon, Loader, Message, Modal, Table } from 'semantic-ui-react';
import api from '../../api';
import ViewStockModal from '../modals/ViewStockModal';
import Navbar from '../navbar/navigation/navbar';
import momentTimeZone from 'moment-timezone'

class CreateStockPage extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      data: {
        invoice_number:'',
        purchase_date: '',
        company_name: '',
        gst_Number: '',
        stockList: [],
      },
      success: '',
      _id: '',
      loader: true
    }
  }


  componentDidMount = () => {
    var params = this.props.match.params.id;
    console.log(params);
    api.stock.fetch(params).then(response => {
      this.setState({
        ...this.state,
        data: {
          ...this.state.data,
          purchase_date: response.purchase_date,
          invoice_number: response.invoice_number,
          company_name: response.company_name,
          gst_Number: response.gst_Number,
          stockList: response.stockList
        },
        loader: false
      })
    })
  }


  render() {
    if(this.state.loader === true) {
      return (
        <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
      )
    } else {
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
                readOnly
                type='text' 
                placeholder='Enter the Invoice Number'
                value={this.state.data.invoice_number}
              />
            </Form.Field>
  
            <Form.Field style={{width: '25%'}} error={this.state.success === 'false'}>
              <label>Purchase Date</label>
              <input 
                readOnly
                type='text' 
                placeholder='Purchase Date'
                value={momentTimeZone(this.state.data.purchase_date).utc().utcOffset('+05:30').format('DD-MM-YYYY')}
              />
            </Form.Field>
  
            
              <Form.Field style={{width: '30%'}}>
                <label>Purchase Company</label>
                <input
                  placeholder='Select the Purchase Company'
                  type='text'
                  readOnly
                  value={this.state.data.company_name}
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
              </div>
            
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
                        <p>No purchase details exist</p>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
      
                {this.state.data.stockList.length > 0 && this.state.data.stockList.map((stock, index) => (
                  <Table.Row key={index}>
                  <Table.Cell>
                    {stock.product}
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
                    {momentTimeZone(stock.expiry_date).utc().utcOffset('+05:30').format('DD-MM-YYYY')}
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
                    <ViewStockModal stock={stock} from='view' />
                  </Table.Cell>
                </Table.Row>
                ))}
                  
                </Table.Body>
              
              
            </Table>
  
            {this.state.success === true && (
              <Modal open={true}>
                <Modal.Content>
                  <center>
                      <Icon name='check circle outline' size='huge' color='green' />
                      
                      <h2>Success Message!</h2>
                      <p style={{fontSize: '20px'}}>Stock Created Successfully</p>
                      
                      <Button color='green' onClick={(e) => {
                        e.preventDefault();
                        window.location.assign(`/view_stock/${this.state._id}`)
                      }}>OK</Button>
                  </center>
                </Modal.Content>
              </Modal>
             )}
        </div>
          
      )
    }
    
  }
}

export default CreateStockPage;