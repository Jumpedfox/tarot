import { Image, Text, TouchableOpacity, Dimensions } from "react-native";

const BigCard = ({
  isCard1Pressed,
  isCard2Pressed,
  isCard3Pressed,
  card1,
  card2,
  card3,
  setShowBigCard,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <TouchableOpacity
      onPress={() => setShowBigCard(false)}
      style={{
        width: windowWidth,
        height: windowHeight,
        backgroundColor: "rgba(0, 0, 0, 0.5);",
        zIndex: 10,
        position: "absolute",
        paddingTop: 50,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
      >
      <Image
        source={{
          uri: isCard1Pressed
            ? `${card1.image}`
            : isCard2Pressed
            ? `${card2.image}`
            : `${card3.image}`,
        }}
        style={{
          overflow: "hidden",
          width: windowWidth - 20,
          height: (windowWidth - 24) * 1.65,
          borderRadius: 20,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          fontSize: 44,
          color: "white",
          fontFamily: "AmaticSC-Bold",
          textShadowColor: "white",
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 30,
        }}
      >
        {isCard1Pressed
          ? `${card1.name}`
          : isCard2Pressed
          ? `${card2.name}`
          : `${card3.name}`}
      </Text>
    </TouchableOpacity>
  );
};

export default BigCard;
