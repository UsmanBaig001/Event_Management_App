import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import storage from '@react-native-firebase/storage'
import * as Location from 'react-native-location';
import { useDispatch } from "react-redux";

const font = {
    bold: 'Poppins-Bold',
    regular: 'Poppins-Regular',
    semibold: 'Poppins-SemiBold',
    medium: 'Poppins-Medium',
    light: 'Poppins-Light',
}


const sHeight = getStatusBarHeight()
const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

const wp = float => WIDTH * float / 100
const hp = float => HEIGHT * float / 100

const APP_NAME = "eventNextDoor"

const uploadPhoto = async (image, name, onChangeProgress, dir = `${APP_NAME}/avatar`) => {

    let response = await fetch(image);
    let file = await response.blob();
    const imagePath = dir + "/" + name

    return new Promise(resolve => {
        const task = storage()
            .ref(imagePath)
            .put(file);
        // set progress state
        task.on('state_changed', snapshot => {

            let progress = snapshot.bytesTransferred / snapshot.totalBytes
            console.log('progress: ', progress);

        }, err => {
            console.log('err: ', err);
            return resolve(false)
        }, async () => {
            let url = await storage().ref(imagePath).getDownloadURL()
            return resolve(url)
        });



    })

}
const uploadPhotoOfEvents = async (image, name, onChangeProgress, dir = `${APP_NAME}/events`) => {

    let response = await fetch(image);
    let file = await response.blob();
    const imagePath = dir + "/" + new Date().toTimeString()

    return new Promise(resolve => {
        const task = storage()
            .ref(imagePath)
            .put(file);
        // set progress state
        task.on('state_changed', snapshot => {

            let progress = snapshot.bytesTransferred / snapshot.totalBytes
            console.log('progress: ', progress);

        }, err => {
            console.log('err: ', err);
            return resolve(false)
        }, async () => {
            let url = await storage().ref(imagePath).getDownloadURL()
            return resolve(url)
        });



    })

}

const getLocation = async () => {


    let granted = await Location.requestPermission({ ios: "whenInUse", android: { detail: "fine" } });
    console.log('====================================');
    console.log(granted, 'granted...');
    console.log('====================================');
    if (!granted) {
        alert('Permission to access location was denied');
        return false
    }
    else {
        let location = await Location.getLatestLocation();
        if (location?.latitude && location.longitude) {
            const region = {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            };
            console.log(region, "region")

            return region
        }
        else {
            alert('Permission to access location was denied');
            return false
        }
    }
}
const getDistance = (lat, lng, userLat, userLng) => {
    function rad(x) {
        return x * Math.PI / 180;
    }
    let p1 = { lat: userLat, lng: userLng }
    if (p1.lng === undefined || p1.lat === undefined) {
        return;
    }
    let p2 = { lat: parseFloat(lat), lng: parseFloat(lng) }
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat - p1.lat);
    var dLong = rad(p2.lng - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = (R * c) / 1000
    return d.toFixed(2) // returns the distance in kmiles
}



export {
    wp,
    hp,
    sHeight,
    font,
    uploadPhoto,
    uploadPhotoOfEvents,
    getLocation,
    getDistance

}