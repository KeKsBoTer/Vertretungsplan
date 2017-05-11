/**
 * Created by Simon on 23.03.2017.
 */
import React, {Component} from "react";
import {View, ListView, RefreshControl, NetInfo} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ClassListItem from "Vertretungsplan/app/components/ClassListItem";
import ProgressBar from "Vertretungsplan/app/components/ProgressBar";
import {getData,getAsyncStorage} from "Vertretungsplan/app/utils";

const styles = require("./styles");

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class ClassView extends Component {

    static navigationOptions = {
        title: 'Alle Klassen',
        tabBar: {
            icon: ({tintColor, focused}) => (
                <Ionicons
                    name={focused ? 'ios-bookmarks' : 'ios-bookmarks-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isRefreshing: false,
            dataSource: ds.cloneWithRows([]),
            class: "5A"
        };
    }

    initView = () => {
        setTimeout(this._onRefresh, 10);
        NetInfo.removeEventListener(
            'change',
            this.initView
        );
    };

    componentDidMount() {
        getAsyncStorage("GetSubstituteCountForClass.php")
            .then((data) => this.updateState(data, false))
            .done();
        NetInfo.addEventListener(
            'change',
            this.initView
        );
    };


    updateState = (text, finishLoading = true) => {
        if (text) {
            let json = JSON.parse(text);
            let array = [];
            for (let item in json)
                if (json.hasOwnProperty(item))
                    array.push(item);
            this.setState({
                data: json,
                dataSource: ds.cloneWithRows(array),
                isRefreshing: !finishLoading
            });
        }
    };

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        getData("GetSubstituteCountForClass.php")
            .then((value) => this.updateState(value))
            .done();
    };

    _toggleView = (e) => {
        this.setState({
            showSubs: !this.state.showSubs,
            class: e
        });
    };

    render() {
        let i = 0;
        let max = 0;
        //counting children
        for (let item in this.state.data) max++;
        let _listView: ListView;
        return (
            <View>
                {this.state.isRefreshing &&
                <ProgressBar />
                }
                <ListView
                    enableEmptySections={true}
                    ref={(scrollView) => {
                        _listView = scrollView;
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                            title="Loading..."
                        />
                    }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <ClassListItem
                        callback={() => {
                            this._toggleView(rowData)
                        }}
                        klasse={rowData}
                        navigation={this.props.navigation}
                        day={this.state.data[rowData].day} week={this.state.data[rowData].week} all={this.state.data[rowData].all}
                        startPer={parseInt(-max * 10 * i)}
                        endPer={parseInt((max - (++i)) * max * 10)}/>
                    }/>
            </View>
        );
    }
}

module.exports = ClassView;