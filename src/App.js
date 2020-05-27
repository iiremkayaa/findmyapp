import React, { Component } from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/Main.js';
class App extends Component {
  
  render() {
    return (
      <Router>
        <NavigationBar />
            <Switch>
              <Route exact path="/" component={Main} />
            </Switch>
      </Router>
    )
  }
}
export default App;
