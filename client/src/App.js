import logo from './logo.svg';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import SignupPage from '../src/components/pages/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <SignupPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
