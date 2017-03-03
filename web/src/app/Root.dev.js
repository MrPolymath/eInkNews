import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import routes from './routes'
import DevTools from './DevTools'
import { Router } from 'react-router'
//plugin needed for material-ui implementation, it fires
//when you click on something, but it works muchbetter in mobile
//than current react event. I will replace it as soon as react has
// its own eventhandler for Tap
import injectTapEventPlugin from 'react-tap-event-plugin';
//theme needed for material-ui implementation
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const Root = ({ store, history }) => (
  <Provider store={store}>
    <MuiThemeProvider>
      <div>
        <Router history={history} routes={routes} />
        <DevTools />
      </div>
    </MuiThemeProvider>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default Root
