import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { loadFont } from "./src/helpers/useFonts";
import BottomSheet from "./src/components/bottommenu/bottommenu";
import HomePage from "./src/components/homepage/homepage";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { Provider as PaperProvider } from "react-native-paper";

const API_KEY =`${process.env.EXPO_PUBLIC_API_KEY}`
console.log(API_KEY)

const App = () => {

  const [fontIsLoaded, setFontIsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFont();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontIsLoaded(true);
      }
    }
    prepare();
  }, []);

  if (!fontIsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <StatusBar hidden={true} />
              <HomePage />
              <BottomSheet />
            </GestureHandlerRootView>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    );
  }
};

export default App;
