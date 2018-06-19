import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class uploadVideo extends Component {

    state = { 
        name : '',
     };

     componentDidMount(){

     }
     remindUser = ()=> {
         //Send notification to phone
     }
    
    render() {
        const { count } = this.state
        const { color, size } = this.props

        return (
            <View>
                <View><Text>Upload Video</Text></View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{width: 200, height: 30, backgroundColor: 'powderblue'}}>
                        <Text>Share your episode video with your doctor</Text>
                    </View>
                    <View style={{width: 200, height: 30, backgroundColor: 'skyblue'}}>
                        <Text>Upload your video link here</Text>
                    </View>
                    <View style={{width: 200, height: 30, backgroundColor: 'steelblue'}}>
                        <Text placeholder='Video link here' onChangeT />
                    </View>
                </View>
            </View>            

        )
    }
}