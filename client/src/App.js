import GuestRoute from './components/routes/GuestRoute';
import UserRoute from './components/routes/UserRoute'
import SignupPage from '../src/components/pages/SignupPage';
import './App.css';
import PropTypes from "prop-types";
import LoginPage from './components/pages/LoginPage';

function App({location}) {
  return (
    <>
    <UserRoute location = { location } path = "/signup" exact component={SignupPage} />
    <GuestRoute location = { location } path = "/" exact component={LoginPage} />
    </>
  );
}

App.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired
	}).isRequired
};

export default App;
