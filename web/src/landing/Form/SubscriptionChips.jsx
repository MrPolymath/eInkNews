import React from 'react';
import Chip from 'material-ui/Chip';

const SubscriptionChips = (props) => (
  <div style={{ display: 'flex', flexWrap: 'wrap'}}>
    {/* {props.subscriptions.map(this.renderChip, this)} */}
    {props.subscriptions.map((sub) => (
      <Chip
        key={sub.key}
        onRequestDelete={() => props.deleteSubscription(sub.key)}
        style={{margin: 4}}
        backgroundColor='#FEC007'
        labelColor='#0A131E'
      >
        {sub.value}
      </Chip>
    ))}

  </div>
)

export default SubscriptionChips
