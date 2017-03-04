import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header/Header'
import HeroLanding from './HeroLanding/HeroLanding'

// import actions
import {submitForm, addSubscription, deleteSubscription} from  './../actions'

const mapStateToProps = (state) => {
  return {
    email: state.landing.email,
    subscriptions: state.landing.subscriptions,
    submited: state.landing.submited,
    url: state.landing.url
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (data) => dispatch(submitForm(data)),
    addSubscription: (event, index, value) => dispatch(addSubscription(event, index, value)),
    deleteSubscription: (key) => dispatch(deleteSubscription(key))
  }
}
class Landing extends Component {
  render() {
    return (
      <div>
          <Header/>
          <HeroLanding
            submitForm={this.props.submitForm}
            email={this.props.email}
            subscriptions={this.props.subscriptions}
            addSubscription={this.props.addSubscription}
            deleteSubscription={this.props.deleteSubscription}
          />
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
