import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { exampleDeletedAction } from "../Actions/actionCreator";
import Constants from "../Constants"

class Example extends Component  {
  constructor (props) {
    super(props)
    this.state = {
      doc: this.props.doc,
    }
  }

  delete = () =>{
      let $this = this;
      let data = $this.state.doc;
      axios.post(Constants.API_URL + '/examples/delete', data).then((res)=>{
        let example = res.data;
        $this.props.exampleDeletedAction($this.state.doc)
      }).catch((err)=>{
        console.log('error creating example', err);
      })
  }

  render(){
    // console.warn('card image url', this.state.card.image_url)
    let title = this.state.doc.title;

    return (
      <div className="row" style={styles.example}>
        <div className="col-9">{title}</div>
        <div className="col-3">
            <div className="col-12">    
              <button type="button" onClick={this.delete.bind(this)}>Delete</button>
            </div>
        </div>
      </div>
    )
  }

}


const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  exampleDeletedAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);


const styles = {
  example: {
    width: '100%',
    height: '50px',
    backgroundColor: Constants.BRAND_COLOR_PRIMARY,
    borderRadius: '10px',
  }
}

