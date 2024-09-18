import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation, useRoute} from '@react-navigation/native';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';
import {ALERT_TYPE, Dialog, Toast} from 'react-native-alert-notification';
import {cartService} from '../services/CartService';

// const sizes = ['S', 'M', 'L', 'XL'];
// const color = ['#91A1B0', '#B11D1DD4', '#1F44A3C2', '#9F632AD4', '#1D752BDB'];

const ProductDetails = () => {
  const route = useRoute();
  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const {addCart} = useContext(CartContext);
  const navigation = useNavigation();
  const [color, setColor] = useState([]);
  const [sizes, setSizes] = useState([]);

  const handleAddToCart = async () => {
    await addCartToDb();
    addCart({...item, color: selectedColor, size: selectedSize});
    // Toast.show({
    //   title: 'Cart Adding',
    //   textBody: 'Cart Addedd Successfully',
    //   type: ALERT_TYPE.SUCCESS,
    // });
  };

  const addCartToDb = async () => {
    if (selectedSize === null) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Please Select A Size',
        textBody:
          ' please choose your preferred size from the available options',
        button: 'close',
      });
      return;
    }
    if (selectedColor === null) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Please Select A Color',
        textBody:
          'Choose your favorite color from the options below to match your style perfectly.',
        button: 'close',
      });
      return;
    }
    const response = await cartService.addCart(
      item.id,
      selectedSize,
      selectedColor,
    );
    console.log(response);
    Toast.show({
      title: 'success',
      textBody: response.msg,
      type: response.status ? ALERT_TYPE.SUCCESS : ALERT_TYPE.DANGER,
    });
    navigation.navigate('Cart');
  };

  useEffect(() => {
    setColor(item.colors);
    setSizes(item.sizes);
  }, []);

  return (
    <LinearGradient
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isNotHome={true} />
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: item.imageUrl}}
          style={styles.coverImage}
          resizeMode="contain"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>

        {/* Size Container */}
        <Text style={[styles.title, {marginHorizontal: 20}]}>Size</Text>
        <View style={styles.sizeContainer}>
          {sizes.map(size => (
            <TouchableOpacity
              key={size}
              style={styles.sizeTextContainer}
              onPress={() => setSelectedSize(size)}>
              <Text
                style={[
                  styles.sizeText,
                  selectedSize === size ? {color: '#E55B5B'} : {},
                ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Colors */}
        <Text style={[styles.title, {marginHorizontal: 20}]}>Colors</Text>
        <View style={styles.colorContainer}>
          {color.map(item => (
            <View
              key={item}
              style={item === selectedColor ? styles.circleBorder : null}>
              <TouchableOpacity
                style={[styles.circle, {backgroundColor: item.toLowerCase()}]}
                onPress={() => setSelectedColor(item)}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity onPress={handleAddToCart} style={styles.btnContainer}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 20,
  },
  coverImage: {
    width: responsiveWidth(100),
    height: 400,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: 20,
    // fontWeight: '500',
    color: '#444444',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4D4C4C',
  },
  sizeContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    gap: 15,
    // padding: 10,
  },
  sizeTextContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444444',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    // marginTop: 5,
  },
  circle: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  circleBorder: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    height: 66,
    backgroundColor: '#E96E6E',
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 22,
    color: '#FFFFFF',
  },
});

export default ProductDetails;
