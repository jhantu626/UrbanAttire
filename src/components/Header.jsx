import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.appIconContainer}>
        <Image
          source={require('./../../assets/images/apps.png')}
          style={styles.appIcon}
        />
      </View>
      <Image
        style={styles.dp}
        source={require('./../../assets/images/profile.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
});

export default Header;
