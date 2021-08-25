import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import DBUtils from './src/DBUtils/DBUtils';
import {Provider as PaperProvider} from 'react-native-paper';
import {userContext} from './src/userContext/userContext';

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
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </userContext.Provider>
  );
}

export default App;
