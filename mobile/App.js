import React from 'react';
import { StatusBar, View } from 'react-native';
import AppContainer from '~/routes';

const App = () => (
  <>
    <StatusBar barStyle='light-content' backgroundColor='#7d40e7' />
    <AppContainer />
  </>
);

export default App;
