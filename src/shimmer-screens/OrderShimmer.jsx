import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const OrderShimmer = () => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <View style={styles.header}>
        <ShimmerPlaceholder width={40} height={40} />
        <ShimmerPlaceholder width={40} height={40} style={{borderRadius: 20}} />
      </View>
      <ShimmerPlaceholder
        width={250}
        height={50}
        style={{borderRadius: 5, marginTop: 20}}
      />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        keyExtractor={data => data}
        renderItem={data => (
          <ShimmerPlaceholder
            width={280}
            height={120}
            style={{borderRadius: 5, marginTop: 20}}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: 270,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default OrderShimmer;
