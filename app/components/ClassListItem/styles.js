/**
 * Created by Simon on 23.03.2017.
 */
const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        borderRadius: 5,
        margin: 10,
        marginBottom: 0,
        backgroundColor: "rgba(255,255,255,.5)"
    },
    header: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 0,
    },
    highlight: {
        flex: 1,
        borderRadius: 5
    },
    touched: {
        transform: [{scale: .95}]
    },
    wrapper: {
        flex: 1,
        paddingVertical: 17,
        paddingHorizontal: 12,
        flexDirection: 'row'
    },
    vBox: {
        paddingLeft: 17,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    infoText: {
        fontSize: 17
    },
    filler: {
        backgroundColor: 'grey',
        opacity: 0.2,
        height: 15,
        marginBottom: 7
    }
});