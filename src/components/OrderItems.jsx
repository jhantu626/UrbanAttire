import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../utils/fonts';

const OrderItems = ({item}) => {
  console.log(item);
  return (
    <View key={item.index} style={styles.cardContainer}>
      <Image
        source={{uri: item.item.product.imageUrl}}
        style={styles.imageUrl}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{item.item.product.title}</Text>
          <Text style={{fontFamily: fonts.regular}}>
            {'\u20B9'}
            {item.item.product.price}.0
          </Text>
        </View>
        <View>
          <Text
            style={{fontFamily: fonts.regular, color: '#969594', fontSize: 16}}>
            {item.item.selectedColor} | {item.item.selectedSize}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowColor: '#000000',
    elevation: 5,
  },
  imageUrl: {
    width: 75,
    height: 90,
    borderRadius: 15,
  },
  detailsContainer: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
});

export default OrderItems;
