import { Button, Text, TouchableOpacity } from "react-native";
import { toggleShowLoader } from "../../redux/reducers";
import { useDispatch } from "react-redux";
import { Audio } from "expo-av";

const BackButton = ({ navigation }) => {
  const dispatch = useDispatch();

  const sound = new Audio.Sound();
  const clickSound = async () => {
    try {
      await sound.loadAsync(require("../../audios/woosh_low_long01-98755.mp3"));
      await sound.playAsync();
      setTimeout(() => {
        sound.unloadAsync();
      }, 3500);
    } catch (error) {
      console.log(error);
    }
  };

  const navigationWithAnimation = (value) => {
    clickSound();
    dispatch(toggleShowLoader(true));
    setTimeout(() => {
      navigation.navigate(`${value}`);
      setTimeout(() => {
        dispatch(toggleShowLoader(false));
      }, 1500);
    }, 1000);
  };

  return (
    <TouchableOpacity
      onPress={() => navigationWithAnimation("Menu")}
      style={{
        height: 110,
        width: 20,
        opacity: 1,
        position: "absolute",
        bottom: "80%",
        left: 0,
        borderColor: "black",
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        zIndex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          marginTop: 4,
          textAlign: "center",
          width: 84,
          fontSize: 20,
          lineHeight: 26,
          fontFamily: "AmaticSC-Bold",
          transform: [{ rotate: "-90deg" }],
        }}
      >
        MAIN MENU
      </Text>
    </TouchableOpacity>
  );
};

export default BackButton;
