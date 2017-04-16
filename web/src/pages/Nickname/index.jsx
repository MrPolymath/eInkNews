import React, { Component } from 'react'
import {Grid,Row,Col} from 'react-flexbox-grid'
import TextInput from '../../common/components/TextInput.jsx'
import SubmitButton from '../../common/components/SubmitButton.jsx'
import style from '../../common/common.css'
import {updateNickname} from '../../middleware/api'
import {Notification} from './Notification'
export default class Nickname extends Component {
  constructor(props){
    super(props)
    const {id, email} = props.params

    this.state = {
        nickname: '',
        id: id,
        email: email,
        response: ''
    }
    this.changeNickname = this.changeNickname.bind(this)
    this.updateNickname = updateNickname.bind(this)
    this.changeResponse = this.changeResponse.bind(this)
  }
    changeNickname(evt){
      this.setState({nickname: evt.target.value})
    }
    changeResponse(){
      this.setState({response: ''})
    }
  render() {
    return (
      <Grid style={style}>
      {this.state.response === '' ? (
        <Row>
          <Col xs={12}>
            <h1 style={{color: 'white', marginTop:'100px'}}>Just one step away from your first bundle.</h1>
            <p style={{color: 'white', marginTop:'100px',fontSize: '20px'}}> You will use this nickname to download your ebook bundles, so please write down a nickname you will remember.</p>
            <TextInput label='Your Nickname' handleChange={this.changeNickname} />
          </Col>
          <Col xs={12}>
            <SubmitButton
              label="Send"
              handleTap={this.updateNickname}
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            {this.state.response === (403||400) &&
              <Notification
                label='Sorry, an error has ocurred. Please click on the email link again and if this error keeps popping up please contact us at aerosdevs@gmail.com'
                handleTap={this.changeResponse}
              />}
            {this.state.response === 200 &&
              <Notification
                label={'Done, now you can download your first ebook bundle going at www.eink.news/d/'+this.state.nickname}
                handleTap={this.changeResponse}
              />}
            {this.state.response === 202 &&
              <Notification
                label='This nickname is already in use, please try another one'
                handleTap={this.changeResponse}
              />}
            </Col>
          </Row>
        )}
      </Grid>
    )
  }
}
