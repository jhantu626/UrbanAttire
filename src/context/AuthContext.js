import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {Axios} from 'axios';
import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    const url = 'http://192.168.81.179:9001/api/v1/auth/login';
    try {
      setIsLoading(true);
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log(response.data);
      if (!response.data.status) {
        return response.data;
      }

      setUserToken(response.data.token);
      await AsyncStorage.setItem('userToken', response.data.token);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      console.info('Register function started');

      const URI = 'http://192.168.81.179:9001/api/v1/auth/register';

      const response = await axios.post(URI, {
        email: email,
        password: password,
        name: name,
      });
      console.info('Fetch request sent');
      const data = response.data;
      if (!data.status) {
        console.log(data);
        return data;
      }

      if (data.status) {
        setUserToken(data.token);
        await AsyncStorage.setItem('userToken', data.token);
      }

      console.log('Registration successful:', data.token);
    } catch (err) {
      console.error('Error during registration:', err);
    } finally {
      setIsLoading(false);
      console.info('Register function completed');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    } catch (err) {
      console.error(err);
    }
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        isLoading,
        setIsLoading,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
