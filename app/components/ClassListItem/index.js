/**
 * Created by Simon on 23.03.2017.
 */

import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import Svg, {
    LinearGradient, Rect, Defs, Stop, Circle, Text as SvgText
} from 'react-native-svg';
import {Icon} from 'react-native-elements';

const styles = require('./styles');

class ClassListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate('AllClassesView', { class: this.props.klasse })}>
                    <View style={styles.container}>
                        <Svg height="111" width="6">
                            <Defs>
                                <LinearGradient id="grad" x1="0%" y1={this.props.startPer + "%"} x2="0%" y2={this.props.endPer + "%"}>
                                    <Stop offset="0%" stopColor="#fe5330"/>
                                    <Stop offset="50%" stopColor="#37c14b"/>
                                    <Stop offset="100%" stopColor="#26e8f3"/>
                                </LinearGradient>
                            </Defs>
                            <Rect
                                x="0"
                                y="0"
                                width="6"
                                height="100%"
                                fill="url(#grad)"
                            />
                        </Svg>
                        <View style={styles.wrapper}>
                            {/*class icon*/}
                            <Svg height="65" width="65">
                                <Defs>
                                    <LinearGradient id="grad" x1="0%" y1={this.props.startPer + "%"} x2="0%" y2={this.props.endPer + "%"}>
                                        <Stop offset="0%" stopColor="#fe5330"/>
                                        <Stop offset="50%" stopColor="#37c14b"/>
                                        <Stop offset="100%" stopColor="#26e8f3"/>
                                    </LinearGradient>
                                </Defs>
                                <Circle
                                    cx="50%"
                                    cy="50%"
                                    r="50%"
                                    fill="url(#grad)"
                                />
                                <SvgText x="50%" y="27%" fill="white" fontSize="25" textAnchor="middle" fontWeight="100">
                                    {this.props.klasse}
                                </SvgText>
                            </Svg>
                            <View style={styles.vBox}>
                                {this.props.day !== 0 &&
                                <Text style={styles.infoText}>
                                    {this.props.day > 1 ? this.props.day+" Vertretungen" : "Eine Vertretung"} heute</Text>
                                }
                                {this.props.week !== 0 &&
                                <Text style={styles.infoText}>
                                    {this.props.week > 1 ? this.props.week+" Vertretungen" : "Eine Vertretung"} diese Woche</Text>
                                }
                                {this.props.all !== 0 &&
                                <Text style={styles.infoText}>
                                    {this.props.all > 1 ? this.props.all+" Vertretungen" : "Eine Vertretung"} insgesamt</Text>
                                }
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}


module.exports = ClassListItem;