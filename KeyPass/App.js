import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
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
import KeysComponent from './src/KeysComponent/keys_component';
import AddKeyComponent from './src/AddKeyComponent/Addkey_component';
import KeysTableComponent from './src/KeysTableComponent/keystable_component';
import UpdateKeyComponent from './src/UpdateKeyComponent/updatekey_component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();
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

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Search keys"
          icon={() => (
            <MaterialCommunityIcons name="account-search" size={20} />
          )}
          onPress={() => props.navigation.navigate('Search')}
        />
        <DrawerItem
          label="All keys"
          icon={() => (
            <MaterialCommunityIcons name="account-multiple" size={20} />
          )}
          onPress={() => props.navigation.navigate('Accounts')}
        />
        <DrawerItem
          label="Add key"
          icon={() => <MaterialCommunityIcons name="creation" size={20} />}
          onPress={() => props.navigation.navigate('Adding')}
        />
        <Divider style={{height: 1}} />
        <DrawerItem
          label="Logout"
          icon={() => <MaterialCommunityIcons name="logout" size={20} />}
          onPress={async () => {
            await userService.removeUser();
            userService.setCurrentUser('');
            setIsLogin(false);
          }}
        />
      </DrawerContentScrollView>
    );
  }
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
              <Drawer.Navigator
                initialRouteName="Search"
                backBehavior="history"
                drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen
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
                  name="Search"
                  component={KeysComponent}
                />
                <Drawer.Screen
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
                <Drawer.Screen
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
                <Drawer.Screen
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
              </Drawer.Navigator>
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
