/**
 * Created by Simon on 23.03.2017.
 */

import React from "react";
//import {TouchableHighlight, Image} from "react-native";
import {TabNavigator, StackNavigator} from "react-navigation";
import SubstituteView from 'Vertretungsplan/app/routes/SubstituteView/index';
import DateView from 'Vertretungsplan/app/routes/DateView/index';
import ClassView from 'Vertretungsplan/app/routes/ClassListView/index';
import SubViewItem from 'Vertretungsplan/app/components/SubViewItem/index';
import SettingsView from 'Vertretungsplan/app/routes/SettingsView/index';
const styles = require('./styles');

const MainScreenNavigator = TabNavigator({
    MyClass: {screen: SubstituteView},
    AllClasses: {screen: ClassView},
    Calendar: {screen: DateView},
    Settings: {screen: SettingsView}
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazyLoad: false,
    lazy: false,
    backBehavior: 'none',
    animationEnabled: true,
    tabBarOptions: {
        upperCaseLabel: false,
        activeTintColor: '#007cff',
        inactiveTintColor: '#959595',
        showIcon: true,
        activeBackgroundColor: 'transparent',
        inactiveBackgroundColor: 'transparent',
        style: {
            backgroundColor: '#f7f7f7',
            borderColor: '#b5b5b5',
            borderTopWidth: .5
        },
        labelStyle: {
            fontSize: 12,
            padding: 0,
            margin: 0
        },
        indicatorStyle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent'
        }
    },
});


const App = StackNavigator({
    Home: {screen: MainScreenNavigator},
    ClassView: {screen: SubViewItem},
    Settings: {screen: SettingsView},
}, {
    cardStyle: {backgroundColor: '#cacaca'},
    navigationOptions: {
        header: ({navigate}) => ({
            /*right: true?(<TouchableHighlight underlayColor="#e7e7e7" onPress={() => navigate('Settings')}>
                <Image source={require("./settings.png")} style={{width: 25, height: 25, marginRight: 15}}/>
            </TouchableHighlight>):null,*/
            style: styles.header,
            titleStyle: styles.headerLabel
        })
    }
});

module.exports = App;