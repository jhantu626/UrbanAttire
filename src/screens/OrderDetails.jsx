import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../utils/fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderItems from '../components/OrderItems';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetails = () => {
  const routes = useRoute();
  const {item} = routes.params;

  const [orderDate, setOrderDate] = useState(null);
  const [expectedDelivery, setExpectedDelivery] = useState(null);
  const [profileImage, setProfileImage] = useState(null);


  const syncProfileImage = async () => {
    const data = await AsyncStorage.getItem('profileImageUrl');
    setProfileImage(data);
  };

  useEffect(() => {
    const date = new Date(item.orderDate);
    const deliveryDate = new Date();
    deliveryDate.setDate(date.getDate() + 7);
    // Use Intl.DateTimeFormat for formatting
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
    const formatedDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(deliveryDate);
    setExpectedDelivery(formatedDate);
    setOrderDate(formattedDate);
    syncProfileImage();
  }, []);

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <Header isNotHome={true} title={'Order Details'} imageUrl={profileImage} />

      <View style={styles.orderHeader}>
        <View style={styles.orderIdHeader}>
          <Text style={styles.orderId}>Order Id: {item.orderGeneratedId}</Text>
          <TouchableOpacity style={styles.invoice}>
            <Ionicons name="document-text-outline" size={16} />
            <Text style={{fontFamily: fonts.regular}}>Invoice</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orderDateContiner}>
          <Text style={{fontFamily: fonts.medium}}>
            Order Date: {orderDate}
          </Text>
          <View style={styles.estimatedDelivery}>
            <MaterialCommunityIcons
              name="truck-delivery"
              size={20}
              color="#3CAF47"
            />
            <Text
              style={{
                fontFamily: fonts.medium,
                color: '#3CAF47',
                marginLeft: 5,
              }}>
              Estimated Delivery: {expectedDelivery}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: fonts.medium,
              color: '#3CAF47',
              marginLeft: 5,
            }}>
            {item.status}
          </Text>
        </View>
      </View>
      <View style={{height: 2, backgroundColor: '#D0D5DD', marginTop: -10}} />

      <FlatList
        data={item.orderItems}
        keyExtractor={data => {
          return data.id;
        }}
        renderItem={data => <OrderItems item={data} />}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <View>
              <Text style={styles.footerTitle}>Payment</Text>
              <Text style={[styles.footerText]}>Cash On Delivery</Text>
              <View style={styles.brandIcons}>
                <FontAwesome name="cc-paypal" size={35} color="#6fb1df" />
                <FontAwesome
                  name="cc-mastercard"
                  size={35}
                  color="#ffb36c"
                  style={{marginLeft: 10}}
                />
              </View>
            </View>
            <View>
              <Text style={styles.footerTitle}>Delivery</Text>
              <Text style={{fontFamily: fonts.bold, fontSize: 14}}>
                Address
              </Text>
              <Text style={[{width: 100}, styles.footerText]}>
                {item.shippedAddress}
              </Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  orderHeader: {
    marginVertical: 15,
  },
  orderIdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoice: {
    width: 73,
    height: 28,
    borderWidth: 0.5,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderId: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  orderDateContiner: {
    justifyContent: 'center',
  },
  estimatedDelivery: {
    flexDirection: 'row',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerTitle: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  footerText: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  brandIcons: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default OrderDetails;
