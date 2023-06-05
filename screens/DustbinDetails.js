import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchDustbinDetails, deleteDustbin } from "../util/database";

const DustbinDetails = ({ route, navigation }) => {
  const [fetchedDustbin, setFetchedDustbin] = useState();

  const deleteDustbinHandler = async () => {
    await deleteDustbin(fetchedDustbin.id);
    navigation.goBack();
  }


  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: fetchedDustbin.location.lat,
      initialLng: fetchedDustbin.location.lng,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    const loadDustbinDetails = async () => {
      const dustbin = await fetchDustbinDetails(selectedPlaceId);
      setFetchedDustbin(dustbin)
      navigation.setOptions({
        title: dustbin.title
      });
    };
    loadDustbinDetails();
  }, [selectedPlaceId])

  if (!fetchedDustbin) {
    return (
      <View style={styles.fallback}>
        <Text > Loading Dustbin Data...</Text>
      </View>
    );
  }

  return (

    <ScrollView >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: fetchedDustbin.imageUri }} />
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedDustbin.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>View on Map</OutlinedButton>
        <OutlinedButton icon="trash" onPress={deleteDustbinHandler}>Delete Dustbin Location</OutlinedButton>
      </View>
    </ScrollView>

  )
};

export default DustbinDetails;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 20,
    width: '100%',
    height: '35%',
    minHeight: 300,
    borderRadius: 10
  },
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 10,
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },


});