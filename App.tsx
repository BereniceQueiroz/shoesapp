import { StatusBar, Platform } from 'react-native';
import OneSignal from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { tagUserEmailCreate, deleteTagUserEmailCreate, tagUserInfoCreate } from './src/notifications/notificationsTags';
import { CartContextProvider } from './src/contexts/CartContext';
import { useEffect } from 'react';

const oneSignalID = Platform.OS === 'ios' ? '' : 'aae6395a-648a-4a37-b4f9-6eb605f4a5a7';

OneSignal.setAppId(oneSignalID);

OneSignal.setEmail('baqueiroz14@gmail.com')

//para solicitar ao usuário permissão para receber push
OneSignal.promptForPushNotificationsWithUserResponse(response => {
  console.log(response);
}) 

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  
  //tags
  // tagUserEmailCreate('baqueiroz14@gmail.com')

  //delete
  //deleteTagUserEmailCreate()

  //create tags personalizadas
  tagUserInfoCreate()

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const {actionId } = response.action as any;

      switch (actionId) {
        case '1':
          return console.log('Ver todas');
        case '2':
          return console.log('Ver pedido');
        default: 'Não houve clique'
      }
    })

    return () => unsubscribe;
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      
    </NativeBaseProvider>
  );
}