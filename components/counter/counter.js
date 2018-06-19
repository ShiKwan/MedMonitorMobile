import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Counter extends Component {

    state = { count: 0 }

    componentDidMount() {
        setInterval(() => {
            this.setState({ count: this.state.count + 1 })
        }, 1000)
    }

    render() {
        const { count } = this.state
        const { color, size } = this.props

        return (
            <View>
                <Text style={{ color, fontSize: size }}>
                    {count}
                </Text> 
                <Button onPress={()=>{
                this.setState({count : 0})
                }}
                title='Reset count here'
                />
            </View>
            
        )
    }
}