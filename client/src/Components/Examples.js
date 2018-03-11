import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { exampleCreatedAction, exampleDeletedAction } from "../Actions/actionCreator";
import Constants from '../Constants'
import Example from './Example'

class Examples extends Component {
  state = {
    examples: []
  };

  componentDidMount() {
    this.callApi()
  }

  componentWillReceiveProps(newProp){
    //called 
    this.callApi();
  }

  callApi = () => {
    axios.get(Constants.API_URL + '/examples/fetch').then((res)=>{
      this.setState({examples: res.data.examples})
    }).catch((err)=>{
      console.log('error creating example', err);
    })

  };

  render() {
    let examples = (<div></div>)
    if(this.state.examples.length > 0){
    examples = this.state.examples.map((example) =>(
      <Example doc={example} key={example._id}/>
    ))
    }
    return (
        <div className="container-fluid">
            <div>Examples List</div>
            {examples}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  example_created: state.ExamplesReducer.example_created,
  example_deleted: state.ExamplesReducer.example_deleted
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Examples);


const styles = {
}