import 'react-native-gesture-handler';
import * as React from 'react';
import Account from './src/Account';
import User from './src/User';
import UserService from './src/UserService';
import AccountService from './src/AccountService';
import ProfileService from './src/ProfileService';
import CRUDService from './src/CRUDService';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, withNavigation} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import SettingsComponent from './src/SettingsComponent/settings_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import {Provider as PaperProvider, Divider} from 'react-native-paper';
import {UserContext} from './src/UserContext';
import AddKeyComponent from './src/AddKeyComponent/addkey_component';
import KeysTableComponent from './src/KeysTableComponent/keystable_component';
import UpdateKeyComponent from './src/UpdateKeyComponent/updatekey_component';
import ProfilesTableComponent from './src/ProfilesTableComponent/profiletable_component';
import AddProfileComponent from './src/AddProfileComponent/addprofile_component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import UpdateProfileComponent from "./src/UpdateProfileComponent/updateprofile_component";

const AuthorizationStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();
const userService = new UserService();
const accountService = new AccountService();
const profileService = new ProfileService();
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
        value={{
          isLogin,
          setIsLogin,
          userService,
          accountService,
          profileService,
        }}>
        <PaperProvider>
          <NavigationContainer>
            {!isLogin ? (
              <AuthorizationStack.Navigator
                initialRouteName="Login"
                screenOptions={{headerBackVisible: false}}>
                <AuthorizationStack.Screen
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
                <AuthorizationStack.Screen
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
              </AuthorizationStack.Navigator>
            ) : (
              <AppStack.Navigator
                initialRouteName="Profiles"
                screenOptions={{headerBackVisible: false}}>
                <AppStack.Screen
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
                  name="Profiles"
                  component={ProfilesTableComponent}
                />
                <AppStack.Screen
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
                  name="Updating profile"
                  component={UpdateProfileComponent}
                />
                <AppStack.Screen
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
                <AppStack.Screen
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
                  name="Adding Key"
                  component={AddKeyComponent}
                />
                <AppStack.Screen
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
                  name="Adding Profile"
                  component={AddProfileComponent}
                />
                <AppStack.Screen
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
                  name="Updating key"
                  component={UpdateKeyComponent}
                />
                <AppStack.Screen
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
                  name="Settings"
                  component={SettingsComponent}
                />
              </AppStack.Navigator>
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
