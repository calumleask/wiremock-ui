import * as React from 'react';
import { Provider } from 'react-redux';
import AppContainer from './modules/core/containers/AppContainer';

import configureStore from './configureStore';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default Root;
