import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { exampleCreatedAction } from "../Actions/actionCreator";
import Constants from "../Constants"

class ExampleCreator extends Component  {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {title: ''};
  }

  handleSubmit(event) {
    //prevent from reload
    event.preventDefault();
    //create form data 
    let $this = this;
    let data = new FormData();
    data.append('title', $this.state.title);
    axios.post(Constants.API_URL + '/examples/create', data).then((res)=>{
      let example = res.data;
      $this.props.exampleCreatedAction(example);
      $this.refs.title.value = '';
    }).catch((err)=>{
      console.log('error creating example', err);
    })

  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  }

  render(){

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
          <div>Enter a title for your example doc </div>
          <input style={styles.input} type="text" ref="title" name="title" value={this.state.urlValue} onChange={this.handleInputChange} />
          </label>
          <div className="row">
            <div className="col-12">    
              <button type="submit">Create</button>
            </div>
          </div>
        </form>
      </div>
    )

  }

}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  exampleCreatedAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleCreator);

const styles = {
  input: {
    width: '100%',
    height: '50px',
    boxShadow: '0px 0px 5px green',
    borderRadius: '5px',

    border: '1px solid green',
    paddingLeft: '5px'
  }
}

