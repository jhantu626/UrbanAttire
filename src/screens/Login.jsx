import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackActions, useNavigation} from '@react-navigation/native';
import {fonts} from '../utils/fonts';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '../context/AuthContext';

const Login = () => {
  const [isPassword, setIsPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, login} = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [userNotFound, setUserNotFound] = useState({});

  const validation = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required!';
    } else if (password.length < 6 && password.length > 15) {
      newErrors.password = 'Password must be 6-15 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validation()) return;
    const result = await login(email, password);
    if (!result.status) {
      setUserNotFound({status: true, msg: result.msg});
    }
  };

  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.btnWrapper}
        onPress={() => navigation.dispatch(StackActions.pop())}>
        <Icon name="arrow-back-outline" color="black" size={40} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Wellcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      {/* Form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={25} color={colors.secondary} />
          <TextInput
            keyboardType="email-address"
            placeholder="Enter username/email"
            style={styles.textInput}
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <View style={styles.inputContainer}>
          <Icon
            name={isPassword ? 'lock-closed' : 'lock-open'}
            size={25}
            color={colors.secondary}
          />
          <TextInput
            secureTextEntry={isPassword}
            placeholder="Enter password"
            style={styles.textInput}
            value={password}
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setIsPassword(prev => !prev)}>
            <Icon name={isPassword ? 'eye' : 'eye-off'} size={25} />
          </TouchableOpacity>
        </View>

        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}

        <TouchableOpacity style={{alignSelf: 'flex-end'}}>
          <Text style={styles.forgetTxt}>Forget Password?</Text>
        </TouchableOpacity>
        {/* Login Btn */}
        <TouchableOpacity style={styles.loginBtnWrapper} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator
              style={{padding: 10}}
              color={'#FFFFFF'}
              size={'large'}
            />
          ) : (
            <Text style={styles.loginTxt}>Login</Text>
          )}
        </TouchableOpacity>
        {userNotFound.status && (
          <Text style={styles.notFoundError}>{userNotFound.msg}</Text>
        )}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Form End */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 11,
    backgroundColor: colors.white,
    padding: 20,
  },
  btnWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontFamily: fonts.medium,
    fontSize: 32,
    color: colors.primary,
  },
  formContainer: {
    gap: 20,
  },
  inputContainer: {
    height: 55,
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: fonts.regular,
    color: 'black',
  },
  forgetTxt: {
    fontSize: 14,
    fontFamily: fonts.semiBold,
  },
  loginBtnWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginTxt: {
    fontSize: 18,
    color: colors.white,
    fontFamily: fonts.semiBold,
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleBtnContainer: {
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  googleIcon: {
    width: 25,
    height: 25,
  },
  googleText: {
    fontSize: 15,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginBottom: 20,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
  },
  errorText: {
    marginHorizontal: 25,
    marginTop: -20,
    marginVertical: -10,
    padding: 0,
    fontFamily: fonts.light,
    color: 'red',
    textDecorationLine: 'underline',
  },
  notFoundError: {
    fontFamily: fonts.regular,
    color: 'red',
    fontSize: 16,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: 'red',
  },
});

export default Login;