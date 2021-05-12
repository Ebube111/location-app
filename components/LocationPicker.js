import React, {useState, useEffect} from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import Colors from "../constants/Colors";
import MapPreview from './MapPreview'

const LocationPicker = (props) => {
    const [isFetching, setIsFetching] = useState(false)
    const [pickLocation, setPickLocation] = useState()

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    const { onLocationPicked } = props
    useEffect(() => {
        if(mapPickedLocation) {
            setPickLocation(mapPickedLocation);
            props.onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient Permissions",
        "You need to grant location permissions to use this app",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }

  const getLocationHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });
      setIsFetching(true)
      setPickLocation({
          lat: location.coords.lattitude,
          lng: location.coords.longitude
      })
      props.onLocationPicked({
        lat: location.coords.lattitude,
        lng: location.coords.longitude
    })
    } catch (err) {
      Alert.alert(
        "Could not fetch Location!",
        "Please try again later or pick a location on the map.",
        [{ text: "Okay" }]
      );
    }
    setIsFetching(false)
  };
  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.locationPreview} onPress={pickOnMapHandler} location={pickLocation}>
       {isFetching ? <ActivityIndicator size="large" color={Colors.primary} /> : <Text>No Location choosen yet!</Text>}
      </MapPreview>
      <View style={styles.actions}>
      <Button
        title="Get User Location"
        color={Colors.primary}
        onPress={getLocationHandler}
        />
      <Button
        title="Pick on Map"
        color={Colors.primary}
        onPress={pickOnMapHandler}
        />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15,
  },
  locationPreview: {
    marginBottom: 10,
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%'
  },
});

export default LocationPicker;
