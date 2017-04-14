import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import loading from '../../../assets/gears.svg'

const GetLinkDialog = (props) => {
  const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={props.handleClose}
          />,
          <FlatButton
            label="Got it!"
            primary={true}
            keyboardFocused={true}
            onTouchTap={props.handleClose}
          />
        ]
  return (
    <div>
      <Dialog
        title={props.submiting ? 'We are processing your request!' : "Here's your download link!"}
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={() => props.handleClose}
        style={{textAlign: 'center'}}
      >
        {props.url && !props.submiting ? <a href={'http://' + props.url}>{props.url}</a> : <img src={loading} alt='loading-gears'/>}
      </Dialog>
    </div>
  )
}

export default GetLinkDialog
