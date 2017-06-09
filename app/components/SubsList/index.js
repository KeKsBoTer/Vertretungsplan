/**
 * Created by Simon on 22.04.2017.
 */
import React, {Component} from "react";
import {View,FlatList} from "react-native";
import DayTable from "Vertretungsplan/app/components/DayTable";
import {getData, getAsyncStorage} from "Vertretungsplan/app/utils";

const styles = require("./styles");

class SubsList extends Component {

    constructor(props) {
        super(props);
    };

    _renderItem = ({item}) => (
        <DayTable date={"tes"} subs={this.props.data[k].subs}/>
    );

    _keyExtractor = (item, index) => index;

    render() {
       // let Arr = [];
       // for (let k in this.props.data)
       //     Arr.push(<DayTable key={k} date={k} subs={this.props.data[k].subs}/>);
        /*return (
            <View style={styles.container}>
                {Arr}
            </View>
        );*/
        return(
            <FlatList
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

module.exports = SubsList;