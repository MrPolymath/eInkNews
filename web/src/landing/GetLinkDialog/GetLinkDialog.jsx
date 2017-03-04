import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

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
        title="Here's your download link!"
        actions={actions}
        modal={false}
        open={props.open}
        onRequestClose={() => props.handleClose}
      >
        {props.url ? props.url : 'http://www.aunnohayurl.com'}
      </Dialog>
    </div>
  )
}

export default GetLinkDialog
