import './App.css';
import PropTypes from "prop-types";

import CategoriesPage from './components/pages/CategoriesPage';
import LoginPage from './components/pages/LoginPage';
import SignupPage from '../src/components/pages/SignupPage';

import GuestRoute from './components/routes/GuestRoute';
import UserRoute from './components/routes/UserRoute'

function App({location}) {
  return (
    <>
    <UserRoute location={ location } path='/categories' exact component={CategoriesPage} />
    <GuestRoute location = { location } path = "/" exact component={LoginPage} />
    <UserRoute location = { location } path = "/signup" exact component={SignupPage} />
    </>
  );
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;
