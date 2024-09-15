import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({isNotHome = false, isCart = false, imageUrl = null}) => {
  const navigation = useNavigation();
  const [profilePic, setProfilePic] = useState(null);

  return (
    <View style={styles.container}>
      {isNotHome ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.appIconContainer}>
          <Ionicons name={'chevron-back'} size={24} color={'#E96E6E'} />
        </TouchableOpacity>
      ) : (
        <View style={styles.appIconContainer}>
          {profilePic === null ? (
            <Image
              source={require('./../../assets/images/apps.png')}
              style={styles.appIcon}
            />
          ) : (
            <Image source={{uri: profilePic}} style={styles.appIcon} />
          )}
        </View>
      )}
      {isCart && <Text style={styles.myCart}>My Cart</Text>}
      {imageUrl === null ? (
        <Image
          style={styles.dp}
          source={require('./../../assets/images/defaultUser.png')}
        />
      ) : (
        <Image
          style={styles.dp}
          source={{uri: imageUrl}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appIconContainer: {
    backgroundColor: '#FFFFFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: 28,
    height: 28,
  },
  dp: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  myCart: {
    fontFamily: fonts.regular,
    fontSize: 28,
  },
});

export default Header;
