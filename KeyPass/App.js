import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import LoginComponent from "./src/LoginComponent/login_component";
import DBUtils from "./src/DBUtils/DBUtils";

const Drawer = createDrawerNavigator();
let db = new DBUtils();
db.createTables();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={LoginComponent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;