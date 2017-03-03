import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const items = [
  <MenuItem key={1} value={1} primaryText="BBC" />,
  <MenuItem key={2} value={2} primaryText="Hacker News" />,
  <MenuItem key={3} value={3} primaryText="El mundo" />,
  <MenuItem key={4} value={4} primaryText="La Vanguardia" />
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

export default class SubscriptionsSelect extends Component {
  state = {
    value: null,
  };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField
          value={this.state.value}
          onChange={this.handleChange}
          floatingLabelText="Styled Floating Label Text"
          floatingLabelStyle={styles.floatingLabelStyle}
          labelStyle={styles.inputStyle}
          menuItemStyle={styles.menuItemStyle}
        >
          {items}
        </SelectField>
      </div>
    );
  }
}
