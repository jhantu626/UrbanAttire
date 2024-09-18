import axios from 'axios';
import Cart from '../screens/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';

class CartService {
  constructor() {
    this.baseUrl = 'http://192.168.43.179:9001';
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
}

export const cartService = new CartService();
