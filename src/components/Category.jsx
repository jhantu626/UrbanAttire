import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { fonts } from '../utils/fonts';

const Category = ({item, selectedCategory, setSelectedCategory}) => {
  const isSelected = selectedCategory === item;

  return (
    <TouchableOpacity onPress={() => setSelectedCategory(item)} style={{}}>
      <Text style={[styles.categoryText, isSelected && styles.selectedItem]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontFamily: fonts.regular,
    fontSize: 16,
    fontWeight: '600',
    color: '#938F8F',
    backgroundColor: '#DFDCDC',
    paddingHorizontal: 20,
    height: 41,
    borderRadius: 16,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  selectedItem: {
    backgroundColor: '#E96E6E',
    color: 'white',
  },
});

export default Category;
