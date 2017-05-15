/**
 * Created by Simon on 22.04.2017.
 */
import React, {Component} from "react";
import {View, ScrollView, Dimensions, Button} from "react-native";
import * as Progress from 'react-native-progress';
import DayTable from "Vertretungsplan/app/components/DayTable";
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import {getData, getAsyncStorage} from "Vertretungsplan/app/utils";
import RefreshScrollView from "Vertretungsplan/app/components/RefreshScrollView";

const styles = require("./styles");

class SubstituteView extends Component {

    static navigationOptions = {
        title: ({state}) => "Klasse " + state.params.class,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    processData = (json) => {
        this.setState({data: json.subs});
    };

    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k].subs}/>);
        return (
            <RefreshScrollView
                url={"GetSubstituteForClass.php?class=" + this.props.navigation.state.params.class}
                processData={this.processData}
                downloadOnMount={true}
            >
                <View style={styles.container}>
                    {Arr}
                </View>
            </RefreshScrollView>);
    }
}

module.exports = SubstituteView;