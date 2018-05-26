import React from 'react';
import { StyleSheet,Keyboard, Text, View, TextInput , KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
// import { EvilIcons,Ionicons,Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Foundation';

import LinearGradient from 'react-native-linear-gradient';
import {width,height} from '../../helperScreen'
var qs = require('qs');
import Indicator from '../../component/indicator'
import axios from 'axios'
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password:'',
      isFetching:false
    }
  }
    render() {
      const {isFetching} = this.state
      return(
        <View style = {{flex:1}}>
          <LinearGradient style = {{flex:1}} colors = {['#F58163','#945A4A','#372416']}>
          <KeyboardAvoidingView behavior = {'position'} style = {{flex:1,backgroundColor:'rgba(255,255,255,0.1)'}}>
            <View style = {{justifyContent:'space-between',alignItems:'center',flex:1}}>
              <View style = {{width,height:height/2,alignItems:'center',justifyContent:'center'}}>
                <Icon name="checkbox" size={width/3} color="white" />
                <Icon name="torsos" size={width/5} color="white" />
              </View>
              
              <View style = {{alignItems:'center',height:height/2,justifyContent:'flex-end'}}>
                <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                paddingLeft:20,
                backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                  <Icon name="torso" size={30} color="rgba(255,255,255,0.5)" />
                  <TextInput 
                  onChangeText = {(text)=>this.setState({username:text})}                                    
                  underlineColorAndroid='transparent'
                  placeholder={'ID'} placeholderTextColor = {'white'} 
                  style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                </View>
  
                <View style = {{marginBottom:10,flexDirection:'row',width:width-40,height:50,borderRadius:25,
                paddingLeft:20,
                backgroundColor:'rgba(255,255,255,0.1)',alignItems:'center'}}>
                  <Icon name="unlock" size={30} color="rgba(255,255,255,0.5)" />
                  <TextInput 
                  secureTextEntry = {true}                                        
                  onChangeText = {(text)=>this.setState({password:text})}
                  underlineColorAndroid='transparent'
                  placeholder={'Password'} placeholderTextColor = {'white'} 
                  style = {{color:'white',paddingLeft:10,fontWeight:'500',flex:1,paddingRight:20}}/>
                </View>
                <TouchableOpacity onPress = {()=>{
                    const {username,password} = this.state
                    Keyboard.dismiss()
                    if (username!='' && password!='') {
                      this.setState({isFetching:true})
                      //parameter can gui
                      const json = {
                        username,password
                      }
                      axios.post('http://cretatech.com:8800/applogin',qs.stringify(json))
                      .then(response => {
                          if (response.data.status == 'OK') {
                            this.props.navigation.navigate('Main',{student_ID:this.state.username});   
                            this.setState({isFetching:false})                            
                              alert("Login Success")
                          } else {
                            this.setState({isFetching:false})                                                        
                              alert("Your Username or Password incorrect")
                          }
                      })
                      .catch(error => {
                        console.log(error);
                        this.setState({isFetching:false})                                                  
                        alert("Please check your network again")
                      });
                    } else {
                      this.setState({isFetching:false})                                                  
                      alert('Please fill all information')
                    }
                  }}>
                    <View style = {{width:width-40,height:50,borderRadius:25,backgroundColor:'#F44C27',justifyContent:'center',alignItems:'center'}}>
                        <Text style = {{color:'white',fontWeight:'600'}}>Get Started</Text>
                    </View>
                </TouchableOpacity>
                <View style = {{width,paddingTop:20,paddingBottom:20,paddingLeft:20,paddingRight:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <TouchableOpacity onPress = {()=>{
                    Keyboard.dismiss()
                    this.props.navigation.navigate('Signup');                                                                                    
                  }}>
                    <Text style = {{color:'rgba(255,255,255,0.5)',fontSize:12}}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style = {{color:'rgba(255,255,255,0.5)',fontSize:12}}>Need help</Text>
                  </TouchableOpacity>
                </View>
  
              </View>
            </View>
            </KeyboardAvoidingView>
          </LinearGradient>
          {Indicator(isFetching)}
        </View>
      )
    }
  }