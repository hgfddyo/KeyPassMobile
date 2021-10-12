import * as React from 'react';
import Account from './src/Account';
import User from './src/User';
import UserService from './src/UserService';
import AccountService from './src/AccountService';
import CRUDService from './src/CRUDService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, withNavigation} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import {Provider as PaperProvider, Divider} from 'react-native-paper';
import {UserContext} from './src/UserContext';
import AddKeyComponent from './src/AddKeyComponent/addkey_component';
import KeysTableComponent from './src/KeysTableComponent/keystable_component';
import UpdateKeyComponent from './src/UpdateKeyComponent/updatekey_component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

const Stack = createNativeStackNavigator();
const userService = new UserService();
const accountService = new AccountService();
let crudService = new CRUDService();
crudService.createTables();

function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(async () => {
    let user = await userService.loadUser();
    if (user) {
      userService.setCurrentUser(user);
      setIsLogin(true);
    }
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <UserContext.Provider
        value={{isLogin, setIsLogin, userService, accountService}}>
        <PaperProvider>
          <NavigationContainer>
            {!isLogin ? (
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{headerBackVisible: false}}>
                <Stack.Screen
                  options={{
                    title: 'KEYS RING',
                    unmountOnBlur: true,
                    headerStyle: {
                      backgroundColor: '#00B3A6',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      textTransform: 'uppercase',
                      fontSize: 22,
                      fontWeight: 'bold',
                    },
                  }}
                  name="Login"
                  component={LoginComponent}
                />
                <Stack.Screen
                  options={{
                    title: 'KEYS RING',
                    unmountOnBlur: true,
                    headerStyle: {
                      backgroundColor: '#00B3A6',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      textTransform: 'uppercase',
                      fontSize: 22,
                      fontWeight: 'bold',
                    },
                  }}
                  name="Registration"
                  component={RegistrationComponent}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                initialRouteName="Accounts"
                screenOptions={{headerBackVisible: false}}>
                <Stack.Screen
                  options={{
                    unmountOnBlur: true,
                    headerStyle: {
                      backgroundColor: '#00B3A6',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: 25,
                    },
                  }}
                  name="Accounts"
                  component={KeysTableComponent}
                />
                <Stack.Screen
                  options={{
                    unmountOnBlur: true,
                    headerStyle: {
                      backgroundColor: '#00B3A6',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: 25,
                    },
                  }}
                  name="Adding"
                  component={AddKeyComponent}
                />
                <Stack.Screen
                  options={{
                    unmountOnBlur: true,
                    headerStyle: {
                      backgroundColor: '#00B3A6',
                    },
                    headerTintColor: '#000000',
                    headerTitleStyle: {
                      fontSize: 25,
                    },
                  }}
                  name="Updating"
                  component={UpdateKeyComponent}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </PaperProvider>
      </UserContext.Provider>
    );
  } else {
    return <View></View>;
  }
}

export default App;
