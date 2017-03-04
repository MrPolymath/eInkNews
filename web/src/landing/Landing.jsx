import React, { Component } from 'react'
import { connect } from 'react-redux'

import Header from './Header/Header'
import HeroLanding from './HeroLanding/HeroLanding'
import GetLinkDialog from './GetLinkDialog/GetLinkDialog'

// import actions
import {submitForm, updateEmail, addSubscription, deleteSubscription, selectDevice, closeDialog, getSubsFromDB} from  './../actions'

const mapStateToProps = (state) => {
  return {
    email: state.landing.email,
    subscriptions: state.landing.subscriptions,
    submited: state.landing.submited,
    url: state.landing.url,
    device: state.landing.device,
    sources: state.landing.sources,
    submiting: state.landing.submiting
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (email, subscriptions, device) => dispatch(submitForm(email, subscriptions, device)),
    addSubscription: (event, index, value) => dispatch(addSubscription(event, index, value)),
    deleteSubscription: (key) => dispatch(deleteSubscription(key)),
    selectDevice: (event, index, value) => dispatch(selectDevice(event, index, value)),
    closeDialog: () => dispatch(closeDialog()),
    updateEmail: (event) => dispatch(updateEmail(event)),
    getSubsFromDB: () => dispatch(getSubsFromDB())
  }
}
class Landing extends Component {
  componentWillMount() {
    console.log('we are mounting!');
    this.props.getSubsFromDB()
  }
  render() {
    const openDialog = this.props.submiting || this.props.submited === true ? true : false
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
            updateEmail={this.props.updateEmail}
            sources={this.props.sources}
          />
          {/* The following dialog controls if its open or not itself */}
          <GetLinkDialog
            url={this.props.url}
            open={openDialog}
            handleClose={this.props.closeDialog}
            submiting={this.props.submiting}
          />
      </div>
    )
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
