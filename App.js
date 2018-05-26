import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import {width,height} from './helperScreen'

import LoginScreen from './screen/login'
import SignupScreen from './screen/signup'
import MainScreen from './screen/main'

import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducer/allreducer';

const Navigator = StackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    })
  },
  Signup: {screen: SignupScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    }),
  },
  Main: {screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
      gesturesEnabled: false,
    }),
  },
});

export default class App extends React.Component {
  render() {
    return (
        <Provider store = {createStore(reducer,applyMiddleware(thunk))}>
          <Navigator/>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
