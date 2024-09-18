import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';
import {cartService} from '../services/CartService';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
import { useEffect } from 'react';

const CartCard = ({item, refreshCart}) => {
  const {removeCart} = useContext(CartContext);
  // console.log(item.item);

  const deleteCart = async () => {
    try {
      await cartService.deleteCarts(item.item.id);
      removeCart();
      Toast.show({
        title: 'Cart Deleted Successfully',
        textBody: 'cart deleted',
        type: ALERT_TYPE.SUCCESS,
      });
      await refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.item.product.imageUrl}}
        style={styles.coverImage}
      />
      <View style={styles.cardContain}>
        <Text style={styles.title}>{item.item.product.title}</Text>
        <Text style={styles.price}>
          {'\u20B9'}
          {item.item.product.price}
        </Text>
        <View style={styles.detailsContainer}>
          <View
            style={[
              styles.colorContainer,
              {backgroundColor: item.item.selectedColor.toLowerCase()},
            ]}></View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.item.selectedSize}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={deleteCart}>
        <Octicons name="trash" size={30} color={'#E96E6E'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  coverImage: {
    width: 95,
    height: 125,
    borderRadius: 20,
  },
  cardContain: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 18,
  },
  price: {
    fontFamily: fonts.light,
    fontSize: 18,
  },
  detailsContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    gap: 20,
  },
  colorContainer: {
    backgroundColor: 'red',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  sizeContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  sizeText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
});

export default CartCard;
