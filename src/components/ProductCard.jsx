import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {fonts} from '../utils/fonts';

const ProductCard = ({item, handleLiked}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {item: item})}
      style={styles.container}>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        // source={require(imageUri)}
        style={styles.coverImage}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{'\u20B9'}{item.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.heartContainer}
        onPress={() => handleLiked(item)}>
        <AntDesign
          name={item.isLiked ? 'heart' : 'hearto'}
          size={20}
          color={'#E55B5B'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  coverImage: {
    height: 256,
    width: responsiveWidth(40),
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 18,
    // fontWeight: '500',
    color: '#000000',
  },
  price: {
    color: '#9C9C9C',
    fontWeight: '600',
    fontSize: 18,
  },
  content: {
    paddingLeft: 10,
  },
  heartContainer: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 18,
    right: 15,
    borderRadius: 17,
  },
});

export default ProductCard;
