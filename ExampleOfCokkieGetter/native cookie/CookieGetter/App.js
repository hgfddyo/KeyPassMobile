/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  let [cookie, setCookie] = React.useState();
  return (
    <View>
      <Text>
        {cookie ? 'Кукки получены:'.concat(cookie) : 'Кукки не получены'}
      </Text>
      <Button
        onPress={async () => {
          let credentials = {
            user: '1',
            password: 'sd',
          };
          try {
            let response = await fetch('http://192.168.1.101:7000/set-cookie', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json;',
              },
              body: JSON.stringify(credentials),
            });
            let headers = await response.headers;
            let result = await response.json();
            console.log(result);
            let header = headers.get('set-cookie');
            setCookie(header);
          } catch (error) {
            console.log(error);
          } finally {
          }
        }}
        title={'Получить Кукки'}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
