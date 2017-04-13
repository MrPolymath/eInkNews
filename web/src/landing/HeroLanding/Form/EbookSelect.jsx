import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const subscriptions = [
  <MenuItem key={1} value={'Kindle'} primaryText="Kindle" />,
  <MenuItem key={2} value={'Other'} primaryText="Other" />,
]

const styles = {
  floatingLabelStyle: {
    color: '#00BCD4',
  },
  inputStyle: {
    color: '#FEC007'
  },
  menuItemStyle: {
    color: '#00BCD4'
  }
}

const EbookSelect = (props) => (
      <div>
        <SelectField
          value={props.device}
          fullWidth={true}
          onChange={props.handleChange}
          floatingLabelText="Select your device"
          floatingLabelStyle={styles.floatingLabelStyle}
          labelStyle={styles.inputStyle}
          menuItemStyle={styles.menuItemStyle}
        >
          {subscriptions}
        </SelectField>
      </div>
)

export default EbookSelect
