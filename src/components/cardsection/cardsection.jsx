import {
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef } from "react";

import { Animated } from "react-native";

const CardSection = ({
  position,
  liftUpCard,
  isCardPressed,
  setShowBigCard,
  card,
  isCardRotated,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  });

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ rotate: `${position}deg` }],
        position: "absolute",
        zIndex: isCardPressed ? 3 : 1,
        top: 70,
        alignSelf: "center",
        alignItems: "flex-end",
        textAlign: "center",
      }}
    >
      <TouchableOpacity
        onPress={liftUpCard}
        onLongPress={() => isCardPressed && setShowBigCard(true)}
        activeOpacity={0.8}
        style={{
          height: 522,
          width: 316,
        }}
      >
        <ImageBackground
          source={{
            uri: card.image,
          }}
          style={{
            height: 522,
            width: 316,
            borderRadius: 6,
            overflow: "hidden",
            transform: [{ rotate: `${isCardRotated}deg` }],
            position: "absolute",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 32,
              color: "white",
              fontFamily: "AmaticSC-Bold",
              textShadowColor: "black",

              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 30,
            }}
          >
            {card.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardSection;
