import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import cards from "../../../tarot-api-708a1-default-rtdb-export.json";
import { Animated } from "react-native";
import CardSection from "../cardsection/cardsection";
import CardMeaning from "../cardmeaning/cardmeaning";
import BigCard from "../cardbig/cardbig";
import BackButton from "../backbutton/backbutton";
import { LinearGradient } from "expo-linear-gradient";

const Oracle3Page = ({ navigation }) => {
  const windowWidth = Dimensions.get("window").width;

  const [randomCard1, setRandomCard1] = useState("");
  const [randomCard2, setRandomCard2] = useState("");
  const [randomCard3, setRandomCard3] = useState("");

  const [isCard1Rotated, setIsCard1Rotated] = useState(0);
  const [isCard2Rotated, setIsCard2Rotated] = useState(0);
  const [isCard3Rotated, setIsCard3Rotated] = useState(0);

  const [isCard1Pressed, setIsCard1Pressed] = useState(false);
  const [isCard2Pressed, setIsCard2Pressed] = useState(false);
  const [isCard3Pressed, setIsCard3Pressed] = useState(true);

  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showCard3, setShowCard3] = useState(false);

  const [showBigCard, setShowBigCard] = useState(false);

  const [meaningIsAvailable, setMeaningIsAvailable] = useState(false);

  const [showMeaningIsTrue, setShowMeaningIsTrue] = useState(false);

  const divinationCardsAmount = useSelector(
    (state) => state.interfaceSlice.divinationCardsAmount
  );

  const liftUp1Card = () => {
    setIsCard1Pressed(true);
    setIsCard2Pressed(false);
    setIsCard3Pressed(false);
  };
  const liftUp2Card = () => {
    setIsCard1Pressed(false);
    setIsCard2Pressed(true);
    setIsCard3Pressed(false);
  };
  const liftUp3Card = () => {
    setIsCard1Pressed(false);
    setIsCard2Pressed(false);
    setIsCard3Pressed(true);
  };

  const toggleShowMeaning = async () => {
    if (showMeaningIsTrue) {
      fadeOut2();
      fadeIn();
      setTimeout(() => {
        setShowMeaningIsTrue(false);
      }, 500);
    } else {
      fadeOut();
      fadeIn2();
      setTimeout(() => {
        setShowMeaningIsTrue(true);
      }, 500);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
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

  const fadeAnim2 = useRef(new Animated.Value(0)).current;

  const fadeIn2 = () => {
    Animated.timing(fadeAnim2, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut2 = () => {
    Animated.timing(fadeAnim2, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getRandomCard = () => {
    fadeIn();
    return cards.cards[Math.round(Math.random() * 77)];
  };

  const rotateCard = () => {
    if (Math.round(Math.random() * 1) === 1) {
      return 180;
    } else {
      return 0;
    }
  };

  const [card1Position, setCard1Position] = useState(0);

  const handleSetCard1Position = () => {
    const degree = Math.round(Math.random() * 20);
    if (Math.round(Math.random() * 1) === 1) {
      setCard1Position(degree);
    } else {
      setCard1Position(-degree);
    }
  };

  const loadRandomCards = async () => {
    fadeOut();
    if (randomCard1) {
      hideRandomCards();
    } else {
      if (divinationCardsAmount === 3) {
        await setIsCard1Rotated(rotateCard());
        await setRandomCard1(getRandomCard());
        await setIsCard2Rotated(rotateCard());
        await setRandomCard2(getRandomCard());
        await setIsCard3Rotated(rotateCard());
        await setRandomCard3(getRandomCard());
        setTimeout(() => {
          setShowCard1(true);
          setTimeout(() => {
            setShowCard2(true);
            setTimeout(() => {
              setShowCard3(true);
              setTimeout(() => {
                setMeaningIsAvailable(true);
              }, 3000);
            }, 3000);
          }, 3000);
        }, 1500);
      } else if (divinationCardsAmount === 1) {
        await setIsCard1Rotated(rotateCard());
        await setRandomCard1(getRandomCard());
        await handleSetCard1Position();
        setTimeout(() => {
          setShowCard1(true);
          setTimeout(() => {
            setMeaningIsAvailable(true);
          }, 3000);
        }, 1500);
      }
    }
  };

  const hideRandomCards = () => {
    setTimeout(() => {
      liftUp3Card();
      setRandomCard1("");
      setRandomCard2("");
      setRandomCard3("");
      setShowCard1(false);
      setShowCard2(false);
      setShowCard3(false);
      setMeaning("");
      setMeaningIsAvailable(false);
    }, 500);
  };

  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    fadeIn();
  }, []);

  useEffect(() => {
    return () => {
      hideRandomCards();
    };
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/dream_TradingCard%20-%202023-04-18T182303.435.jpg?alt=media&token=8f824ccf-b009-4282-b1ca-f6364e32c922",
      }}
      style={{
        flex: 2,
      }}
    >
      <BackButton navigation={navigation} />
      {showBigCard && (
        <BigCard
          isCard1Pressed={isCard1Pressed}
          isCard2Pressed={isCard2Pressed}
          isCard3Pressed={isCard3Pressed}
          card1={randomCard1}
          card2={randomCard2}
          card3={randomCard3}
          setShowBigCard={setShowBigCard}
        />
      )}
      <View
        style={{
          flex: 6,
          width: windowWidth,
          alignItems: "center",
        }}
      >
        {randomCard1 ? (
          !showMeaningIsTrue ? (
            <Animated.View style={{ opacity: fadeAnim }}>
              {showCard1 && (
                <CardSection
                  position={divinationCardsAmount === 3 ? 16 : card1Position}
                  liftUpCard={liftUp1Card}
                  isCardPressed={isCard1Pressed}
                  setShowBigCard={setShowBigCard}
                  card={randomCard1}
                  isCardRotated={isCard1Rotated}
                />
              )}
              {showCard2 && (
                <CardSection
                  position={-28}
                  liftUpCard={liftUp2Card}
                  isCardPressed={isCard2Pressed}
                  setShowBigCard={setShowBigCard}
                  card={randomCard2}
                  isCardRotated={isCard2Rotated}
                />
              )}
              {showCard3 && (
                <CardSection
                  position={4}
                  liftUpCard={liftUp3Card}
                  isCardPressed={isCard3Pressed}
                  setShowBigCard={setShowBigCard}
                  card={randomCard3}
                  isCardRotated={isCard3Rotated}
                />
              )}
            </Animated.View>
          ) : (
            <Animated.ScrollView
              style={{
                opacity: fadeAnim2,
                flexWrap: "wrap",
                overflow: "hidden",
              }}
            >
              <CardMeaning
                card1={randomCard1}
                card2={randomCard2}
                card3={randomCard3}
                isCard1Rotated={isCard1Rotated}
                isCard2Rotated={isCard2Rotated}
                isCard3Rotated={isCard3Rotated}
                meaning={meaning}
                setMeaning={setMeaning}
                showMeaningIsTrue={showMeaningIsTrue}
              />
            </Animated.ScrollView>
          )
        ) : (
          <Animated.View
            style={{
              opacity: fadeAnim,
              flex: 1,
              justifyContent: "space-evenly",
            }}
          >
            <Text style={textStyle}>
              To start divination you have to use the crystall ball. To reset
              divination do the same.
            </Text>
            <Text style={textStyle}>
              To find out what these cards mean use the Book of
              Iinterpretations.
            </Text>
            <Text style={textStyle}>
              You'll get the meaning of each card and a little advice.
            </Text>
            <Text style={textStyle}>
              Press on a card to lift it up, Long pres on top card to open a big
              size of it.
            </Text>
          </Animated.View>
        )}
      </View>
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,0.2)"]}
        style={{
          width: windowWidth,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          overflow: "visible",
          paddingBottom: 50,
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={loadRandomCards}
          disabled={showMeaningIsTrue}
          style={{
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <ImageBackground
            source={{
              uri: showMeaningIsTrue
                ? "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/crystal-ball%20(2).png?alt=media&token=e730e41f-d737-4f5d-869d-86cf3977df62"
                : "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/crystal-ball%20(1).png?alt=media&token=3662e86c-9ae4-42d0-8d55-7bafa0eb5c3a",
            }}
            style={{
              width: 120,
              height: 120,
            }}
          ></ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleShowMeaning}
          disabled={!meaningIsAvailable}
          style={{
            width: 120,
            height: 120,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0)",
          }}
        >
          <ImageBackground
            source={{
              uri: meaningIsAvailable
                ? "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/spell-book.png?alt=media&token=938300c2-b7dc-4b28-b557-fc441054fb6e"
                : "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/spellbook2.png?alt=media&token=33cb1866-d7f2-45ce-b328-6ae99cbb03d0",
            }}
            style={{ width: 100, height: 100 }}
          ></ImageBackground>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default Oracle3Page;

const textStyle = {
  textAlign: "center",
  fontFamily: "AmaticSC-Bold",
  fontSize: 40,
  color: "ghostwhite",
  textShadowColor: "mintcream",
  textShadowRadius: 20,
  paddingHorizontal: 20,
};
