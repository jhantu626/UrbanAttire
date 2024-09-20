import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Header from '../components/Header';
import {fonts} from '../utils/fonts';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderService} from '../services/OrderService';
import {CartContext} from '../context/CartContext';

const PlaceOrder = () => {
  const [editAddress, setEditAddress] = useState(false);
  const naviagion = useNavigation();
  const route = useRoute();

  const {carts, totalAmount} = route.params;
  const [address, setAddress] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const {setCartCount} = useContext(CartContext);

  //For Droprown
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [dropDownItem, setDopdownItem] = useState([
    {label: 'Cash On Delivery', value: 'COD'},
    {label: 'UPI/Google Pay/Paytm (Not Available)', value: 'UPI'},
    {label: 'Credit/Debit Card (Not Available)', value: 'CARD'},
  ]);

  const handleOrder = async () => {
    if (value === null) {
      Dialog.show({
        title: 'Select An Payment Method',
        textBody:
          'Choose your preferred payment option to complete the transaction securely and efficiently.',
        type: ALERT_TYPE.WARNING,
        button: 'OK',
      });
      return;
    }
    if (value === 'UPI' || value === 'CARD') {
      Dialog.show({
        title: 'Payment Service Unavailable',
        textBody:
          'Unfortunately, this payment option is temporarily out of service. Please try again later or select an alternative method.',
        type: ALERT_TYPE.WARNING,
        button: 'OK',
      });
      return;
    }
    if (address === null) {
      Dialog.show({
        title: 'Address Required',
        textBody: 'Please add your address before placing an order.',
        type: ALERT_TYPE.WARNING,
        button: 'OK',
      });
      return;
    }
    const result = carts;
    // console.log(result);
    setOrderLoading(true);
    const responseData = await orderService.makeOrder(
      result,
      totalAmount,
      address,
    );
    setOrderLoading(false);
    setCartCount(0);
    naviagion.dispatch(
      StackActions.replace('OrderConfirmation', {msg: responseData.msg}),
    );
  };

  const syncAddress = async () => {
    const a = await AsyncStorage.getItem('address');
    if (a) {
      setAddress(a);
    }
  };

  useFocusEffect(
    useCallback(() => {
      syncAddress();
    }, []),
  );

  return (
    <LinearGradient
      style={styles.container}
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}>
      <Header isNotHome={true} title={'Order Here'} />
      <ScrollView style={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        {/* Order Summery */}
        <View style={styles.summeryContainer}>
          <FlatList
            ListHeaderComponent={
              <Text style={styles.headerText}>Order Details</Text>
            }
            data={carts}
            keyExtractor={data => data.index}
            renderItem={data => {
              return (
                <View key={data.index} style={styles.orderManuContainer}>
                  <Text style={styles.itemTitle}>
                    {data.item.product.title}
                  </Text>
                  <Text style={styles.itemTitle}>
                    {'\u20B9'}
                    {data.item.product.price}.0
                  </Text>
                </View>
              );
            }}
            ListFooterComponent={<></>}
          />

          <View style={styles.barier}></View>

          <View style={styles.billContainer}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billText}>
              {'\u20B9'}
              {totalAmount}.0
            </Text>
          </View>
          <View style={styles.billContainer}>
            <Text style={styles.billText}>Order Fee</Text>
            <Text style={styles.billText}>{'\u20B9'}0.0</Text>
          </View>
          <View style={styles.billContainer}>
            <Text style={[styles.billText, {fontFamily: fonts.bold}]}>
              Total
            </Text>
            <Text style={[styles.billText, {fontFamily: fonts.bold}]}>
              {'\u20B9'}
              {totalAmount}.0
            </Text>
          </View>
        </View>
        {/* Address */}
        <View style={[styles.summeryContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.headerText}>Address</Text>
          </View>
          <View style={{padding: 10}}>
            <Text style={styles.itemTitle}>
              {address ? address : 'Please Update Address First'}
            </Text>
          </View>
        </View>
        {/* Payment Method */}
        <View style={[styles.summeryContainer]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.headerText}>Payment Method</Text>
          </View>
          <View style={{marginVertical: 10}}>
            <DropDownPicker
              open={isOpen}
              value={value}
              items={dropDownItem}
              setOpen={setIsOpen}
              setValue={setValue}
              setItems={setDopdownItem}
              placeholder="Select Payment Type"
              textStyle={{
                fontFamily: fonts.medium,
              }}
              dropDownDirection="TOP"
            />
          </View>
        </View>

        {/* Order button */}
        <TouchableOpacity
          onPress={handleOrder}
          style={styles.btnContainer}
          disabled={orderLoading}>
          {orderLoading ? (
            <ActivityIndicator size={'large'} color={'#FFFFFF'} />
          ) : (
            <Text style={styles.btnText}>Place Order</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  summeryContainer: {
    // height: 256,
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 20,
    shadowOpacity: 1,
    shadowColor: '#000000',
    elevation: 5,
    padding: 20,
  },
  headerText: {
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  orderManuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemTitle: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  barier: {
    height: 2,
    backgroundColor: '#000000',
    marginVertical: 25,
  },
  billContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  billText: {
    fontFamily: fonts.semiBold,
  },
  dropDownPicker: {
    fontFamily: fonts.regular,
  },
  btnContainer: {
    height: 50,
    margin: 20,
    backgroundColor: '#E96E6E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: fonts.medium,
    fontSize: 18,
  },
});

export default PlaceOrder;
