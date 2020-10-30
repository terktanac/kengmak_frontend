import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
class App extends Component {
  render() {
    return (
      <div className="App container">
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/login" render={() => <Login/>} />
      </div>
    );
  }
}
export default App;
