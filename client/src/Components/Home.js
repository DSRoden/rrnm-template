import React, { Component } from 'react';


import ExampleCreator from './ExampleCreator'

class Home extends Component {

  nav = (location) =>{
    this.props.history.push('/' + location);
  }

  render() {

    return (
        <div className="container-fluid">
            <div>This is the home page </div>
            <div className="col-12">    
              <button type="button" onClick={this.nav.bind(this, 'examples')}>Go to examples</button>
            </div>
        </div>
    );
  }
}

export default Home;

const styles = {
  "cardContainer": {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: '300px'
  }
}