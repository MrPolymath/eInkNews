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

const TextInput = (props) => (
  <div>
    <TextField
      fullWidth={true}
      floatingLabelText={props.label}
      floatingLabelStyle={styles.floatingLabelStyle}
      inputStyle={styles.inputStyle}
      onChange={props.handleChange}
    />
  </div>
);

export default TextInput;
