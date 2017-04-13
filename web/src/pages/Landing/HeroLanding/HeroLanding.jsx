import React from 'react'
import styles from './HeroLanding.css'
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index'

// import own components
import Form from './Form/Form'

const HeroLanding = (props) =>{
  return (
    <div className={styles.mainDiv}>
        <Grid>
          <Row center="xs" start="md">
            {/* TEXT CONTAINER */}
            <Col md={4} mdOffset={1} lgOffset={0} lg={5} className={styles.textColumn}>
              <h1 className={styles.primaryText}>eink.news</h1>
              <h2 className={styles.secondaryText}>Your favourite news and blogs on your eBook every morning, automatically.</h2>
              <div className={styles.buttonContainer}>
              </div>
            </Col>
          </Row>
        </Grid>
        <Form
          submitForm={props.submitForm}
          email={props.email}
          kindleEmail={props.kindleEmail}
          updateKindleEmail={props.updateKindleEmail}
          subscriptions={props.subscriptions}
          addSubscription={props.addSubscription}
          deleteSubscription={props.deleteSubscription}
          selectDevice={props.selectDevice}
          device={props.device}
          updateEmail={props.updateEmail}
          sources={props.sources}
        />
    </div>
  )
}

export default HeroLanding
