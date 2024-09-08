import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from './utils/colors';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetails from './screens/ProductDetails';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeChildStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.tabActive,
        }}>
        <Tab.Screen
          name="Home_Stack"
          component={HomeChildStack}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return <Entypo name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Reorder"
          component={Home}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return <MaterialIcons name="reorder" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Home}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <MaterialCommunityIcons name="cart" size={size} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({size, focused, color}) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
