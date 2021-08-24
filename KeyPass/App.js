import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import LoginComponent from './src/LoginComponent/login_component';
import RegistrationComponent from './src/RegistrationComponent/registration_component';
import DBUtils from './src/DBUtils/DBUtils';
import {Provider as PaperProvider} from 'react-native-paper';

const Drawer = createDrawerNavigator();
let db = new DBUtils();
db.createTables();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={LoginComponent} />
          <Drawer.Screen
            name="Registration"
            component={RegistrationComponent}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
