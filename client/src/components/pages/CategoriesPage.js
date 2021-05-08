import React from 'react';
import CategoriesForm from '../forms/CategoriesForm';

class CategoriesPage extends React.Component {
  state = {
    response: '',
    error: ''
  }

  render() {
    return(
      <div>
        <CategoriesForm />
      </div>
      
    )
  }
}

export default CategoriesPage;