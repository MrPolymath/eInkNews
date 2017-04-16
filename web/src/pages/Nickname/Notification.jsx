import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export const  Notification = (props) => (
<div>
  <p style={{color: 'white', marginTop:'100px',fontSize: '26px'}}> {props.label}</p>
  <RaisedButton
    label="Okay"
    onTouchTap={props.handleTap}
    primary={true}
    style={{marginTop:'60px',  borderRadius:'20px' }}
    labelStyle={{fontSize:'20px',height: '40px', marginTop:'10px',  borderRadius:'20px' }}
    buttonStyle={{height:'45px', borderRadius:'20px' }}
    overlayStyle={{height:'40px',paddingLeft:'20px',paddingRight:'20px', paddingTop:'5px', borderRadius:'20px' }}
  />
</div>
)
Notification.propTypes = {
  label: React.PropTypes.string,
  handleTap: React.PropTypes.func
}
