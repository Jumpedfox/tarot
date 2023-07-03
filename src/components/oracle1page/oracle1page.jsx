import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import cards from "../../../tarot-api-708a1-default-rtdb-export.json";
import { Animated } from "react-native";

const Oracle1Page = () => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [randomCard, setRandomCard] = useState("");
  const [showMeaningIsTrue, setShowMeaningIsTrue] = useState(false);
  const [isCardUpsideDown, setIsCardUpsideDown] = useState(0);

  const showMeaning = () => {
    showMeaningIsTrue
      ? setShowMeaningIsTrue(false)
      : setShowMeaningIsTrue(true);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const getRandomCard = () => {
    // return cardsArray[Math.round(Math.random() * 77)];
    fadeIn();
    // console.log(Math.round(Math.random() * 1))
    return cards.cards[Math.round(Math.random() * 77)];
  };

  const loadRandomCard = () => {
    Math.round(Math.random() * 1) === 1
      ? setIsCardUpsideDown(180)
      : setIsCardUpsideDown(0);
    setRandomCard(getRandomCard());
    // console.log(randomCard)
  };

  const hideRandomCard = () => {
    fadeOut();
    setTimeout(() => {
      setRandomCard("");
    }, 2000);
  };

  useEffect(() => {
    return () => {
      setRandomCard("");
    };
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/placeholder2.jpg?alt=media&token=fdc94642-dfdd-4be3-bf19-52517f4ce4b4",
      }}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 8,
          width: windowWidth,
            // backgroundColor: "yellow",
        }}
      >
        {randomCard &&
          (!showMeaningIsTrue ? (
            <Animated.View
              style={{
                height: windowHeight,
                width: windowWidth,
                opacity: fadeAnim,
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: "gold",
              }}
            >
              <Image
                source={{
                  uri: randomCard.image,
                }}
                style={{
                  height: 522,
                  width: 316,
                  borderRadius: 6,
                  marginTop: 70,
                  transform: [{ rotate: `${isCardUpsideDown}deg` }],
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 36,
                  color: "white",
                  width: windowWidth,
                  textAlign: "center",
                  marginTop: 20,
                  fontFamily: "AmaticSC-Bold",
                }}
              >
                {randomCard.name}
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              style={{
                height: windowHeight,
                width: windowWidth,
                opacity: fadeAnim,
                alignItems: "center",
                justifyContent: "flex-start",
                // backgroundColor: "brown",
              }}
            >
              <Text
                style={{
                  fontSize: 44,
                  color: "white",
                  textAlign: "center",
                  marginTop: 60,
                  fontFamily: "AmaticSC-Bold",
                }}
              >
                {randomCard.name}
              </Text>
              {isCardUpsideDown ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    width: windowWidth,
                    textAlign: "center",
                    //   marginTop: 60,
                  }}
                >
                  (reversed)
                </Text>
              ) : (
                <></>
              )}
              <Text
                style={{
                  fontSize: 36,
                  color: "white",
                  width: windowWidth,
                  textAlign: "center",
                  fontFamily: "AmaticSC-Bold",
                }}
              >
                {isCardUpsideDown === 0
                  ? randomCard.meaning_up
                  : randomCard.meaning_rev}
              </Text>
            </Animated.View>
          ))}
        {/* <StatusBar style="auto" /> */}
      </View>
      <View
        style={{
          flex: 1,
          width: windowWidth,
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "row",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={!showMeaningIsTrue ? loadRandomCard : showMeaning}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "rgb(255, 250, 205)",
            borderWidth: 0.5,
            shadowColor: "rgb(255, 250, 205)",
            elevation: 20,
          }}
        >
          <Text
            style={{
              color: "rgb(255, 250, 205)",
              fontSize: 24,
              lineHeight: 24,
              textAlign: "center",
              width: 50,
              fontFamily: "AmaticSC-Bold",
            }}
          >
            my 1 fate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={!showMeaningIsTrue ? showMeaning : showMeaning}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "rgb(219, 112, 147)",
            borderWidth: 0.5,
            shadowColor: "rgb(219, 112, 147)",
            elevation: 20,
          }}
        >
          <Text
            style={{
              color: "rgb(219, 112, 147)",
              fontSize: 24,
              lineHeight: 24,
              textAlign: "center",
              fontFamily: "AmaticSC-Bold",
            }}
          >
            {!showMeaningIsTrue ? "meaning" : "back to card"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={hideRandomCard}
          style={{
            width: 80,
            height: 80,
            borderRadius: 50,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            alignItems: "center",
            justifyContent: "center",
            borderColor: "rgb(175, 238, 238)",
            borderWidth: 0.5,
            shadowColor: "rgb(175, 238, 238)",
            elevation: 20,
          }}
        >
          <Text
            style={{
              color: "rgb(175, 238, 238)",
              fontSize: 24,
              lineHeight: 24,
              textAlign: "center",
              width: 50,
              fontFamily: "AmaticSC-Bold",
            }}
          >
            once again
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Oracle1Page;
