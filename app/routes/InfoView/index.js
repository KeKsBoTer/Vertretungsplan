/**
 * @author Simon
 * Created on 23.03.2017.
 */
import React, {Component} from "react";
import {AsyncStorage, ToastAndroid, View, Image, Text, TouchableHighlight, ScrollView, Linking, Clipboard} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';
import {byteLength} from "Vertretungsplan/app/utils";
const AppText = require('Vertretungsplan/app/config/text');
const styles = require("./styles");
const img = require('./icon.png');


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

class InfoView extends Component {

    static navigationOptions = {
        title: AppText.view_title_info,
        tabBar: {
            icon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
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
        let message = AppText.info_cache_delete_message;
        AsyncStorage.clear()
            .then(() => this.setState({asyncStorageSize: 0}))
            .catch(() => message = AppText.info_cache_delete_message_error);
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    _openPlayStoreEntry= () =>{
        Linking.openURL("https://play.google.com/store/apps/details?id=com.dotcookie.vertretungsplan").catch(err => console.log('An error occurred', err));
    };

    _openDHGVplan = () => {
        Linking.openURL("https://dhg.ssl-secured-server.de/DHG/vplan/vplan.php").catch(err => console.log('An error occurred', err));
    };

    _openEmail = () => {
        Linking.openURL("mailto:simon.niedermayr@gmx.com?").catch(err => console.log('An error occurred', err));
    };


    _copyEmailToClipboard = () => {
        Clipboard.setString(AppText.contact_email);
        ToastAndroid.show(AppText.info_email_to_clipboard_toast_message, ToastAndroid.SHORT);
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

                <Text style={styles.title}>{AppText.info_feedback}</Text>
                <ListItem text={AppText.info_rate_app} onPress={this._openPlayStoreEntry}/>
                <Text style={styles.info}>{AppText.info_rate_app_info}</Text>

                <Text style={styles.title}>{AppText.info_contact}</Text>
                <ListItem group="first" text={AppText.info_contact_dev} onPress={this._openEmail}/>
                <ListItem group="last" text={AppText.contact_email} onPress={this._copyEmailToClipboard}/>
                <Text style={styles.info}>{AppText.info_contact_info}</Text>

                <ListItem text={AppText.info_open_in_browser} onPress={this._openDHGVplan}/>
                <Text style={styles.info}>{AppText.info_open_in_browser_info}</Text>

                <ListItem text={AppText.info_clear_cache+" (" + this.state.asyncStorageSize + " Kb)"} color="red" onPress={this._emptyCache}/>
                <Text style={styles.info}>{AppText.info_clear_cache_info}</Text>
            </ScrollView>
        );
    }
}

module.exports = InfoView;