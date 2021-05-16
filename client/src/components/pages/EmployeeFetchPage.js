import React from 'react';
import EmployeeFetchForm from '../forms/EmployeeFetchForm';
import Navbar from '../navbar/navigation/navbar';
import decode from 'jwt-decode';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';

class EmployeeFetchPage extends React.Component {
  state = {
    response: '',
    error: '',
    role: '',
    loader: true
  }

  componentDidMount = () => {
    var localStorageData = localStorage.SRTJWT;
    var decodedData = decode(localStorageData);
    axios
      .get(`/api/employee/profile_details`, {
        params: { ph_number: decodedData.ph_number }
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          ...this.state,
          role: response.data.details.role,
          loader: false
        })
      })
  }

  render() {
    console.log(this.state.role);
    return(
      <div>
        <Navbar />
        { this.state.loader === true && (
          <Loader active inline='centered' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
        )

        }
        {((this.state.role === 'Management' || this.state.role === 'Developer') && this.state.loader === false) && (
          <EmployeeFetchForm />
        )}
        {(this.state.role === 'Employee' && this.state.loader === false) &&
        (
          <p style={{position: 'absolute', left: '50%', top:'50%', transform: 'translate(-50%, -50%)', fontSize: '20px', fontWeight:'900'}}>Sorry you don't have access to this page</p>
        )}
        
      </div>
      
    )
  }
}

export default EmployeeFetchPage;