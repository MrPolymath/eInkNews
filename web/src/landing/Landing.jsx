import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header/Header'
import HeroLanding from './HeroLanding/HeroLanding'
import GetLinkDialog from './GetLinkDialog/GetLinkDialog'

// import actions
import {submitForm, addSubscription, deleteSubscription, selectDevice, closeDialog} from  './../actions'

const mapStateToProps = (state) => {
  return {
    email: state.landing.email,
    subscriptions: state.landing.subscriptions,
    submited: state.landing.submited,
    url: state.landing.url,
    device: state.landing.device
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (email, subscriptions, device) => dispatch(submitForm(email, subscriptions, device)),
    addSubscription: (event, index, value) => dispatch(addSubscription(event, index, value)),
    deleteSubscription: (key) => dispatch(deleteSubscription(key)),
    selectDevice: (event, index, value) => dispatch(selectDevice(event, index, value)),
    closeDialog: () => dispatch(closeDialog())
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
            selectDevice={this.props.selectDevice}
            device={this.props.device}
          />
          {/* The following dialog controls if its open or not itself */}
          <GetLinkDialog url={this.props.url} open={this.props.submited} handleClose={this.props.closeDialog}/>
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
