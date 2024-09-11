import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const LoginHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Image
        source={require('./../../assets/images/loadingHome.png')}
        style={styles.bannerImage}
      />
      <Text style={styles.title}>Your Style, Your Way!</Text>
      <Text style={styles.subTitle}>
        Your go-to for trendy outfits and chic accessories, designed to express
        your unique style!"
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={[styles.btnWrapper, {backgroundColor: colors.primary}]}>
          <Text style={styles.loginBtnTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={[styles.btnWrapper]}>
          <Text style={styles.signupBtnTxt}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo: {
    width: 113,
    height: 100,
    marginVertical: 20,
  },
  bannerImage: {
    width: 231,
    height: 250,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.semiBold,
    paddingHorizontal: 20,
    textAlign: 'center',
    color: colors.primary,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center',
    fontFamily: fonts.medium,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    borderWidth: 2,
    borderColor: colors.secondary,
    width: '80%',
    height: 60,
    borderRadius: 100,
  },
  btnWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 98,
  },
  loginBtnTxt: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  signupBtnTxt: {
    fontFamily: fonts.regular,
    fontSize: 18,
  },
});

export default LoginHome;
