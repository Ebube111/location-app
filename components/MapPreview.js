import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Touchable } from "react-native";

import env from "../env";

const MapPreview = (props) => {
    let imagePreviewUrl
    if(props.location) {

        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${props.location.lat},${props.location.lng}&key=${env.googleApikey}`;
    }

  return (
    <TouchableOpacity onPress={props.onPress} style={{...styles.locationPreview, ...props.style}}>
        {props.location ? <Image style={styles.mapImage} source={{ uri: imagePreviewUrl}} /> : props.children}
   </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
    locationPreview: {
        justifyContent: "center",
    alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;
