import * as React from 'react';
import { Button, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

// Google認証のエンドポイント
const discovery = {
  authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenEndpoint: 'https://oauth2.googleapis.com/token',
  revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
};

// Google認証のクライアントID
const clientId = '745638758323-tufn8ed5q6ltovurg41nk75e1leecr6l.apps.googleusercontent.com';

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Google認証用のリクエストを作成
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Code,
      clientId: clientId,
      redirectUri: makeRedirectUri({ useProxy: true }),
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );

  React.useEffect(() => {
    // 認証後に実行する処理
    if (response?.type === 'success') {
      // 認証コードを取得
      const { code } = response.params;

      // Laravel側のAPIに認証コードを送信
      axios
        .get(`https://9cfe-2404-7a87-660-1800-9f0-7d13-2a05-31db.jp.ngrok.io/auth/google?code=${code}`)
        .then((res) => {
          console.log(res.data);
          setLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loggedIn ? (
        <View>
          <Button
            title="Logout"
            onPress={() => {
              setLoggedIn(false);
            }}
          />
        </View>
      ) : (
        <Button
          disabled={!request}
          title="Login with Google"
          onPress={() => {
            promptAsync();
          }}
        />
      )}
    </View>
  );
}

