// import { View, Button, StyleSheet, Modal, Dimensions } from "react-native";
// import { useState, useEffect } from "react";
// import { Camera, CameraType } from 'expo-camera';

// const { width: winWidth, height: winHeight } = Dimensions.get('window')

// const ImagePicker = () => {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [camera, setCamera] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === 'granted');
//     })();
//   }, []);
//   const takePicture = async () => {
//     if (camera) {
//       const data = await camera.takePictureAsync(null)
//       setImage(data.uri);
//     }
//   }

//   const takeImageHandler = () => {
//     return (setModalVisible(true));
//   };

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }
//   return (

//     <View style={{ flex: 1 }}>
//       <Button title={"Take Image"} onPress={takeImageHandler} />
//       <Modal visible={modalVisible}>
//         <View styles={{ flex: 1, justifyContent: "center" }}>
//           <View style={styles.cameraContainer}>
//             <Camera
//               ref={ref => setCamera(ref)}
//               style={styles.fixedRatio}
//               type={type} />
//           </View>
//           <Button
//             title="Flip Image"
//             onPress={() => {
//               setType(
//                 type === Camera.Constants.Type.back
//                   ? Camera.Constants.Type.front
//                   : Camera.Constants.Type.back
//               );
//             }}>
//           </Button>
//           <Button title="Take Picture" onPress={() => takePicture()} />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default ImagePicker;

// const styles = StyleSheet.create({
//   cameraContainer: {
//     flex: 1,
//     flexDirection: 'row'
//   },
//   fixedRatio: {
//     flex: 1,
//     height: winHeight,
//     width: winWidth,
//     position: 'absolute',

//   }
// })

import { View, Modal, Image, Text, StyleSheet } from "react-native";
import { useState } from "react";
import CameraScreen from './CameraScreen';
import OutlinedButton from "../UI/OutlinedButton";
import { Ionicons } from '@expo/vector-icons';

import { Colors } from "../../constants/colors";

const ImagePicker = ({ onTakeImage }) => {
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const takeImageHandler = () => {
    return (setModalVisible(true));
  }

  let imagePreview = <Ionicons
    name="image"
    style={styles.fadedIcon}
  />

  if (imageUri) {
    imagePreview = <Image style={styles.image} source={{ uri: imageUri }} />
  };

  const imageSetterHandler = (image) => {
    setImageUri(image);
    onTakeImage(image);
  };

  return (
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlinedButton
        icon="camera"
        onPress={takeImageHandler}
      >
        Take Image
      </OutlinedButton >
      <Modal visible={modalVisible}>
        <CameraScreen onEnd={setModalVisible} imageSetter={imageSetterHandler} />
      </Modal>
    </View>
  )
};

export default ImagePicker;

const styles = StyleSheet.create({
  fadedIcon: {
    color: Colors.gray700,
    fontSize: 80,
    opacity: 0.5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 10,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  }
});
