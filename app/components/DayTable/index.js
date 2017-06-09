/**
 * Created by Simon on 23.03.2017.
 */

import React, {Component} from 'react';
import {Text, View,Animated} from 'react-native';
import {Grid, Col, Row} from 'react-native-elements'
import moment from "moment";
const styles = require('./styles');
require('moment/locale/de.js');

class DayTable extends Component {
    constructor(props){
        super(props);
        let date = moment(this.props.date, "DD.MM.YYYY");
        this.state={
            date: date.format("dddd, DD.MM"),
            fadeAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 200,
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={[styles.container,{opacity: this.state.fadeAnim}]}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.state.date}</Text>
                </View>
                <View style={styles.wrapper}>
                    <Grid>
                        <Row >
                            {this.props.subs[0].class &&
                            <Col size={1}><Text style={styles.columnHeader}>Klasse</Text></Col>
                            }
                            <Col size={1}><Text style={styles.columnHeader}>Stunde</Text></Col>
                            <Col size={1}><Text style={styles.columnHeader}>Raum</Text></Col>
                            <Col size={this.props.subs[0].class ? 3 : 4}><Text
                                style={styles.columnHeader}>Info</Text></Col>
                        </Row>
                        {
                            this.props.subs.map((v, k) => {
                                let index = this.props.subs.indexOf(v);
                                let lastSame = v.class
                                    && this.props.subs[index - 1]
                                    && v.class === this.props.subs[index - 1].class;
                                let nextSame = v.class
                                    && this.props.subs[index + 1]
                                    && v.class === this.props.subs[index + 1].class
                                    || index + 1 === this.props.subs.length;
                                return (
                                    <Row key={k} style={nextSame ? {flexDirection: "row"} : styles.row}>
                                        {v.class &&
                                        <Col size={1}>
                                            <Text style={styles.rowText}>{
                                                v.class ? (lastSame ? "" : v.class) : "-"
                                            }
                                            </Text>
                                        </Col>
                                        }
                                        <Col size={1}><Text
                                            style={styles.rowText}>{v.lesson ? v.lesson : "-"}</Text></Col>
                                        <Col size={1}><Text style={styles.rowText}>{v.room ? v.room : "-"}</Text></Col>
                                        <Col size={v.class ? 3 : 4}><Text
                                            style={styles.rowText}>{v.info ? v.info : "-"}</Text></Col>
                                    </Row>)
                            })}
                    </Grid>
                </View>
            </Animated.View>
        )
    };
}

module.exports = DayTable;