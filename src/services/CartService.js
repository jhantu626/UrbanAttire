import axios from 'axios';
import Cart from '../screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '@env';

class CartService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async getToken() {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  }

  async addCart(productId, size, color) {
    try {
      const token = await this.getToken();
      const response = await axios.post(
        `${this.baseUrl}/api/v1/cart/add-cart/${productId}?size=${size}&color=${color}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async allCarts() {
    try {
      const token = await this.getToken();
      const response = await axios.get(
        `${this.baseUrl}/api/v1/cart/all-carts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteCarts(cartId) {
    try {
      const token = await this.getToken();
      const response = await axios.delete(
        `${this.baseUrl}/api/v1/cart/${cartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export const cartService = new CartService();
