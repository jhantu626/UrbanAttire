import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class User {
  constructor() {
    this.baseUrl = 'http://192.168.81.179:9001';
  }

  async getToken() {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  }

  async profile() {
    try {
      const token = await this.getToken();
      const response = await axios.get(`${this.baseUrl}/api/v1/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfilePic(body) {
    console.info("started")
    const token = await this.getToken();
    try {
      const response = await axios.put(
        `${this.baseUrl}/api/v1/user/update-profile-pic`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

export const userService = new User();
