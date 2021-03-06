/**
 * Created by Simon on 20.04.2017.
 * Utils file with several functions, that are used all around the project
 * @author S. Niedermayr
 */

import {Alert, AsyncStorage} from "react-native";
const AppSettings = require('Vertretungsplan/app/config/settings');

/**
 * A Function to get the data for the app, from the Website (https://dhg.ssl-secured-server.de/DHG/vplan/vplan.php)
 * If the function fails to download the data, the data in the {AsyncStorage} is returned
 * @param {String} url - the relative path to the php-file
 * @returns {Promise} An async Promise with a JSON-String as value
 */
export function getData(url) {
    return new Promise((resolve, reject) => {
        downloadData(url, "")
            .then((content) => {
                resolve(content);
            })
            .catch((error) => reject(error))
    });
}

/**
 * A constant variable to check, if currently a alert box is open.
 * False by default
 * @type {[boolean]}
 */
const isAlertOpen = [false];

/**
 * This function downloads the data from the server and opens an error-alert, if it fails.
 * All downloaded data is saved in the {AsyncStorage} to allow the app to display the last data in offline mode.
 * The key for the {AsyncStorage} is the url.
 * @param {String} url - the relative path to the php-file
 * @param {String} hash - hash data string send to the server, to reduce data usage
 * @returns {Promise} An async Promise with a JSON-String as value
 */
const showError = false;
export function downloadData(url, hash) {
    return new Promise((resolve, reject) => {
        let completeUrl = (AppSettings.use_dev_server ? AppSettings.server_dev : AppSettings.server) + url;
        if (hash)
            completeUrl += (url.indexOf("?") > -1 ? "&" : "?") + "hash=" + hash;
        fetch(completeUrl, {
            method: 'GET',
            /*headers: {
             Accept: 'application/json',
             }*/
        }).then((response) => {
            setTimeout(() => null, 0); //for debugging in chrome
            if (response._bodyText) {
                if (response._bodyText !== "[]")
                    setAsyncStorage(url, response._bodyText); //save downloaded data
                resolve(response._bodyText);
            } else {
                throw -1 //throw error and continue to catch if body is empty
            }
        }).catch((error) => {
            reject(error);
            if (showError && !isAlertOpen[0]) { //preventing app from showing the same error multiple times
                isAlertOpen[0] = true;
                Alert.alert(
                    'Fehler',
                    ('Es ist ein Fehler beim Herunterladen der Daten aufgetreten.'),
                    [{
                        text: 'OK', onPress: () => {
                            setTimeout(() => isAlertOpen[0] = false, 1000); //wait 1s before allowing a new alert.
                        }
                    }],
                    {cancelable: false}
                );
            }
        }).done();
    });
}

/**
 * Function calculates the byte-length of a string.
 * @param {String} str - String to calculate the byte-length for
 * @returns {Integer} Number of bytes the string takes to store
 */
export function byteLength(str) {
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        let code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
}

/**
 * The prefix that is placed before every key in the {AsyncStorage}.
 * @type {string}
 */
const AsyncStoragePrefix = "@Vertretungsplan:";

/**
 * Function the get data from the {AsyncStorage}
 * @param {String} key - Key for the value
 * @returns {Promise.<*>} Promise with {String} as value
 */
export async function getAsyncStorage(key) {
    return await AsyncStorage.getItem(AsyncStoragePrefix + key);
}

/**
 * Function to save data in the {AsyncStorage}
 * @param {String} key - Key for the value
 * @param {String} value - The value to save in the {AsyncStorage}
 * @returns {Promise.<*>} Promise with the value ({String}) from the {AsyncStorage}
 */
export async function setAsyncStorage(key, value) {
    return await AsyncStorage.setItem(AsyncStoragePrefix + key, value);
}