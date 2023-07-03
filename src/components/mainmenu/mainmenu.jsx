import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { loadFont } from "../../helpers/useFonts";
import React, { useCallback, useRef } from "react";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleShowLoader,
  setDivinationCardsAmount,
} from "../../redux/reducers";

const MainMenu = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [manualIsVisible, setManualIsVisible] = useState(false);

  const ref = useRef(null);

  const dispatch = useDispatch();

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, []);

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

  const [galleryPlaceholder, setGalleryPlaceholder] = useState("GALLERY");

  const toggleGalleryButton = () => {
    setGalleryPlaceholder("Creation in progress");
    setTimeout(() => {
      setGalleryPlaceholder("GALLERY");
    }, 3000);
  };

  const navigationWithAnimation = (value) => {
    if (value === "Oracle1") {
      dispatch(setDivinationCardsAmount(1));
    } else if (value === "Oracle3") {
      dispatch(setDivinationCardsAmount(3));
    }
    clickSound();
    dispatch(toggleShowLoader(true));
    setTimeout(() => {
      if (value === "Oracle1" || value === "Oracle3") {
        navigation.navigate("Oracle");
      } else {
        navigation.navigate(`${value}`);
      }
      setTimeout(() => {
        dispatch(toggleShowLoader(false));
        if (manualIsVisible) {
          setManualIsVisible(false);
        }
      }, 1500);
    }, 1000);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ImageBackground
        style={{
          height: windowHeight,
          width: windowWidth,
          justifyContent: "space-evenly",
          alignItems: "center",
          borderTopColor: "gold",
          paddingTop: 30,
          paddingBottom: 100,
          backgroundColor: "black",
        }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/dream_TradingCard%20-%202023-04-18T182631.944.jpg?alt=media&token=c8f36df8-6695-4619-86c5-29f7e91b0d46",
        }}
      >
        <View
          style={{
            width: 300,
            height: 450,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              smallTextStyle,
              { color: !manualIsVisible ? "transparent" : "white" },
            ]}
          >
            This app was created to help you with small daily questions if you
            want to rely on a prediction
          </Text>
          <TouchableOpacity
            onPress={() => navigationWithAnimation("Oracle1")}
            activeOpacity={0.6}
            style={bigButtonStyle}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/tarot1.png?alt=media&token=94643a0a-f2b8-49f6-890b-339dbd23d17d",
              }}
            />
          </TouchableOpacity>
          <Text
            style={[
              smallTextStyle,
              { color: !manualIsVisible ? "transparent" : "white" },
            ]}
          >
            Press on a card to lift it up, Long pres on top card to open a big
            size of it.
          </Text>
          <TouchableOpacity
            onPress={() => navigationWithAnimation("Oracle3")}
            activeOpacity={0.6}
            style={bigButtonStyle}
          >
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/tarot3.png?alt=media&token=337f60dc-048a-4960-82b3-b9412504bf5e",
              }}
            />
          </TouchableOpacity>
          <Text
            style={[
              smallTextStyle,
              { color: !manualIsVisible ? "transparent" : "white" },
            ]}
          >
            Based on your intuition, you can choose how many cards you need to
            answer your question
          </Text>
        </View>
        <TouchableOpacity
          style={smallButtonStyle}
          activeOpacity={0.6}
          onPress={toggleGalleryButton}
        >
          <Text style={buttonTextStyle}>{galleryPlaceholder}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              smallTextStyle,
              { color: !manualIsVisible ? "transparent" : "white" },
            ]}
          >
            You can open the{"   "}gallery to see all the beautiful works of art
          </Text>
          {manualIsVisible && (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/arrowLeftBottom.png?alt=media&token=a35bd166-5c5d-4737-baf6-e34f8c2455d6",
              }}
              style={{
                width: 22,
                height: 40,
                position: "absolute",
                left: 106,
                top: -24,
                transform: [{ scale: -1 }],
              }}
            />
          )}
        </View>
        <TouchableOpacity
          onPress={() => setManualIsVisible(!manualIsVisible)}
          style={smallButtonStyle}
          activeOpacity={0.6}
        >
          <Text style={buttonTextStyle}>
            {manualIsVisible ? "HIDE" : "SHOW"} MANUAL
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", width: 300 }}>
          <Text
            style={[
              smallTextStyle,
              { color: !manualIsVisible ? "transparent" : "white" },
            ]}
          >
            To open options swipe up that cute Moon at the bottom of the screen
          </Text>
          {manualIsVisible && (
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/arrowLeftBottom.png?alt=media&token=a35bd166-5c5d-4737-baf6-e34f8c2455d6",
              }}
              style={{
                width: 22,
                height: 40,
                position: "absolute",
                right: 76,
                top: 26,
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default MainMenu;

const bigButtonStyle = {
  height: 150,
  width: 280,
  backgroundColor: "grey",
  opacity: 0.8,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
};

const smallButtonStyle = {
  height: 70,
  width: 280,
  backgroundColor: "grey",
  opacity: 0.8,
  borderRadius: 20,
  justifyContent: "center",
};

const buttonTextStyle = {
  color: "white",
  fontSize: 40,
  lineHeight: 48,
  textAlign: "center",
  fontFamily: "AmaticSC-Bold",
};

const smallTextStyle = {
  width: 300,
  fontSize: 20,
  lineHeight: 20,
  textAlign: "center",
  fontFamily: "AmaticSC-Bold",
};

const galleryPlaceholderStyle = {
  fontSize: 30,
};
