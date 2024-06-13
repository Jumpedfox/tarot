import {
  Dimensions,
  Image,
  Text,
  View
} from "react-native";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CardMeaning = ({
  card1,
  card2,
  card3,
  isCard1Rotated,
  isCard2Rotated,
  isCard3Rotated,
  meaning,
  setMeaning,
  showMeaningIsTrue,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const divinationCardsAmount = useSelector(
    (state) => state.interfaceSlice.divinationCardsAmount
  );

  // const API_KEY = "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";

  // ********* ChatGPT requests *********

  const loadMeaning = async () => {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt:
          divinationCardsAmount === 3
            ? `My tarot devinition is: "${isCard1Rotated && "rotated "} ${
                card1.name
              }", "${isCard2Rotated && "rotated "}${card2.name}", "${
                isCard2Rotated && "rotated "
              }${card3.name}". Give me an advice depends on cards.`
            : `My tarot devinition is "${isCard1Rotated && "rotated "} ${
                card1.name
              }". Give me an advice depends on this card.`,
        model: "text-davinci-003",
        max_tokens: 150,
        temperature: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    setMeaning(response.data.choices[0].text);
  };

  useEffect(() => {
    !meaning && loadMeaning();
  }, []);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/eye.png?alt=media&token=c6f37125-4950-4562-aafe-f2728c775b4d",
        }}
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      <Text style={bigTextStyle}>
        {card1.name}
        {isCard1Rotated ? (
          <Text
            style={{
              fontSize: 20,
              color: "white",
              width: windowWidth,
              textAlign: "center",
              fontFamily: "AmaticSC-Bold",
            }}
          >
            (reversed)
          </Text>
        ) : (
          <></>
        )}
      </Text>
      <Text style={textStyle}>
        {!isCard1Rotated ? card1.meaning_up : card1.meaning_rev}
      </Text>
      {card2 && (
        <View>
          <Text style={bigTextStyle}>
            {card2.name}
            {isCard2Rotated ? (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  width: windowWidth,
                  textAlign: "center",
                  fontFamily: "AmaticSC-Bold",
                }}
              >
                (reversed)
              </Text>
            ) : (
              <></>
            )}
          </Text>
          <Text style={textStyle}>
            {!isCard2Rotated ? card2.meaning_up : card2.meaning_rev}
          </Text>
        </View>
      )}
      {card3 && (
        <View>
          <Text style={bigTextStyle}>
            {card3.name}
            {isCard3Rotated ? (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  textAlign: "center",
                  fontFamily: "AmaticSC-Bold",
                }}
              >
                (reversed)
              </Text>
            ) : (
              <></>
            )}
          </Text>
          <Text style={textStyle}>
            {!isCard3Rotated ? card3.meaning_up : card3.meaning_rev}
          </Text>
        </View>
      )}
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/tree-stars.png?alt=media&token=5ba2c238-4d36-445b-9984-b4f754bc5899",
        }}
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
      {meaning && (
        <Text style={[textStyle, { marginTop: -80 }]}>{meaning}</Text>
      )}
      <Text style={textStyle}>
        AI divination interpretation is not available now due to the chatGPT license
        issue. My apologies!
      </Text>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/moon-and-stars.png?alt=media&token=d819adf6-0202-4ddb-9045-3fcebe24525d",
        }}
        style={{
          width: 150,
          height: 150,
          marginTop: 20,
          marginBottom: 50,
        }}
      />
    </View>
  );
};

export default CardMeaning;

const textStyle = {
  textAlign: "center",
  fontFamily: "AmaticSC-Bold",
  fontSize: 36,
  color: "ghostwhite",
  textShadowColor: "mintcream",
  textShadowRadius: 10,
  paddingHorizontal: 20,
  marginBottom: 20,
};

const bigTextStyle = {
  fontSize: 48,
  textAlign: "center",
  marginTop: 10,
  fontFamily: "AmaticSC-Bold",
  color: "ghostwhite",
  textShadowColor: "mintcream",
  textShadowRadius: 10,
};
