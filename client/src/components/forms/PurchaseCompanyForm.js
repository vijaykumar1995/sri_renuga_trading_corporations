import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import api from '../../api';
import CreatePurchaseCompanyModal from '../modals/CreatePurchaseCompanyModal';
import DailyStockExpiryUpdateModal from '../modals/DailyStockExpiryUpdateModal';
import DeletePurchasecompanyModal from '../modals/DeletePurchaseCompanyModal';
import EditPurchaseCompanyModal from '../modals/EditPurchaseCompanyModal';
import ImportCSVModal from '../modals/ImportCSVModal';

class PurchaseCompanyForm extends React.Component {
  state = {
    purchaseCompanyList: [],
    loader: true,
    open: ''
  }
  componentDidMount= () => {
    api.purchase_company.get().then((res) => {
      api.stock_maintainance.get().then(stockMaintainanceRes => {
        if('Need to Update the Stock' === stockMaintainanceRes) {
          this.setState({
            ...this.state,
            purchaseCompanyList: res,
            loader: false,
            open: true
          })
        } else {
          this.setState({
            ...this.state,
            purchaseCompanyList: res,
            loader: false,
            open: false
          })
        }
        
      })
    })
  }

  generateRequest = (value) => {
    api.purchase_company.get().then((res) => {
      api.stock_maintainance.updateStockDetails.then(stockMaintainanceRes => {
          this.setState({
            ...this.state,
            purchaseCompanyList: res,
            loader: false,
            open: false
          })
        
      })
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
              }}>Purchase Company Details</p>
            <CreatePurchaseCompanyModal />
          </div>
          <div style={{position: 'relative', height: '40px'}}>
            <ImportCSVModal name='purchase company'/>
          </div>
          
          {this.state.loader === true && (
            <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
          )}
          {this.state.loader === false && (
            
            <Table 
            
            unstackable 
            structured 
            fixed 
            padded
            collapsing 
            style={{
                  width: '90%',
                  position: 'relative',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}>
             <DailyStockExpiryUpdateModal open={this.state.open} onClick={(value) => {this.generateRequest(value)}}/>
            <Table.Header>
              <Table.Row> 
                <Table.HeaderCell width='7'>Company Name</Table.HeaderCell>
                <Table.HeaderCell width='7'>GSTN number</Table.HeaderCell>
                <Table.HeaderCell width='2'>Actions</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.purchaseCompanyList.map((purchaseCompany, index) => (
                <Table.Row key={index}>
                <Table.Cell width='7'>
                  {purchaseCompany.name}
                </Table.Cell>
                <Table.Cell width='7'>
                  {purchaseCompany.gst_number}
                </Table.Cell>
                <Table.Cell width='2'>
                  <EditPurchaseCompanyModal purchaseCompany={purchaseCompany} />
                  <DeletePurchasecompanyModal purchaseCompany={purchaseCompany} />
                </Table.Cell>
              </Table.Row>
              )) }
            </Table.Body>
          </Table>
          )}
          
        </div>
      </div>
    )
  }
}

export default PurchaseCompanyForm;