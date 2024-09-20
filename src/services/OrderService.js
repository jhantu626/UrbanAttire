import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class OrderService {
  constructor() {
    this.baseUrl = BASE_URL;
  }

  async getToken() {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  }

  async makeOrder(result, totalAmount, address) {
    const payload = {result, totalAmount};
    try {
      const token = await this.getToken();
      const response = await axios.post(
        `${this.baseUrl}/api/v1/order/make-order?address=${address}`,
        JSON.stringify(payload),
        {
          headers: {
            'Content-Type': 'application/json',
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

  async getOrders() {
    try {
      const token = await this.getToken();
      const response = await axios.get(
        `${this.baseUrl}/api/v1/order/all-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data=await response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  }
}

export const orderService = new OrderService();
