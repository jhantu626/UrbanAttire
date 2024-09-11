import {View, Text, Image, StyleSheet} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  return (
    <Onboarding
      showSkip={false}
      onDone={() => {
        navigation.replace('LoginHome');
      }}
      pages={[
        {
          backgroundColor: '#FFD700',
          image: (
            <Image
              source={require('./../../assets/images/onboarding-img1.png')}
              style={styles.image}
            />
          ),
          title: 'Unleash Your Style',
          subtitle: 'Discover Fashion That Fits You Perfectly!',
        },
        {
          //   backgroundColor: '#F8BBD0',
          //   backgroundColor: '#E6E6FA',
          backgroundColor: '#F8F8FF',
          image: (
            <Image
              source={require('./../../assets/images/onboarding-img2.png')}
              style={styles.image}
            />
          ),
          title: 'Chic and Trendy',
          subtitle: 'Shop Your Heart Out!',
        },
        {
          backgroundColor: '#F8BBD0',
          image: (
            <Image
              source={require('./../../assets/images/onboarding-img3.png')}
              style={styles.image}
            />
          ),
          title: 'mpower Your Wardrobe',
          subtitle: 'Where Fashion Meets Fun!',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
});

export default OnboardingScreen;
