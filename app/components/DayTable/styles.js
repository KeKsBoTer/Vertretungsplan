/**
 * Created by Simon on 23.03.2017.
 */

const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 5,
        marginBottom: 10
    },
    header: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    title: {
        padding: 7,
        color: '#535353',
        fontSize: 18,
        fontWeight: '100'
    },
    wrapper: {
        padding: 7
    },
    rowText: {
        fontSize: 16
    },
    columnHeader: {
        fontSize: 14,
        opacity: 0.7
    },
    row:{
        borderColor: "rgba(0,0,0,0.1)",
        borderBottomWidth: 2,
        flexDirection: "row"

    }
});