import {StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';

const ApplicationWrapper = ({children}) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
});

export default ApplicationWrapper;
