/**
 * Created by Simon on 24.04.2017.
 */
import React, {Component,} from 'react';
import {Dimensions} from "react-native";
import {Bar}from 'react-native-progress';
const styles = require('./styles');

class NavBar extends Component {
    constructor(props){
        super(props);
        this.state={
            screenWidth : Dimensions.get('window').width
        }

    }
    render() {
        return (
            <Bar
                style={styles.loader}
                width={this.state.screenWidth}
                indeterminate={true}
                borderRadius={0}
                unfilledColor="#bacff8"
                color="#6296f9"
            />
        );
    }
}

module.exports = NavBar;