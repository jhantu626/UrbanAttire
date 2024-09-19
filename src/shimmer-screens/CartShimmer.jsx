import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CartShimmer = () => {
  return (
    <View style={{flex: 1, padding: 20}}>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ShimmerPlaceholder width={50} height={50} style={{borderRadius: 10}} />
        <ShimmerPlaceholder width={100} height={20} style={{borderRadius: 5}} />
        <ShimmerPlaceholder width={50} height={50} style={{borderRadius: 25}} />
      </View>
      <View
        style={{
          height: 130,
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <ShimmerPlaceholder width={100} height={130} />
        </View>
        <View style={{marginLeft: 10, justifyContent: 'space-evenly'}}>
          <ShimmerPlaceholder width={150} />
          <ShimmerPlaceholder width={120} />
          <ShimmerPlaceholder width={90} />
        </View>
        <View style={{marginTop: 18}}>
          <ShimmerPlaceholder
            width={40}
            height={40}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
      <View
        style={{
          height: 130,
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <ShimmerPlaceholder width={100} height={130} />
        </View>
        <View style={{marginLeft: 10, justifyContent: 'space-evenly'}}>
          <ShimmerPlaceholder width={150} />
          <ShimmerPlaceholder width={120} />
          <ShimmerPlaceholder width={90} />
        </View>
        <View style={{marginTop: 18}}>
          <ShimmerPlaceholder
            width={40}
            height={40}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
      <View
        style={{
          height: 130,
          marginVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <ShimmerPlaceholder width={100} height={130} />
        </View>
        <View style={{marginLeft: 10, justifyContent: 'space-evenly'}}>
          <ShimmerPlaceholder width={150} />
          <ShimmerPlaceholder width={120} />
          <ShimmerPlaceholder width={90} />
        </View>
        <View style={{marginTop: 18}}>
          <ShimmerPlaceholder
            width={40}
            height={40}
            style={{borderRadius: 10}}
          />
        </View>
      </View>
      <View style={{alignSelf: 'center', marginVertical: 20}}>
        <ShimmerPlaceholder
          height={50}
          width={270}
          style={{borderRadius: 15}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CartShimmer;
