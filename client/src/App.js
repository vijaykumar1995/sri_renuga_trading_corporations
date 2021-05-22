// import './App.css';
import PropTypes from "prop-types";

import CategoriesPage from './components/pages/CategoriesPage';
import CreateStockPage from './components/pages/CreateStockPage';
import EmployeeFetchPage from "./components/pages/EmployeeFetchPage";
import LoginPage from './components/pages/LoginPage';
import ProductPage from './components/pages/ProductPage';
import PurchaseCompanyPage from './components/pages/PurchasecompanyPage';
import SignupPage from '../src/components/pages/SignupPage';
import StockPage from "./components/pages/StockPage";
import WeightPage from '../src/components/pages/WeightPage';

import GuestRoute from './components/routes/GuestRoute';
import UserRoute from './components/routes/UserRoute'

function App({location}) {
  return (
    <>
    <UserRoute location={ location } path='/categories' exact component={CategoriesPage} />
    <UserRoute location = { location } path='/create_stock' exact component={CreateStockPage} />
    <UserRoute location={ location } path='/view_employee' exact component={EmployeeFetchPage} />
    <GuestRoute location = { location } path = "/" exact component={LoginPage} />
    <UserRoute location = {location} path = '/products' exact component={ProductPage} />
    <UserRoute location = { location } path = "/purchase_company" exact component={PurchaseCompanyPage} />
    <UserRoute location = { location } path = "/signup" exact component={SignupPage} />
    <UserRoute location = { location } path = "/stock" exact component={StockPage} />
    <UserRoute location = { location } path = "/weight" exact component={WeightPage} />
    </>
  );
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;
