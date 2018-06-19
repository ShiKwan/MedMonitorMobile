import React, { Component } from 'react';
import {AsyncStorage, Text, TextInput, View, Button } from 'react-native';
import API from '../../constants/api';

export default class login extends Component {

    state = { 
        email: '',
        password : '',
        patientID : '',
        firstName : '',
        lastName : '',
        physicianInfo : {},
        appointment : {},
        episode : {},
        msgCenter : ''
     };
     userLogin = () => {
        objLogin = 
        {
            username: 'bill' ,
            password: 'abc123',
        }
        API.login(objLogin).then(res =>{
            console.log("wee");
            console.log(res.data)
            objUserInfo= {
                userID : res.data._id,
                email : res.data.email,
                patientID : res.data.patient_id,
                role : res.data.role,
                username : res.data.username
            }
            AsyncStorage.setItem('userInfo',JSON.stringify(objUserInfo), () => {
                AsyncStorage.getItem('userInfo', (err, result) => {
                    console.log("Login button clicked")
                    console.log(result);
                    console.log(objUserInfo.username);
                    if(objUserInfo && objUserInfo.patientID){
                        this.props.getBackValidatedUser(true)
                        console.log("set validated user to true")
                    }
                }, function(){
                    API.findPatientInfoForPatient(objUserInfo.patientID).then( async(res) =>{
                        await this.setState({
                            physicianInfo: res.data.physician,
                            episode : res.data.episode,
                            appointmnet : res.data.appointment,
                            msgCenter : ''
                        }, function(){
                            console.log("Found patient ID, proceed to pull patient info");
                            console.log("appointment" , this.state.appointment);
                            console.log("physician ", this.state.physicianInfo);
                            this.props.getBackUserInfo(this.state.appointment, this.state.physicianInfo, this.state.episode)
                        })
                    })
                    .catch(err =>{
                        console.log("error in finding patient info");
                    })
                })
            })
        }).catch(err =>{
            console.log("error signing in")
            this.setState({msgCenter: 'Invalid username or password.'})
        })
     }
     componentDidMount(){

     }
     
    render() {
        
        return (
            <View style={{flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 50}}>
                <Text>Login</Text>
                <View>
                    {this.state.msgCenter !== '' ?
                    <View style={{backgroundColor: 'red'}}>
                        <Text style={{color: 'white'}}>{this.state.msgCenter}</Text>
                    </View>
                    :
                    null
                    }
                    
                    <Text>Email : </Text>
                    <TextInput style={{height:40}}
                                placeholder='enter your email here'
                                onChangeText={(email) => this.setState({email})} />
                    <Text>Password : </Text>
                    <TextInput style={{height:40}}
                                secureTextEntry={true}
                                placeholder='enter your password here'
                                onChangeText={(password) => this.setState({password})} />
                    <Button title='Sign In' onPress={() => this.userLogin()} />
                </View>

            </View>            

        )
    }
}