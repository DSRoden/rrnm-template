import React, { Component } from 'react';


import ExampleCreator from './ExampleCreator'
import Examples from './Examples'

class ExamplesPage extends Component {

  nav = (location) =>{
    this.props.history.push('/' + location);
  }

  render() {

    return (
        <div className="container-fluid">
            <div> This is the examples page </div>
            <ExampleCreator />
            <Examples />
        </div>
    );
  }
}

export default ExamplesPage;

const styles = {
  "cardContainer": {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: '300px'
  }
}