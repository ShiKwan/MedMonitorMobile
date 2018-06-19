import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';



var questions = [{
    
    survHeader: 'MEDICATION',
    question: 'Are You Current With Your Parkinson\'s Medication?',
    type : 'regular',
    answers: ['Yes, I Am', 'No, I Am Not'],
    color: ['green', 'red'],
    value: [1, 0],
    className: ['survRadBtnGreen', 'survRadBtnRed'],
    label: "meds_taken",
    selectionType: "radio",
    answered : '',
    firstQuestion : 1,
    questionNum : 0
},

// ---------- emergncy symptoms questions ---------

{
    survHeader: 'WORRYING SYMPTOMS',
    question: 'Since taking your LAST Parkinson\'s medication: have you had any:',
    answers: ['Falls', 'Freezing Of Gait', 'Choking On Food', 'Hallucinations', 'None Of These'],
    type : 'regular',
    color: ['red', 'red', 'red', 'red', 'green'],
    value: [0, 0, 0, 0, 0],
    className: ['survChkBtnRed', 'survChkBtnRed', 'survChkBtnRed', 'survChkBtnRed','survChkBtnGreen'],
    selectionType: "checkbox",
    answered : [],
    label: "emergencies",
    firstQuestion : 0,
    questionNum : 1
},

// ---------- general parkinson's questions ---------

{
    survHeader: 'KICK IN',
    question: 'Since taking your LAST Parkinson\'s medication: how long did it take to kick in?',
    answers: ['Immediately', 'After 15 Minutes', 'After 30 Minutes', 'After 1 Hour', 'After More Than 1 Hour'],
    type : 'time-series',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "kickin",
    firstQuestion : 0,
    questionNum : 2
},
{
    survHeader: 'WEARING OFF',
    question: 'Since taking your LAST Parkinson\'s medication: if wearing off, how long ago.?',
    answers: ['Did Not Wear Off', '15 Minutes Ago', '30 Minutes Ago', '1 Hours Ago', 'More Than 1 hour Ago'],
    type : 'time-series',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "wearoff",
    firstQuestion : 0,
    questionNum : 3
},

{
    survHeader: 'MOVEMENT',
    question: 'Since taking your LAST Parkinson\'s medications: have you been able to move comfortable?',
    answers: ['All Of The Time', 'Most Of The Time', 'About Half The Time', 'Less Than Half The Time', 'None Of The Time'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "movement",
    answered : '',
    firstQuestion : 0,
    questionNum : 4
},

{
    survHeader: 'SLEEPY',
    question: 'Since taking your LAST Parkinson\'s medication: how tired have you been?',
    answers: ['Not Tired At All', 'Some Tiredness', 'Sleepy', 'Very Sleepy', 'Exhausted All The Time'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "sleepy",
    answered : '',
    firstQuestion : 0,
    questionNum : 5

},

{
    survHeader: 'OFF TIME',
    question: 'Right Now: do you feel off (slow, stiff, difficulty walking)?',
    answers: ['Normal', 'A Little Slow', 'Slow', 'Very Slow', 'Can\'t Move At All'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "offtime",
    answered : '',
    firstQuestion : 0,
    questionNum : 6
},

{
    survHeader: 'TREMORS',
    question: 'Right Now: if you suffer from tremor, how is it now?',
    answers: ['No Tremor', 'Bothering Me A Little', 'Worse Than Normal', 'Quite Bad', 'Very Bad'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "tremor",
    answered : '',
    firstQuestion : 0,
    questionNum : 7
},

{
    survHeader: 'WALKING',
    question: 'Right Now: how is your walking?',
    answers: ['Good', 'A Little Slow', 'Slower Than Normal', 'Very Slow, Shuffling', 'Can\'t Walk At All'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "walking",
    answered : '',
    firstQuestion : 0,
    questionNum : 8
},

{
    survHeader: 'BALANCE',
    question: 'Right Now: how is your balance when you stand or walk?',
    answers: ['Good', 'A Little Unsteady', 'Unsteady', 'Very Unsteady', 'Too Unsteady To Stand'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "balance",
    answered : '',
    firstQuestion : 0,
    questionNum : 9
},

// ---------- side effects questions ---------

{
    survHeader: 'NAUSEA AND VOMITING',
    question: 'Since taking your last Parkinson\'s medication: Have you had any nausea or sickness?',
    answers: ['None', 'A Little Nausea', 'Frequent Nausea', 'Continual Nausea', 'Vomiting'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "sickness",
    answered : '',
    firstQuestion : 0,
    questionNum : 10
},

{
    survHeader: 'DIZZINESS/LIGHTHEADEDNESS',
    question: 'Since taking your last Parkinson\'s medication: Have you felt dizzy or lightheaded?',
    answers: ['None', 'Very Occasionally', 'Yes, When I Stand Up', 'All The Time', 'To Dizzy To Stand Up'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "dizziness",
    answered : '',
    firstQuestion : 0,
    questionNum : 11
},

{
    survHeader: 'HEADACHES',
    question: 'Since taking your last Parkinson\'s medication: Have you had any headache?',
    answers: ['None', 'A Little/Occasionally', 'Mild/Continual', 'Quite Severe/On & Off', 'Severe/All The Time'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    label: "headaches",
    answered : '',
    firstQuestion : 0,
    questionNum : 12
},

{
    survHeader: 'DRY MOUTH/BLURRED VISION',
    question: 'Since taking your last Parkinson\'s medication: Have you had any feelings of dry mouth and/or blurred vision?',
    answers: ['None', 'Occasionally', 'On And Off', 'Most Of The Time', 'All The Time'],
    type : 'regular',
    color: ['green', 'blue', 'yellow', 'orange', 'red'],
    value: [0, 1, 2, 3, 4],
    className: ['survRadBtnGreen', 'survRadBtnBlue', 'survRadBtnYellow', 'survRadBtnOrange', 'survRadBtnRed'],
    selectionType: "radio",
    answered : '',
    label: "drymouth",
    firstQuestion : 0,
    questionNum : 13
},
];


export default class patSurvey extends Component {

    state = { 
        questions : questions,
        completed : [],
        count : questions.length,
        currentQuestion : 0,
        finished : false,
     };

     componentDidMount(){

     }
     pickAnswer(answer, index){
        let answerToQuestion = this.state.questions[this.state.currentQuestion].answered
        answerToQuestion = answerToQuestion.sort(function(a, b){return a - b});
        if(answerToQuestion.length > 0){
            answerToQuestion.map(selected =>{
                let found = false
                if(selected === answer){
                    found = true;
                    answerToQuestion.splice(answer);
                }else{
                    answerToQuestion.push(answer)
                }
            })
        }else{
            answerToQuestion.push(answer)
        }
        this.state.questions[this.state.currentQuestion].answered = answerToQuestion
        console.log(this.state.questions[this.state.currentQuestion].answered)

     }
     saveAnswer(answer){
         
        console.log("selected answer is : " , answer);
        console.log(answer.ansIndex);
        let nextQuestion = parseInt(this.state.currentQuestion) + 1;
        let currQuestion = parseInt(this.state.currentQuestion);
        if(currQuestion <= this.state.count){
            if(this.state.questions[currQuestion].selectionType === 'checkbox'){
                console.log("it is a checkbox question")
            }else{
                console.log("it is a radio question")
                this.state.questions[currQuestion].answered = answer.ansIndex
            }
            this.setState({
                currentQuestion : nextQuestion,
            }, function(){
                console.log("answered: ")
                console.log(this.state.questions[currQuestion].answered);
            });
            
        }else{
            this.setState({
                finished : true
            })
        }
        
     }
    
    render() {
        const { count } = this.state
        const { color, size } = this.props

        return (
            <View>
                <View>
                {
                    parseInt(this.state.currentQuestion) < parseInt(count) ?
                    this.state.questions.map((item, index) =>{
                        return(
                            item.questionNum === this.state.currentQuestion ?
                            <View key={index}>
                                <View style={{height:30}}><Text>Question : {index+1} of {this.state.count}</Text></View>
                                <View style={{height: 30, width: 350, backgroundColor: 'orange', marginBottom: 10}}>
                                <Text>{item.question}</Text>
                                </View>
                                {
                                    item.answers.map((ans, ansIndex)=>{
                                        return(
                                            item.selectionType==='checkbox' ?

                                            <View key={ansIndex} style={{height: 30, width:150, backgroundColor: 'lightblue', marginBottom: 10}}>
                                                <Button value={ans} title={ans} onPress={({}) => this.pickAnswer({ansIndex, index})}>{ans}</Button>
                                                <Button title='Submit' onPress={({}) => this.saveAnswer({ansIndex})}>Submit</Button>
                                            </View>
                                            :
                                            <View key={ansIndex} style={{height: 30, width:150, backgroundColor: 'lightblue', marginBottom: 10}}>
                                                <Button value={ans} title={ans} onPress={({}) => this.saveAnswer({ansIndex})} onLongPress={({}) => this.saveAnswer({ansIndex})}>{ans}</Button>
                                            </View>

                                        )
                                    })
                                }
                            </View>
                            :
                            null
                            
                        )
                    }) :
                    <View><Text>You have completed the questionaire</Text></View>
                }
                </View>
            </View>            
        )
    }
}