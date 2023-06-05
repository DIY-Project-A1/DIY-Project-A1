import { View, StyleSheet, Alert } from 'react-native';
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { useEffect, useState } from 'react';

import OutlinedButton from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, useIsFocused } from '@react-navigation/native';



const LocationPicker = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation =
      {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      "lat": location.coords.latitude,
      "lng": location.coords.longitude,
    });
  }

  const pickOnMapHandler = () => {
    navigation.navigate('Map');

  };

  let locationPreview = <Ionicons
    name="location"
    style={styles.fadedIcon}
  />;

  if (pickedLocation) {
    //wait 2 seconds
    // setTimeout(() => {
    //   return (
    //     locationPreview = <Ionicons
    //       style={styles.clearIcon}
    //       name="location"
    //     />);
    // }, 2000);
    locationPreview = <Ionicons
      style={styles.clearIcon}
      name="location"
    />
  }

  return (
    <View>
      <View style={styles.mapPreview}>
        {locationPreview}
      </View>

      <View style={styles.actions}>
        <OutlinedButton
          icon="location"
          onPress={getLocationHandler}
        >
          Locate Me!
        </OutlinedButton>
        <OutlinedButton
          onPress={pickOnMapHandler}
          icon="map"
        >
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  clearIcon: {
    color: Colors.green500,
    fontSize: 100

  },
  fadedIcon: {
    color: Colors.gray700,
    opacity: 0.5,
    fontSize: 100
  },
  mapPreview: {
    marginVertical: 8,
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 8
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});
