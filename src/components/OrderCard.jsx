import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';

const OrderCard = ({item}) => {
  const [orderDate, setOrderDate] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const date = new Date(item.orderDate);
    // Use Intl.DateTimeFormat for formatting
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    setOrderDate(formattedDate);
  }, []);

  const goToOrderDetails = () => {
    navigation.navigate('OrderDetails', {item});
  };

  return (
    <TouchableOpacity onPress={goToOrderDetails} style={styles.orderContainer}>
      <View style={styles.titleContainer}>
        <Text style={{fontFamily: fonts.bold}}>
          Order Id: {item.orderGeneratedId}
        </Text>
        <View>
          <Text style={{fontFamily: fonts.bold, color: '#3CAF47'}}>
            {item.status}
          </Text>
          <Text style={{fontFamily: fonts.medium, color: 'red'}}>
            {'\u20B9'}
            {item.totalPrice}.0
          </Text>
        </View>
      </View>
      <View style={[{marginVertical: 5}]}>
        <Text style={{fontFamily: fonts.semiBold}}>
          Order Date: {orderDate}
        </Text>
      </View>
      <View>
        <Text style={{fontFamily: fonts.semiBold}}>Shipping Address: </Text>
        <Text style={[{marginHorizontal: 10, fontFamily: fonts.regular}]}>
          -> {item.shippedAddress}
        </Text>
      </View>
      <TouchableOpacity onPress={goToOrderDetails} style={styles.viewBtn}>
        <Text style={styles.btnText}>View</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  viewBtn: {
    height: 50,
    backgroundColor: '#3CAF47',
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 12,
  },
  btnText: {
    fontFamily: fonts.medium,
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export default OrderCard;
