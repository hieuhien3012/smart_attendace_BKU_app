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
            <View style = {{height:60,width,backgroundColor:'#F44C27',paddingTop:20,flexDirection:'row',paddingLeft:10,paddingRight:10,justifyContent:'space-between'}}>
                {this.props.children}
            </View>
        )
    }
}