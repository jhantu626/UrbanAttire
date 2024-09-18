import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const categories = ['Tranding Now', 'All', 'New', 'Men', 'Women'];

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const HomeShimmer = () => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <ShimmerPlaceholder
          style={styles.shimmerBox}
          width={180}
          height={30}
          radius={5}
        />
      </View>

      {/* SEARCH INPUT */}
      <View style={styles.inputContainer}>
        <ShimmerPlaceholder
          style={styles.shimmerBox}
          width={300}
          height={40}
          radius={12}
        />
      </View>

      {/* CATEGORY LIST */}
      <FlatList
        data={categories}
        renderItem={() => (
          <ShimmerPlaceholder
            style={[styles.shimmerBox, {marginLeft: 10}]}
            width={100}
            height={40}
            radius={20}
          />
        )}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* PRODUCT LIST */}
      <FlatList
        data={Array(6).fill('')} // Placeholder data
        renderItem={() => (
          <View style={styles.productCard}>
            <ShimmerPlaceholder
              style={styles.shimmerBox}
              width={Dimensions.get('window').width * 0.4}
              height={200}
              radius={20}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    // backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    marginBottom: 20,
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'center',
  },
  categoryList: {
    marginBottom: 20,
  },
  productCard: {
    marginBottom: 20,
    padding: 10,
  },
  productContent: {
    paddingLeft: 10,
  },
  productList: {
    paddingBottom: 50,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shimmerBox: {
    backgroundColor: '#E0E0E0',
    // marginLeft: 10,
  },
});

export default HomeShimmer;
