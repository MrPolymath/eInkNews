import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const SubmitButton = (props) => (
  <RaisedButton
    label={props.label}
    onTouchTap={() => props.handleTap}
    primary={true}
    style={{marginTop:'60px',  borderRadius:'20px' }}
    labelStyle={{fontSize:'20px',height: '40px', marginTop:'10px',  borderRadius:'20px' }}
    buttonStyle={{height:'45px', borderRadius:'20px' }}
    overlayStyle={{height:'40px',paddingLeft:'20px',paddingRight:'20px', paddingTop:'5px', borderRadius:'20px' }}
  />
)

export default SubmitButton
