/**
 * Created by Simon on 29.03.2017.
 */
/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from "react";
import {View, ScrollView, RefreshControl, Picker, Text, NetInfo} from "react-native";
import DayTable from "Vertretungsplan/app/components/DayTable";
//import BackgroundTimer from 'react-native-background-timer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import {getData, downloadData, getAsyncStorage, MD5, setAsyncStorage} from "Vertretungsplan/app/utils";

const styles = require("./styles");
//let backgroundTimer;

function getClasses() {
    let cs = ["A", "B", "C", "D", "E", "F"];
    let classes = [];
    for (let i = 5; i <= 10; i++)
        for (let c in cs)
            if (cs.hasOwnProperty(c))
                classes.push(i + cs[c]);
    classes.push("Q11");
    classes.push("Q12");
    return classes;
}

class SubstituteView extends Component {

    static navigationOptions = {
        title: 'Meine Klasse',
        tabBar: {
            icon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-person' : 'ios-person-outline'}
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
            isRefreshing: false,
            class: "",
            updateOnOpen: false
        };
    }

    initView = () => {
        setTimeout(this._onRefresh, 10);
        NetInfo.removeEventListener(
            'change',
            this.initView
        );
    };

    componentDidMount() {
        let myClass = "5A";
        getAsyncStorage("MyClass")
            .then((value) => {
                if (value)
                    myClass = value;
                else
                    setAsyncStorage("MyClass", myClass)
            })
            .done(() => {
                    this.setState({class: myClass});
                    getAsyncStorage('GetSubstituteForClass.php?class=' + this.state.class)
                        .then((data) => data && this.updateState(data, false))
                        .done();
                }
            );
        NetInfo.addEventListener(
            'change',
            this.initView
        );
        //AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        // AppState.removeEventListener('change', this._handleAppStateChange);
    }

    /*
     Replace with google firebase
     _handleAppStateChange = (nextAppState) => {
     if (nextAppState === "active" && backgroundTimer) {
     if (this.state.updateOnOpen) {
     console.log("update on open");
     this.setState({updateOnOpen: false});
     this._onRefresh();
     }
     BackgroundTimer.clearTimeout(backgroundTimer);
     }
     else if (nextAppState === "background") {
     backgroundTimer = BackgroundTimer.setInterval(() => {
     try {
     getAsyncStorage('GetSubstituteForClass.php?class=' + this.state.class)
     .then((value) => {
     let hash = MD5(value);
     downloadData('GetSubstituteForClass.php?class=' + this.state.class + '&hash=' + hash + "a").then((value) => {
     console.log("Check News: " + value);
     if (value !== "[]") {
     BackgroundTimer.clearTimeout(backgroundTimer);
     this.setState({updateOnOpen: true});
     }
     }).catch(() => console.error("Error background update!"));
     });
     } catch (e) {
     }
     }, 10000);
     }
     };*/

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

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        getData('GetSubstituteForClass.php?class=' + this.state.class)
            .then((value) => this.updateState(value))
            .catch(() => this.setState({isRefreshing: false}));
    };

    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k].subs}/>);
        let classes = getClasses().map((c) => {
            return <Picker.Item key={c} value={c} label={c}/>
        });
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
                    <View style={styles.classSelection}>
                        <Text style={styles.classText}>Meine Klasse:</Text>
                        <Picker
                            style={{flex: 1}}
                            selectedValue={this.state.class}
                            onValueChange={(c) => {
                                setAsyncStorage("MyClass", c).done(() => {
                                    this.setState({
                                        class: c
                                    }, () => {
                                        this._onRefresh();
                                    });

                                });
                            }}>
                            {classes}
                        </Picker>
                    </View>
                    <View style={styles.container}>
                        {Arr}
                    </View>
                </ScrollView>
            </View>);
    }
}

module.exports = SubstituteView;