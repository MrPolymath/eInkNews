import React, { Component } from 'react'
import {Grid,Row,Col} from 'react-flexbox-grid'
import TextInput from '../../common/components/TextInput.jsx'
import style from '../../common/common.css'
export default class Nickname extends Component {
  constructor(props){
    super(props)
    const {id, email} = props.params

    this.state = {
        nickname: '',
        id: id,
        email: email
    }
    this.changeState = this.changeState.bind(this)
  }
    changeState(evt){
      this.setState({nickname: evt.target.value})
    }

  render() {
    return (
      <Grid style={style}>
        <Row>
          <Col xs={12}>
            <p style={{color: 'white'}}>This nickna:</p>
            <TextInput label='Your Nickname' handleChange={this.changeState} />
            <p style={{color: 'white'}}>IMPORTANT: You will use this nickname to download your bundle, so please write a nickname you won't forget</p>
          </Col>
        </Row>
      </Grid>
    )
  }
}
