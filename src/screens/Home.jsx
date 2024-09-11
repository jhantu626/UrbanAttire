import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext, useState} from 'react';
import ApplicationWrapper from '../components/ApplicationWrapper';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import data from './../data/data.json';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';

const categories = ['Tranding Now', 'All', 'New', 'Mens', 'Women'];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState(data.products);

  const handleLiked = item => {
    const newProducts = products.map(data => {
      if (data.id === item.id) {
        return {...data, isLiked: true};
      }
      return data;
    });
    setProducts(newProducts);
  };

  return (
    <ApplicationWrapper>
      <Header />

      {/* PRODUCT CATEGORIES */}
      {/* PRODUCT CARD */}
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.matchText}>Match Your Style</Text>
            <View style={styles.inputContainer}>
              <Fontisto
                name={'search'}
                size={20}
                color={'#C0C0C0'}
                style={styles.iconInput}
              />
              <TextInput style={styles.inputField} placeholder="Search" />
            </View>
            <FlatList
              data={categories}
              renderItem={({item}) => (
                <Category
                  item={item}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              )}
              keyExtractor={item => item}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </>
        }
        data={products}
        renderItem={({item, index}) => (
          <ProductCard item={item} handleLiked={handleLiked} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
      />
    </ApplicationWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red'
  },
  matchText: {
    fontFamily: fonts.semiBold,
    fontSize: 28,
    color: 'black',
    marginVertical: 10,
  },
  inputContainer: {
    height: 48,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
  },
  iconInput: {
    marginHorizontal: 12,
  },
  inputField: {
    fontFamily: fonts.light,
    flex: 1,
    fontSize: 18,
  },
});

export default Home;
