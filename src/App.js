import React, { Component } from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main.js';
import Register from './components/Register';
import Login from './components/Login'
import Profile from './components/Profile';
import AddingApp from './components/AddingApp';
import MySharings from './components/MySharings';
import Suggestions from './components/Suggestions';
import Logout from './components/Logout';
class App extends Component {
  
  render() {
    return (
      <Router>
        <NavigationBar />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/signup" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/share" component={AddingApp} />
              <Route exact path="/sharings" component={MySharings} />
              <Route exact path="/suggestions" component={Suggestions} />
              <Route exact path="/logout" component={Logout} />
            </Switch>
      </Router>
    )
  }
}
export default App;
