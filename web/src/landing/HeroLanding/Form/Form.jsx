import React from 'react'
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index'
import RaisedButton from 'material-ui/RaisedButton'

// import form components
import EmailInput from './EmailInput'
import SubscriptionsSelect from './SubscriptionsSelect'
import SubscriptionChips from './SubscriptionChips'
import EbookSelect from './EbookSelect'

const Form = (props) => (
  <div>
    <Grid>
      <Row>
        <Col xs={12} md={4}>
          <EmailInput handleChange={props.updateEmail} label='email'/>
        </Col>
        <Col xs={12} md={4}>
          <SubscriptionsSelect handleChange={props.addSubscription} sources={props.sources}/>
          <SubscriptionChips deleteSubscription={props.deleteSubscription} subscriptions={props.subscriptions}/>
        </Col>
        <Col xs={12} md={4}>
          <EbookSelect device={props.device} handleChange={props.selectDevice}/>
        </Col>
        {props.device === 'Kindle' && // if kindle then kindleEmail input.
          <Col xs={12} md={12}>
            <EmailInput handleChange={props.updateKindleEmail} label='Kindle email'/>
            <p style={{color:'white'}}>IMPORTANT: If you don't know what this is about, look for it on google please. With this email you will gain auto-synch feature.</p>
          </Col>
        }
          <RaisedButton
            label="get my news!"
            onTouchTap={() => props.submitForm(props.email, props.subscriptions, props.device, props.kindleEmail)}
            primary={true} style={{marginTop:'60px',  borderRadius:'20px' }} labelStyle={{fontSize:'20px',height: '40px', marginTop:'10px',  borderRadius:'20px' }}
            buttonStyle={{height:'45px', borderRadius:'20px' }} overlayStyle={{height:'40px',paddingLeft:'20px',paddingRight:'20px', paddingTop:'5px', borderRadius:'20px' }}/>
      </Row>
    </Grid>
  </div>
)

export default Form;
