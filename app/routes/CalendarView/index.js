/**
 * Created by Simon on 23.03.2017.
 * @author S. Niedermayr
 */
import React, {Component} from 'react';
import {View, FlatList} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import DayTable from "Vertretungsplan/app/components/DayTable";
import {getAsyncStorage, getData} from "Vertretungsplan/app/utils";

const AppText = require("Vertretungsplan/app/config/text");
const AppSettings = require("Vertretungsplan/app/config/settings");
const styles = require('./styles');

class CalendarView extends Component {

    static navigationOptions = {
        title: AppText.view_title_calendar,
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={focused ? 'ios-calendar' : 'ios-calendar-outline'}
                size={26}
                style={{color: tintColor}}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [{date: "Laden...", subs: [{lesson: "-", room: "-", info: "-"}]}]
        };
    }

    componentWillMount() {
        this._onRefresh();
    }

    processData = (json) => {
        let arr = [];
        for (let date in json) {
            let subs = [];
            for (let className in json[date])
                for (let index in json[date][className]) {
                    let sub = json[date][className][index];
                    subs.push({"class": className, "lesson": sub["lesson"], "room": sub["room"], "info": sub["info"]});
                }
            arr.push({date: date, subs: subs});
        }
        this.setState({data: arr});
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => {
        return (
            <DayTable date={item["date"]} subs={item["subs"]}/>)
    };

    _onRefresh = () => {
        this.setState(
            {refreshing: true},
            () => getData(AppSettings.data_url_substitute_date)
                .then((value) => this.processData(JSON.parse(value)))
                .done()
        )
        ;
    };

    render() {
        return (<FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListFooterComponent={() => (<View style={styles.footer}/>)}
        />)
    }
}
module.exports = CalendarView;