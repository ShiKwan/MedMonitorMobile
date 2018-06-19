import React, { Component } from 'react';
import { AsyncStorage, Text, View, Button } from 'react-native';
import API from '../../constants/api';
import moment from 'moment'

export default class appointment extends Component {

    state = { 
        name : '',
     };

     componentDidMount(){
         console.log("physicianInfo");
        let obj = [];

        AsyncStorage.getItem('userInfo', (err, result) => {
            console.log("physician icon clicked")
            console.log(result.patientID);
            try{
                obj = JSON.parse(result);
                console.log(obj)
                console.log(obj.patientID);
                this.setState({
                    patientID: obj.patientID,
                }, function(){
                    console.log(this.state.patientID)
                    API.findPatientInfoForPatient(this.state.patientID).then( async(res) =>{
                        console.log(res.data.appointment);
                        await this.setState({
                            appointment : res.data.appointment,
                        }, function(){
                            console.log("appointment" , this.state.appointment); 
                        })
                    })
                    .catch(err =>{
                        console.log("error in finding patient info");
                    })
                });
            }
            catch(err){
                console.log(err);
            }
        });
     }
     remindUser = ()=> {
         //Send notification to phone
     }
    
    render() {
        const { count } = this.state
        const { color, size } = this.props

        return (
            <View>
                <View><Text>Upcoming Appointment</Text></View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{width: 150, height: 60, backgroundColor: 'powderblue'}}>
                        <Text>Date : Saturday, May 25th 2018</Text>
                        
                    </View>
                    <View style={{width: 150, height: 60, backgroundColor: 'skyblue'}}>
                        <Text>Time : 8:00 am</Text>
                    </View>
                    <View style={{width: 150, height: 60, backgroundColor: 'steelblue'}}>
                        <Text>Doctor : Dr. Heyworth John</Text>
                    </View>
                    <View style={{width: 150, height: 60, backgroundColor: 'powderblue'}}>
                        <Text>Address : 2447 Imagine Ln</Text>
                    </View>
                    <View style={{width: 200, height: 60, backgroundColor: 'skyblue'}}>
                        <Text>City, State : Cleveland, OH 44113</Text>
                    </View>
                    <View style={{width: 200, height: 60, backgroundColor: 'steelblue'}}>
                        <Text>Phone Number : (216) 115-5511</Text>
                    </View>
                    <View style={{width: 200, height: 60, backgroundColor: 'steelblue'}}>
                        <Text>Comments : Please bring your medications with you over the next visit!</Text>
                    </View>
                    <View>
                        <Button onPress={({}) => this.remindUser()} title="Remind me" />
                    </View>
                </View>
            </View>            

        )
    }
}