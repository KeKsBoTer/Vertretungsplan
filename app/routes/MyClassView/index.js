/**
 * Created by Simon on 29.03.2017.
 * @author S. Niedermayr
 */
import React, {Component} from "react";
import {View, Picker, Text} from "react-native";
import ClassSubstituteView from "Vertretungsplan/app/components/ClassSubstituteView";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAsyncStorage, setAsyncStorage} from "Vertretungsplan/app/utils";
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

const defaultClass = "5A";

/**
 * View that displays the substitutes for the users own class.
 * The user can set his own class using a picker, which is displayed at the top.
 * The class is remembered and saved in the AsyncStorage
 */
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
            class: defaultClass,
            availableClasses: getClasses().map((c) => <Picker.Item key={c} value={c} label={c}/>)
        };
    }

    componentWillMount() {
        getAsyncStorage("MyClass")
            .then((className) => {
                if (className === null)
                    className = this.state.class;
                this.setState({class: className}, () => this.refs["classView"]._onRefresh());
                setAsyncStorage("MyClass", this.state.class);
            });
    }

    render() {
        return (
            <ClassSubstituteView class={this.state.class}
                         ref="classView"
                         headerComponent={() =>
                             <View style={styles.classSelection}>
                                 <Text style={styles.classText}>{AppText.my_class_text}</Text>
                                 <Picker
                                     style={{flex: 1}}
                                     selectedValue={this.state.class}
                                     onValueChange={(className) => {
                                         this.setState({
                                             class: className
                                         }, this.refs["classView"]._onRefresh);
                                         setAsyncStorage("MyClass", className);
                                     }}>
                                     {this.state.availableClasses}
                                 </Picker>
                             </View>
                         }
            />)
    }
}

module.exports = MyClassView;