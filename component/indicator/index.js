import React, { Component } from 'react';
import {
    View,ActivityIndicator
} from 'react-native';
import {width,height} from '../../helperScreen'


class IndicatorScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {animating} = this.props 
        return(
            <View style = {{justifyContent:'center',alignItems:'center',position:'absolute',width,height,backgroundColor:'rgba(0,0,0,0.5)'}}>
                <ActivityIndicator animating={animating} hidesWhenStopped={true} size="large" color="white" />
            </View>
        )
    }
}
export default Indicator = (logic) => {
    return(
        logic?<IndicatorScreen animating = {logic}/>:null
    )
}