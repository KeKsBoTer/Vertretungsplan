/**
 * Created by Simon on 25.04.2017.
 */

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        //alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        marginBottom: 20
    },
    headerIcon: {
        margin: 10,
        marginTop: 20
    },
    headerText: {
        fontSize: 20
    },
    listItem: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#c0c0c0",
    },
    wrapper:{
        padding: 10,
        paddingLeft: 15,
        flexDirection: "row",
    },
    group: {
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    first: {
        borderTopWidth: 1
    },
    last: {
        borderBottomWidth:1
    },
    separator:{
        backgroundColor:"#c0c0c0",
        height:.9,
        marginLeft: 15
    },
    text: {
        fontSize: 16,
        color: "black"
    },
    headerVersion: {
        fontSize: 14
    },
    info: {
        paddingTop: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        fontSize: 13,
    },
    title: {
        paddingTop: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        fontSize: 13,
    }
});