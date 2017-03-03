import React from 'react'
import TextField from 'material-ui/TextField'

const styles = {
  floatingLabelStyle: {
    color: '#00BCD4',
  },
  floatingLabelFocusStyle: {
    color: '#00BCD4',
  },
  inputStyle: {
    color: '#FEC007'
  }
};

const EmailInput = (props) => (
  <div>
    <TextField
      floatingLabelText="email"
      floatingLabelStyle={styles.floatingLabelStyle}
      inputStyle={styles.inputStyle}
    />
  </div>
);

export default EmailInput;
