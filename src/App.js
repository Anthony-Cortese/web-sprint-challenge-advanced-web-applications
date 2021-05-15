import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import "./styles.scss";
import BubblePage from './components/BubblePage';
import ColorList from './components/ColorList'
const logout = () => {
  localStorage.removeItem('token')
}
function App() {
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" href="/" onClick={logout}>logout</a>
        </header> 
        <Route path='/colors/:id' component={ColorList} />
        <PrivateRoute exact path ='/protected/bubbles' component={BubblePage} />
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.