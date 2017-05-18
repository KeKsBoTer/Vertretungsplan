/**
 * Created by Simon on 23.03.2017.
 * @author S. Niedermayr
 */
import React, {Component} from 'react';
import {getAsyncStorage} from "Vertretungsplan/app/utils";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData} from "Vertretungsplan/app/utils";
import {View} from "react-native";
import RefreshScrollView from "Vertretungsplan/app/components/RefreshScrollView";
import DayTable from "Vertretungsplan/app/components/DayTable";

const text = require("Vertretungsplan/app/config/text");
const styles = require('./styles');

class CalendarView extends Component {

    static navigationOptions = {
        title: text.view_title_calendar,
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

    processData = (json) => {
        this.setState({data: []},
            () => {
                for (let v in json) {
                    if (json.hasOwnProperty(v) && json[v]["subs"].length > 0)
                        this.state.data[json[v].date] = json[v].subs;
                }
                this.setState({data: this.state.data})
            });
    };


    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k]}/>);

        return (
            <RefreshScrollView
                url={"GetSubstituteByDate.php"}
                processData={this.processData}
                test={(obj) => this.state.updateFunction = obj}
            >
                <View style={styles.container}>
                    {Arr}
                </View>
            </RefreshScrollView>
        )
    }
}
module.exports = CalendarView;