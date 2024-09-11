import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Octicons from 'react-native-vector-icons/Octicons';
import {fonts} from '../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userService} from '../services/UserService';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const profileData = async () => {
    const data = await userService.profile();
    console.log(data);
    setProfile(data);
  };
  const updateProfile = async () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, response => {
      if (response.didCancel) {
        Toast.show({type: 'error', text1: 'Canceled', position: 'top'});
      } else if (response.errorCode) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Something went wrong!',
        });
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        Toast.show({
          type: 'info',
          text1: 'Image Selected!',
          position: 'top',
        });
      }
    });
    if (!imageUri) {
      Toast.show({
        type: 'info',
        text1: 'Please select an image!',
        position: 'top',
      });
      return;
    }
    const body = new FormData();
    body.append('profile', {
      uri: imageUri,
      type: 'image/jpeg',
    });
    await userService.updateProfilePic(body);
  };

  useEffect(() => {
    profileData();
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <ScrollView style={styles.appContainer}>
        <Toast />
        {/* First back view */}
        <View style={{marginTop: 20, width: responsiveWidth(100)}}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>
        </View>

        {/* Profile Pic View */}
        <View style={styles.profileContainer}>
          <View style={styles.profileView}>
            {profile.profileUrl ? (
              <Image
                source={{uri: profile.profileUrl}}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('./../../assets/images/defaultUser.png')}
                style={styles.profileImage}
              />
            )}
            <TouchableOpacity
              style={styles.pencilContainer}
              onPress={updateProfile}>
              <Octicons name="pencil" size={18} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 10, width: 139, alignItems: 'center'}}>
            <Text style={styles.profileText1}>{profile.name}</Text>
            <Text style={styles.profileText2}>jhantu@626</Text>
          </View>
        </View>

        {/* Email Container */}
        <View style={styles.boxContainer}>
          <Text style={styles.boxText}>Your Email</Text>
          <View style={styles.textInputBox}>
            <MaterialCommunityIcons name="email-outline" size={24} />
            <Text style={styles.inputText}>{profile.email}</Text>
          </View>
        </View>
        {/* Phone Number */}
        <View style={styles.boxContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.boxText}>Phone Number</Text>
            <TouchableOpacity>
              <Text style={[styles.boxText, {textDecorationLine: 'underline'}]}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.textInputBox}>
            <MaterialCommunityIcons name="phone" size={24} />
            <Text style={styles.inputText}>
              {profile.mobile ? '+91 9775746484' : 'Update Mobile'}
            </Text>
          </View>
        </View>
        {/* Address */}
        <View
          style={[
            styles.boxContainer,
            {height: 200, borderWidth: 0.5, padding: 10, borderRadius: 12},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.boxText}>Address</Text>
            <TouchableOpacity>
              <Text style={[styles.boxText, {textDecorationLine: 'underline'}]}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
          {profile.address ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.textInputBox}>
                <MaterialCommunityIcons name="phone" size={24} />
                <Text style={styles.inputText}>+91 9775746484</Text>
              </View>
              <View style={styles.textInputBox}>
                <MaterialCommunityIcons name="phone" size={24} />
                <Text style={styles.inputText}>+91 9775746484</Text>
              </View>
              <View style={styles.textInputBox}>
                <MaterialCommunityIcons name="phone" size={24} />
                <Text style={styles.inputText}>+91 9775746484</Text>
              </View>
            </ScrollView>
          ) : (
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="ladder" size={24} />
              <Text style={styles.inputText}>Update Address</Text>
            </View>
          )}
        </View>
        {/* Logout Btn */}
        <TouchableOpacity style={styles.logoutContainer} onPress={logout}>
          <Entypo name="log-out" size={24} color={'#EE8924'} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileContainer: {
    width: 139,
    height: 206,
    // justifyContent: 'center'
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  profileView: {
    width: 139,
    height: 139,
    borderRadius: 69,
  },
  profileImage: {
    position: 'relative',
    width: 139,
    height: 139,
  },
  pencilContainer: {
    position: 'absolute',
    width: 32,
    height: 32,
    backgroundColor: '#EE8924',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 10,
  },
  profileText1: {
    fontFamily: fonts.semiBold,
    fontSize: 20,
    color: '#000000',
  },
  profileText2: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
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
    alignItems: 'center',
    gap: 12,
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  inputText: {
    fontFamily: fonts.light,
    fontSize: 14,
  },
  logoutContainer: {
    height: 58,
    borderWidth: 1,
    borderColor: '#EE8924',
    borderRadius: 12,
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  logoutText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: '#EE8924',
  },
});

export default Profile;
