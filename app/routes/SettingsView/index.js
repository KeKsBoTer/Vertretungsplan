/**
 * Created by Simon on 25.04.2017.
 */
/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from "react";
import {AsyncStorage, ToastAndroid, View, Image, Text, TouchableHighlight, ScrollView, Linking, Clipboard} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';
const AppText = require('Vertretungsplan/app/config/text');
const styles = require("./styles");
const img = require('./icon.png');
import {byteLength} from "Vertretungsplan/app/utils";


//TODO Pack ListItem in own file and separate styling
class ListItem extends Component {
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                <View
                    style={[styles.listItem, this.props.group ? styles.group : "", this.props.group === "last" ? styles.last : "", this.props.group === "first" ? styles.first : ""]}>
                    <View style={styles.wrapper}>
                        <Text style={[styles.text, {color: this.props.color ? this.props.color : "black"}]}>{this.props.text}</Text>
                    </View>
                    {this.props.group && this.props.group !== "last" &&
                    <View style={styles.separator}>{}</View>
                    }
                </View>
            </TouchableHighlight>
        );
    }
}

class SettingsView extends Component {

    static navigationOptions = {
        title: 'Einstellungen',
        tabBar: {
            icon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-cog' : 'ios-cog-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            asyncStorageSize: 0
        }
    }

    componentDidMount() {
        this._getAsyncStorageSize();
    }

    _emptyCache = () => {
        let message = 'Cache-Speicher wurde gelöscht';
        AsyncStorage.clear()
            .then(() => this.setState({asyncStorageSize: 0}))
            .catch(() => message = 'Cache-Speicher konnte nicht gelöscht werden');
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    _openDHGVplan = () => {
        Linking.openURL("https://dhg.ssl-secured-server.de/DHG/vplan/vplan.php").catch(err => console.error('An error occurred', err));
    };

    _openEmail = () => {
        Linking.openURL("mailto:simon.niedermayr@gmx.com?").catch(err => console.error('An error occurred', err));
    };


    _copyEmailToClipboard = () => {
        Clipboard.setString(AppText.contact_email);
        ToastAndroid.show("Email wurde in den Zwischenspeicher Kopiert", ToastAndroid.SHORT);
    };

    _getAsyncStorageSize = () => {
        let byteSize = 0;
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    byteSize += byteLength(key) + byteLength(value);
                    this.setState({asyncStorageSize: parseInt(byteSize / 1000)});
                });
            });
        });
    };

    render() {
        return (
            <ScrollView>
                <View style={styles.header}>
                    <Image style={styles.headerIcon} source={img}/>
                    <Text style={styles.headerText}>{AppText.appName}</Text>
                    <Text style={styles.headerVersion}>v.{VersionNumber.appVersion}</Text>
                </View>
                <Text style={styles.title}>{AppText.settings_contact}</Text>
                <ListItem group="first" text={AppText.settings_contact_dev} onPress={this._openEmail}/>
                <ListItem group="last" text={AppText.contact_email} onPress={this._copyEmailToClipboard}/>
                <Text style={styles.info}>{AppText.settings_contact_info}</Text>
                <ListItem text={AppText.settings_open_in_browser} onPress={this._openDHGVplan}/>
                <Text style={styles.info}>{AppText.settings_open_in_browser_info}</Text>
                <ListItem text={AppText.settings_clear_cache+" (" + this.state.asyncStorageSize + " Kb)"} color="red" onPress={this._emptyCache}/>
                <Text style={styles.info}>{AppText.settings_clear_cache_info}</Text>
            </ScrollView>
        );
    }
}

module.exports = SettingsView;