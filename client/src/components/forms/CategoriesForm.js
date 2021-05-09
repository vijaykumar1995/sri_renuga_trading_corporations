import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import api from '../../api';
import CreateCategoriesModal from '../modals/CreateCategoriesModal';
import EditCategoriesModal from '../modals/EditCategoriesModal';
import DeleteCategoriesModal from '../modals/DeleteCategoriesModal';

class Categories extends React.Component {
  state = {
    categoriesList: [],
    prevCategoriesList: [],
    loader: true
  }
  componentDidMount= () => {
    api.categories.get().then((res) => {
      this.setState({
        ...this.state,
        categoriesList: res,
        prevCategoriesList: res,
        loader: false
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
              }}>Categories</p>
            <CreateCategoriesModal />
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
                <Table.HeaderCell width='6'>Category Name</Table.HeaderCell>
                <Table.HeaderCell width='4'>HSN Code</Table.HeaderCell>
                <Table.HeaderCell width='4'>GST Percentage</Table.HeaderCell>
                <Table.HeaderCell width='2'>Actions</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.categoriesList.map((category, index) => (
                <Table.Row key={index}>
                <Table.Cell width='6'>
                  {category.name}
                </Table.Cell>
                <Table.Cell width='4'>
                  {category.hsn_code}
                </Table.Cell>
                <Table.Cell width='4'>
                  {category.gst_percentage}
                </Table.Cell>
                <Table.Cell width='2'>
                  <EditCategoriesModal category={category} />
                  <DeleteCategoriesModal category={category} />
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

export default Categories;