import React, { Component } from 'react';
import {AsyncStorage, Text, View, Button } from 'react-native';
import API from '../../constants/api';
import moment from 'moment';
let times = []
let countDown = (24*60);
export default class medicationDue extends Component {

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
                        await this.setState({
                            episode : res.data.episode,
                            lastEpisode : res.data.episode[res.data.episode.length-1],
                            lastEpisodeMedication : res.data.episode[res.data.episode.length-1].medications,
                            lastEpisodeRecord : res.data.episode[res.data.episode.length-1],
                        }, function(){
                            this.populateMedDue()
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

    getMedTimes = () => {
        
        this.state.lastEpisodeMedication.map((x) => {
            x.times.map((time) =>{
                if(times.includes(time)){
                }else{
                    times.push(time);
                }
            })
        })
        times.sort(function (a, b) {
            return a - b;
        })
        /* this.populateDateObj() */

        return times;
    }

    populateMedDue = () => {
        let medDue = this.getMedTimes();
        console.log("Med due : " , medDue);
        this.setState({
            medTimes : medDue
        },function(){
            this.state.medTimes.map((x) =>{
                let date = moment().format("MM/DD/YYYY");
                let newTime = moment(x, "HHmm").format("hh:mm A")
                let currentDateTime = moment(date + ' ' + newTime)
                currentDateTime = moment(currentDateTime, "MM-DD-YYYY hh:mm A").format("dddd MM-DD-YYYY hh:mm A");
                console.log("curr date time : " , currentDateTime);
                console.log("now : ", moment())
                if((moment,"dddd MM-DD-YYYY hh:mm A").format()).diff(currentDateTime) < 0){
                    console.log("moment is diff than curr date time : ");
                    if(countDown > moment(currentDateTime).diff(moment(), "minutes"))
                    countDown = moment(currentDateTime).diff(moment(), "minutes")
                }
                this.setState({
                    newTime : newTime
                })
                
            })
        })
        
    }
    beautifyCountDown = (duration) =>{
        
        let newDurationHour = parseInt(0)
        newDurationHour = Math.floor(parseInt(duration)/parseInt(60));
        let newDurationMinutes = duration%60;
        console.log(newDurationMinutes);


        let newDuration = `${newDurationHour} hour${newDurationHour >1 ? `s` : ``} ${newDurationMinutes} minutes`
        console.log("New duration : ", newDuration);
        return(
                <Text>{newDuration !== "24 hours 0 minutes" ? newDuration : "You do not have any medication due today!"}</Text>
        )

    }
    populateDateObj = () =>{
        const arrReminder = []
        times.map( (x) =>{
            let today = moment().format("MM-DD-YYYY");
            let time = moment(x, "HHmm").format("h:mm a");
            let dateTime = moment(today + " " + time).format();
            let remindUntil = `RRULE:FREQ=DAILY;UNTIL=${moment(this.state.next_appt).format()}`
                arrReminder.push(
                    {
                        'summary': `Medication Reminder`,
                        'location': `Medication Location`,
                        'description': `MedMonitor Reminder`,
                        'start': {
                            'dateTime': `${dateTime}` ,
                            'timeZone': 'America/New_York'
                        },
                        'end': {
                            'dateTime': `${moment(dateTime).add(5, 'minute').format()}` ,
                            'timeZone': 'America/New_York'
                        },
                        'reminders': {
                        'useDefault': false,
                        'overrides': [
                            { 'method': 'email', 'minutes': 24 * 60 },
                            { 'method': 'popup', 'minutes': 10 }
                        ]
                        },
                        'recurrence': [
                                remindUntil
                        ]
                    }
                )
    })
    }
    render() {
        const { count } = this.state
        const { color, size } = this.props

        return (
            <View>
                <View><Text>Meds Due Times</Text></View>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{width: 200, height: 30}}>
                        <Text>Next Medication(s) Due In</Text>
                    </View>
                    <View style={{width: 200, height: 30}}>
                        {this.beautifyCountDown(countDown)}
                    </View>
                    <View style={{width: 200, height: 30}}>
                        <Text>Today medication due time:</Text>
                    </View>
                    <View style={{width: 200, height: 30}}>
                        {this.state.medTimes ? 
                        this.state.medTimes.map((x) =>{
                            return(
                                moment(x, "hhmm").isAfter(moment())
                                ? 
                                <Text key={x}>{moment(x, "hhmm").format("hh:mm A")}</Text>
                                :
                                null
                            )
                        })
                        :
                        null
                        }
                    </View>
                    <View>
                        <Button onPress={({}) => this.remindUser()} title="Remind me" />
                    </View>
                </View>
            </View>            

        )
    }
}