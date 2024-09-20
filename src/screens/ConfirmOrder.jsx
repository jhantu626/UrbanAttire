import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {fonts} from '../utils/fonts';
import {
  CommonActions,
  StackActions,
  StackRouter,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

const ConfirmOrder = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {msg} = route.params;

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home_Stack'}],
      }),
    );
  };

  const goToOrders = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'OrderStack'}],
      }),
    );
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <View style={styles.confirmContainer}>
        <Entypo name="check" color={'#FFFFFF'} size={85} />
      </View>
      <Text style={{fontSize: 24, fontFamily: fonts.medium}}>{msg}.</Text>
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 50,
          alignItems: 'center',
        }}>
        <Text style={styles.titleText}>Thank You!</Text>
        <Text style={styles.subTitleText}>
          Thank you Your order has been placed.
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={goToOrders}
          style={[styles.btn, {borderWidth: 2, borderColor: '#3CAF47'}]}>
          <Text style={styles.btnText}>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToHome}
          style={[styles.btn, {backgroundColor: '#3CAF47'}]}>
          <Text style={[styles.btnText, {color: '#FFFFFF'}]}>Home</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmContainer: {
    backgroundColor: '#3CAF47',
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: fonts.semiBold,
    fontSize: 30,
  },
  subTitleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    marginTop: -15,
    textAlign: 'center',
  },
  btnContainer: {
    marginTop: 30,
    width: 300,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    width: '45%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
});

export default ConfirmOrder;
