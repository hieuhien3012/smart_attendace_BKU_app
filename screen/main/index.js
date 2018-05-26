import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput,
    Animated,Easing,FlatList,ScrollView
    , KeyboardAvoidingView , TouchableOpacity, TouchableWithoutFeedback,
    DeviceEventEmitter
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import {width,height} from '../../helperScreen'
import {connect} from 'react-redux';
import * as action from '../../actions/actionMain'

import axios from 'axios'

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
                <LinearGradient style = {{width,height}} colors = {['#F58163','#945A4A','#372416']}>
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
                    <View style = {{backgroundColor:'white',flex:1,justifyContent:'flex-end',alignItems:'center'}}>
                    <View style = {{flex:1,alignItems:'center',top:30,margin:10}}>
                        <View style = {{marginLeft:10,marginRight:10,borderColor:'green',borderWidth:1,paddingLeft:20,paddingRight:20,flexDirection:'row',width:width-20,justifyContent:'space-between',alignItems:'center',height:40}}>
                            <Text>Time:</Text>
                            <Text>{this.state.time}</Text>
                        </View>
                        <View style = {{marginLeft:10,marginRight:10,borderColor:'green',borderWidth:1,borderTopWidth:0,paddingLeft:20,paddingRight:20,flexDirection:'row',width:width-20,justifyContent:'space-between',alignItems:'center',height:40}}>
                            <Text>Room:</Text>
                            <Text>{this.state.room}</Text>
                        </View>
                        <View style = {{marginLeft:10,marginRight:10,borderColor:'green',borderWidth:1,borderTopWidth:0,paddingLeft:20,paddingRight:20,flexDirection:'row',width:width-20,justifyContent:'space-between',alignItems:'center',height:40}}>
                            <Text>RSSI:</Text>
                            <Text>{this.state.rssi}</Text>
                        </View>
                    </View>
                    <View style = {{backgroundColor:'white',width:width,height:50,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

                        <TouchableOpacity style = {{marginBottom:20}} onPress = {() => {this.sendData("ON")}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'red',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>CHECK-IN</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginBottom:20}} onPress = {() => {this.sendData("OFF")}}>
                            <View style = {{width:width/2-20,height:40,backgroundColor:'red',
                            borderWidth:1,borderColor:'white',
                            borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                                <Text style = {{color:'white',fontWeight:'bold'}}>CHECK_OUT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </View>
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