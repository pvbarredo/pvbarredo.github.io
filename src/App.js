import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path={`/`} render={routerProps => "test"} />
      </div>
    );
  }
}

export default App;
