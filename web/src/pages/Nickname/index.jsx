import React, { Component } from 'react'
import {Grid,Row,Col} from 'react-flexbox-grid'
import TextInput from '../../common/components/TextInput.jsx'
import style from '../../common/common.css'
import RaisedButton from 'material-ui/RaisedButton'
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
            <RaisedButton
              label="Send"
              onTouchTap={() => this.updateNickname(this.state.email, this.state.id, this.state.nickname)}
              primary={true} style={{marginTop:'60px',  borderRadius:'20px' }} labelStyle={{fontSize:'20px',height: '40px', marginTop:'10px',  borderRadius:'20px' }}
              buttonStyle={{height:'45px', borderRadius:'20px' }} overlayStyle={{height:'40px',paddingLeft:'20px',paddingRight:'20px', paddingTop:'5px', borderRadius:'20px' }}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}
