/**
 * Created by Simon on 23.03.2017.
 */
/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from 'react';
import {getAsyncStorage} from "Vertretungsplan/app/utils";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData} from "Vertretungsplan/app/utils";
import {View, RefreshControl, ScrollView} from "react-native";
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import DayTable from "Vertretungsplan/app/components/DayTable";

const styles = require('./styles');
class DateView extends Component {

    static navigationOptions = {
        title: 'Kalender',
        tabBar: {
            icon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isRefreshing: false
        };
    };

    updateState = (text, finishLoading = true) => {
        let json = JSON.parse(text);
        this.state.data = [];
        for (let v in json) {
            if (json.hasOwnProperty(v) && json[v]["subs"].length > 0)
                this.state.data[json[v].date] = json[v].subs;
        }
        this.setState({
            data: this.state.data,
            isRefreshing: !finishLoading
        });
    };

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        getData("GetSubstituteByDate.php")
            .then((value) => value && this.updateState(value))
            .done();
    };

    componentDidMount() {
        getAsyncStorage("GetSubstituteByDate.php")
            .then((data) => data && this.updateState(data, false));
        this._onRefresh();
    };

    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k]}/>);

        return (
            <View>
                {this.state.isRefreshing &&
                <ProgressBar/>}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            title="Loading..."
                        />
                    }>
                    <View style={styles.container}>
                        {Arr}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
module.exports = DateView;