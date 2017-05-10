/**
 * Created by Simon on 20.04.2017.
 */
import {Alert, AsyncStorage} from "react-native";
const text = require('Vertretungsplan/app/config/text');

export function getData(url) {
    return new Promise((resolve, reject) => {
        downloadData(url)
            .then((value) => {
                resolve(value)
            })
            .catch((value) => getAsyncStorage(url)
                .then((value) =>{
                    if(value)resolve(value);
                    else reject();
                })
                .catch(() => reject()))
            .done()
    });
}

const isAlertOpen = [false];

export function downloadData(url) {
    return new Promise((resolve, reject) => {
        fetch(text.server + url, {
            method: 'GET', headers: {
                Accept: 'application/json',
            }
        }).then((response) => {
            setTimeout(() => null, 0); //for debugging in chrome
            if (response._bodyText) {
                setAsyncStorage(url, response._bodyText);
                resolve(response._bodyText);
            } else {
                throw -1 //throw error if body is empty
            }
        }).catch((error) => {
            reject(error);
            console.log("error");
            if (!isAlertOpen[0]) {
                isAlertOpen[0] = true;
                Alert.alert(
                    'Fehler',
                    ('Es ist ein Fehler beim Herunterladen der Daten aufgetreten.'),
                    [{
                        text: 'OK', onPress: () => {
                            setTimeout(() => isAlertOpen[0] = false, 1000); //preventing app from showing the same error multiple times
                        }
                    }],
                    {cancelable: false}
                );
            }
        });
    });
}

export function byteLength(str) {
    // returns the byte length of an utf8 string
    let s = str.length;
    for (let i = str.length - 1; i >= 0; i--) {
        let code = str.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s += 2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }
    return s;
}

export async function getAsyncStorage(key) {
    return await AsyncStorage.getItem('@Vertretungsplan:' + key);
}

export async function setAsyncStorage(key, value) {
    return await AsyncStorage.setItem('@Vertretungsplan:' + key, value);
}