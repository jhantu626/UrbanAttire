import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
import {userService} from '../services/UserService';
import {launchImageLibrary} from 'react-native-image-picker';
import Address from '../components/Address';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import {Buffer} from 'buffer';
import AsyncStorage from '@react-native-async-storage/async-storage';

global.Buffer = global.Buffer || Buffer;

const Profile = () => {
  const {logout} = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mobile, setMobile] = useState();
  const [isUpdatePh, setIsUpdatePh] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const profileData = async () => {
    const data = await userService.profile();
    console.log(data);
    setProfile(data);
    await AsyncStorage.setItem('profileImageUrl',data.profileUrl);
  };
  const updateProfile = async () => {
    const option = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(option, async response => {
      if (response.didCancel) {
        Toast.show({
          title: 'Profile Upload',
          textBody: 'Upload Cancelled',
          type: ALERT_TYPE.DANGER,
        });
      } else if (response.errorCode) {
        Toast.show({
          title: 'Profile Upload',
          textBody: 'Something went wrong!',
          type: ALERT_TYPE.DANGER,
        });
      } else {
        setImageLoading(true);
        const file = response.assets[0];
        const uri = file.uri;
        const name = file.fileName;

        //Upload file
        const formData = new FormData();
        formData.append('profile', {
          uri,
          name: name,
          type: 'image/jpeg',
        });
        const data = await userService.updateProfilePic(formData);
        Toast.show({
          title: 'Profile Upload',
          textBody: data.msg,
          type: ALERT_TYPE.SUCCESS,
        });
        await profileData();
        setImageLoading(false);
      }
    });
  };

  const refreshPage = async () => {
    await profileData();
  };

  const handleUpdateMobile = async () => {
    setIsLoading(prev => !prev);
    const data = await userService.updateMobileNumber(mobile);
    await profileData();
    setIsUpdatePh(false);
    Toast.show({
      title: 'Mobile Updation',
      textBody: data.msg,
      type: data.status ? ALERT_TYPE.SUCCESS : ALERT_TYPE.DANGER,
    });
    setIsLoading(prev => !prev);
  };

  useEffect(() => {
    profileData();
    setMobile(profile.mobile);
    refreshPage();
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <ScrollView style={styles.appContainer}>
        {/* First back view */}
        <View style={{marginTop: 20, width: responsiveWidth(100)}}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={28} />
          </TouchableOpacity>
        </View>

        {/* Profile Pic View */}
        <View style={styles.profileContainer}>
          <View style={[styles.profileView]}>
            {imageLoading ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 75,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 5,
                  borderColor: '#EE8924'
                }}>
                <ActivityIndicator size={'large'} color={'#EE8924'} />
              </View>
            ) : (
              <>
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
              </>
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
        <View
          style={[
            styles.boxContainer,
            {borderWidth: 1, borderColor: '#F1ECEC', padding: 10},
          ]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.boxText}>Phone Number</Text>
            <TouchableOpacity onPress={() => setIsUpdatePh(prev => !prev)}>
              {isUpdatePh ? (
                <Text
                  style={[styles.boxText, {textDecorationLine: 'underline'}]}>
                  Cancel
                </Text>
              ) : (
                <Text
                  style={[styles.boxText, {textDecorationLine: 'underline'}]}>
                  Edit
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {isUpdatePh ? (
            <>
              <View style={[styles.textInputBox, {alignItems: 'center'}]}>
                <MaterialCommunityIcons name="phone" size={24} />
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Mobile Number"
                  keyboardType="numeric"
                  value={mobile}
                  onChangeText={text => text.length <= 10 && setMobile(text)}
                />
              </View>
              <TouchableOpacity
                onPress={handleUpdateMobile}
                style={styles.updateBtn}>
                {isLoading ? (
                  <ActivityIndicator size={'large'} color={'#FFFFFF'} />
                ) : (
                  <Text style={styles.updateBtnText}>Update Address</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.textInputBox}>
              <MaterialCommunityIcons name="phone" size={24} />
              <Text style={styles.inputText}>
                {profile.mobile ? profile.mobile : 'Update Mobile'}
              </Text>
            </View>
          )}
        </View>
        {/* Address */}
        <Address
          address={profile.address !== null ? profile.address : {}}
          isAddress={profile.address === null ? false : true}
          refreshPage={refreshPage}
        />
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
    borderRadius: 69,
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
  inputText: {
    flex: 1,
    height: 54,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  textInput: {
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

export default Profile;
