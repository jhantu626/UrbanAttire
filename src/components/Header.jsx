import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  isNotHome = false,
  isCart = false,
  imageUrl = './../../assets/images/defaultUser.png',
}) => {
  const navigation = useNavigation();
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
          <Image
            source={require('./../../assets/images/apps.png')}
            style={styles.appIcon}
          />
        </View>
      )}
      {isCart && <Text style={styles.myCart}>My Cart</Text>}
      <Image style={styles.dp} source={require('./../../assets/images/defaultUser.png')} />
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
