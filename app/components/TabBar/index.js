/**
 * Created by Simon on 23.03.2017.
 */

import React, {Component} from 'react';
import {Icon, Tabs, Tab} from 'react-native-elements'
import ClassView from "Vertretungsplan/app/routes/ClassListView/index";
import DateView from "Vertretungsplan/app/routes/DateView/index";
import SubstituteView from "Vertretungsplan/app/routes/SubstituteView/index";
import SettingsView from "Vertretungsplan/app/routes/SettingsView/index";
const styles = require("./styles");

const {selectedTab} = 'byClass';
class TabBar extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'myClass'
        };
    }

    changeTab(selectedTab) {
        this.setState({selectedTab})
    }

    render() {
        return (
            <Tabs>
                <Tab
                    titleStyle={{fontWeight: 'bold', fontSize: 10}}
                    selectedTitleStyle={{marginTop: 0, marginBottom: 6}}
                    selected={this.state.selectedTab === 'myClass'}
                    title={selectedTab === 'myClass' ? 'MYCLASS' : null}
                    renderIcon={() => <Icon containerStyle={styles.classIcon} color={'#5e6977'} name='account-circle' size={33}/>}
                    renderSelectedIcon={() => <Icon containerStyle={styles.classIcon} color={'#6296f9'} name='account-circle' size={33}/>}
                    onPress={() => this.changeTab('myClass')}>
                    <SubstituteView/>
                </Tab>
                <Tab
                    titleStyle={{fontWeight: 'bold', fontSize: 10}}
                    selectedTitleStyle={{marginTop: 0, marginBottom: 6}}
                    selected={this.state.selectedTab === 'byClass'}
                    title={selectedTab === 'byClass' ? 'BYCLASS' : null}
                    renderIcon={() => <Icon containerStyle={styles.classIcon} color={'#5e6977'} name='perm-contact-calendar' size={33}/>}
                    renderSelectedIcon={() => <Icon containerStyle={styles.classIcon} color={'#6296f9'} name='perm-contact-calendar' size={33}/>}
                    onPress={() => this.changeTab('byClass')}>
                    <ClassView navigator={navigator}/>
                </Tab>
                <Tab
                    titleStyle={{fontWeight: 'bold', fontSize: 10}}
                    selectedTitleStyle={{marginTop: 0, marginBottom: 6}}
                    selected={this.state.selectedTab === 'date'}
                    title={selectedTab === 'date' ? 'DATE' : null}
                    renderIcon={() => <Icon containerStyle={styles.classIcon} color={'#5e6977'} name='date-range' size={33}/>}
                    renderSelectedIcon={() => <Icon containerStyle={styles.classIcon} color={'#6296f9'} name='date-range' size={33}/>}
                    onPress={() => this.changeTab('date')}>
                    <DateView/>
                </Tab>
                <Tab
                    titleStyle={{fontWeight: 'bold', fontSize: 10}}
                    selectedTitleStyle={{marginTop: 0, marginBottom: 6}}
                    selected={this.state.selectedTab === 'settings'}
                    title={selectedTab === 'settings' ? 'SETTINGS' : null}
                    renderIcon={() => <Icon containerStyle={styles.classIcon} color={'#5e6977'} name='settings' size={33}/>}
                    renderSelectedIcon={() => <Icon containerStyle={styles.classIcon} color={'#6296f9'} name='settings' size={33}/>}
                    onPress={() => this.changeTab('settings')}>
                    <SettingsView/>
                </Tab>
            </Tabs>)
    }
}

module.exports = TabBar;