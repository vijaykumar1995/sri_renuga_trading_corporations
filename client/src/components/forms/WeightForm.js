import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import api from '../../api';
import CreateWeightModal from '../modals/CreateWeightModal';
import EditWeightModal from '../modals/EditWeightModal';
import DeleteWeightModal from '../modals/DeleteWeightModal';
import DailyStockExpiryUpdateModal from '../modals/DailyStockExpiryUpdateModal';

class WeightForm extends React.Component {
  state = {
    weightList: [],
    prevWeightList: [],
    loader: true,
    open: ''
  }
  componentDidMount= () => {
    api.weight.get().then((res) => {
      api.stock_maintainance.get().then(stockMaintainanceRes => { 
        if('Need to Update the Stock' === stockMaintainanceRes) {
          this.setState({
            ...this.state,
            weightList: res,
            prevWeightList: res,
            loader: false,
            open: true
          })
        } else {
          this.setState({
            ...this.state,
            weightList: res,
            prevWeightList: res,
            loader: false,
            open: false
          })
        }
      })
    })
  }

  generateRequest = (value) => {
    api.weight.get().then((res) => {
      api.stock_maintainance.updateStockDetails().then(stockMaintainanceRes => { 
        this.setState({
          ...this.state,
          weightList: res,
          prevWeightList: res,
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
              }}>Weight</p>
            <CreateWeightModal />
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
                <Table.HeaderCell width='14'>Weight</Table.HeaderCell>
                <Table.HeaderCell width='2'>Actions</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.weightList.map((weight, index) => (
                <Table.Row key={index}>
                <Table.Cell width='14'>
                  {weight.name}
                </Table.Cell>
                <Table.Cell width='2'>
                  <EditWeightModal weight={weight} />
                  <DeleteWeightModal weight={weight} />
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

export default WeightForm;