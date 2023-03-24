import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { Bottombar } from "./components/Bottombar"


// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint: 'https://oauth2.googleapis.com/token',
// };

export default function App() {
//   const [accessToken, setAccessToken] = useState(null);

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: '745638758323-tufn8ed5q6ltovurg41nk75e1leecr6l.apps.googleusercontent.com',
//       scopes: ['openid', 'profile', 'email'],
//       redirectUri: 'https://auth.expo.io/@gr_client/gr_client',
//     },
//     discovery
//   );

//   console.log(request);
//   console.log(response);
//   console.log(accessToken);

//   useEffect(() => {
//     if (response?.type === 'success' && response?.params?.access_token) {
//       const { params } = response;
//       const { access_token } = params;
//       setAccessToken(access_token);
//       console.log(params);
//     }
//   }, [response]);

  return(
      <Bottombar/>
  )
}
