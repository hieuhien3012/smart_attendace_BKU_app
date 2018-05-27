import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,Image,
    Animated,Easing,FlatList,ScrollView
    , KeyboardAvoidingView , TouchableOpacity, TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import LinearGradient from 'react-native-linear-gradient';
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import * as action from '../../actions/actionMain'

import axios from 'axios'
import Icon from 'react-native-vector-icons/Foundation';

import Beacons from 'react-native-beacons-manager';

// import BackgroundTask from 'react-native-background-task';
import BackgroundTimer from 'react-native-background-timer';

import Header from '../../component/header'

var qs = require('qs');

const region = {
    identifier: 'Estimotes',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
};

var check = "out";

BackgroundTimer.runBackgroundTimer(() => {
    var req = {
        rssi:'12321421421321'
    }

    axios.post('http://cretatech.com:8800/rssi',qs.stringify(req))
    // console.log("backgroundTimer");
},5000);

// BackgroundTimer.stopBackgroundTimer();

class MainScreen extends Component {
    StartImageRotateFunction () {
      this.RotateValueHolder.setValue(0)
      Animated.timing(
        this.RotateValueHolder,
        {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear
        }
      ).start(() => this.StartImageRotateFunction())
     
    }
    StopImageRotateFunction() {
        Animated.timing(
        this.RotateValueHolder
        ).stop();
    }
    constructor(props) {
        super(props)
        this.animationMain1=new Animated.Value(1)
        this.animationMain2=new Animated.Value(0)
        this.animationMain3=new Animated.Value(0)
        this.state = {
            student_ID  :   this.props.navigation.state.params.student_ID,
            room        :   '',
            teacher     :   '',
            time        :   '',
            room        :   '',
            rssi        :   '',   
        }
            this.RotateValueHolder = new Animated.Value(0);

    }
    
    subscribe = () => {
        // Listen for beacons
        const unsubscription = DeviceEventEmitter.removeAllListeners('beaconsDidRange')
		const subsription = DeviceEventEmitter.addListener('beaconsDidRange',
			(data) => {
                var req = {
                    student_ID: this.state.student_ID,
                    major: data.beacons[0].major,
                    minor: data.beacons[0].minor,
                    rssi: data.beacons[0].rssi,
                    accuracy: data.beacons[0].accuracy
                }
                if(data.beacons[0].rssi < 0){
                    var self = this
                    axios.post('http://cretatech.com:8800/app',qs.stringify(req))
                    .then(function (response) {
                        self.setState({
                            room: response.data.room,
                            rssi:data.beacons[0].rssi
                        })
                        const unsubscription = DeviceEventEmitter.removeAllListeners('beaconsDidRange')
                    })
                }
		});
    }


    sendData (state) {
        if (state == "ON") {
            check = "in"
            clearInterval(this.intervalId)
            var date = new Date()
            this.setState({
                time : '' + date.getHours() + ':' + date.getMinutes()
            })
            this.subscribe()
            this.intervalId  = setInterval(this.subscribe, 3000);
        } else if (state == "OFF") {
            var date = new Date()
            check = "out"
            this.setState({
                room: '',
                time:'' + date.getHours() + ':' + date.getMinutes(),
                rssi:''
            })
            clearInterval(this.intervalId);
        }
    }
    
    onSwipeRight(gestureState) {
        this.props.onOrOffAnimating(!this.props.animating)
    }    

    createAnimation = (value, duration,toValue) =>{
        return Animated.timing(
            value,
            {
                toValue: toValue,
                duration,
                easing:Easing.linear
            }
        )
    }

    animatingMain(value) {
        const duration = 500
        if (value) {
            Animated.parallel([
                this.createAnimation(this.animationMain1,duration,-850),
                this.createAnimation(this.animationMain2,duration,1),
                this.createAnimation(this.animationMain3,duration,1)
            ]).start()
            
        } else {
            Animated.parallel([
                this.createAnimation(this.animationMain1,2000,1),
                this.createAnimation(this.animationMain2,duration,0),
                this.createAnimation(this.animationMain3,duration,0)
            ]).start()
        }
    }

