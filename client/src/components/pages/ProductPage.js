import React from 'react';
import ProductsForm from '../forms/ProductsForm';
import Navbar from '../navbar/navigation/navbar';

class ProductsPage extends React.Component {
  state = {
    response: '',
    error: ''
  }

  render() {
    return(
      <div>
        <Navbar />
        <ProductsForm />
      </div>
      
    )
  }
}

export default ProductsPage;