import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Mapview, { Marker } from "react-native-maps";

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude),
          setLongitude(position.coords.longitude),
          setError(null);
      },
      (error) => {
        setError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 2000,
      }
    );
  }, []);

  const fadeOut = () => {
    Mapview.animate.ToCoordinate(
      {
        latitude: latitude,
        longitude: longitude,
      },
      5
    );
  };

  return (
    <View style={styles.map}>
      <Text>My Current Location</Text>

      <Mapview
        style={styles.map}
        showUserLocation
        followUserLocation
        showsTraffic={true}
        loadingEnabled={true}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        />
      </Mapview>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default App;
