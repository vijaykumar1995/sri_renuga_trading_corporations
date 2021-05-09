import React from 'react';
import CategoriesForm from '../forms/CategoriesForm';
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
        <CategoriesForm />
      </div>
      
    )
  }
}

export default CategoriesPage;