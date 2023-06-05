import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

import DustbinList from "../components/places/DustbinList";
import { fetchDustbins } from "../util/database";
import OutlinedButton from "../components/UI/OutlinedButton";


const AllDustbins = ({ navigation }) => {
  const [loadedDustbins, setLoadedDustbins] = useState([]);

  const isFocused = useIsFocused();

  const dbUpdateHandler = async () => {
    navigation.navigate("Loading");
  };

  useEffect(() => {
    async function loadDustbins() {
      const dustbins = await fetchDustbins();
      setLoadedDustbins(dustbins);
    }

    if (isFocused) {
      loadDustbins();
      //setLoadedDustbins((curDustbins) => [...curDustbins, route.params.dustbin])
    }

  }, [isFocused])

  return (
    <View style={styles.container}>
      <DustbinList dustbins={loadedDustbins} />
      <OutlinedButton icon="locate" onPress={dbUpdateHandler}>Find Closest Dustbins!</OutlinedButton>
    </View>

  )
};

export default AllDustbins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,

  }
});