/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from "react";
import {View, FlatList} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClassListItem from "Vertretungsplan/app/components/ClassListItem";
import {getData, getAsyncStorage} from "Vertretungsplan/app/utils";

const styles = require("./styles");
const AppSettings = require("Vertretungsplan/app/config/settings");
const AppText = require("Vertretungsplan/app/config/text");

function createEmpty(amount, json) {
    let array = [];
    for (let i = 0; i < amount; i++) {
        array.push({class: json ? json[i] : "", day: 0, week: 0, all: 0});
    }
    return array;
}
//Avoid opening single class view multiple times by fast clicking
let opened = false;
class AllClassesView extends Component {

    static navigationOptions = {
        title: AppText.view_title_all_classes,
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
                size={26}
                style={{color: tintColor}}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            data: createEmpty(5),
            refreshing: false
        };
    }

    componentDidMount() {
        this._onRefresh()
    };

    _loadClasses = (data) => {
        let json = JSON.parse(data);
        this.setState({data: createEmpty(json.length, json)});
        let i = 0;
        for (let item in json) {
            if (json.hasOwnProperty(item))
                getData(AppSettings.data_url_substitute_count + "?class=" + json[item])
                    .then((response) => {
                        let count = JSON.parse(response);
                        let array = this.state.data.slice();
                        array[item] = ({class: json[item], day: count.day, week: count.week, all: count.all});
                        this.setState({data: array});
                        i++;
                        if (i === json.length)
                            this.setState({refreshing: false});
                    })
                    .catch((e) => this.setState({refreshing: false}))
        }
    };

    _onRefresh = () => {
        this.setState({refreshing: true});
        getData(AppSettings.data_url_available_classes)
            .then((value) => this._loadClasses(value))
            .done();
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => {
        let index = this.state.data.indexOf(item),
            max = this.state.data.length;
        return (
            <ClassListItem
                klasse={item.class}
                navigation={this.props.navigation}
                day={item.day}
                week={item.week}
                all={item.all}
                startPer={parseInt(-max * 30 * index)}
                endPer={parseInt((max - (index + 1)) * max * 30)}
                onPress={(obj) => {
                    if (!opened) {
                        opened = true;
                        this.props.navigation.navigate('ClassView', {class: item.class});
                        setTimeout(() => opened = false, 200) //prevent user from navigating twice
                    }
                }}
            />)
    };

    render() {
        return (
            <FlatList
                ref="list"
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                onRefresh={this._onRefresh}
                refreshing={this.state.refreshing}
                ListFooterComponent={() => (<View style={styles.footer}/>)}
            />);
    }
}

module.exports = AllClassesView;