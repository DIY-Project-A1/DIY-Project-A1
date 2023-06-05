import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AllDustbins from './screens/AllDustbins';
import AddDustbin from './screens/AddDustbin';
import Map from './screens/Map';
import DustbinDetails from './screens/DustbinDetails';
import { useEffect, useState, useCallback } from 'react';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import Loading from './screens/Loading';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';


SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  // const [dbInitialized, setDbInitialized] = useState();

  // useEffect(() => {
  //   init().then(() => {
  //     setDbInitialized(true);
  //   });
  // }, []);

  // if (!dbInitialized) {
  //   return <AppLoading />;
  // };

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        // Pre-load fonts, make any API calls you need to do here
        await init();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: Colors.gray700 }
          }}
        >
          <Stack.Screen
            name="AllDustbins"
            component={AllDustbins}
            options={({ navigation }) => ({
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  size={24}
                  color={tintColor}
                  onPress={() => navigation.navigate("AddDustbin")}
                />
              ),
              title: "Nearby Dustbins"
            })}
          />
          <Stack.Screen
            name="AddDustbin"
            component={AddDustbin}
            options={() => ({
              title: "Add a new Dusbin Location!",
            })}
          />
          <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="DustbinDetails"
            component={DustbinDetails}
            options={() => ({
              title: "Loading Dustbin Details..."
            })}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={() => ({
              headerShown: false
            })}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </View>
  );
}