    render() {
        const RotateData = this.RotateValueHolder.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg']
        })
        this.animatingMain(this.props.animating)
        const animationMain33 = this.animationMain2.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '60deg']
        })
        const animationMain22 = this.animationMain3.interpolate({
            inputRange: [0, 1],
            outputRange: [0, (width * 0.24)]
        })


        return(
        <View style = {{flex:1}}>
            {
                //DRAWER LAYOUT
            }
            <View style = {{position:'absolute',width,height,backgroundColor:'gray',flexDirection:'row'}}>
                <View style = {{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                    <View style = {{flex:0.5,alignItems:'center'}}>
                        <TouchableOpacity onPress = {()=>{
                            this.props.onOrOffAnimating(!this.props.animating)
                            this.props.navigation.goBack(null)}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'transparent',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>LOGOUT</Text>
                            </View>
                        </TouchableOpacity>
                        
                    </View>
                </View>
                <View style = {{flex:0.5,backgroundColor:'gray'}}/>
            </View>





            <View>
                <Animated.View style = {{position:'absolute',height,width,
                    transform: [
                        { perspective: this.animationMain1 },
                        { translateX: animationMain22 },
                        { rotateY: animationMain33},
                    ]
                }}>
                <LinearGradient style = {{width,height}} colors = {['#00b09b','#96c93d']}>
                    <Header>
                        <TouchableOpacity onPress = {()=>{
                            this.props.onOrOffAnimating(!this.props.animating)
                        }}>
                            <Icon name="list" size={30} color="white" />
                        </TouchableOpacity>
                        <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <Text style = {{color:'white',fontWeight:'bold',fontSize:15,paddingBottom:10}}>WELCOME</Text>
                        </View>
                        <View style = {{width:30,height:30}}/>
                    </Header>
                    <LinearGradient colors = {['#16222A','#3A6073']} style = {{flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                    <View style = {{flex:1,alignItems:'center', backgroundColor:'rgba(0,0,0,0.1)'}}>
                        <View style = {{borderColor:'white',borderWidth:1,borderLeftWidth:0,borderRightWidth:0,paddingLeft:20,paddingRight:20,flexDirection:'row',width,justifyContent:'space-between',alignItems:'center',height:70}}>
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Icon name="clock" size={30} color="white" />
                                <Text style = {{left:10,color:'white',fontSize:20,fontWeight:'bold'}}>Time:</Text>
                            </View>
                            <Text style = {{color:'white',fontSize:20,fontWeight:'bold'}}>{this.state.time}</Text>
                        </View>
                        <View style = {{borderColor:'white',borderWidth:1,borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,paddingLeft:20,paddingRight:20,flexDirection:'row',width,justifyContent:'space-between',alignItems:'center',height:70}}>
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Icon name="ticket" size={24} color="white" />
                                <Text style = {{left:10,color:'white',fontSize:20,fontWeight:'bold'}}>Room:</Text>
                            </View>                           
                             <Text style = {{color:'white',fontSize:20,fontWeight:'bold'}}>{this.state.room}</Text>
                        </View>
                        <View style = {{borderColor:'white',borderWidth:1,borderLeftWidth:0,borderRightWidth:0,borderTopWidth:0,paddingLeft:20,paddingRight:20,flexDirection:'row',width,justifyContent:'space-between',alignItems:'center',height:70}}>
                            <View style = {{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <Icon name="info" size={30} color="white" />
                                <Text style = {{left:10,color:'white',fontSize:20,fontWeight:'bold'}}>RSSI:</Text>
                            </View>
                                                        <Text style = {{color:'white',fontSize:20,fontWeight:'bold'}}>{this.state.rssi}</Text>
                        </View>

                        <View
                        style={{position:'absolute',backgroundColor:'green',width:width/2,height:width/2,top:250,borderRadius:width/4}}
                                                />

                        <Animated.Image
                        style={{width:width/2,height:width/2,top:40,transform: [{rotate: RotateData}]}}
                        source={require('../../images/rada.png')}/>
                    </View>
                    <View style = {{width:width,height:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity style = {{marginBottom:20}} onPress = {() => {this.sendData("ON")}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'#F44C27',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>CHECK-IN</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginBottom:20}} onPress = {() => {this.sendData("OFF")}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'#F44C27',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>CHECK_OUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </LinearGradient>
                    </LinearGradient>
                    {this.props.animating==true?(
                        <TouchableWithoutFeedback 
                        onPress = {()=>{this.props.onOrOffAnimating(!this.props.animating)}}
                        style = {{width,height,position:'absolute'}}>
                            <View style = {{width,height,position:'absolute'}}/>
                        </TouchableWithoutFeedback>
                    ):null
                    }
                </Animated.View>
                </View>
                
            </View>
        )
    }

	componentDidMount() {
        //BLE set-up
		Beacons.requestWhenInUseAuthorization();
		Beacons.requestAlwaysAuthorization();
		Beacons.startMonitoringForRegion(region);
		Beacons.startRangingBeaconsInRegion(region);
		Beacons.startUpdatingLocation();
        Beacons.shouldDropEmptyRanges(true);
    this.StartImageRotateFunction();

        this.regionDidExitEvent = DeviceEventEmitter.addListener(
			'regionDidExit',
			(region) => {
				this.setState({
                    major:'',
                    minor:'',
                    rssi:'',
                    accuracy:''
				})
			}
		);
        //------------------------------------
        // this.intervalId  = null
    }
    
}

const mapStateToProps = (state) => {
    return {
        animating:state.animatingDrawer
    }
};

export default connect (mapStateToProps,action)(MainScreen);