import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { changeVolume, toggleMusicIsOn } from "../../redux/reducers/index";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedRotation } from "../../helpers/rotationAnimation";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT - 50;

type BottomSheetProps = {
  children?: React.ReactNode;
};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
  isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({}, ref) => {
    const translateY = useSharedValue(0);
    const active = useSharedValue(false);

    const [menuIsOpened, setMenuIsOpened] = useState(false);

    const dispatch = useDispatch();

    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;

    const musicVolume = useSelector(
      // @ts-ignore
      (state) => state.interfaceSlice.musicVolume
    );
    // @ts-ignore
    const musicIsOn = useSelector((state) => state.interfaceSlice.musicIsOn);

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      active.value = destination !== 0;

      translateY.value = withSpring(destination, { damping: 50 });
    }, []);

    const isActive = useCallback(() => {
      return active.value;
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value > -SCREEN_HEIGHT / 10) {
          scrollTo(0);
        } else if (translateY.value < -SCREEN_HEIGHT / 10 && !menuIsOpened) {
          runOnJS(setMenuIsOpened)(true);
          scrollTo(MAX_TRANSLATE_Y);
        } else if (translateY.value > -SCREEN_HEIGHT + 50) {
          runOnJS(setMenuIsOpened)(false);
          scrollTo(0);
        } else {
          scrollTo(MAX_TRANSLATE_Y);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });

    const rotateAnimation = useRef(new AnimatedRotation.Value(0)).current;

    const rotateIcon = (val: number) => {
      AnimatedRotation.loop(
        AnimatedRotation.timing(rotateAnimation, {
          toValue: val,
          duration: 300000,
          useNativeDriver: true,
        })
      ).start();
    };

    useEffect(() => {
      menuIsOpened ? rotateIcon(1) : rotateIcon(0);
    }, [menuIsOpened]);

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              height: windowHeight,
              width: windowWidth,
              position: "absolute",
              top: windowHeight + 50,
              left: 0,
            },
            rBottomSheetStyle,
          ]}
        >
          <LinearGradient
            colors={[
              "transparent",
              "rgba(255,145,50,0.2)",
              "rgba(255,145,50,0.5)",
            ]}
            style={{
              height: windowHeight,
              width: windowWidth,
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
            }}
          >
            <Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/moon.png?alt=media&token=846fe828-0b5c-43fb-9fa1-8c63cf72e82b",
              }}
              style={{
                position: "absolute",
                top: -140,
                width: 100,
                height: 100,
              }}
            />
            {/* {children} */}
            <View style={{ marginTop: 30, alignItems: "center" }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "lemonchiffon",
                    fontSize: 40,
                    textAlign: "center",
                    fontFamily: "AmaticSC-Bold",
                    marginBottom: 10,
                    textShadowColor: "gold",
                    textShadowOffset: { width: 0, height: 0 },
                    textShadowRadius: 10,
                  }}
                >
                  Music
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 40 }}>
                  <TouchableOpacity
                    onPress={() => dispatch(toggleMusicIsOn(true))}
                    style={{
                      width: 40,
                      height: 40,
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                      backgroundColor: musicIsOn ? "gold" : "lemonchiffon",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "right",
                        marginRight: 4,
                        fontFamily: "AmaticSC-Bold",
                      }}
                    >
                      ON
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => dispatch(toggleMusicIsOn(false))}
                    style={{
                      width: 40,
                      height: 40,
                      borderTopRightRadius: 50,
                      borderBottomRightRadius: 50,
                      backgroundColor: !musicIsOn ? "gold" : "lemonchiffon",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: "left",
                        marginLeft: 4,
                        fontFamily: "AmaticSC-Bold",
                      }}
                    >
                      OFF
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text
                style={{
                  color: "lemonchiffon",
                  fontSize: 40,
                  textAlign: "center",
                  fontFamily: "AmaticSC-Bold",
                  marginBottom: 10,
                  textShadowColor: "gold",
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 10,
                }}
              >
                Music volume
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => dispatch(changeVolume(0.2))}
                  style={{
                    width: 40,
                    height: 40,
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                    backgroundColor: musicVolume >= 0.2 ? "gold" : "lemonchiffon",
                    justifyContent: "center",
                  }}
                />
                <TouchableOpacity
                  onPress={() => dispatch(changeVolume(0.4))}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: musicVolume >= 0.4 ? "gold" : "lemonchiffon",
                    justifyContent: "center",
                    borderLeftColor: "goldenrod",
                    borderLeftWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => dispatch(changeVolume(0.6))}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: musicVolume >= 0.6 ? "gold" : "lemonchiffon",
                    justifyContent: "center",
                    borderLeftColor: "goldenrod",
                    borderLeftWidth: 1,
                    borderRightColor: "goldenrod",
                    borderRightWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => dispatch(changeVolume(0.8))}
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: musicVolume >= 0.8 ? "gold" : "lemonchiffon",
                    justifyContent: "center",
                    borderRightColor: "goldenrod",
                    borderRightWidth: 1,
                  }}
                />
                <TouchableOpacity
                  onPress={() => dispatch(changeVolume(1))}
                  style={{
                    width: 40,
                    height: 40,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    backgroundColor: musicVolume >= 1 ? "gold" : "lemonchiffon",
                    justifyContent: "center",
                  }}
                />
              </View>
            </View>
            <AnimatedRotation.Image
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/sun.png?alt=media&token=f94bde26-19f1-4a98-a71c-c70162d912ef",
              }}
              style={{
                position: "absolute",
                bottom: -100,
                width: 200,
                height: 200,
                borderRadius: 50,
                transform: [
                  {
                    rotate: rotateAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "3600deg"],
                    }),
                  },
                ],
              }}
            />
          </LinearGradient>
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default BottomSheet;
