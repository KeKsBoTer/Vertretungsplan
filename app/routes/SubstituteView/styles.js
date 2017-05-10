/**
 * Created by Simon on 23.03.2017.
 */

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        padding: 10,
    },
    loader: {
        borderWidth: 0,
        height: 3
    },
    classSelection: {
        margin: 10,
        paddingLeft: 10,
        marginBottom:0,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 5,
        opacity: 0.7
    },
    classText:{
        fontSize: 17,
        color: "black"
    }
});