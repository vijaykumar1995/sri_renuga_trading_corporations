import React from 'react';
import WeightForm from '../forms/WeightForm';
import Navbar from '../navbar/navigation/navbar';

class CategoriesPage extends React.Component {
  state = {
    response: '',
    error: ''
  }

  render() {
    return(
      <div>
        <Navbar />
        <WeightForm />
      </div>
      
    )
  }
}

export default CategoriesPage;