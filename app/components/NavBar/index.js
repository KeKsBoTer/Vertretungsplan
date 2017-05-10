/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from 'react';
import NavigationBar from 'react-native-navbar';
const styles = require('./styles');
const text = require('Vertretungsplan/app/config/text');

class NavBar extends Component {

    render() {
        return (
            <NavigationBar
                title={titleConfig}
                containerStyle={styles.navBarContainer}
            />
        );
    }
}

const titleConfig = {
    title: text.appName,
    style: {
        fontSize: 20,
        fontWeight: '100',
        fontFamily: 'sans-serif-light'
    }
};


module.exports = NavBar;