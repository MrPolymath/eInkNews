import React, { Component } from 'react'
import {Grid,Row,Col} from 'react-flexbox-grid'
import TextInput from '../../common/components/TextInput.jsx'
import SubmitButton from '../../common/components/SubmitButton.jsx'
import style from '../../common/common.css'
import {updateNickname} from '../../middleware/api'

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
    this.changeState = this.changeState.bind(this)
    this.updateNickname = updateNickname.bind(this)
  }
    changeState(evt){
      this.setState({nickname: evt.target.value})
    }

  render() {
    return (
      <Grid style={style}>
        <Row>
          <Col xs={12}>
            <h1 style={{color: 'white', marginTop:'100px'}}>Just one step away from your first bundle.</h1>
            <p style={{color: 'white', marginTop:'100px',fontSize: '20px'}}> You will use this nickname to download your ebook bundles, so please write down a nickname you will remember.</p>
            <TextInput label='Your Nickname' handleChange={this.changeState} />
          </Col>
          <Col xs={12}>
            <SubmitButton
              label="Send"
              handleTap={this.updateNickname(this.state.email, this.state.id, this.state.nickname)}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}
