import { StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/colors";

const OutlinedButton = ({ children, onPress, icon }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={18}
        color={Colors.primary500}
        style={styles.icon}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    color: Colors.primary500,
  },
  icon: {
    marginRight: 6,
  },
});
