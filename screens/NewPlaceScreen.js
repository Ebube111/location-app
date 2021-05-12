import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";

import ImagePicker from '../components/ImageSelector'
import * as placesActions from '../store/places-action'
import Colors from "../constants/Colors";
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = (props) => {
  const [selectedImage, setSelectedImage] = useState()
  const [title, setTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState()
  
  const dispatch = useDispatch()
  const titleChangeHandler = (text) => {
    setTitle(text);
  };
  const imageTakenHandler = imagePath => {
      setSelectedImage(imagePath)
  }

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location)
  }, [])

  const savePlaceHandler = () => {
      dispatch(placesActions.addPlace(title, selectedImage, selectedLocation))
      props.navigation.goBack()
  };


  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImagePicker onImageTaken= {imageTakenHandler} />
        <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler} />
        <Button title="Save Place" color={Colors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "New Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
