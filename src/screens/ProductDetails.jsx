import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import cart from './../data/cart.json';
import {useRoute} from '@react-navigation/native';

const sizes = ['S', 'M', 'L', 'XL'];
const color = ['#91A1B0', '#B11D1DD4', '#1F44A3C2', '#9F632AD4', '#1D752BDB'];

const ProductDetails = () => {
  const route = useRoute();
  const {item} = route.params;
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleAddToCart=()=>{
    
  }

  return (
    <LinearGradient
      colors={[colors.linearGradientOne, colors.linearGradientTwo]}
      style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <Image source={{uri: item.image}} style={styles.coverImage} />
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
                style={[styles.circle, {backgroundColor: item}]}
                onPress={() => setSelectedColor(item)}
              />
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => cart.cart.push(item)}>
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
    fontSize: 20,
    fontWeight: '500',
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
    gap: 25,
    padding: 10,
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
    marginTop: 10,
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
    fontWeight: '600',
    fontSize: 24,
    color: '#FFFFFF',
  },
});

export default ProductDetails;
