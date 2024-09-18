import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import {fonts} from '../utils/fonts';
import {useContext, useEffect, useState} from 'react';
import {CartContext} from '../context/CartContext';
import Toast from 'react-native-toast-message';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {cartService} from '../services/CartService';

const Cart = () => {
  // const {carts} = useContext(CartContext);
  const [carts, setCarts] = useState([]);

  const allCarts = async () => {
    const data = await cartService.allCarts();
    console.log(data);
    setCarts(data);
  };

  useEffect(() => {
    allCarts();
  }, [carts]);

  return carts.length === 0 ? (
    <LinearGradient
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <View
        style={{
          width: responsiveWidth(100),
          // height: responsiveHeight(50),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('./../../assets/images/empty.png')}
          style={{
            width: responsiveWidth(70),
            height: responsiveHeight(35),
          }}
        />
      </View>
    </LinearGradient>
  ) : (
    <LinearGradient
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}
      style={styles.container}>
      <View style={{marginBottom: 10}}>
        <Header isNotHome={true} isCart={true} />
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <FlatList
          data={carts}
          keyExtractor={item => item}
          renderItem={data => <CartCard key={data.id} item={data} />}
          ListFooterComponent={
            <View style={styles.priceContainer}>
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Total:</Text>
                <Text style={styles.text}>{'\u20B9'}152.2</Text>
              </View>
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Shipping:</Text>
                <Text style={styles.text}>{'\u20B9'}0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.priceAndTitle}>
                <Text style={styles.text}>Grand Total:</Text>
                <Text style={styles.text}>{'\u20B9'}0.0</Text>
              </View>
            </View>
          }
        />
      </ScrollView>
      <TouchableOpacity style={styles.btnCheckout}>
        <Text style={styles.btnText}>Checkout</Text>
      </TouchableOpacity>
      <Toast />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  priceContainer: {
    marginVertical: 30,
    gap: 10,
  },
  priceAndTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  divider: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  btnCheckout: {
    height: 66,
    backgroundColor: '#E96E6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 20,
  },
  btnText: {
    fontFamily: fonts.medium,
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default Cart;
