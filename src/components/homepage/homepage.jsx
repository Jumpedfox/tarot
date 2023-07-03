import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { loadFont } from "../../helpers/useFonts";
import React, { useCallback, useRef } from "react";
import { Audio } from "expo-av";
import BackButton from "../backbutton/backbutton";
import Loader from "../loader/loader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Oracle1Page from "../oracle1page/oracle1page";
import Oracle3Page from "../oracle3page/oracle3page";
import MainMenu from "../mainmenu/mainmenu";
import { useDispatch, useSelector } from "react-redux";
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from "expo-av/build/AV";
import { changeVolume } from "../../redux/reducers/index";

const HomePage = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const options = {
    headerShown: false,
  };

  const [backgroundSound, setbackgroundSound] = useState(new Audio.Sound());
  const playBackgroundSound = async () => {
    try {
      await backgroundSound.loadAsync(
        require("../../audios/backgroundMusic.mp3")
      );
      await backgroundSound.setVolumeAsync(musicVolume);
      await backgroundSound.setIsLoopingAsync(true);
      await backgroundSound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const loaderIsOn = useSelector((state) => state.interfaceSlice.showLoader);
  const musicVolume = useSelector((state) => state.interfaceSlice.musicVolume);
  const musicIsOn = useSelector((state) => state.interfaceSlice.musicIsOn);

  useEffect(() => {
    backgroundSound._loaded && backgroundSound.setVolumeAsync(musicVolume);
  }, [musicVolume]);

  useEffect(() => {
    backgroundSound._loaded &&
      (async () => {
        musicIsOn
          ? await backgroundSound.playAsync()
          : await backgroundSound.pauseAsync();
      })();
  }, [musicIsOn]);

  useEffect(() => {
    playBackgroundSound();
  }, []);

  return (
    <>
      {loaderIsOn && <Loader />}
      <Stack.Navigator>        
        <Stack.Screen name="Menu" component={MainMenu} options={options} />
        <Stack.Screen
          name="Oracle"
          component={Oracle3Page}
          options={options}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomePage;
