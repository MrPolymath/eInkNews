import React from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

// const subscriptions = [
//   <MenuItem key={'bbc'} name={'bbc'} value={'BBC'} primaryText="BBC" />,
//   <MenuItem key={'hackernews'} name={'hackernews'} value={'Hacker News'} primaryText="Hacker News" />,
//   <MenuItem key={'elmundo'} name={'elmundo'} value={'El mundo'} primaryText="El mundo" />,
//   <MenuItem key={'lavanguardia'} name={'lavanguardia'} value={'La Vanguardia'} primaryText="La Vanguardia" />
// ]

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
          floatingLabelText="Add subscriptions"
          floatingLabelStyle={styles.floatingLabelStyle}
          labelStyle={styles.inputStyle}
          menuItemStyle={styles.menuItemStyle}
        >
          {props.sources.map((source) => (
            <MenuItem key={source.key} name={source.key} value={source.name} primaryText={source.name} />
          ))}
        </SelectField>
      </div>
)

export default SubscriptionsSelect
