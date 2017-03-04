import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const subscriptions = [
  <MenuItem key={1} value={'BBC'} primaryText="BBC" />,
  <MenuItem key={2} value={'Hacker News'} primaryText="Hacker News" />,
  <MenuItem key={3} value={'El mundo'} primaryText="El mundo" />,
  <MenuItem key={4} value={'La Vanguardia'} primaryText="La Vanguardia" />
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

const SubscriptionsSelect = (props) => (
      <div>
        <SelectField
          value={null}
          fullWidth={true}
          onChange={props.handleChange}
          floatingLabelText="Add subscription"
          floatingLabelStyle={styles.floatingLabelStyle}
          labelStyle={styles.inputStyle}
          menuItemStyle={styles.menuItemStyle}
        >
          {subscriptions}
        </SelectField>
      </div>
)

export default SubscriptionsSelect
