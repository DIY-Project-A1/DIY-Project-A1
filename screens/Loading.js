import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { MotiView } from 'moti';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { useEffect, useState } from "react";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import { orderDustbinsByDistance } from '../util/database';
import { useIsFocused } from "@react-navigation/native";

const size = 70;
const offset = 20;

const Loading = ({ navigation }) => {

  const isFocused = useIsFocused();

  const [userLocation, setUserLocation] = useState();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    // if (
    //   locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    // ) {
    //   const permissionResponse = await requestPermission();

    //   return permissionResponse.granted;
    // }

    // if (locationPermissionInformation.status === PermissionStatus.DENIED) {
    //   Alert.alert(
    //     'Insufficient Permissions!',
    //     'You need to grant location permissions to use this app.'
    //   );
    //   return false;
    // }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log('here is', location)
    setUserLocation({
      "lat": location.coords.latitude,
      "lng": location.coords.longitude
    })
    console.log(userLocation)
  }


  useEffect(() => {

    setTimeout(() => {
      if (isFocused) {
        getLocationHandler();
      }
    }, 2000);

  }, [isFocused])

  async function onLoad() {
    await orderDustbinsByDistance(userLocation.lat, userLocation.lng);
    navigation.navigate("AllDustbins");
  };


  useEffect(() => {
    if (userLocation) {
      console.log(userLocation);
      onLoad();
    }
  }, [userLocation])

  return (
    <View style={styles.container}>
      <MotiView
        from={{
          width: size,
          height: size,
          shadowOpacity: 0,
          borderRadius: size / 2,
          borderWidth: 0,
        }}
        animate={{
          width: size + offset,
          height: size + offset,
          shadowOpacity: 1,
          borderRadius: (size + offset) / 2,
          borderWidth: size / 10,
        }}
        transition={{
          type: 'timing',
          duration: 1000,
          loop: true,
        }}
        style={styles.circle}
      />
    </View>


  );
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.gray700,
  },
  circle: {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: size / 10,
    borderColor: Colors.primary50,
    shadowColor: Colors.primary50,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  }
});