import React from 'react';
import WeightForm from '../forms/WeightForm';

class CategoriesPage extends React.Component {
  state = {
    response: '',
    error: ''
  }

  render() {
    return(
      <div>
        <WeightForm />
      </div>
      
    )
  }
}

export default CategoriesPage;