/**
 * Created by Simon on 29.03.2017.
 * @author S. Niedermayr
 */
import React, {Component} from "react";
import {View, Picker, Text} from "react-native";
import DayTable from "Vertretungsplan/app/components/DayTable";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData, downloadData, getAsyncStorage, MD5, setAsyncStorage} from "Vertretungsplan/app/utils";
import RefreshScrollView from "Vertretungsplan/app/components/RefreshScrollView";
const AppText = require("Vertretungsplan/app/config/text");
const styles = require("./styles");

/**
 * Function to create a list with all possible classes.
 * 5-10/A-F + Q11,Q12
 * @returns {Array} Array of strings
 */
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

const controllerUrl ="GetSubstituteForClass.php?class=";

class MyClassView extends Component {

    static navigationOptions = {
        title: AppText.view_title_my_class,
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
            class: "5A",
            data: [],
            updateFunction: null
        };
    }

    componentWillMount() {
        getAsyncStorage("MyClass")
            .then((className) => {
                if (className) {
                    getAsyncStorage(controllerUrl+ className)
                        .then((value) => {
                            if (value)
                                this.setState({
                                    data: JSON.parse(value).subs
                                });
                        });
                    this.setState({class: className});
                    setAsyncStorage("MyClass", className);
                }
                else {
                    //saving default 5A as class
                    setAsyncStorage("MyClass", this.state.class);
                }
                this.state.updateFunction && this.state.updateFunction();
            });
    }

    processData = (json) => {
        let data = [];
        for (let v in json.subs)
            if (json.subs.hasOwnProperty(v))
                data[v] = json.subs[v];
        this.setState({data: data});
    };

    render() {
        let Arr = [];
        for (let k in this.state.data)
            Arr.push(<DayTable key={k} date={k} subs={this.state.data[k].subs}/>);
        let classes = getClasses().map((c) => {
            return <Picker.Item key={c} value={c} label={c}/>
        });
        return (
            <RefreshScrollView
                url={controllerUrl + this.state.class}
                processData={this.processData}
                refresh={(obj) => this.state.updateFunction = obj}
                downloadOnStart={false}
            >
                <View style={styles.classSelection}>
                    <Text style={styles.classText}>Meine Klasse:</Text>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={this.state.class}
                        onValueChange={(className) => {
                            setAsyncStorage("MyClass", className).done(() => {
                                this.setState({
                                    class: className
                                }, this.state.updateFunction);
                            });
                        }}>
                        {classes}
                    </Picker>
                </View>
                <View style={styles.container}>
                    {Arr}
                </View>
            </RefreshScrollView>);
    }
}

module.exports = MyClassView;