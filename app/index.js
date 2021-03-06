/**
 * Created by Simon on 23.03.2017.
 * @author S. Niedermayr
 * Main file with TabNavigator
 */

import React from "react";
import {StackNavigator, TabNavigator} from "react-navigation";
import MyClassView from "Vertretungsplan/app/routes/MyClassView/index";
import DateView from "Vertretungsplan/app/routes/CalendarView/index";
import AllClassesView from "Vertretungsplan/app/routes/AllClassesView/index";
import ClassSubstituteView from "Vertretungsplan/app/components/ClassSubstituteView/index";
import InfoView from "Vertretungsplan/app/routes/InfoView/index";
const styles = require('./styles');

const MainScreenNavigator = TabNavigator({
    MyClass: {screen: MyClassView},
    AllClasses: {screen: AllClassesView},
    Calendar: {screen: DateView},
    Info: {screen: InfoView},
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    lazyLoad: false,
    lazy: true, //only loads data when tab is focused
    backBehavior: 'none',
    animationEnabled: false,
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
    Home: {
        screen: MainScreenNavigator
    },
    ClassView: {
        screen: ClassSubstituteView
    }
}, {
    cardStyle: {
        backgroundColor: '#cacaca'
    },
    navigationOptions: {
        headerStyle:styles.header,
        headerTitleStyle: styles.headerLabel
    }
});

module.exports = App;