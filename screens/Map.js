import MapView, { Marker } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useLayoutEffect, useState } from "react";

import IconButton from "../components/UI/IconButton";

const Map = ({ navigation, route }) => {
  const initialLocation = route.params && {
    lat: route.params.initialLat,
    lng: route.params.initialLng
  };

  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'Please pick a location on the map.',
        [{ text: 'Okay' }]);
      return;
    }
    navigation.navigate(
      'AddDustbin',
      {
        pickedLat: selectedLocation.lat,
        pickedLng: selectedLocation.lng
      }
    );
  }, [navigation, selectedLocation]);

  const region = {
    latitude: initialLocation ? initialLocation.lat : 22.3166,
    longitude: initialLocation ? initialLocation.lng : 87.3106,
    latitudeDelta: initialLocation ? 0.00922 : 0.0922,
    longitudeDelta: initialLocation ? 0.00421 : 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (initialLocation) {
      return;
    }

    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });

  };


  useLayoutEffect(() => {
    if (initialLocation) {
      return;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      )
    });
  }, [navigation, savePickedLocationHandler, initialLocation]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && <Marker coordinate={{
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng
      }} />}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});