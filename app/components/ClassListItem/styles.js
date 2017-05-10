/**
 * Created by Simon on 23.03.2017.
 */
const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    wrapper: {
        flex: 1,
        paddingVertical: 17,
        paddingHorizontal: 12,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#a8a8a8'
    },
    vBox: {
        paddingLeft: 17,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    indicator: {
        //backgroundColor: 'black',
        width: 6,
        margin: -3,
        padding: 0
    },
    infoText: {
        fontSize: 17
    },
    expandContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    classContainer: {
        padding: 10
    }
});