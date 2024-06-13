import React from "react";
import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import BackButton from "../backbutton/backbutton";
import Loader from "../loader/loader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OraclePage from "../oraclepage/oraclepage";
import MainMenu from "../mainmenu/mainmenu";
import { useSelector } from "react-redux";
import { _DEFAULT_INITIAL_PLAYBACK_STATUS } from "expo-av/build/AV";

const HomePage = ({ navigation }) => {
  const Stack = createNativeStackNavigator();
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
        <Stack.Screen name="Oracle" component={OraclePage} options={options} />
      </Stack.Navigator>
    </>
  );
};

export default HomePage;
