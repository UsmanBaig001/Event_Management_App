import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { store, persister } from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import AppNavigator from './src/AppNavigator';
import { StatusBar } from 'react-native';

class App extends Component {
  render() {
    return (
      <PersistGate loading={null} persistor={persister}>
        <Provider {...{ store }}>
          <StatusBar backgroundColor={"transparent"} translucent={true} />
          <AppNavigator />
        </Provider>
      </PersistGate>

    )
  }
}

export default App