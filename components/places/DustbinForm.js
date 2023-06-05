import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import { useState, useCallback } from "react";

import { Colors } from '../../constants/colors';
import ImagePicker from './ImagePicker'
import LocationPicker from "./LocationPicker";
import RegularButton from "../UI/RegularButton";
import { Dustbin } from "../../models/Dustbin";



const DustbinForm = ({ onCreateDustbin }) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const changeTitleHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {

    if (!enteredTitle || !selectedImage || !pickedLocation) {
      Alert.alert(
        'Invalid Input',
        'Please enter a valid title, image and location.',
        [{ text: 'Okay' }]
      );
      return;
    }
    const dustbinData = new Dustbin(
      enteredTitle,
      selectedImage,
      pickedLocation,
    );
    onCreateDustbin(dustbinData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title:</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={enteredTitle}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <RegularButton onPress={savePlaceHandler}>Add Dustbin!</RegularButton>
    </ScrollView>
  );
};

export default DustbinForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary500,
    fontSize: 16
  },
  input: {
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 10
  }

});