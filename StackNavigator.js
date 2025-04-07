import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider, UserContext } from './src/context/UserContext';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import { loadUserData } from './src/redux/userSlice';
import LoadYouMontAppScreen from './src/screens/LoadYouMontAppScreen';


const Stack = createNativeStackNavigator();

const YouMontRealStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <UserProvider>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </UserProvider>
      </Provider>
    </GestureHandlerRootView>
  );
};

const AppNavigator = () => {
  const dispatch = useDispatch();
  const [isMontOnboardingRealVisibled, setMontOnboardingRealVisibled] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const [initializingMontOnboardingRealApp, setInitializingMontOnboardingRealApp] = useState(true);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const loadMontOnboardingRealUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const storedMontOnboardingRealUser = await AsyncStorage.getItem(storageKey);
        const isMontOnboardingRealVisible = await AsyncStorage.getItem('isMontOnboardingRealVisible');

        if (storedMontOnboardingRealUser) {
          setUser(JSON.parse(storedMontOnboardingRealUser));
          setMontOnboardingRealVisibled(false);
        } else if (isMontOnboardingRealVisible) {
          setMontOnboardingRealVisibled(false);
        } else {
          setMontOnboardingRealVisibled(true);
          await AsyncStorage.setItem('isMontOnboardingRealVisible', 'true');
        }
      } catch (error) {
        console.error('Error loading of montYou Real user', error);
      } finally {
        setInitializingMontOnboardingRealApp(false);
      }
    };
    loadMontOnboardingRealUser();
  }, [setUser]);

  if (initializingMontOnboardingRealApp) {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#2F2E31',
      }}>
        <ActivityIndicator size="large" color="#CCA65A" />
      </View>
    );
  }

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={isMontOnboardingRealVisibled ? 'MontOnboardingScreen' : 'LoadYouMontApp'}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MontOnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LoadYouMontApp" component={LoadYouMontAppScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
};


export default YouMontRealStack;
