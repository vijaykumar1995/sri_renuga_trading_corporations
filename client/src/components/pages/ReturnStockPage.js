import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import Navbar from '../navbar/navigation/navbar';

class ReturnStockPage extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <div style={{position: 'relative', top: '10px'}}>
            <p 
              style={{
                fontSize:"2rem",
                fontWeight: '900', 
                display: 'inline-block',
                position:'relative', 
                left: '50%', 
                transform: 'translateX(-50%)'
              }}>Return Stock</p>
              <Button onClick={(e) => {
                  e.preventDefault()
                  window.location.assign('/stock')
                }}
                style={{position: 'absolute', right: '10px'}}
              >Back</Button>
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
                <input style={{width:'90%'}} type='date'  />
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary >Search</Button>
              </Form.Field>
              <Form.Field style={{position: 'relative', right: '3%'}}>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button>Clear</Button>
              </Form.Field>
                </Form.Group>
              
              </Segment>
              <Segment>
                <Form.Group>
                <Form.Field>
                <label>Invoice Number</label>
                <input type='text' placeholder='Enter the Invoice number'/>
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary>Search</Button>
              </Form.Field>
              
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button>Clear</Button>
              </Form.Field>
                </Form.Group>
              </Segment>
              <Segment>
              <Form.Group>
              <Form.Field>
                <label>Product Name</label>
                <input type='text' placeholder='Enter the Product Name'/>
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button primary>Search</Button>
              </Form.Field>
              <Form.Field>
                <label style={{visibility: 'hidden'}}>Msg</label>
                <Button>Clear</Button>
              </Form.Field>
          </Form.Group>
              </Segment>
            </Segment.Group>
           
            
          </Form>
      </div>
    )
  }
}

export default ReturnStockPage;