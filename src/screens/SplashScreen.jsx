import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function SplashScreen({isUser = false}) {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);

  const navigation = useNavigation();

  useEffect(() => {
    // Start the animation sequence when the component mounts
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(() => {
      if (isUser) {
        navigation.replace('Home');
      } else {
        navigation.replace('Onboarding');
      } // Replace with the name of your next screen
    }, 3000);

    // Cleanup timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#6C63FF', '#C4B5FD']}
        style={styles.background}
      />

      {/* Animated Logo */}
      <Animated.View
        style={[
          styles.logoContainer,
          {opacity: fadeAnim, transform: [{scale: scaleAnim}]},
        ]}>
        <Text style={styles.logoText}>UrbanAttire</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
    position: 'absolute',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
});
