import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import ApplicationWrapper from '../components/ApplicationWrapper';
import Header from '../components/Header';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Category from '../components/Category';
import ProductCard from '../components/ProductCard';
import data from './../data/data.json';
import {fonts} from '../utils/fonts';
import {CartContext} from '../context/CartContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {productService} from '../services/ProductService';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeShimmer from '../shimmer-screens/HomeShimmer';

const categories = ['Tranding Now', 'All', 'New', 'Men', 'Women'];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [profileImage, setProfileImge] = useState(null);
  const [pageNo, setPageNo] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const faltListRef = useRef(null);

  const handleLiked = item => {
    const newProducts = products.map(data => {
      if (data.id === item.id) {
        return {...data, isLiked: true};
      }
      return data;
    });
    setProducts(newProducts);
  };

  const syncProfileImage = async () => {
    const data = await AsyncStorage.getItem('profileImageUrl');
    setProfileImge(data);
  };

  const allProducts = useCallback(async (pageNo, category) => {
    const data = await productService.allProducts(pageNo, category);
    const content = await data.content;
    setProducts(prev => content);
    const total = await data.totalPages;
    const first = await data.first;
    const last = await data.last;
    setTotalPage(total);
    setIsFirst(first);
    setIsLast(last);
    console.log(data);
    // console.log(content)
  });

  useEffect(() => {
    setIsLoading(prev => true);
    syncProfileImage();
    allProducts(pageNo, selectedCategory);

    // if (profileImage !== null) {
    //   syncProfileImage();
    // }

    // scroll to top
    if (faltListRef.current) {
      faltListRef.current.scrollToOffset({animated: 0, offset: 0});
    }
    setIsLoading(false);
    // setIsLoading(prev => false);
  }, [pageNo, selectedCategory]);

  useEffect(() => {
    setPageNo(prev => 0);
  }, [selectedCategory]);

  return (
    <ApplicationWrapper>
      <Header imageUrl={profileImage} />

      {/* PRODUCT CATEGORIES */}
      {/* PRODUCT CARD */}

      {isLoading ? (
        <HomeShimmer />
      ) : (
        <FlatList
          ref={faltListRef}
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
          ListFooterComponent={
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={() => setPageNo(prev => prev - 1)}
                style={[styles.iconButton, isFirst && styles.disabledButton]}
                disabled={isFirst}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={38}
                  color={'#FFFFFF'}
                />
              </TouchableOpacity>
              <Text style={styles.pageNumber}>
                {pageNo + 1} of {totalPage}
              </Text>
              <TouchableOpacity
                onPress={() => setPageNo(prev => prev + 1)}
                style={[styles.iconButton, isLast && styles.disabledButton]}
                disabled={isLast}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={38}
                  color={'#FFFFFF'}
                />
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </ApplicationWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red'
  },
  shimmerBox: {
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginVertical: 15,
  },
  card: {
    width: '90%',
    height: 200,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 10,
    padding: 10,
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
  paginationContainer: {
    marginTop: 30,
    flexDirection: 'row', // Horizontal alignment
    alignItems: 'center', // Vertical centering
    justifyContent: 'center', // Center everything horizontally
    paddingVertical: 10, // Adds space at the top and bottom
    borderRadius: 10, // Rounded corners
    marginHorizontal: 20, // Margins from sides
  },
  iconButton: {
    width: 40, // Set button width
    height: 40, // Set button height
    justifyContent: 'center', // Center icon vertically
    alignItems: 'center', // Center icon horizontally
    backgroundColor: '#E96E6E', // Default button background color
    borderRadius: 10, // Circular button
    marginHorizontal: 10, // Space between buttons
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Gray background when disabled
  },
  pageNumber: {
    fontFamily: fonts.medium,
    fontSize: 18, // Text size for easy readability
    color: '#333333', // Darker text color for contrast
  },
});

export default Home;
