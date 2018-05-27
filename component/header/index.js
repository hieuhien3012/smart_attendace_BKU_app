import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {width,height} from '../../helperScreen'


export default class Header extends Component {
    render() {
        return(
        	                    <LinearGradient colors = {['#16222A','#3A6073']} style = {{height:60,width,paddingTop:25,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'}}>
                {this.props.children}
            </LinearGradient>
        )
    }
}