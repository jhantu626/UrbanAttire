import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ProfileShimmer = () => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <ShimmerPlaceholder width={50} height={50} style={{borderRadius: 25}} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.profile}>
          <ShimmerPlaceholder
            width={139}
            height={139}
            style={styles.ProfileShimmer}
          />
          <ShimmerPlaceholder
            width={40}
            height={40}
            style={styles.PencilShimmer}
          />
        </View>

        <View style={{marginTop: 40}}>
          <ShimmerPlaceholder
            width={300}
            height={50}
            style={{borderRadius: 12}}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ShimmerPlaceholder
            width={300}
            height={50}
            style={{borderRadius: 12}}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ShimmerPlaceholder
            width={300}
            height={220}
            style={{borderRadius: 12}}
          />
        </View>
        <View style={{marginTop: 20}}>
          <ShimmerPlaceholder
            width={300}
            height={50}
            style={{borderRadius: 12}}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profile: {
    width: 139,
    height: 139,
    borderRadius: 70,
  },
  ProfileShimmer: {
    borderRadius: 70,
  },
  PencilShimmer: {
    position: 'absolute',
    borderRadius: 20,
    bottom: -10,
    right: 15,
  },
});

export default ProfileShimmer;
