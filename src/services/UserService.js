import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class User {
  constructor() {
    this.baseUrl = 'http://192.168.43.179:9001';
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
    console.info('started');

    try {
      const token = await this.getToken();
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
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
    console.log('end');
  }

  async updateAddress(street, city, postalCode, state) {
    try {
      const token = await this.getToken();
      const URI = `${this.baseUrl}/api/v1/user/update-address`;

      const response = await axios.put(
        URI,
        {
          street: street,
          city: city,
          postalCode: postalCode,
          state: state,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateMobileNumber(number) {
    try {
      const token = await this.getToken();

      const response = await axios.put(
        `${this.baseUrl}/api/v1/user/update-number/${number}`,
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

  async profilePic() {
    try {
      const token = await this.getToken();
      const response = await axios.get(
        `${this.baseUrl}/api/v1/user/profile-pic`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'arraybuffer',
        },
      );

      const data = await response.data;

      const base64String = Buffer.from(data, 'binary').toString('base64');
      return `data:image/jpeg;base64,${base64String}`;
    } catch (error) {
      console.log(error);
    }
  }
}

export const userService = new User();
