import * as Font from 'expo-font';

export const loadFont = async () => {
    await Font.loadAsync({
        'AmaticSC-Regular': require('../../assets/fonts/AmaticSC-Regular.ttf'),
        'AmaticSC-Bold': require('../../assets/fonts/AmaticSC-Bold.ttf'),
    });
};