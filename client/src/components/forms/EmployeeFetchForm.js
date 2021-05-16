import React from 'react';
import { Table, Loader, Button } from 'semantic-ui-react';
import api from '../../api';
import DeleteEmployeeModal from '../modals/DeleteEmployeeModal';
import EditEmployeeModal from '../modals/EditEmployeeModal';
import decode from 'jwt-decode';

class EmployeeFetchForm extends React.Component {
  state = {
    employeeList: [],
    loader: true
  }
  componentDidMount= () => {
    api.user.get().then((res) => {
      this.setState({
        ...this.state,
        employeeList: res,
        loader: false
      })
    })
  }

  render() {
    var localStorageData = localStorage.SRTJWT;
    var decodedData = decode(localStorageData);
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
              }}>Employee</p>
            <Button 
            primary
            style={{position: 'absolute', right: '0'}}
            onClick={(e) => {
              e.preventDefault();
              window.location.assign('/signup')
            }}>
              Create Employee
            </Button>
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
            <Table.Header>
              <Table.Row> 
                <Table.HeaderCell width='3'>Name</Table.HeaderCell>
                <Table.HeaderCell width='4'>Phone Number</Table.HeaderCell>
                <Table.HeaderCell width='4'>Email Id</Table.HeaderCell>
                <Table.HeaderCell width='3'>Role</Table.HeaderCell>
                <Table.HeaderCell width='2'>Actions</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.employeeList.map((employee, index) => (
                <Table.Row key={index}>
                <Table.Cell width='3'>
                  {employee.name}
                </Table.Cell>
                <Table.Cell width='4'>
                  {employee.ph_number}
                </Table.Cell>
                <Table.Cell width='4'>
                  {employee.email_id}
                </Table.Cell>
                <Table.Cell width='3'>
                  {employee.role}
                </Table.Cell>
                <Table.Cell width='2'>
                  {employee.ph_number !== decodedData.ph_number && (
                    <EditEmployeeModal employee={employee} />
                    
                  )}
                  {employee.ph_number !== decodedData.ph_number && (
                    <DeleteEmployeeModal employee={employee} />
                    
                  )}
                  
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

export default EmployeeFetchForm;