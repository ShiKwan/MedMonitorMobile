import React, { Component } from 'react';
import { AsyncStorage, Text, View, Button } from 'react-native';
import API from '../../constants/api';

export default class physicianInfo extends Component {

    state = { 
        name : '',
        patientID : '',
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
                        await this.setState({
                            physicianInfo: res.data.physician,
                            episode : res.data.episode,
                            appointmnet : res.data.appointment,
                            msgCenter : ''
                        }, function(){
                            console.log("Found patient ID, proceed to pull patient info");
                            console.log("appointment" , this.state.appointment); 
                            console.log("physician ", this.state.physicianInfo);
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
            this.state.physicianInfo ? 
                <View>
                    <View><Text>Physician Information</Text></View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={{width: 200, height: 60, backgroundColor: 'powderblue'}}>
                            <Text>Doctor : Dr. {this.state.physicianInfo.name.first} {this.state.physicianInfo.name.last}</Text>
                        </View>
                        <View style={{width: 200, height: 60, backgroundColor: 'skyblue'}}>
                            <Text>Office : {this.state.physicianInfo.office} </Text>
                        </View>
                        <View style={{width: 200, height: 60, backgroundColor: 'steelblue'}}>
                            <Text>E-mail : {this.state.physicianInfo.email}</Text>
                        </View>
                        <View>
                            <Text>Office Hours</Text>
                        </View>
                        <View style={{width: 200, height: 60, backgroundColor: 'powderblue'}}>
                            <Text>Day : Monday - Saturday</Text>
                        </View>
                        <View style={{width: 200, height: 60, backgroundColor: 'skyblue'}}>
                            <Text>Hour : Weekday 8:00am - 6:00pm, Saturday 9:00am - 2:00pm</Text>
                        </View>
                    </View>
                </View>  
            : 
            null
                      

        )
    }
}