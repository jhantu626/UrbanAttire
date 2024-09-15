import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {userService} from '../services/UserService';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

const Address = ({address = {}, isAddress = true, refreshPage}) => {
  const [isAddressEnable, setIsAddressEnable] = useState(isAddress);
  const [street, setStreet] = useState(address.street);
  const [city, setCity] = useState(address.city);
  const [postalCode, setPostalCode] = useState(address.postalCode);
  const [state, setState] = useState(address.state);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    const data = await userService.updateAddress(
      street,
      city,
      postalCode,
      state,
    );
    await refreshPage();
    Toast.show({
      title: 'Address Updation',
      textBody: data.msg,
      type: ALERT_TYPE.SUCCESS,
    });
    setIsLoading(false);
  };

  return (
    <View
      style={[
        styles.boxContainer,
        {borderWidth: 0.5, padding: 10, borderRadius: 12},
      ]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.boxText}>Address</Text>
        {isAddressEnable ? (
          <TouchableOpacity onPress={() => setIsAddressEnable(prev => !prev)}>
            <Text style={[styles.boxText, {textDecorationLine: 'underline'}]}>
              Update
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsAddressEnable(prev => !prev)}>
            <Text style={[styles.boxText, {textDecorationLine: 'underline'}]}>
              Cancel
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isAddressEnable ? (
          <>
            <View style={styles.textInputBox}>
              <FontAwesome name="street-view" size={24} />
              <Text style={styles.inputText}>{address.street}</Text>
            </View>
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="city" size={24} />
              <Text style={styles.inputText}>{address.city}</Text>
            </View>
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="pin" size={24} />
              <Text style={styles.inputText}>{address.postalCode}</Text>
            </View>
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="sign-real-estate" size={24} />
              <Text style={styles.inputText}>{address.state}</Text>
            </View>
          </>
        ) : (
          <>
            <View style={[styles.textInputBox, {alignItems: 'center'}]}>
              <FontAwesome name="street-view" size={24} />
              <TextInput
                value={street}
                onChangeText={text => setStreet(text)}
                style={styles.inputText}
                placeholder="Enter Your Street"
              />
            </View>
            <View style={[styles.textInputBox, {alignItems: 'center'}]}>
              <MaterialCommunityIcons name="city" size={24} />
              <TextInput
                value={city}
                onChangeText={text => setCity(text)}
                style={styles.inputText}
                placeholder="Enter Your City"
              />
            </View>
            <View style={[styles.textInputBox, {alignItems: 'center'}]}>
              <MaterialCommunityIcons name="pin" size={24} />
              <TextInput
                value={postalCode}
                onChangeText={text =>
                  text.length <= 6 ? setPostalCode(text) : null
                }
                style={styles.inputText}
                placeholder="Enter Your Pincode"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.textInputBox, {alignItems: 'center'}]}>
              <MaterialCommunityIcons name="sign-real-estate" size={24} />
              <TextInput
                value={state}
                onChangeText={text => setState(text)}
                style={styles.inputText}
                placeholder="Enter Your State"
              />
            </View>
            <TouchableOpacity onPress={handleUpdate} style={styles.updateBtn}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color={'#FFFFFF'} />
              ) : (
                <Text style={styles.updateBtnText}>Update Address</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    marginVertical: 10,
  },
  boxText: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: '#262422',
  },
  textInputBox: {
    height: 54,
    borderWidth: 1,
    borderColor: '#F1ECEC',
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 12,
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  inputText: {
    fontFamily: fonts.light,
    fontSize: 14,
  },
  inputText: {
    flex: 1,
    height: 54,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  updateBtn: {
    height: 58,
    backgroundColor: '#EE8924',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateBtnText: {
    fontFamily: fonts.semiBold,
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default Address;
