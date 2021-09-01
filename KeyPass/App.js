import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, withNavigation} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import DBUtils from './src/DBUtils/DBUtils';
import {Provider as PaperProvider} from 'react-native-paper';
import {userContext} from './src/userContext/userContext';
import KeysComponent from './src/KeysComponent/keys_component';
import AddKeyComponent from './src/addKeyComponent/addkey_component';
import KeysTableComponent from './src/KeysTableComponent/keystable_component';

const Drawer = createDrawerNavigator();
let db = new DBUtils();
db.createTables();

function App() {
  const [user, setUser] = React.useState('');
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <userContext.Provider value={{user, isLogin, setUser, setIsLogin}}>
      <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Login" component={LoginComponent} />
            <Drawer.Screen
              name="Registration"
              component={RegistrationComponent}
            />
            <Drawer.Screen name="Search" component={KeysComponent} />
            <Drawer.Screen name="Accounts" component={KeysTableComponent} />
            <Drawer.Screen name="Adding" component={AddKeyComponent} />
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </userContext.Provider>
  );
}

export default App;
