import { useEffect, useRef } from "react";
import { Dimensions, View, Text } from "react-native";
import { Animated } from "react-native";
import { Portal } from "react-native-paper";
import { toggleTransitionAnimationZoom } from "../../redux/reducers";
import { useDispatch, useSelector } from "react-redux";

const Loader = () => {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const loaderFadeAnim = useRef(new Animated.Value(0)).current;
  const loaderZoomAnim = useRef(
    new Animated.Value(transitionAnimationZoom ? 1 : 2)
  ).current;

  const transitionAnimationZoom = useSelector(
    (state) => state.interfaceSlice.transitionAnimationZoom
  );

  useEffect(() => {
    Animated.timing(loaderFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(loaderZoomAnim, {
      toValue: transitionAnimationZoom ? 5 : 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      Animated.timing(loaderFadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, 1500);
  }, [loaderFadeAnim]);

  useEffect(() => {
    dispatch(toggleTransitionAnimationZoom(!transitionAnimationZoom));
  }, []);

  return (
    <Portal>
      <Animated.Image
        style={{
          width: windowWidth,
          height: windowHeight,
          opacity: loaderFadeAnim,
          transform: [{ scale: loaderZoomAnim }],
        }}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/tarot-api-708a1.appspot.com/o/mistLoader2.png?alt=media&token=0680353c-73f7-4f23-bf78-5b5a2c7016ae",
        }}
      />
    </Portal>
  );
};

export default Loader;
