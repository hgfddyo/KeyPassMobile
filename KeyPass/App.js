import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, withNavigation} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import DBUtils from './src/DBUtils/DBUtils';
import {Provider as PaperProvider, Divider} from 'react-native-paper';
import {userContext} from './src/userContext/userContext';
import KeysComponent from './src/KeysComponent/keys_component';
import AddKeyComponent from './src/addKeyComponent/addkey_component';
import KeysTableComponent from './src/KeysTableComponent/keystable_component';
import UpdateKeyComponent from './src/UpdateKeyComponent/updatekey_component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {View} from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
let db = new DBUtils();
db.createTables();

function App() {
  const [user, setUser] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(async () => {
    let user = await EncryptedStorage.getItem('active_user');
    if (user) {
      setUser(user);
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
          onPress={() => {
            EncryptedStorage.removeItem('active_user').then(() => {
              setUser('');
              setIsLogin(false);
            });
          }}
        />
      </DrawerContentScrollView>
    );
  }
  if (isLoaded) {
    return (
      <userContext.Provider value={{user, isLogin, setUser, setIsLogin}}>
        <PaperProvider>
          <NavigationContainer>
            {!isLogin ? (
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{headerBackVisible: false}}>
                <Stack.Screen
                  options={{unmountOnBlur: true}}
                  name="Login"
                  component={LoginComponent}
                />
                <Stack.Screen
                  options={{unmountOnBlur: true}}
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
                  options={{unmountOnBlur: true}}
                  name="Search"
                  component={KeysComponent}
                />
                <Drawer.Screen
                  options={{unmountOnBlur: true}}
                  name="Accounts"
                  component={KeysTableComponent}
                />
                <Drawer.Screen
                  options={{unmountOnBlur: true}}
                  name="Adding"
                  component={AddKeyComponent}
                />
                <Drawer.Screen
                  options={{unmountOnBlur: true}}
                  name="Updating"
                  component={UpdateKeyComponent}
                />
              </Drawer.Navigator>
            )}
          </NavigationContainer>
        </PaperProvider>
      </userContext.Provider>
    );
  } else {
    return <View></View>;
  }
}

export default App;
