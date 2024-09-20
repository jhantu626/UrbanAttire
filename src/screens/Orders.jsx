import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Header from '../components/Header';
import OrderCard from '../components/OrderCard';
import {fonts} from '../utils/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {orderService} from '../services/OrderService';
import OrderShimmer from '../shimmer-screens/OrderShimmer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Orders = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const allOrders = async () => {
    const data = await orderService.getOrders();
    setOrders(() => data);
  };
  const syncProfileImage = async () => {
    const data = await AsyncStorage.getItem('profileImageUrl');
    console.log(data)
    setProfileImage(data);
  };

  useFocusEffect(
    useCallback(() => {
      allOrders();
      syncProfileImage();
      setIsPageLoading(false);
    }, []),
  );

  return isPageLoading ? (
    <OrderShimmer />
  ) : (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <Header
        isNotHome={true}
        title={'Order History'}
        imageUrl={profileImage}
      />
      <View style={styles.discountCard}>
        <Text style={styles.discountText}>Up to 60% Off: Shop Now!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home_Stack')}>
          <Text style={styles.shopText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={data => data.id}
          renderItem={data => {
            return <OrderCard key={data.index} item={data.item} />;
          }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image
            style={styles.emptyImage}
            source={require('./../../assets/images/trolley.png')}
          />
          <Text style={styles.emptyText}>Your Order History is Empty</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.emptyBtn}>
            <Text style={styles.shopText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  discountCard: {
    height: 60,
    backgroundColor: '#BFB6BB',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    elevation: 5,
  },
  discountText: {
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'left',
  },
  shopText: {
    fontFamily: fonts.regular,
    color: '#55A7E6',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  emptyImage: {
    width: 250,
    height: 250,
  },
  emptyText: {
    marginHorizontal: 30,
    fontFamily: fonts.bold,
    fontSize: 28,
    textAlign: 'center',
  },
  emptyBtn: {
    height: 50,
    width: 200,
    backgroundColor: colors.tabActive,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  shopText: {
    color: '#FFFFFF',
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
});

export default Orders;
