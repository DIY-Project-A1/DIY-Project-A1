import { FlatList, View, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DustbinItem from './DustbinItem';
import { Colors } from '../../constants/colors';

const DustbinList = ({ dustbins }) => {
  const navigation = useNavigation();

  const selectPlaceHandler = (id) => {
    navigation.navigate('DustbinDetails', {
      placeId: id,
    });
  }

  if (!dustbins || dustbins.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No dustbins added yet - start adding some!
        </Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.list}
      data={dustbins}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        <DustbinItem dustbin={item} onSelect={selectPlaceHandler} />
      }
    />
  )
};

export default DustbinList;

const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  }
});