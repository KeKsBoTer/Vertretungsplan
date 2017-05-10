/**
 * Created by Simon on 22.04.2017.
 */
/**
 * Created by Simon on 29.03.2017.
 */
/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from "react";
import {View, ScrollView, Dimensions,Button} from "react-native";
import * as Progress from 'react-native-progress';
import DayTable from "Vertretungsplan/app/components/DayTable";
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import {getData,getAsyncStorage} from "Vertretungsplan/app/utils";

const styles = require("./styles");

class SubstituteView extends Component {

    static navigationOptions={
        title: ({ state }) => "Klasse "+state.params.class,
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isRefreshing: false
        };
    }

    updateState = (text, finishLoading = true) => {
        let json = JSON.parse(text);
        this.setState({
            data: [] //clearing data
        }, () => {
            for (let v in json.subs)
                if (json.subs.hasOwnProperty(v)) {
                    this.state.data[v] = json.subs[v];
                }
            this.setState({
                data: this.state.data,
                isRefreshing: !finishLoading
            });
        });
    };

    componentDidMount() {
        getAsyncStorage('GetSubstituteForClass.php?class=' + this.props.navigation.state.params.class)
            .then((data) => data && this.updateState(data, false));
        this.setState({
            isRefreshing: true //showing loading bar
        }, () => {
            getData('GetSubstituteForClass.php?class=' + this.props.navigation.state.params.class)
                .then((data) =>data && this.updateState(data));
        });
    };

    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k].subs}/>);
        return (
            <View>
                {this.state.isRefreshing &&
                <ProgressBar/>
                }
                <ScrollView>
                    <View style={styles.container}>
                        {Arr}
                    </View>
                </ScrollView>
            </View>);
    }
}

module.exports = SubstituteView;