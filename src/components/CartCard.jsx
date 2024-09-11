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
import Toast from 'react-native-toast-message';

const CartCard = ({item}) => {
  const {removeCart} = useContext(CartContext);
  return (
    <View style={styles.container}>
      <Image source={{uri: item.item.image}} style={styles.coverImage} />
      <View style={styles.cardContain}>
        <Text style={styles.title}>{item.item.title}</Text>
        <Text style={styles.price}>${item.item.price}</Text>
        <View style={styles.detailsContainer}>
          <View
            style={[
              styles.colorContainer,
              {backgroundColor: item.item.color},
            ]}></View>
          <View style={styles.sizeContainer}>
            <Text style={styles.sizeText}>{item.item.size}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          removeCart(item.item);
          Toast.show({
            type: 'success',
            text1: 'Cart Deleted Succesfully!',
            position: 'bottom',
          });
        }}>
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