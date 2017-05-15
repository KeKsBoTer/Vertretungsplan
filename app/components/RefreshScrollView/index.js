/**
 * Created by Simon on 11.05.2017.
 * Container component for all views with update on scroll down functionality.
 * Properties:
 *  - {string} url: the data source url e.g. GetSubstituteForClass.php?class=5A
 *  - {function} refresh: function that refreshes the data on call
 *  - {boolean} downloadOnStart: determines weather the app downloads the data und mount
 *  - {function} processData({JSON} json): function that is called on update with the data as argument
 */

import React, {Component} from "react";
import {View, RefreshControl, ScrollView} from "react-native";
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import {getData, getAsyncStorage} from "Vertretungsplan/app/utils";

class RefreshScrollView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
        //bind refresh function to property
        this.props.refresh && this.props.refresh(this._onRefresh);
    }

    componentWillMount() {
        //only refresh on mount if property downloadOnStart is undefined or true
        if (this.props.downloadOnStart === undefined || this.props.downloadOnStart === true) {
            getAsyncStorage(this.props.url)
                .then((data) => this.updateState(data, false))
                .done();
            this._onRefresh();
        }
    };

    updateState = (text, finishLoading = true) => {
        try {
            let json = JSON.parse(text);
            //process function is called with json as argument
            json && this.props.processData && this.props.processData(json);
            this.setState({
                isRefreshing: !finishLoading
            });
        } catch (e) {
        }
    };

    _onRefresh = () => {
        this.setState(
            {isRefreshing: true},
            () => getData(this.props.url)
                .then((value) => value && this.updateState(value))
                .catch(() => this.setState({isRefreshing: false}))
                .done()
        );
    };

    render() {
        return (
            <View>
                {this.state.isRefreshing && <ProgressBar/>}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            title="Loading..."
                        />
                    }>
                    {this.props.children}
                </ScrollView>
            </View>
        );
    }
}

module.exports = RefreshScrollView;