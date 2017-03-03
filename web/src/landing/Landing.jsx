import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header/Header'
import HeroLanding from './HeroLanding/HeroLanding'

// import actions
import {sampleAction} from  './../actions'

const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sampleAction: () => dispatch(sampleAction()),
  }
}
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {height: props.height};
  }
  componentDidMount(x,y,z){
   this.setState({height: window.innerHeight});
  }

  render() {
    return (
      <div>
          <Header/>
          <HeroLanding />
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
