import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome'
import Greet from './components/greet';
import Blink from './components/blink';
import Counter from './components/counter';
import PatSurvey from './components/patSurvey';
import Appointment from './components/appointment';
import MedicationDue from './components/medicationDue';
import UploadVideo from './components/uploadVideo';
import PhysicianInfo from './components/physicianInfo';
import Login from './components/login';
import API from './constants/api';
import {TouchableHighlight, AsyncStorage, Alert, StyleSheet, Button, Text, View, Image, ScrollView } from 'react-native';

export default class App extends React.Component {

  componentDidMount(){
    API.findUserByUsername()
    .then((res) =>{
      console.log("Here: " , res.data);
      console.log("Another one : ", res.data.msg)
      AsyncStorage.setItem('@MedMon:key', res.data.msg, () => {
        AsyncStorage.getItem('@MedMon:key', (err, result) => {
          console.log('result here:');
          console.log(result);
        });
      });
      AsyncStorage.setItem('@MedMon:another', 'testtesttest', () => {
        AsyncStorage.getItem('@MedMon:another', (err, result2) => {
          console.log('test result: ');
          console.log(result2);
        })
      });
      console.log("AsyncStorage 2", AsyncStorage.getItem('@MedMon:another'));


    });
    
    
  }

  state = { 
    validatedUser : false,
    email : '',
    password : '',
    apptVisible : false,
    medDueVisible : false,
    patSurveyVisible : true,
    physicianInfoVisible : false,
    uploadVideoVisible : false,
    objAppointment : {},
    objPhysician : {},
    objEpisode : {}
  };
  setApptVisible = () =>{
    this.setState({
      apptVisible : true,
      medDueVisible : false,
      patSurveyVisible : false,
      physicianInfoVisible : false,
      uploadVideoVisible : false
    }, function(){
      console.log(this.state.objAppointment)
    })
  }
  setMedDueVisible= () =>{
    this.setState({
      apptVisible : false,
      medDueVisible : true,
      patSurveyVisible : false,
      physicianInfoVisible : false,
      uploadVideoVisible : false
    }, function(){
      console.log(this.state.objEpisode)
    })
  }
  setPatSurveyVisible = () =>{
    this.setState({
      apptVisible : false,
      medDueVisible : false,
      patSurveyVisible : true,
      physicianInfoVisible : false,
      uploadVideoVisible : false
    }, function(){
      console.log(this.state.objEpisode)
    })
  }
  setPhysicianInfoVisible= () =>{
    this.setState({
      apptVisible : false,
      medDueVisible : false,
      patSurveyVisible : false,
      physicianInfoVisible : true,
      uploadVideoVisible : false
    }, function(){
      console.log(this.state.objPhysician)
    })
  }
  setUploadVideoVisible = () =>{
    this.setState({
      apptVisible : false,
      medDueVisible : false,
      patSurveyVisible : false,
      physicianInfoVisible : false,
      uploadVideoVisible : true
    })
  }

  getBackValidatedUser = validatedUser => {
    this.setState({
        validatedUser: validatedUser
    }, function(){
      console.log("validatedUser:", this.state.validatedUser);
    })
  }
  getBackUserInfo = (appt, physician, episode) => {
    this.setState({
      objAppointment : appt,
      objPhysician : physician,
      objEpisode : episode
    }, function(){
      console.log("get back user info function")
      console.log(this.state.objAppointment);
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
  }


  render() {
    return (
      <View style={{alignContent:'center', flex: 1, flexDirection:'column'}}>
      <ScrollView>
        {
          this.state.validatedUser === false ?
          <View >
            <Login getBackValidatedUser={this.getBackValidatedUser} getBackUserInfo={this.getBackUserInfo}/>
          </View>
          :
          <View >
            {this.state.patSurveyVisible=== true ? 
                <PatSurvey/>
              :
              null
            }
            {this.state.apptVisible === true && this.state.objAppointment && this.state.objPhysician?
                <Appointment 
                  objAppointment={this.state.objAppointment} 
                  date={moment(this.state.objAppointment.next_appt).format("dddd, MMMM Do YYYY")}
                  time={moment(this.state.objAppointment.next_appt).format("h:mm a")}
                  comments={this.state.objAppointment.comments}

                  address="2447 Imagine Ln"
                  city="Cleveland, OH 44113"
                  officePhone="216-115-55088"
                />
              :null
            }
            {this.state.medDueVisible=== true && this.state.objEpisode?
                <MedicationDue objEpisode={this.state.objEpisode}/>
              :
              null
            }
            {this.state.physicianInfoVisible === true && this.state.objPhysician?
                <PhysicianInfo 
                  
                  officeDay="Monday - Saturday"
                  officeHour="Weekday 8:00am - 6:00pm, Sat 9:00am-2:00pm"
                />
              :
              null
            }
            {this.state.uploadVideoVisible === true ?
                  <UploadVideo/>
              :
              null
            }
          </View>
            
        }

        
      </ScrollView>
      <View style={{ justifyContent : 'space-between',marginLeft:10, marginRight:10, marginBottom: 15, bottom: 0, left: 0, right: 0, position: 'absolute', flexDirection: 'row'}}>
        <View>
          <TouchableHighlight onPress={() => this.setApptVisible()}>
            <Icon name="calendar" size={30} color="#900" />
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight onPress={() => this.setMedDueVisible()}>
            <Icon name="address-book" size={30} color="#900" />
          </TouchableHighlight>
        </View>
        <View >
          <TouchableHighlight onPress={() => this.setPatSurveyVisible()}>
            <Icon name="bookmark" size={30} color="#900" />
          </TouchableHighlight>
        </View>
        <View >
          <TouchableHighlight onPress={() => this.setPhysicianInfoVisible()}>
            <Icon name="address-book" size={30} color="#900" />
          </TouchableHighlight>
        </View>
        <View >
          <TouchableHighlight onPress={() => this.setUploadVideoVisible()}>
            <Icon name="cloud-upload" size={30} color="#900" />
          </TouchableHighlight>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
