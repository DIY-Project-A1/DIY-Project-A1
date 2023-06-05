import { View, Text, Image, Pressable, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

const DustbinItem = ({ dustbin, onSelect }) => {

  return (
    <Pressable
      onPress={onSelect.bind(this, dustbin.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image
        source={{ uri: dustbin.imageUri }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.title}>
          {dustbin.title}
        </Text>
        <Text style={styles.address}>
          {dustbin.address}
        </Text>
      </View>
    </Pressable>
  )
};

export default DustbinItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 5,

    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100
  },
  info: {
    justifyContent: 'space-between',
    flex: 2,
    padding: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.gray700
  },
  address: {
    marginTop: 6,
    fontSize: 16,
    color: Colors.gray700
  },
});