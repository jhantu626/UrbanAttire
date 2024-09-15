import React, {useContext} from 'react';
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
import Cart from './screens/Cart';
import {CartContext, CartProvider} from './context/CartContext';
import {Text, View} from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import {AuthContext, AuthProvider} from './context/AuthContext';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginHome from './screens/LoginHome';
import SplashScreen from './screens/SplashScreen';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeChildStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
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

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginHome" component={LoginHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        component={Cart}
        options={{
          tabBarIcon: ({size, focused, color}) => {
            const {carts} = useContext(CartContext);
            return (
              <View style={{position: 'relative'}}>
                <MaterialCommunityIcons name="cart" size={size} color={color} />
                <View
                  style={{
                    height: 14,
                    width: 14,
                    borderRadius: 7,
                    backgroundColor: color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: -10,
                    right: -5,
                  }}>
                  <Text style={{color: '#FFFFFF', fontSize: 10}}>
                    {carts.length}
                  </Text>
                </View>
              </View>
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
  );
};

const AppNav = () => {
  const {userToken, isLoading, setIsLoading} = useContext(AuthContext);

  return (
    <CartProvider>
      <NavigationContainer>
        {userToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </CartProvider>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AlertNotificationRoot>
        <AppNav />
      </AlertNotificationRoot>
    </AuthProvider>
  );
};

export default App;
