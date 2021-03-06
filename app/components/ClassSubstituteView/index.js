/**
 * Created by Simon on 22.04.2017.
 *
 */
import React, {Component} from "react";
import {View, FlatList} from "react-native";
import DayTable from "Vertretungsplan/app/components/DayTable";
import {getData, getAsyncStorage} from "Vertretungsplan/app/utils";
import AppSettings from "Vertretungsplan/app/config/settings"

const styles = require("./styles");

class SubstituteView extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Klasse " + navigation.state.params.class,
    });

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this._onRefresh();
    }

    processData = (json) => {
        let arr = [];
        for (let date in json)
            arr.push({date: date, subs: json[date]});
        this.setState({data: arr});
    };

    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => {
        return (
            <DayTable date={item["date"]} subs={item["subs"]}/>)
    };

    _onRefresh = () => {
        this.setState(
            {refreshing: true},
            () => getData(AppSettings.data_url_substitute_class + "?class=" + (this.props.navigation ? this.props.navigation.state.params.class : this.props.class))
                .then((value) =>this.processData(JSON.parse(value)))
                .done()
        )
        ;
    };

    render() {
        return (<FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            ListHeaderComponent={this.props.headerComponent}
            ListFooterComponent={() => (<View style={styles.footer}/>)}
        />)
    }
}

module.exports = SubstituteView;