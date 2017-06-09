/**
 * Created by Simon on 29.03.2017.
 * @author S. Niedermayr
 */
import React, {Component} from "react";
import {View, Picker, FlatList, Text} from "react-native";
import DayTable from "Vertretungsplan/app/components/DayTable";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getData, downloadData, getAsyncStorage, MD5, setAsyncStorage} from "Vertretungsplan/app/utils";
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

const controllerUrl = "GetSubstituteForClass.php?class=";

class MyClassView extends Component {

    static navigationOptions = {
        title: AppText.view_title_my_class,
        tabBarIcon: ({tintColor, focused}) => (
            <Ionicons
                name={focused ? 'ios-person' : 'ios-person-outline'}
                size={26}
                style={{color: tintColor}}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            class: "5A",
            data: [],
            refreshing:false,
            updateFunction: null
        };
    }

    processData = (json) => {
        let arr = [];
        for (let date in json["subs"])
            arr.push({date: date, subs: json["subs"][date]["subs"]});
        this.setState({data: arr});
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item, index}) => {
        return (
            <DayTable date={item["date"]} subs={item["subs"]}/>)
    };

    _onRefresh = () => {
        this.setState(
            {refreshing: true},
            () => getData("GetSubstituteForClass.php?class=" + this.state.class)
                .then((value) => this.processData(JSON.parse(value)))
                .done(()=>this.setState({refreshing: false}))
        )
        ;
    };

    componentWillMount() {
        getAsyncStorage("MyClass")
            .then((className) => {
                this.setState({class: className}, () => this._onRefresh());
                if (!className) {
                    //saving default 5A as class
                    setAsyncStorage("MyClass", this.state.class);
                }
                this.state.updateFunction && this.state.updateFunction();
            });
    }

    render() {
        let classes = getClasses().map((c) => {
            return <Picker.Item key={c} value={c} label={c}/>
        });
        return (<FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            removeClippedSubviews={false}
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            ListHeaderComponent={() => (
                <View style={styles.classSelection}>
                    <Text style={styles.classText}>Meine Klasse:</Text>
                    <Picker
                        style={{flex: 1}}
                        selectedValue={this.state.class}
                        onValueChange={(className) => {
                            this.setState({
                                class: className
                            },()=>this._onRefresh());
                            setAsyncStorage("MyClass", className);
                        }}>
                        {classes}
                    </Picker>
                </View>
            )}
            ListFooterComponent={() => this.state.data.length!==0?(<View style={styles.footer}/>):(<Text style={styles.empty}>{"Keine Vertrtungen für Klasse "+this.state.class+" vorhanden"}</Text>)}
        />)
    }
}

module.exports = MyClassView;