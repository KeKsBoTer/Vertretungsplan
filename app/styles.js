/**
 * Created by Simon on 23.03.2017.
 */
/**
 * Created by Simon on 23.03.2017.
 */
const React = require('react-native');

const {
    StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#cacaca',
        flex: 1,
        flexDirection: 'column',
    },
    pickerContainer: {
        // flexDirection: 'row',
        backgroundColor: '#b9b9b9',
        // backgroundColor: 'white',
        justifyContent: 'center',
        paddingVertical: 5
    },
    header: {
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomWidth: 1,
        borderColor: '#cacaca',
        backgroundColor: "#f7f7f7",
        elevation: 0,       //remove shadow on Android
        shadowOpacity: 0,   //remove shadow on iOS
    },
    headerLabel: {
        //alignSelf: 'center',
        fontSize: 20,
        fontWeight: "100",
        color: "#797979"
    }
});