import React from 'react';
import PurchaseCompanyForm from '../forms/PurchaseCompanyForm';
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
        <PurchaseCompanyForm />
      </div>
      
    )
  }
}

export default ProductsPage;